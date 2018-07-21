pragma solidity ^0.4.24;

import "./Match.sol";
import "./Ownable.sol";
// import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

//need to check ownership chain 

contract MatchFactory is Ownable {
    address[] public matches;
    event MatchCreated(address matchAddress, string _team1, string _team2);

    function createMatch(string _team1, string _team2) public onlyOwner {
        address newMatchAddress = new Match(_team1, _team2, msg.sender);
        matches.push(newMatchAddress);
        emit MatchCreated(newMatchAddress, _team1, _team2);
    }
}