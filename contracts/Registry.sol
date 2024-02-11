// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GreenWim.sol";
import "./APIVerify.sol";
import "./APICreditRefresh.sol";
import "./GWToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAPIVerify {
    function callVerifier(string memory _code) external;
}

contract Registry {
    APIVerify public apiVerify;
    GWToken public gwToken;
    IERC20 public usdtToken;

    struct Order {
        address seller;
        address owner;
        uint orderId;
        uint sellPrice;
        bool saleFulfilled;
        uint noOfGWTokens;
    }

    struct Lease {
        address lessor;
        address lessee;
        uint leaseId;
        uint leasePrice;
        uint noOfGWTokens;
        uint collateral;
        bool leaseActive;
        uint256 startTime;
        uint256 endTime;
    }

    struct Bid {
        address bidder;
        uint bidPrice;
        bool bidFulfilled;
        uint noOfGWTokens;
    }

    Order[] public sellArray;
    Lease[] public leaseArray;
    Bid[] public bidsArray;
    GreenWim[] public contracts;

    mapping(address => uint) public balances;
    mapping(address => uint) public collateralBalances;
    mapping (address => uint) public hostAddressToContractId;

    event LeaseCreated(address indexed lessor, uint leaseId, uint noOfGWTokens, uint collateral);
    event LeaseTaken(address indexed lessee, uint leaseId);
    event LeaseEnded(address indexed lessee, uint leaseId, uint refundAmount, uint extraAmount);

    constructor(address _usdtAddress) {
        apiVerify = new APIVerify();
        gwToken = new GWToken();
        usdtToken = IERC20(_usdtAddress);
    }

    uint public credsMarketPrice;
    

    
    function updateGWTokenBalance(address _walletAdd ,uint _newValue) public {
        // additional cheks to be implemented 
        balances[_walletAdd] = _newValue;


    }


    function addCredStation(string memory _code) public {
        apiVerify.callVerifier(_code);
    }

    function fallBackCredStationAdded() private {
        GreenWim t = new GreenWim();
        contracts.push(t);
    }

    function createSellOrder(uint _sellPrice, uint _noOfGWTokens) public {
        require(balances[msg.sender] >= _noOfGWTokens, "Insufficient GWTokens");
        sellArray.push(Order({
            seller: msg.sender,
            owner: msg.sender,
            orderId: sellArray.length,
            sellPrice: _sellPrice,
            saleFulfilled: false,
            noOfGWTokens: _noOfGWTokens
        }));
        balances[msg.sender] -= _noOfGWTokens;
    }

    function createBuyOrder(uint _orderId) public payable {
        Order storage order = sellArray[_orderId];
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
        require(usdtToken.transferFrom(msg.sender, address(this), _collateral), "Collateral transfer failed");
        uint leaseId = leaseArray.length;
        leaseArray.push(Lease({
            lessor: msg.sender,
            lessee: address(0),
            leaseId: leaseId,
            leasePrice: _leasePrice,
            noOfGWTokens: _noOfGWTokens,
            collateral: _collateral,
            leaseActive: false,
            startTime: 0,
            endTime: 0
        }));
        collateralBalances[address(this)] += _collateral; // Store collateral in contract
        balances[msg.sender] -= _noOfGWTokens;
        emit LeaseCreated(msg.sender, leaseId, _noOfGWTokens, _collateral);
    }

    function takeOnLease(uint _leaseId, uint _collateralAmount) public {
        Lease storage lease = leaseArray[_leaseId];
        require(_collateralAmount >= lease.collateral, "Collateral already transferred at lease creation");
        require(!lease.leaseActive, "Lease already active");

        lease.lessee = msg.sender;
        lease.leaseActive = true;
        lease.startTime = block.timestamp;
        // Lease endTime based on the duration specified during lease creation
        emit LeaseTaken(msg.sender, _leaseId);
    }

    function endLease(uint _leaseId) public {
        Lease storage lease = leaseArray[_leaseId];
        require(msg.sender == lease.lessee, "Not the lessee");
        require(lease.leaseActive, "Lease not active");
        require(block.timestamp >= lease.endTime, "Lease period not yet ended");

        lease.leaseActive = false;
        balances[msg.sender] -= lease.noOfGWTokens;
        uint collateral = lease.collateral;
        uint extraPayment = collateral * 2 / 100; // Calculate 2% of the original collateral
        uint totalRefund = collateral + extraPayment;
        require(usdtToken.transferFrom(msg.sender, lease.lessor, extraPayment), "Extra payment transfer failed");
        require(usdtToken.transfer(msg.sender, collateral), "Collateral refund failed");
        emit LeaseEnded(msg.sender, _leaseId, collateral, extraPayment);
    }
}
