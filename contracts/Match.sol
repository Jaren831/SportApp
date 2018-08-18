pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Team.sol";


contract Match is Ownable {
    using SafeMath for uint256;
    string team1;
    string team2;
    string winner;
    address winnerAddress;
    mapping(string => address) teamMappings;


    event TeamCreated(address team1Address, string team1Name, address team2Address, string team2Name);  
    event PlayerAdded(address playerAddress, uint playerBet, address teamAddress, uint teamBalance, uint contractBalance);
    event WinnerReceived(address winnerAddress, string winnerTeamName);
    event HousePaid(address from, address to, uint amount, uint contractBalance);
    event PlayerPaid(address from, address to, uint amount, uint contractBalance);
    event MatchClosed(uint finalMatchBalance);

    constructor(string _team1, string _team2, address _owner) public {
        owner = _owner;
        team1 = _team1;
        team2 = _team2;
    }

    function createTeam(string _team1, string _team2) public onlyOwner {
        address newTeam1Address = new Team(_team1, address(this));
        teamMappings[_team1] = newTeam1Address;
        address newTeam2Address = new Team(_team2, address(this));
        teamMappings[_team2] = newTeam2Address;
        emit TeamCreated(newTeam1Address, _team1, newTeam2Address, _team2);
    }

    function addPlayer(address _playerAddress, uint _teamBalance) public payable {
        emit PlayerAdded(_playerAddress, msg.value, msg.sender, _teamBalance, address(this).balance);
    }

    function getMatchResult() public {
        //will get winner from oraclize
        winner = "china";
        //goal - this should be gotten from event filter in js
        winnerAddress = teamMappings[winner];
        emit WinnerReceived(winnerAddress, winner);
    }

    function payoutHouse() public onlyOwner {
        //sends house 10% cut
        owner.transfer(address(this).balance.div(10)); 
        emit HousePaid(address(this), owner, address(this).balance.div(10), address(this).balance);
    }

    function payoutPlayer(address _playerAddress, uint _playerBet, uint _teamBalance) public onlyOwner {
        //should not do for loop. get array in js then iterate and call payoutplayers ***_playerAddress
        // for (uint i = 0; i < players[winnerAddress].length; i = i.add(1)) {
        _playerAddress.transfer((_playerBet * address(this).balance) / _teamBalance);
        emit PlayerPaid(address(this), _playerAddress, _playerBet, address(this).balance);
    }
}



  
