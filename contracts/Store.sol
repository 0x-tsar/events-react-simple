// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Store {
    event buyEvent(address addr, string product, uint256 price);
    event sellEvent(address addr, string product, uint256 price);

    constructor() public {}

    function buy(string memory _product, uint256 _price) external {
        emit buyEvent(msg.sender, _product, _price);
    }

    function sell(string memory _product, uint256 _price) external {
        emit sellEvent(msg.sender, _product, _price);
    }
}
