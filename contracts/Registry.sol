//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./GreenWim.sol";
import "./APIVerify.sol";
import "./APICreditRefresh.sol";
import "./GWToken.sol";

interface IAPIVerify {
    function callVerifier() external;
}

contract Registry {

    APIVerify public apiVerify;
    GWToken public gwToken;

    constructor() {
        apiVerify = new APIVerify();
        gwToken = new GWToken();
    }

    uint public credsMarketPrice;

    GreenWim[] public contracts;
    mapping (address => uint) public hostAddressToContractId;

    function addCredStation(string memory _code) public {
        apiVerify.callVerifier(_code);
    }

    function fallBackCredStationAdded() private {
        GreenWim t = new GreenWim();
        contracts.push(t);
    }

    function createSellOrder() public {}

    function buyOrder() public {}

    function getLiquidity() public view {}

    function putCollateral() public {}

    function borrow() public {}

}