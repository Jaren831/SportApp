import React, { Component } from 'react';
import MatchListContainer from './Containers/MatchListContainer';

class App extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     web3: null,
  //   }
  // }

  render() {
    return (
      <div>
        <MatchListContainer/>
      </div>
    );
  }
}

export default App