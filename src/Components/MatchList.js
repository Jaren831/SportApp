import React from 'react';
import MatchContainer from '../Containers/MatchContainer.js';
import '../css/MatchList.css';

const MatchList = (props) => {
    const matchContainers = props.matches.map(match => {
        return (
            <div key={match.address}>
              <MatchContainer
                  address = {match.address}
                  team1 = {match.team1}
                  team2 = {match.team2} 
                  web3 = {props.web3}/>
            </div>
        )
      });
      return (
          <div>
              {matchContainers}
          </div>
      );
}

export default MatchList