import React, { Component } from 'react';
import MatchFactoryContract from '../build/contracts/MatchFactory.json';

import getWeb3 from './utils/getWeb3';
import Match from './Match/Match';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

//truffle network --clean

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      matches: [],
      web3: null,
      matchFactoryInstance: null,
      matchFactory: null
    }

    this.instantiateContract = this.instantiateContract.bind(this);
    this.onMatchSubmit = this.onMatchSubmit.bind(this);

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
    this.setState ({
      matchFactory: matchFactory
    })

    // Get accounts.
    this.state.matchFactory.deployed().then((instance) => {
      this.setState ({
        matchFactoryInstance: instance
      }) 
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

  render() {
    console.log(this.state.matches)
    const matchElements = this.state.matches.map(match => {
      return (
          <div key={match.address}>
            <Match
                address={match.address}
                team1={match.team1}
                team2={match.team2} />
          </div>
      )
    });
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
        <div>
            {matchElements}
        </div>
      </div>
    );
  }
}

export default App