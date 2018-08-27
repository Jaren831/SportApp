# SportApp

Sports betting decentralized application built using Ethereum smart contracts.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to run this application:

- Chrome
- Metamask
- Ganache (or other TestRPC tool)
- Truffle

### Installing

Install Ganache:
- Follow instructions http://truffleframework.com/ganache/


Install NodeJS & NPM:
- Follow instructions https://www.npmjs.com/get-npm

Install Truffle:
- Follow instructions https://truffleframework.com/truffle

or

```
npm install -f truffle
```
Install MetaMask (Chrome only):
- Follow instructions https://metamask.io/

## How to Run
- After cloning repo, go to local SportApp directory
- ```truffle compile```
- ```truffle migrate --reset```
- ```npm run start```
- In Chrome window new page should open
- Insert desired teams, at the moment contract is hard coded for China to always win, China not being in a match will not be able to resolve winner.
- Change wallets and place bets.
- "Resolve" watch from wallet that created contract as it is the "owner"

## Important
- Running ```truffle migrate --reset``` required if contract files changed
- Metamask wallets will need to be reset after ```truffle migrate --reset```
- Creating match, placing bets, and resolving matches will have metamask popup to confirm transaction. Sometimes pops up in chrome or will have notification on metamask icon.

## Built With

* [Truffle](https://truffleframework.com/truffle) - The smart contract framework used
* [React](https://reactjs.org/) - Front end client.

## Authors

* **Jaren Lynch** - *Initial work* - [Jaren831](https://github.com/Jaren831)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments 
 - Shout out to Google search

