// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public client;
    address public freelancer;
    uint public amount;

    bool public workSubmitted;
    bool public workApproved;

    constructor(address _freelancer) payable {
        client = msg.sender;
        freelancer = _freelancer;
        amount = msg.value;
    }

    function submitWork() external {
        require(msg.sender == freelancer, "Only freelancer can submit");
        workSubmitted = true;
    }

    function approveWork() external {
        require(msg.sender == client, "Only client can approve");
        require(workSubmitted, "Work not yet submitted");
        workApproved = true;
        payable(freelancer).transfer(amount);
    }

    
}
