// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GreenWim.sol";
import "./APIVerify.sol";
import "./APICreditRefresh.sol";
import "./GWToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// interface IAPIVerify {
//     function callVerifier(string memory _code) external;
// }

contract Registry {
    //APIVerify public apiVerify;
   // GWToken public gwToken;
    IERC20 public usdtToken;

    struct Order {
        address seller;
        address owner;
        uint orderId;
        uint sellPrice;
        bool isBuy;
        bool isSale;
        bool isLease;
        uint leaseFee;
        uint leaseDuration;
        bool saleFulfilled;
        bool leaseFulfilled;
        uint noOfGWTokens;
    }





    Order[] public orderArray;
   // Lease[] public leaseArray;
   // Bid[] public bidsArray;
   // GreenWim[] public contracts;

    mapping(address => uint) public balances;
   // mapping(address => uint) public collateralBalances;
   // mapping (address => uint) public hostAddressToContractId;

    event LeaseCreated(address indexed lessor, uint leaseId, uint noOfGWTokens, uint collateral);
    event LeaseTaken(address indexed lessee, uint leaseId);
    event LeaseEnded(address indexed lessee, uint leaseId, uint refundAmount, uint extraAmount);

    constructor(address _usdtAddress) {
       // apiVerify = new APIVerify();
       // gwToken = new GWToken();
        usdtToken = IERC20(_usdtAddress);
    }

    uint public credsMarketPrice;
    

    
    function updateGWTokenBalance(address _walletAdd ,uint _newValue) public {
        // additional cheks to be implemented 
        balances[_walletAdd] = _newValue;


    }


    // function addCredStation(string memory _code) public {
    //     apiVerify.callVerifier(_code);
    // }

    // function fallBackCredStationAdded() private {
    //     GreenWim t = new GreenWim();
    //     contracts.push(t);
    // }

    function createSellOrder(uint _sellPrice, uint _noOfGWTokens) public {
        require(balances[msg.sender] >= _noOfGWTokens, "Insufficient GWTokens");
        orderArray.push(Order({
            seller: msg.sender,
            owner: msg.sender,
            orderId: orderArray.length,
            sellPrice: _sellPrice,
            isBuy:false,
            isSale:true,
            isLease:false,
            leaseFee:0,
            leaseDuration:0,
            saleFulfilled: false,
            leaseFulfilled:false,
            noOfGWTokens: _noOfGWTokens
        }));
        balances[msg.sender] -= _noOfGWTokens;
    }

    function createBuyOrder(uint _orderId) public payable {
        Order storage order = orderArray[_orderId];
        require(msg.value >= order.sellPrice, "Insufficient value sent");
        require(!order.saleFulfilled, "Order already fulfilled");

        order.owner = msg.sender;
        order.saleFulfilled = true;
        balances[msg.sender] += order.noOfGWTokens;
        payable(order.seller).transfer(msg.value);
        credsMarketPrice = order.sellPrice;
    }

    function createLeaseOrder(uint _leasePrice, uint _noOfGWTokens, uint _collateral, uint256 _duration) public {
        // duration to be implemented
        require(balances[msg.sender] >= _noOfGWTokens, "Insufficient GWTokens");
        //require(usdtToken.transferFrom(msg.sender, address(this), _collateral), "Collateral transfer failed");
       
     
        orderArray.push(Order({
            seller: msg.sender,
            owner: msg.sender,
            orderId: orderArray.length,
            sellPrice: 0,
            isBuy:false,
            isSale:false,
            isLease:true,
            leaseFee:_leasePrice,
            leaseDuration:_duration,
            saleFulfilled: false,
            leaseFulfilled:false,
            noOfGWTokens: _noOfGWTokens
        }));
        balances[msg.sender] -= _noOfGWTokens;
       // emit LeaseCreated(msg.sender, leaseId, _noOfGWTokens, _collateral);
    }

    function takeOnLease(uint _orderId) public payable {
        Order storage order = orderArray[_orderId];
        require(msg.value >= order.leaseFee, "Insufficient value sent");
        require(!order.leaseFulfilled, "Lease already fulfilled");

        order.owner = msg.sender;
        order.leaseFulfilled = true;
        balances[msg.sender] += order.noOfGWTokens;
        payable(order.seller).transfer(msg.value);
        credsMarketPrice = order.sellPrice;
    }

    function endLease(uint _orderId) public payable {
        Order storage order = orderArray[_orderId];
       // require(msg.value >= order.leaseFee, "Insufficient value sent");
        require(!order.leaseFulfilled, "Lease already fulfilled");

        order.owner = order.seller;
        order.leaseFulfilled = true;
        balances[msg.sender] -= order.noOfGWTokens;
       
    }

    
}