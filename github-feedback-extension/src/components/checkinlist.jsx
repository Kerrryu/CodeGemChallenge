import styled from "@emotion/styled";
import React, {Component} from "react";
import axios from "axios";
import Emojis from "../enums/emoji";

const CheckinBox = styled.div`
    border-radius: 5px;
    padding: 8px 18px;
    margin: 0px;
    border: none;
    color: #8C9297;
    background-color: 
    text-align: center;
    box-shadow: 0px 1px 5px rgba(200, 211, 232, 0.75);
    margin: 5px 0px 0px 0px;
`;

const CheckinText = styled.span`
    font-size: 1em;
    position: relative;
`;

const CheckinMood = styled.span`
    font-size: 1.3em;
    margin-right: 5px;
    position: relative;
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
            checkins: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/getFeedback')
            .then(response => {
                if (response.status === 200 && response != null) {
                    let data = [];

                    for(var i = 0; i < response.data.length; i++) {
                        let entry = {}
                        entry.message = response.data[i].feedback;
                        entry.mood = response.data[i].mood;
                        entry.date = new Date(response.data[i].createdat);
                        data.push(entry);
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
        const { checkins } = this.state;
        return (
            <div className="checkins">
                {checkins.map(checkin => (
                    <CheckinBox>
                        <CheckinMood>{Emojis[checkin.mood.toUpperCase()].value}</CheckinMood>
                        <CheckinText>{checkin.message}</CheckinText>
                        <CheckinRightSide>
                            <CheckinDate>{checkin.date.toLocaleDateString()}</CheckinDate>
                        </CheckinRightSide>
                    </CheckinBox>
                ))}
            </div>
        );
    }
}