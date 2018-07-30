pragma solidity ^0.4.24;

import "./Team.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract TeamFactory is Ownable {
    event TeamCreated(address team1Address, string team1Name, address team2Address, string team2Name);   

    function createTeam(string _team1Name, string _team2Name) public onlyOwner {
        address newTeam1Address = new Team(address(this), _team1Name);
        address newTeam2Address = new Team(address(this), _team2Name);
        emit TeamCreated(newTeam1Address, _team1Name, newTeam2Address, _team2Name);
    }
}   