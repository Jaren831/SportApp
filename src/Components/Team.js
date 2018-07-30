import React from 'react';
import '../css/Team.css';

const Team = (props) => {
    return (
        <div className="Team">
            <div>name = {props.name}</div>
            <div>bet = {props.bet}</div>
            <div>address = {props.address}</div>
        </div>
    )
};

export default Team