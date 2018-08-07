pragma solidity ^0.4.24;

import "./PlayerFactory.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Team is PlayerFactory {
    using SafeMath for uint256;
    uint public teamBets = 0;
    string teamName;
    event TeamPaid(address from, address to, uint amount);
    event HousePaid(address from, address to, uint amount);
    event PlayerPaid(address from, address to, uint amount);

    constructor(address _owner, string _teamName) public {
        owner = _owner;
        teamName = _teamName;
    }

    function () public payable {
        placeBet();
    }

    //Eth recieved is new player, call createPlayer
    function placeBet() public payable {
        addPlayer(msg.sender, msg.value);
        teamBets.add(msg.value);
    }

    function payoutTeam(address _winnerAddress) public {
        //sends contract balance to winning address, if winner, do nothing
        if (_winnerAddress != address(this)) {
            _winnerAddress.transfer(address(this).balance);
        } 
        emit TeamPaid(address(this), _winnerAddress, address(this).balance);
    } 

    function payoutHouse(address _houseAddress) public {
        //sends house 10% cut
        _houseAddress.transfer((address(this).balance.div(10))); 
        emit HousePaid(address(this), owner, address(this).balance.div(10));
    }

    function payoutPlayers() public {
        //sends player their winnings based on ratio. theirBet / pool * total
        uint playerCut = (players[i].playerBet.div(
            teamBets).mul(
            address(this).balance));
        for (uint i = 0; i < players.length; i.add(1)) {
            players[i].playerAddress.transfer(playerCut);
            emit PlayerPaid(address(this), players[i].playerAddress, playerCut);
        }
    }

    
}