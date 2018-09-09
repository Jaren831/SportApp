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
      teamContractBalance: props.teamContractBalance,
      teamContractInstance: null
    }
    this.placeBet = this.placeBet.bind(this)
    this.instantiateContract = this.instantiateContract.bind(this)
  }

  componentDidMount() {
    getWeb3
      .then(results => {
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
    const teamContract = contract(TeamContract)
    teamContract.setProvider(this.state.web3.currentProvider)
    teamContract.at(this.state.teamContractAddress).then((instance) => {
      this.setState({
        teamContractInstance: instance
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      teamContractBalance: nextProps.teamContractBalance
    });
  }

  placeBet = (event) => {
    event.preventDefault()
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.state.teamContractInstance.placeBet({
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
          <input type="submit" onClick={this.placeBet} value="Submit" />
        </form>
      </div>

    );
  }
}

export default TeamContainer;