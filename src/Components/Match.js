import React from 'react';

import './Match.css';
import './Team/TeamContainer.js';
import './Team/TeamContainer.css';
import TeamContainer from '../Team/TeamContainer';

//need to make this react component

const match = ( props ) => {
    return (
        <div className="Match">
            <TeamContainer/>
            <div>Address = {props.address}</div>
            <TeamContainer/>
        </div>
    )
};

export default match;