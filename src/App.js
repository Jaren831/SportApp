import React, { Component } from 'react';
import Drawer from './Components/Drawer';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      currentAddress: "0xf840a59daf97cf92e9e0a8a78d3f43c40daeabdc"
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