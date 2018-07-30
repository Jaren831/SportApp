pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract PlayerFactory is Ownable {
    event PlayerAdded(address playerAddress, address teamAddress, uint playerBet, uint contractBalance);

    function addPlayer(address _playerAddress, uint _playerBet) internal {
        Player memory newPlayer = Player(_playerAddress, _playerBet);
        players.push(newPlayer);
        emit PlayerAdded(_playerAddress, address(this), _playerBet, address(this).balance);
    }
}
