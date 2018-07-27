import React, { Component } from 'react';
import MatchList from '../build/contracts/MatchFactory.json';

import getWeb3 from './utils/getWeb3';
import MatchList from './Components/MatchList.js';
import MatchContainer from './Containers/MatchContainer.js';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './css/App.css';

//truffle network --clean

class MatchList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: props.web3,
      matchFactoryInstance: props.matchFactoryInstance,
      matches: []
    }

    this.populateList = this.populateList.bind(this);
    this.onMatchSubmit = this.onMatchSubmit.bind(this);
    this.populateList()
  }

  populateList() {
    const matchFactoryEvent = this.state.matchFactoryInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
    matchFactoryEvent.watch((error, result) => {
    if (!error) {
        if (result.event === "MatchCreated") {
            console.log(result)
            let newArray = this.state.matches.slice();
            newArray.push({
                address: result.args.matchAddress, 
                team1: result.args.team1, 
                team2: result.args.team2});
            this.setState({
                matches: newArray
            });          
        }
    } else {
        console.log(error)
    }
    }) 
  }

  render() {
    console.log(this.state.matches)
    const matchContainers = this.state.matches.map(match => {
      return (
          <div key={match.address}>
            <MatchContainer
                address = {match.address}
                team1 = {match.team1}
                team2 = {match.team2} />
          </div>
      )
    });
    return (
        <div>
            {matchContainers}
        </div>
    );
  }
}

export default MatchList