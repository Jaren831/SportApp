import React, { Component } from 'react';
import Drawer from './Components/Drawer';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      currentAddress: "0x4da3c7ddd5080beebb7df1a1e8b832f4ee60a57f"
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