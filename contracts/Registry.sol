// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GreenWim.sol";
import "./APIVerify.sol";
import "./APICredsRefresh.sol";
import "./GWToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAPIVerify {
    function callVerifier(string memory _code) external;
}

contract Registry {
    APIVerify public apiVerify;
    GWToken public gwToken;
    IERC20 public usdtToken;

    constructor(address _usdtAddress) {
        apiVerify = new APIVerify(address(this));
        gwToken = new GWToken();
        usdtToken = IERC20(_usdtAddress);
    }

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
    Bid[] public bidsArray;
    Lease[] public leaseArray;
    GreenWim[] public contracts;

    mapping(address => uint) public balances;
    mapping(address => uint) public collateralBalances;
    mapping(address => uint) public userAddressToContractId;

    event LeaseCreated(
        address indexed lessor,
        uint leaseId,
        uint noOfGWTokens,
        uint collateral
    );
    event LeaseTaken(address indexed lessee, uint leaseId);
    event LeaseEnded(address indexed lessee, uint leaseId);



    uint public credsMarketPrice;

    function addCredStation(string[] calldata payloadCode) public {
        apiVerify.callVerifier(payloadCode);
    }

    function fallBackCredStationAdded(address _caller, string memory _result) private {
        if (keccak256(abi.encodePacked(_result)) == keccak256(abi.encodePacked("true"))) {
            GreenWim t = new GreenWim();
            contracts.push(t);
            userAddressToContractId[_caller] = contracts.length - 1;
        }
    }

    function createSellOrder(uint _sellPrice, uint _noOfGWTokens) public {
        require(balances[msg.sender] >= _noOfGWTokens, "Insufficient GWTokens");
        sellArray.push(
            Order({
                seller: msg.sender,
                owner: msg.sender,
                orderId: sellArray.length,
                sellPrice: _sellPrice,
                saleFulfilled: false,
                noOfGWTokens: _noOfGWTokens
            })
        );
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

    function createLeaseOrder(
        uint _leasePrice,
        uint _noOfGWTokens,
        uint _collateral,
        uint256 _duration
    ) public {
        require(balances[msg.sender] >= _noOfGWTokens, "Insufficient GWTokens");
        uint leaseId = leaseArray.length;
        leaseArray.push(
            Lease({
                lessor: msg.sender,
                lessee: address(0),
                leaseId: leaseId,
                leasePrice: _leasePrice,
                noOfGWTokens: _noOfGWTokens,
                collateral: _collateral,
                leaseActive: false,
                startTime: 0,
                endTime: 0
            })
        );
        balances[msg.sender] -= _noOfGWTokens;
        emit LeaseCreated(msg.sender, leaseId, _noOfGWTokens, _collateral);
    }

    function takeOnLease(uint _leaseId, uint _collateralAmount) public {
        Lease storage lease = leaseArray[_leaseId];
        require(
            _collateralAmount >= lease.collateral,
            "Insufficient collateral"
        );
        require(!lease.leaseActive, "Lease already active");

        usdtToken.transferFrom(msg.sender, address(this), _collateralAmount);
        collateralBalances[msg.sender] += _collateralAmount;
        lease.lessee = msg.sender;
        lease.leaseActive = true;
        lease.startTime = block.timestamp;
        //  lease endTime based on the duration specified during lease creation
        emit LeaseTaken(msg.sender, _leaseId);
    }

    function endLease(uint _leaseId) public {
        Lease storage lease = leaseArray[_leaseId];
        require(msg.sender == lease.lessee, "Not the lessee");
        require(lease.leaseActive, "Lease not active");
        require(block.timestamp >= lease.endTime, "Lease period not yet ended");

        lease.leaseActive = false;
        balances[msg.sender] -= lease.noOfGWTokens;
        uint collateral = collateralBalances[msg.sender];
        collateralBalances[msg.sender] = 0;
        usdtToken.transfer(msg.sender, collateral);
        emit LeaseEnded(msg.sender, _leaseId);
    }
}