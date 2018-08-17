pragma solidity ^0.4.24;

import "./Match.sol";
import "./PlayerFactory.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Team is PlayerFactory {
    using SafeMath for uint256;
    string teamName;
    uint teamBalance;

    constructor(string _teamName, address _owner) public {
        owner = _owner;
        teamName = _teamName;
        teamBalance = 0;
    }

    function () public payable {
        placeBet();
    }

    //Eth recieved is new player, call createPlayer
    function placeBet() public payable {
        teamBalance = teamBalance.add(msg.value);
        Match m = Match(owner);
        m.addPlayer.value(msg.value)(msg.sender, teamBalance);
    }
}