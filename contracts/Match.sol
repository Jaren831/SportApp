pragma solidity ^0.4.24;

import "./TeamFactory.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Match is TeamFactory {
    using SafeMath for uint256;
    string team1;
    string team2;
    string winner;
    address winnerAddress;
    address houseAddress;


    event PlayerAdded(address playerAddress, uint playerBet, address teamAddress, uint teamBalance, uint contractBalance);
    event WinnerReceived(address winnerAddress, string winnerTeamName);
    event HousePaid(address from, address to, uint amount, uint contractBalance);
    event PlayerPaid(address from, address to, uint amount, uint contractBalance);
    // event MatchClosed();

    constructor(string _team1Name, string _team2Name, address _owner) public {
        owner = _owner;
        houseAddress = _owner;
        team1 = _team1Name;
        team2 = _team2Name;
    }

    function addPlayer(address _playerAddress) public payable {
        Player memory newPlayer = Player(_playerAddress, msg.value);
        players[msg.sender].push(newPlayer);      
        teams[msg.sender].teamBalance = teams[msg.sender].teamBalance.add(msg.value);
        emit PlayerAdded(_playerAddress, msg.value, msg.sender, teams[msg.sender].teamBalance, address(this).balance);
    }

    function getMatchResult() public {
        //will get winner from oraclize
        winner = "china";
        winnerAddress = teamMappings[winner];
        emit WinnerReceived(winnerAddress, winner);
    }

    function payoutHouse() public onlyOwner {
        //sends house 10% cut
        houseAddress.transfer(address(this).balance.div(10)); 
        emit HousePaid(address(this), houseAddress, address(this).balance.div(10), address(this).balance);
    }

    function payoutPlayers() public onlyOwner {
        for (uint i = 0; i < players[winnerAddress].length; i = i.add(1)) {
            players[winnerAddress][i].playerAddress.transfer(
                players[winnerAddress][i].playerBet.div(teams[winnerAddress].teamBalance).mul(address(this).balance)
            );
            emit PlayerPaid(
                address(this), 
                players[winnerAddress][i].playerAddress, 
                players[winnerAddress][i].playerBet.div(teams[winnerAddress].teamBalance).mul(address(this).balance), 
                address(this).balance
            );
        }
    }
}




