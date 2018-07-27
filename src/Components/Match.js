import React from 'react';
import TeamContainer from '../Containers/TeamContainer.js';
import '../css/Match.css';

const Match = (props) => {
    return (
        <div className="Match">
            <div>
                <TeamContainer
                    address = {props.team1Address}
                    name = {props.team1Name}
                    web3 = {props.web3}
                />   
            </div>
            <div>
                <div>{props.team1} vs {props.team2}</div>
                <div>{props.matchAddress}</div>
            </div>
            <div>
                <TeamContainer
                    address = {props.team2Address}
                    name = {props.team2Name}
                    web3 = {props.web3}
                />  
            </div>
        </div>
    )
};

export default Match;