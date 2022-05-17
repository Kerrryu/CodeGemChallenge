import styled from "@emotion/styled";
import React, {Component} from "react";
import axios from "axios";
import Emojis from "../enums/emoji";

const ListDateDivider = styled.div`
    border-top: 1px solid rgba(0,0,0,1.0);
    padding: 10px 0;
    color: #8C9297;
    font-size: 1.2em;
    text-align: center;
    width: 100%;
    max-width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const CheckinBox = styled.div`
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 8px;
    padding-right: 8px;
    margin: 0px;
    border: none;
    color: #8C9297;
    background-color: 
    text-align: center;
    box-shadow: 0px 1px 5px rgba(200, 211, 232, 0.75);
    margin: 5px 0px 0px 0px;
    position: relative;
`;

const CheckinText = styled.span`
    font-size: 1em;
    position: relative;
`;

const CheckinMood = styled.span`
    font-size: 1.3em;
    margin-right: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
`;

const CheckinRightSide = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
`;

const CheckinDate = styled.span`
    font-size: 1.2em;
    position: relative;
    flex-grow: 1;
`;

const CheckinTime = styled.span`
    font-size: 1.2em;
    position: relative;
    flex-grow: 1;
`;

export class CheckinList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkins: {},
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/getFeedback')
            .then(response => {
                if (response.status === 200 && response != null) {
                    let data = {};

                    for(var i = response.data.length-1; i >= 0; i--) {
                        let entry = {}
                        entry.message = response.data[i].feedback;
                        entry.mood = response.data[i].mood.toUpperCase();
                        entry.date = new Date(response.data[i].createdat);
                        
                        if(data[entry.date.toLocaleDateString()] == null) {
                            data[entry.date.toLocaleDateString()] = [];
                        }

                        data[entry.date.toLocaleDateString()].push(entry);
                    }

                    this.setState({
                        checkins: data
                    });
           } else {
             console.log('problem');
           }
      })
      .catch(error => {
          console.log(error);
      });
    }

    render() {
        const content = [];
        Object.entries(this.state.checkins).forEach(([key, value]) => {
            content.push(<ListDateDivider key={key}>{key}</ListDateDivider>);
            value.forEach((entry) => {
                content.push(
                    <CheckinBox key={entry.date.toLocaleDateString()}>
                        <CheckinText>{entry.message}</CheckinText>
                        <br/>
                        <CheckinTime>
                            {
                                (new Date(entry.date).getHours() < 10 ? ("0" + new Date(entry.date).getHours().toString()) : new Date(entry.date).getHours().toString()) + 
                                ":" + 
                                (new Date(entry.date).getMinutes() < 10 ? ("0" + new Date(entry.date).getMinutes().toString()) : new Date(entry.date).getMinutes().toString())
                            }
                        </CheckinTime>
                        <CheckinMood>{Emojis[entry.mood].value}</CheckinMood>
                    </CheckinBox>
                );
            });
        });

        return (
            <div className="checkins">
                {content}
            </div>
        );
    }
}