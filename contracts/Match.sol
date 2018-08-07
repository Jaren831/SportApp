pragma solidity ^0.4.24;

import "./TeamFactory.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Match is TeamFactory {
    string team1;
    string team2;
    string winner;

    constructor(string _team1Name, string _team2Name, address _owner) public {
        owner = _owner;
        team1 = _team1Name;
        team2 = _team2Name;
    }

    function getWinnerAddress() public onlyOwner returns(address) {
        //will get winner from oraclize
        winner = "china";
        return teams[winner];
    }

    function getOwnerAddress() public onlyOwner returns(address) {
        
    }

    function sendMatchResult(string _winner) public onlyOwner {
        for (uint i = 0; i < teamAddresses.length; i++) {
            Team(teamAddresses[i]).payoutTeam(getMatchResult());
        }
    }

    function payOutHouse(address _winnerAddress) public onlyOwner {
        Team(_winnerAddress).payoutHouse(owner);
    }

    function payOutPlayers(address _winnerAddress) public onlyOwner {
        Team(_winnerAddress).payoutPlayers();
    }
}




