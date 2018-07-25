pragma solidity ^0.4.24;

import "./Match.sol";
import "./Ownable.sol";
// import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

//need to check ownership chain 

contract MatchFactory is Ownable {
    mapping(address => MatchStruct) matches; 
    address[] public matchAddreses;
    event MatchCreated(address matchAddress, string team1, string team2);
    event MatchDeleted(address matchAddress, string team1, string team2);

    struct MatchStruct {
        address matchAddress;
        string team1;
        string team2;
    }

    function createMatch(string _team1, string _team2) public onlyOwner {
        address newMatchAddress = new Match(_team1, _team2, msg.sender);
        matches.push(newMatchAddress);
        MatchStruct memory newMatchStruct = MatchStruct(newMatchAddress, _team1, _team2);
        matches[newMatchAddress] = newMatchStruct;
        emit MatchCreated(newMatchAddress, _team1, _team2);
    }
}