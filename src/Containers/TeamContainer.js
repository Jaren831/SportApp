import React, { Component } from 'react';
import Team from '../Components/Team.js';
import TeamContract from '../../build/contracts/Team.json';
import getWeb3 from '../utils/getWeb3.js';

class TeamContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      teamName: props.teamName,
      teamContractAddress: props.teamContractAddress,
      teamContractBalance: props.teamContractBalance
    }

    getWeb3
    .then(results => {
      console.log('Succesful finding web3.')
      this.setState({
        web3: results.web3
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })    

    this.placeBet = this.placeBet.bind(this)
  }

  placeBet = (event) => {
    event.preventDefault()
    const contract = require('truffle-contract')
    const teamContract = contract(TeamContract)
    teamContract.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((error, accounts) => {
      teamContract.at(this.state.teamContractAddress).placeBet({
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
          teamName={this.state.teamName}
          teamContractBalance={this.state.teamContractBalance}
          teamContractAddress={this.state.teamContractAddress}
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