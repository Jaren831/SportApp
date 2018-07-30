import React, { Component } from 'react';
import MatchListContainer from './Containers/MatchListContainer';
import NavBar from './Components/NavBar'
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     web3: null,
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar/>
        <MatchListContainer/>
      </React.Fragment>
    );
  }
}

export default App