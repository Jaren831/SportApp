import React from 'react';
import TeamContainer from '../Containers/TeamContainer.js';
import '../css/Match.css';
import Button from '../../node_modules/@material-ui/core/Button';
import { Card } from '@material-ui/core';

const Match = (props) => {
    return (
        <Card className="Match">
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
                <div>Winner: {props.winner}</div>
                <div>{props.matchContractAddress}</div>
                <Button variant="outlined" onClick={props.resolveMatch}>Resolve</Button>
            </div>
            <div>
                <TeamContainer
                    teamName={props.team2Name}
                    teamContractAddress={props.team2ContractAddress}
                    teamContractBalance={props.team2ContractBalance}
                />  
            </div>
        </Card>
    )
};

export default Match;