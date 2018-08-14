pragma solidity ^0.4.24;

import "./TeamFactory.sol";
import "./Team.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Match is TeamFactory {
    using SafeMath for uint256;
    string team1;
    string team2;
    string winner;
    address winnerAddress;

    constructor(string _team1Name, string _team2Name, address _owner) public {
        owner = _owner;
        team1 = _team1Name;
        team2 = _team2Name;
    }

    function getMatchResult() public returns(address){
        //will get winner from oraclize
        winner = "china";
        winnerAddress = teams["china"];
        return winnerAddress;
    }

    function sendMatchResult(address _winnerAddress) public {
        if (teamAddresses[0] != winnerAddress) {
            Team current1Team = Team(teamAddresses[0]);
            current1Team.payoutWinner(_winnerAddress);
        } else {
            Team current2Team = Team(teamAddresses[1]);
            current2Team.payoutWinner(_winnerAddress);
        }
    }
}




