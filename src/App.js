import React, { Component } from 'react'
import MatchFactoryContract from '../build/contracts/MatchFactory.json'

import getWeb3 from './utils/getWeb3'
import Match from './Match/Match';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
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
    }

    this.instantiateContract = this.instantiateContract.bind(this);
    this.addMatch = this.addMatch.bind(this);
    this.deleteMatch = this.deleteMatch.bind(this);
    this.onMatchSubmit = this.onMatchSubmit.bind(this);

    getWeb3
    .then(results => {
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

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      matchFactory.deployed().then((instance) => {
        this.setState ({
          matchFactoryInstance: instance
        }) 
      })
    })
    let matchCreationEvent = this.state.matchFactoryInstance.MatchCreated()
    matchCreationEvent.watch(function(error, result) {
      if (!error) {
        console.log(result)
        this.addMatch(result)
      }
    })
    let matchDeletionEvent = this.state.matchFactoryInstance.MatchDeleted()
    matchDeletionEvent.watch(function(error, result) {
      if (!error) {
        console.log(result)
        this.deleteMatch(result)
      }
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

  deleteMatch() {

  }

  onMatchSubmit(event) {
    // this.state.matchFactoryInstance.createMatch(
    //   event.target.team1.value, 
    //   event.target.team2.value, this.state.account)
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
              <input type="text" name="team1" />
            </label>
            <label>
              Team 2:
              <input type="text" name="team2" />
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