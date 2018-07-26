import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';
import Team from './Team';
import TeamContract from '../build/contracts/MatchFactory.json';
import './MatchContainer.css';

//truffle network --clean

class TeamContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teamBet: 0,
      teamName = props.teamName,
      teamAddress = props.teamAddress,
      teamContractInstance: null,
      web3: null
    }

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

  instantiateContract = (props) => {
    const contract = require('truffle-contract')
    const teamContract = contract(TeamContract)
    teamContract.setProvider(this.state.web3.currentProvider)

    // event PlayerAdded(address playerAddress, address teamAddress, uint playerBet, uint contractBalance);


    // Get accounts.
    this.state.matchFactory.at(props.teamAddress).then((instance) => {
      this.setState ({
        teamContractInstance: instance
      }) 
      const teamContractEvent = this.state.teamContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
      teamContractEvent.watch((error, result) => {
        if (!error) {
          if (result.event === "PlayerAdded") {
            console.log(result)
            this.setState({
              teamBet: result.args.contractBalance,
            });          
          }
        } else {
          console.log(error)
        }
      }) 
    })
  }

  render() {

    return (
        <Team
            address={this.state.teamAddress}
            teamName={this.state.teamName}
            team2={this.state.totalBets} 
        />
    );
  }
}

export default TeamContainer