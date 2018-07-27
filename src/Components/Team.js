import React from 'react';
import '../css/Team.css';

const Team = (props) => {
    return (
        <div className="Team">
            name = {props.name}
            bet = {props.bet}
            address = {props.address}
        </div>
    )
};

export default Team;