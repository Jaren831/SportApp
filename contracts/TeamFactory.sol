pragma solidity ^0.4.24;

import "./Team.sol";
import "./Ownable.sol";

// import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract TeamFactory is Ownable {
    event TeamCreated(address teamAddress, string teamName);   

    function createTeam(string _teamName) public onlyOwner {
        address newTeamAddress = new Team(address(this), _teamName);
        emit TeamCreated(newTeamAddress, _teamName);
    }
}   