import React, { Component } from 'react';
import Match from '../Components/Match.js';
import MatchContract from '../../build/contracts/Match.json';
import getWeb3 from '../utils/getWeb3.js';
import Button from '../../node_modules/@material-ui/core/Button';

class MatchContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            web3: null,
            matchContractAddress: props.address,
            matchContractBalance: 0,
            matchContractInstance: null,
            team1Name: null,
            team1ContractAddress: null,
            team1ContractBalance: 0,
            team2Name: null,
            team2ContractAddress: null,
            team2ContractBalance: 0,
            latestBlock: 0,
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
            const matchContractEvents = this.state.matchContractInstance.allEvents({fromBlock: this.state.latestBlock, toBlock: 'latest'});
            matchContractEvents.watch((error, result) => {
                if (!error) {
                    switch(result.event) {
                        case "TeamCreated": 
                            this.setState ({
                                latestBlock: result.blockNumber,
                                team1ContractAddress: result.args.team1Address,
                                team1Name: result.args.team1Name,
                                team2ContractAddress: result.args.team2Address,
                                team2Name: result.args.team2Name
                            })
                            break;
                        case "PlayerAdded": 
                            if (result.args.teamAddress === this.state.team1ContractAddress) {
                                this.setState({
                                    latestBlock: result.blockNumber,
                                    team1ContractBalance: this.state.web3.utils.fromWei(result.args.teamBalance.toString(), 'ether'),
                                    matchContractBalance: this.state.web3.utils.fromWei(result.args.contractBalance.toString(), 'ether')
                                })                            
                            } else {
                                this.setState({
                                    latestBlock: result.blockNumber,
                                    team2ContractBalance: this.state.web3.utils.fromWei(result.args.teamBalance.toString(), 'ether'),
                                    matchContractBalance: this.state.web3.utils.fromWei(result.args.contractBalance.toString(), 'ether')
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
            this.state.matchContractInstance.getMatchResult(
                {from: accounts[0], gasPrice: 20000000000}
            ).then((result) => {
                console.log(result)
                this.state.matchContractInstance.payoutHouse({from: accounts[0], gasPrice: 20000000000}, (result) => {
                    console.log(result)
                    this.state.matchContractInstance.payoutPlayers({from: accounts[0], gasPrice: 20000000000})
                })
            })
        })
    }

    render() {
        if (this.state.team1ContractAddress === null && this.state.team2ContractAddress === null) {
            return null;
        }
        return (
            <div>
                <Match 
                    matchContractAddress={this.state.matchContractAddress}
                    matchContractBalance={this.state.matchContractBalance}
                    team1Name={this.state.team1Name}
                    team1ContractAddress={this.state.team1ContractAddress}
                    team1ContractBalance={this.state.team1ContractBalance}
                    team2Name={this.state.team2Name}
                    team2ContractAddress={this.state.team2ContractAddress}
                    team2ContractBalance={this.state.team2ContractBalance}
                />
                <Button onClick={this.onResolveMatch}>Resolve</Button>
            </div>
        );
    }
}

export default MatchContainer;