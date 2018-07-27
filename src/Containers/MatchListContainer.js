import React from 'react';
import MatchList from '../Components/MatchList.js';

class MatchListContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      //this needs to be changed to recieve mactFactoryAddress not instance. app must deliver address only
      matchFactoryInstance: props.matchFactoryInstance,
      matches: [],
      web3: props.web3
    }
    this.instantiateList = this.instantiateList.bind(this);
    this.instantiateList()
  }

  instantiateList() {
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
  }

  render() {
    return React.createElement(MatchList, { matches: this.state.matches }, {web3: this.state.web3});
  }
}

export default MatchListContainer