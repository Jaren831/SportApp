pragma solidity ^0.4.24;

import "./Match.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Team is Ownable {
    string teamName;

    constructor(string _teamName, address _owner) public {
        owner = _owner;
        teamName = _teamName;
    }

    function () public payable {
        placeBet();
    }

    //Eth recieved is new player, call createPlayer
    function placeBet() public payable {
        Match m = Match(owner);
        m.addPlayer.value(msg.value)(msg.sender);
    }
}