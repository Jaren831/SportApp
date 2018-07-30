pragma solidity ^0.4.24;

import "./TeamFactory.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Match is TeamFactory {
    string public winner;
    string team1;
    string team2;

    constructor(string _team1Name, string _team2Name, address _owner) public {
        owner = _owner;
        team1 = _team1Name;
        team2 = _team2Name;
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




