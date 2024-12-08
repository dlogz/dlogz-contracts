// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ZKContract.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "./UserContract.sol";

contract ZKFactory {
    address public immutable implementation;
    mapping(address => address) public userZkContract;

    event ZKContractCreated(address indexed user, address indexed zkContract);

    constructor() {
        implementation = address(new ZKContract());
    }

    /// @notice Creates a new ZKContract instance for the caller
    /// @return zkContract The address of the newly created ZKContract
    function createZKContract(
        address _userContractAddr
    ) external returns (address zkContract) {
        zkContract = Clones.clone(implementation);

        // Initialize the contract
        ZKContract(zkContract).initialize(_userContractAddr, msg.sender);

        // Store the contract for the user
        userZkContract[msg.sender] = zkContract;

        UserContract userContract = UserContract(_userContractAddr);
        userContract.linkZKContract(zkContract, msg.sender);

        emit ZKContractCreated(msg.sender, zkContract);
    }

    function getUserZkContract(address user) external view returns (address) {
        return userZkContract[user];
    }
}
