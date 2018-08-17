import React, { Component } from 'react';
import Drawer from './Components/Drawer';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      currentAddress: "0xd87972ac0dbca5add0a800eb606eddd5bfb6a6d3"
    }

    this.instantiateApp = this.instantiateApp.bind(this);
  }

  instantiateApp() {
    this.setState({
      currentAddress: null
    })
  }

  render() {
    return (
      <Drawer currentAddress={this.state.currentAddress}/>
    )
  }
}

export default App