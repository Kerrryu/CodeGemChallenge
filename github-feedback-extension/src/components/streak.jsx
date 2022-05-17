import styled from "@emotion/styled";
import React, {Component} from "react";

const StreakBox = styled.div`
    border-radius: 5px;
    padding: 8px 18px;
    margin: 0px;
    border: none;
    color: white;
    text-align: center;
    margin: 10px 0px 0px 0px
`;

const StreakHeaderText = styled.span`
    font-size: 1em;
    position: relative;
`;

const StreakValueText = styled.span`
    font-size: 1.3em;
    position: relative;
`;

export class Streak extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <StreakBox style={{backgroundColor: this.props.backgroundcolor}}>
                <StreakHeaderText>{this.props.title}</StreakHeaderText>
                <br/>
                <StreakValueText>{this.props.content}</StreakValueText>
            </StreakBox>
        );
    }
}