import React, { Component } from 'react';
import Team from '../Components/Team.js';
import TeamContract from '../../build/contracts/Team.json';
import getWeb3 from '../utils/getWeb3';

class TeamContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      address: props.address,
      name: props.name,
      bet: 0
    }

    this.instantiateContract = this.instantiateContract.bind(this)
    this.placeBet = this.placeBet.bind(this)

    getWeb3
    .then(results => {
      console.log('Succesful finding web3.')
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })    
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
          name={this.state.name}
          bet={this.state.bet}
          address={this.state.address}
        />
        <div>Button</div>
      </div>

    );
  }
}

export default TeamContainer;