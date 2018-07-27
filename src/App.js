import React, { Component } from 'react';
import MatchFactoryContract from '../build/contracts/MatchFactory.json';

import getWeb3 from './utils/getWeb3';
import Match from './Containers/MatchListContainer';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';
import MatchListContainer from './Containers/MatchListContainer';

//truffle network --clean

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
    }

    this.instantiateContract = this.instantiateContract.bind(this);

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

  render(props) {
    return (
      <div>
        <MatchListContainer
          matchFactoryInstance = {props.matchFactoryInstance}
          web3 = {this.state.web3}
        />
      </div>
    );
  }
}

export default App