pragma solidity ^0.4.24;

import "./Team.sol";
import "./TeamFactory.sol";
import "./SafeMath.sol";
// import "openzeppelin-solidity/contracts/math/SafeMath.sol";

//PROBLEMS
// loops are bad news
// teamcontract fallback function too much gas won't work

contract Match is TeamFactory {
    string public winner;
    string public team1;
    string public team2;

    constructor(string _team1, string _team2, address _owner) public {
        owner = _owner;
        team1 = _team1;
        team2 = _team2;
    }

    function getMatchResult() public onlyOwner {
        //will get winner from oraclize
        winner = "croatia";
        // sendMatchResult(teams[winner]);
    }

    // function sendMatchResult(address _address) public onlyOwner {
    //     for (uint i = 0; i < teamAddresses.length; i++) {
    //         Team(teamAddresses[i]).payoutHouse(owner);
    //         Team(teamAddresses[i]).payoutTeam(winnerAddress);
    //     }
    //     Team(winnerAddress).payoutPlayers();
    // }
}




