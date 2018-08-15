import React, { Component } from 'react';
import Match from '../Components/Match.js';
import MatchContract from '../../build/contracts/Match.json';
import getWeb3 from '../utils/getWeb3.js';

class MatchContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            web3: null,
            matchContractAddress: props.address,
            matchContractInstance: null,
            team1Name: null,
            team1ContractAddress: null,
            team1ContractBalance: 0,
            team2Name: null,
            team2ContractAddress: null,
            team2ContractBalance: 0,
            open: true
        }
        this.instantiateContract = this.instantiateContract.bind(this);
        this.onResolveMatch = this.onResolveMatch.bind(this);
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
        })    
    }

    instantiateContract() {
        const contract = require('truffle-contract')
        const matchContract = contract(MatchContract)
        matchContract.setProvider(this.state.web3.currentProvider)
        matchContract.at(this.state.matchContractAddress).then((instance) => {
            this.setState({
                matchContractInstance: instance
            })
            const matchContractEvents = this.state.matchContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
            matchContractEvents.watch((error, result) => {
                if (!error) {
                    switch(result.event) {
                        case "TeamCreated": 
                            this.setState ({
                                team1ContractAddress: result.args.team1Address,
                                team1Name: result.args.team1Name,
                                team2ContractAddress: result.args.team2Address,
                                team2Name: result.args.team2Name
                            })
                            break;
                        case "PlayerAdded": 
                            if (result.args.teamAddress === this.state.team1ContractAddress) {
                                console.log("hello")
                                this.setState({
                                    team1ContractBalance: this.state.web3.utils.fromWei(result.args.contractBalance.toString(), 'ether')
                                })                            
                            } else {
                                this.setState({
                                    team2ContractBalance: this.state.web3.utils.fromWei(result.args.contractBalance.toString(), 'ether')
                                })
                            }
                            break;                          
                        default: return(
                            null
                        )
                    }
                } else {
                    console.log(error)
                }
            })     
        })
    }

    onResolveMatch = () => {
        //get winner address. check against addreses, send to winner
        this.state.web3.eth.getAccounts((error, accounts) => {
            this.state.matchContractnstance.getMatchResult(
                {from: accounts[0], gasPrice: 20000000000}
            ).then((result) => {
                console.log(result)
                this.state.matchContractInstance.payoutHouse({from: accounts[0], gasPrice: 20000000000})
            }).then((result) => {
                console.log(result)
                this.state.matchContractInstance.payoutPlayers({from: accounts[0], gasPrice: 20000000000})
            })
        })
    }

    render() {
        if (!this.state.team1ContractAddress && this.state.team2ContractAddress === null) {
            return null;
        }
        return (
            <div>
                <Match 
                    matchContractAddress={this.state.matchContractAddress}
                    team1Name={this.state.team1Name}
                    team1ContractAddress={this.state.team1ContractAddress}
                    team1ContractBalance={this.state.team1ContractBalance}
                    team2Name={this.state.team2Name}
                    team2ContractAddress={this.state.team2ContractAddress}
                    team2ContractBalance={this.state.team2ContractBalance}
                />
                <form>
                    <label>
                        Winner:
                        <input type="text" ref="winner" />
                    </label>
                    <input type="submit" onClick={ this.onResolveMatch } value="Submit" />
                </form>
            </div>
        );
    }
}

export default MatchContainer;