import React from 'react';
import '../css/Team.css';

const Team = (props) => {
    return (
        <div className="Team">
            <div>name = {props.teamName}</div>
            <div>bet = {props.teamContractBalance}</div>
            <div>address = {props.teamContractAddress}</div>
        </div>
    )
};

export default Team