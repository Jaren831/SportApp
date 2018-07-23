import React from 'react';

import './Match.css';

const match = ( props ) => {
    return (
        <div className="Match">
            <div>Address = {props.address}</div>
            <div>Team1 = {props.team1}</div>
            <div>Team2 = {props.team2}</div>
        </div>
    )
};

export default match;