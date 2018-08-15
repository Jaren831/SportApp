import React from 'react';
import TeamContainer from '../Containers/TeamContainer.js';
import '../css/Match.css';

const Match = (props) => {
    return (
        <div className="Match">
            <div>
                <TeamContainer
                    teamName={props.team1Name}
                    teamContractAddress={props.team1ContractAddress}
                    teamContractBalance={props.team1ContractBalance}
                />   
            </div>
            <div>
                <div>{props.team1Name} vs {props.team2Name}</div>
                <div>Total: {props.matchContractBalance} ETH</div>
                <div>{props.matchContractAddress}</div>
            </div>
            <div>
                <TeamContainer
                    teamName={props.team2Name}
                    teamContractAddress={props.team2ContractAddress}
                    teamContractBalance={props.team2ContractBalance}
                />  
            </div>
        </div>
    )
};

export default Match;