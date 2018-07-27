import React from 'react';

import Match from '../Components/Match.js';

const MatchContainer = (props) => {
    return (
        <div className="Match">
            <Match
                address = {props.address}
                team1 = {props.team1}
                team2 = {props.team2}           
            />
        </div>
    )
};

export default MatchContainer;