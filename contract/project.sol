// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgeVerification {
    struct User {
        bool isVerified;
        uint256 birthYear;
    }

    mapping(address => User) public users;
    address public admin;

    event AgeVerified(address indexed user, uint256 birthYear);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can verify age");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function verifyAge(address _user, uint256 _birthYear) external onlyAdmin {
        require(_birthYear <= (block.timestamp / 31556926) - 18, "User must be 18+");
        users[_user] = User(true, _birthYear);
        emit AgeVerified(_user, _birthYear);
    }

    function isVerified(address _user) external view returns (bool) {
        return users[_user].isVerified;
    }
}

