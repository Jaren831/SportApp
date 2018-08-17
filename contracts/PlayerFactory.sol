pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract PlayerFactory is Ownable {
    event PlayerAdded(address playerAddress, uint playerBet, address teamAddress);

    function addPlayer(address _playerAddress, uint _playerBet) internal {
        emit PlayerAdded(_playerAddress, _playerBet, address(this));
    }
}