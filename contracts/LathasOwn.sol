// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract LathasOwn {
    address public owner;
    string public message;


    constructor() {
        owner = msg.sender;
        
    }

    function getMetamaskAddress() external view returns (address) {
        return msg.sender;
    }

    function setMessage(string calldata _message) external{
        message = _message;
    }

    function getMessage() external view returns (string memory) {
        return message;
    }
    function Address( ) external  view returns(address){
        return msg.sender;
    }
}
