import React, { Component } from 'react';
import MatchFactoryContract from '../build/contracts/MatchFactory.json';

import getWeb3 from './utils/getWeb3';
import Match from './Match/Match';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      matches: [
        {
          "address": 123456789,
          "team1": "france",
          "team2": "croatia"
        },
        {
          "address": 828181,
          "team1": "endland",
          "team2": "croatia"
        },
        {
          "address": 1112101,
          "team1": "france",
          "team2": "belgium"
        },
        {
          "address": 191911,
          "team1": "croatia",
          "team2": "russia"
        },
        {
          "address": 119110,
          "team1": "france",
          "team2": "argentina"
        }
      ],
      web3: null,
      matchFactoryInstance: null,
      matchFactory: null
    }

    this.instantiateContract = this.instantiateContract.bind(this);
    this.addMatch = this.addMatch.bind(this);
    this.deleteMatch = this.deleteMatch.bind(this);
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
    this.setState ({
      matchFactory: matchFactory
    })
    matchFactory.setProvider(this.state.web3.currentProvider)
    let matchCreationEvent
    let matchDeletionEvent

    // Get accounts.
    matchFactory.deployed().then((instance) => {
      this.setState ({
        matchFactoryInstance: instance
      }) 
      matchCreationEvent = instance.MatchCreated();
      matchCreationEvent.watch((error, result) => {
        if (!error) {
          console.log(result)
          this.addMatch(result)
        } else {
          console.log(error)
        }
      })
      matchDeletionEvent = instance.MatchDeleted();
      matchDeletionEvent.watch((error, result) => {
        if (!error) {
          this.deleteMatch(result)
        }
      })
    })
  }

  addMatch = (props) => {
    let newArray = this.state.matches.slice();
    newArray.push({
      address: props.args.address, 
      team1: props.args.team1, 
      team2: props.args.team2});
    this.setState({
      matches: newArray
    });
  }

  deleteMatch = (props) => {

  }

  onMatchSubmit = (event) => {
    event.preventDefault()
    this.state.web3.eth.getAccounts((error, accounts) => {
      // Stores a given value, 5 by default.
      return this.state.matchFactoryInstance.createMatch(
        "usa", 
        "china", {from: accounts[0], gas: 5000000}).call()
    })
  }

  render() {
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
            <input type="submit" onSubmit={ this.onMatchSubmit } value="Submit" />
          </form>
        </div>
        <div>
            {matchElements}
        </div>
      </div>
    );
  }
}

export default App