import React, { Component } from 'react';
import MatchFactoryContract from '../build/contracts/MatchFactory.json';
import MatchListContainer from './Containers/MatchListContainer';
import getWeb3 from './utils/getWeb3';

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
    }

    this.instantiateContract = this.instantiateContract.bind(this);
    this.onMatchSubmit = this.onMatchSubmit.bind(this)

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
    const matchFactory = contract(MatchFactoryContract)
    matchFactory.setProvider(this.state.web3.currentProvider)
    this.state.matchFactory.deployed().then((instance) => {
      this.render(instance)
    })
  }

  onMatchSubmit = (event) => {
    event.preventDefault()
    this.state.web3.eth.getAccounts((error, accounts) => {
      // Stores a given value, 5 by default.
      return this.state.matchFactoryInstance.createMatch(
        this.refs.team1.value, 
        this.refs.team2.value, 
        {from: accounts[0]})
    })
  }

  render(props) {
    return (
      <div>
        <form>
          <label>
            Team 1:
            <input type="text" ref="team1" />
          </label>
          <label>
            Team 2:
            <input type="text" ref="team2" />
          </label>
          <input type="submit" onClick={ this.onMatchSubmit } value="Submit" />
        </form>
        <MatchListContainer
          matchFactoryInstance = {props.matchFactoryInstance}
          web3 = {this.state.web3}
        />
      </div>
    );
  }
}

export default App