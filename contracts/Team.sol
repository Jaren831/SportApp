pragma solidity ^0.4.24;

import "./PlayerFactory.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Team is PlayerFactory {
    using SafeMath for uint256;
    string teamName;
    uint playerCut;
    address winnerAddress;
    address houseAddress;
    event TeamPaid(address from, address to, uint amount, uint contractBalance);
    event HousePaid(address from, address to, uint amount, uint contractBalance);
    event PlayerPaid(address from, address to, uint amount, uint contractBalance);

    constructor(address _owner, string _teamName, address _houseAddress) public {
        owner = _owner;
        houseAddress = _houseAddress;
        teamName = _teamName;
    }

    function () public payable {
        placeBet();
    }

    //Eth recieved is new player, call createPlayer
    function placeBet() public payable {
        addPlayer(msg.sender, msg.value);
    }

    function payoutWinner(address _winnerAddress) public {
        //sends contract balance to winning address, if winner, do nothing
        if (_winnerAddress != address(this)) {
            Team winner = Team(_winnerAddress);
            winner.payoutPlayers.value(address(this).balance);
        } 
        emit TeamPaid(address(this), _winnerAddress, address(this).balance, address(this).balance);
    }

    function payoutPlayers() public payable {
        //sends house 10% cut
        houseAddress.transfer((address(this).balance).div(10)); 
        emit HousePaid(address(this), owner, (address(this).balance).div(10), address(this).balance);

        //sends player their winnings based on ratio. theirBet / pool * total
        for (uint i = 0; i < players.length; i.add(1)) {
            playerCut = ((players[i].playerBet).div((address(this).balance).mul(address(this).balance)));
            (players[i].playerAddress).transfer(playerCut);
            emit PlayerPaid(address(this), players[i].playerAddress, playerCut, address(this).balance);
        }
    }
}