import React, { Component } from 'react';
import Drawer from './Components/Drawer';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      currentAddress: "0x5cc896de6b49f213a960b6e3f6d3e844b95cfa10"
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