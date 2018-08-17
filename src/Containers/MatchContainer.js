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
            team1Players: [],
            team2Name: null,
            team2ContractAddress: null,
            team2ContractBalance: 0,
            team2Players: [],
            winner: "TBD",
            winnerAddress: null,
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
                            console.log(result)
                            if (result.args.teamAddress === this.state.team1ContractAddress) {
                                const newArray = this.state.team1Players.slice()
                                newArray.push({
                                    playerAddress: result.args.playerAddress,
                                    playerBet: result.args.playerBet
                                })
                                this.setState({
                                    latestBlock: result.blockNumber,
                                    team1Players: newArray,
                                    team1ContractBalance: this.state.web3.utils.fromWei(result.args.teamBalance.toString(), 'ether'),
                                    matchContractBalance: this.state.web3.utils.fromWei(result.args.contractBalance.toString(), 'ether')
                                })                            
                            } else {
                                const newArray = this.state.team2Players.slice()
                                newArray.push({
                                    playerAddress: result.args.playerAddress,
                                    playerBet: result.args.playerBet
                                })
                                this.setState({
                                    latestBlock: result.blockNumber,
                                    team2Players: newArray,
                                    team2ContractBalance: this.state.web3.utils.fromWei(result.args.teamBalance.toString(), 'ether'),
                                    matchContractBalance: this.state.web3.utils.fromWei(result.args.contractBalance.toString(), 'ether')
                                })
                            }
                            break;
                        case "WinnerReceived": 
                            console.log(result)
                            this.setState({
                                latestBlock: result.blockNumber,
                                winner: result.args.winnerTeamName,
                                winnerAddress: result.args.winnerAddress
                            })
                            break;
                        case "HousePaid": 
                            console.log(result)
                            break;
                        case "PlayerPaid": 
                            console.log(result)
                            break;
                        case "MatchClosed": 
                            console.log(result)
                            this.setState({
                                matchContractBalance: this.state.web3.utils.fromWei(result.args.finalMatchBalance.toString(), 'ether')
                            })
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
                this.state.matchContractInstance.payoutHouse({from: accounts[0], gasPrice: 20000000000})
            }).then((result) => {
                switch(this.state.winnerAddress) {
                    case this.state.team1ContractAddress:
                        for (let i = 0; i < this.state.team1Players.length; i++) {
                            this.state.matchContractInstance.payoutPlayer(
                                this.state.team1Players[i].playerAddress,
                                this.state.team1Players[i].playerBet,
                                this.state.web3.utils.toWei((this.state.team1ContractBalance).toString(), 'ether'),
                                {from: accounts[0], gasPrice: 20000000000}
                            ).then((result) => {
                                console.log(result)
                            })
                        }
                        break;
                    case this.state.team2ContractAddress:
                        for (let i = 0; i < this.state.team2Players.length; i++) {
                            this.state.matchContractInstance.payoutPlayer(
                                this.state.team2Players[i].playerAddress,
                                this.state.team2Players[i].playerBet,
                                this.state.web3.utils.toWei((this.state.team2ContractBalance).toString(), 'ether'),
                                {from: accounts[0], gasPrice: 20000000000}
                            ).then((result) => {
                                console.log(result)
                            })
                        }
                        break;
                    default: return(
                        null
                    )
                }
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
                    winner={this.state.winner}
                />
                <Button onClick={this.onResolveMatch}>Resolve</Button>
            </div>
        );
    }
}

export default MatchContainer;