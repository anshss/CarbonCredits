// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "./APICredsRefresh.sol";

contract GreenWim {

    APICredsRefresh public apiCredsRefresh;

    constructor() {
        apiCredsRefresh = new APICredsRefresh(tx.origin);
    }

    function stakeCreds() public {}

    function claimYield() public {}
}