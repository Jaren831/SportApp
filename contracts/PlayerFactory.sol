pragma solidity ^0.4.24;

// import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Ownable.sol";


contract PlayerFactory is Ownable {
    Player[] public players;
    struct Player {
        address playerAddress;
        uint playerBet;
    }
    event PlayerAdded(address playerAddress, address teamAddress, uint playerBet);

    function addPlayer(address _playerAddress, uint _playerBet) internal {
        Player memory newPlayer = Player(_playerAddress, _playerBet);
        players.push(newPlayer);
        emit PlayerAdded(_playerAddress, address(this), _playerBet);
    }
}
