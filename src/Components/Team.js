import React from 'react';

import './Team.css';

//need to make this react component

const team = ( props ) => {
    return (
        <div className="Team">
            <div>Team Name = {props.teamName}</div>
            <div>Total Bets = {props.totalBets}</div>
            <div>Address = {props.address}</div>
        </div>
    )
};

export default team;