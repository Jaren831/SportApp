import React, { Component } from 'react';
import Drawer from './Components/Drawer';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      currentAddress: "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4"
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