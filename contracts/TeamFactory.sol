pragma solidity ^0.4.24;

import "./Team.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract TeamFactory is Ownable {
    event TeamCreated(address team1Address, string team1Name, address team2Address, string team2Name);   

    mapping(string => address) teams;
    address[] teamAddresses;

    function createTeam(string _team1, string _team2) public onlyOwner {
        address newTeam1Address = new Team(address(this),_team1);
        teamAddresses.push(newTeam1Address);
        teams[_team1] = newTeam1Address;

        address newTeam2Address = new Team(address(this), _team2);
        teamAddresses.push(newTeam2Address);
        teams[_team2] = newTeam2Address;

        emit TeamCreated(newTeam1Address, _team1, newTeam2Address, _team2);
    }
}   