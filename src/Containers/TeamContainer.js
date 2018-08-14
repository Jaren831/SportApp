import React, { Component } from 'react';
import Team from '../Components/Team.js';
import TeamContract from '../../build/contracts/Team.json';
import getWeb3 from '../utils/getWeb3.js';

class TeamContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      address: props.address,
      name: props.name,
      bet: 0
    }

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

    this.instantiateContract = this.instantiateContract.bind(this)
    this.placeBet = this.placeBet.bind(this)
}

  instantiateContract() {
    const contract = require('truffle-contract')
    const team = contract(TeamContract)
    team.setProvider(this.state.web3.currentProvider)
    team.at(this.state.address).then((instance) => {
      const playerAddedEvent = instance.allEvents({fromBlock: 0, toBlock: 'latest'});
      playerAddedEvent.watch((error, result) => {
          if (!error) {
            this.setState({
              bet: this.state.web3.utils.fromWei(result.args.contractBalance.toString(), 'ether')
            });          
          } else {
            console.log(error)
          }
      })     
    })
  }

  placeBet = (event) => {
    event.preventDefault()
    const contract = require('truffle-contract')
    const team = contract(TeamContract)
    team.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((error, accounts) => {
      team.at(this.state.address).placeBet({
        from: accounts[0], 
        gasPrice: 20000000000, 
        value: this.state.web3.utils.toWei(
          (this.refs.placeBet.value).toString(), 'ether')
      })
    })
  }

  render() {
    return (
      <div>
        <Team 
          name={this.state.name}
          bet={this.state.bet}
          address={this.state.address}
        />
        <form>
          <label>
            Place Bet:
            <input type="number" ref="placeBet" />
          </label>
          <input type="submit" onClick={ this.placeBet } value="Submit" />
        </form>
      </div>

    );
  }
}

export default TeamContainer;