import React from 'react';

import Match from '../Components/Match.js';

const TeamContainer = (props) => {
    return (
      <Team
          address = {props.teamAddress}
          name = {props.teamName}
      />
    )
};

export default TeamContainer;