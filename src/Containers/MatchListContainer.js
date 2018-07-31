import React from 'react';
import MatchList from '../Components/MatchList.js';
import MatchFactoryContract from '../../build/contracts/MatchFactory.json';
import MatchContract from '../../build/contracts/Match.json';

import getWeb3 from '../utils/getWeb3.js';

class MatchListContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      matchFactoryInstance: null,
      matches: [],
      web3: null
    }

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

    this.instantiateContract = this.instantiateContract.bind(this);
    this.onMatchSubmit = this.onMatchSubmit.bind(this);
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const matchFactory = contract(MatchFactoryContract)
    matchFactory.setProvider(this.state.web3.currentProvider)

    matchFactory.deployed().then((instance) => {
      this.setState({
        matchFactoryInstance: instance
      })
      const matchFactoryEvent = this.state.matchFactoryInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
      matchFactoryEvent.watch((error, result) => {
        if (!error) {
            if (result.event === "MatchCreated") {
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
    const contract = require('truffle-contract')
    const match = contract(MatchContract)
    match.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.state.matchFactoryInstance.createMatch(
        this.refs.team1.value, 
        this.refs.team2.value, 
        {from: accounts[0], gasPrice: 20000000000
      }).then((result) => {
        match.at(result.logs[0].args.matchAddress).then((instance) => {
          return instance.createTeam(
            this.refs.team1.value, 
            this.refs.team2.value, 
            {from: accounts[0], gasPrice: 20000000000}
          )
        })
      })
    })
  }

  render() {
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
        <MatchList 
          matches={this.state.matches}
        />
      </div>
    )
  }
}

export default MatchListContainer