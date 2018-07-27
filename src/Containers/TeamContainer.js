import React, { Component } from 'react';
import Team from '../Components/Team.js';
import TeamContract from '../build/contracts/Team.json';

class TeamContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: props.web3,
      address: props.address,
      name: props.name,
      bet: 0
    }

    this.instantiateContract = this.instantiateContract.bind(this);
    this.instantiateContract()
}

  instantiateContract() {
    const contract = require('truffle-contract')
    const team = contract(TeamContract)
    team.setProvider(this.state.web3.currentProvider)
    team.at(this.state.address).then((instance) => {
        const playerAddedEvent = instance.PlayerAdded();
        playerAddedEvent.watch((error, result) => {
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
      <div>
        <Team 
          name = {this.state.name}
          bet = {this.state.bet}
          address = {this.state.address}
        />
        <div>Button</div>
      </div>

    );
  }
}

export default TeamContainer;