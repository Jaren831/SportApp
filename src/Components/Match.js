import React, { Component } from 'react';

import Match from './Components/MatchList.js';
import TeamContainer from './Containers/TeamContainer.js';
import MatchContract from '../build/contracts/MatchFactory.json';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './css/Match.css';

//truffle network --clean

class Match extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      matchAddress: props.address,
      team1Address: null,
      team1Name: null,
      team2Address: null,
      team2Name: null
    }

    this.instantiateContract = this.populateList.bind(this);

    getWeb3
    .then(results => {
      console.log('Succesful finding web3.')
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })   
}

  instantiateContract() {
    const contract = require('truffle-contract')
    const match = contract(MatchContract)
    match.setProvider(this.state.web3.currentProvider)
    this.state.match.at(this.state.matchAddress).then((instance) => {
        const teamEvent = instance.allEvents({fromBlock: 0, toBlock: 'latest'});
        teamEvent.get((error, result) => {
            if (!error) {
                    render({team1Address: result[0].args.teamAddress,
                    team1Name: result[0].args.teamName,
                    team2Address: result[1].args.team1Address,
                    team2Name: result[1].args.teamName})
            } else {
                console.log(error)
            }
        })     
    })
  }

  render = (props) => {
    return (
        <div className="Match">
            <div>
                <TeamContainer
                    teamAddress = {props.team1Address}
                    teamName = {props.team1Name}
                />   
            </div>
            <div>
                <div>{props.team1} vs {props.team2}</div>
                <div>{props.matchAddress}</div>
            </div>
                <TeamContainer
                    teamAddress = {props.team2Address}
                    teamName = {props.team2Name}
                />  
            </div>
    );
  }
}

export default Match;