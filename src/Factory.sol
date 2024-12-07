// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./UserContract.sol";

contract Factory {
    address public admin;
    mapping(address => UserContract) public userContracts;
    address[] public allUsers; // Array to store all user addresses

    address public agentAddress;

    address public anonAadhaarVerifierAddr;

    constructor(
        address _anonAadhaarVerifierAddr,
        address _agentAddress
    ) {
        admin = msg.sender;
        anonAadhaarVerifierAddr = _anonAadhaarVerifierAddr;
        agentAddress = _agentAddress;
    }

    function updateAgentAddress(address newAgentAddress) external {
        require(
            msg.sender == admin,
            "Factory: Only admin can update agent address"
        );
        agentAddress = newAgentAddress;
    }

    function createUserContract() external {
        require(
            address(userContracts[msg.sender]) == address(0),
            "User contract already exists for this address"
        );

        UserContract newUserContract = new UserContract(
            msg.sender,
            admin,
            anonAadhaarVerifierAddr,
            agentAddress
        );
        userContracts[msg.sender] = newUserContract;
        allUsers.push(msg.sender); // Add user address to the array
    }

    // Function to get all users who have created contracts
    function getAllUsers() external view returns (address[] memory) {
        return allUsers;
    }

    // Function to get the user contract for a specific address
    function getUserContract(
        address user
    ) external view returns (UserContract) {
        return userContracts[user];
    }
}
