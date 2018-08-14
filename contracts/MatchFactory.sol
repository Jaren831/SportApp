pragma solidity ^0.4.24;

import "./Match.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract MatchFactory is Ownable {
    event MatchCreated(address matchAddress, string team1, string team2);

    function createMatch(string _team1, string _team2) public onlyOwner returns(address) {
        address newMatchAddress = new Match(_team1, _team2, owner);
        emit MatchCreated(newMatchAddress, _team1, _team2);
        return newMatchAddress;
    }
}