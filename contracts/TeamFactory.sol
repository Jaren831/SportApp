pragma solidity ^0.4.24;

import "./Team.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract TeamFactory is Ownable {
    event TeamCreated(address team1Address, string team1Name, uint team1Balance, address team2Address, string team2Name, uint team2Balance);   

    mapping(address => TeamStruct) teams;
    mapping(address => Player[]) players;
    mapping(string => address) teamMappings;
    address[] teamAddresses;

    struct Player {
        address playerAddress;
        uint playerBet;
    }

    struct TeamStruct {
        address teamAddress;
        string teamName;
        uint teamBalance;
        address[] playerAddress;
        uint[] playerBet;
    }

    function createTeam(string _team1, string _team2) public onlyOwner {
        address newTeam1Address = new Team(_team1, address(this));
        TeamStruct memory newTeam1;
        newTeam1.teamAddress = newTeam1Address;
        newTeam1.teamName = _team1;
        newTeam1.teamBalance = 0;
        teamAddresses.push(newTeam1Address);
        teamMappings[_team1] = newTeam1Address;
        teams[newTeam1Address] = newTeam1;

        address newTeam2Address = new Team(_team2, address(this));
        TeamStruct memory newTeam2;
        newTeam2.teamAddress = newTeam2Address;
        newTeam2.teamName = _team2;
        newTeam2.teamBalance = 0;
        teamAddresses.push(newTeam2Address);
        teamMappings[_team2] = newTeam2Address;
        teams[newTeam2Address] = newTeam2;

        emit TeamCreated(newTeam1Address, _team1, newTeam1.teamBalance, newTeam2Address, _team2, newTeam2.teamBalance);
    }
}   