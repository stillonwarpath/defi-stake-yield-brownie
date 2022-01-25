// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenFarm {
    // stakeTokens
    // unStakeTokens
    // issueTokens - rewards for staking
    // addAllowedTokens
    // getEthValue
    function stakeTokens(uint256 _amount, address _token) public {
        // what tokens can they stake?
        // how much can they stake?
        require(_amount > 0, "Amount must be more than 0");
    }

    function tokenIsAllowed(address _token) public returns (bool) {}
}
