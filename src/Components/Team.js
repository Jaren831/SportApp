import React, { Component } from 'react';

import Team from './Components/Team.js';

import './css/Team.css';

class Team extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      address: props.address,
      name: props.name,
      bet: 0
    }

    this.instantiateContract = this.instantiateContract.bind(this);

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
    const team = contract(MatchContract)
    team.setProvider(this.state.web3.currentProvider)
    this.state.team.at(this.state.teamAddress).then((instance) => {
        const teamEvent = instance.PlayerAdded();
        teamEvent.watch((error, result) => {
            if (!error) {
                this.setState({
                    teamBet: result.args.contractBalance
                });          
            } else {
                console.log(error)
            }
        })     
    })
  }

  placeBet() {

  }

  render() {
    return (
        <div className="Team">
                address = {this.state.address}
                teamName = {this.state.teamName}
                bet = {this.state.bet}
        </div>
    );
  }
}

export default Team;