import React, { Component } from 'react';
import Match from '../Components/Match.js';
import MatchContract from '../../build/contracts/Match.json';
import getWeb3 from '../utils/getWeb3';

class MatchContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            web3: null,
            matchAddress: props.address,
            matchInstance: null,
            team1Address: null,
            team1Name: null,
            team2Address: null,
            team2Name: null,
        }

        this.instantiateContract = this.instantiateContract.bind(this);
    
    }

    componentDidMount() {
        getWeb3
        .then(results => {
            this.setState({
                web3: results.web3
            })
            this.instantiateContract()
        })
        .catch(() => {
            console.log('Error finding web3.')
        })    }

    instantiateContract() {
        const contract = require('truffle-contract')
        const match = contract(MatchContract)
        match.setProvider(this.state.web3.currentProvider)

        match.at(this.state.matchAddress).then((instance) => {
            this.setState({
                matchInstance: instance
            })
            const teamCreateEvent = this.state.matchInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
            teamCreateEvent.watch((error, result) => {
                if (!error) {
                    if (result.event === "TeamCreated") {
                        this.setState ({
                            team1Address: result.args.team1Address,
                            team1Name: result.args.team1Name,
                            team2Address: result.args.team2Address,
                            team2Name: result.args.team2Name
                        })
                    }
                } else {
                    console.log(error)
                }
            })     
        })
    }

    render() {
        if (!this.state.team1Address && this.state.team2Address === null) {
            return null;
        }
        return (
            <div>
                <Match 
                    team1Address={this.state.team1Address}
                    team2Address={this.state.team2Address}
                    team1Name={this.state.team1Name}
                    team2Name={this.state.team2Name}
                    matchAddress={this.state.matchAddress}
                />
            </div>
        );
    }
}

export default MatchContainer;