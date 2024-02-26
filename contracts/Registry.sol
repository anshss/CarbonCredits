// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// interface IAPIVerify {
//     function callVerifier(string memory _code) external;
// }

contract Registry {
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
        bool fulfilled;
        uint noOfGWTokens;
        uint createdAt;
    }

    string[] verifiedSensors = [
        "973b98d4ef3aac8c991d5d027837c3c6767ec05ebe20e5c49c03d8dde588de88",
        "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4"
    ];

    Order[] public orderArray;

    uint256 public LatestTimestamp;

    mapping(address => uint) public balances;

    event LeaseCreated(
        address indexed lessor,
        uint leaseId,
        uint noOfGWTokens,
        uint collateral
    );
    event LeaseTaken(address indexed lessee, uint leaseId);
    event LeaseEnded(
        address indexed lessee,
        uint leaseId,
        uint refundAmount,
        uint extraAmount
    );

    constructor(address _usdtAddress) {
        // apiVerify = new APIVerify();
        // gwToken = new GWToken();
        usdtToken = IERC20(_usdtAddress);
    }

    uint public credsMarketPrice;

    function updateGWTokenBalance(
        string memory _code,
        address _walletAdd,
        uint _newValue
    ) public {
        // to update time in cintract and end leases
        require(checkVerifiedSensors(_code));

        updateTime();
        checkExpiredLeases();
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
        // to update time in cintract and end leases
        updateTime();
        checkExpiredLeases();
        require(balances[msg.sender] >= _noOfGWTokens, "Insufficient GWTokens");
        orderArray.push(
            Order({
                seller: msg.sender,
                owner: msg.sender,
                orderId: orderArray.length,
                sellPrice: _sellPrice,
                isBuy: false,
                isSale: true,
                isLease: false,
                leaseFee: 0,
                leaseDuration: 0,
                fulfilled: false,
                noOfGWTokens: _noOfGWTokens,
                createdAt: block.timestamp
            })
        );
        balances[msg.sender] -= _noOfGWTokens;
    }

    function createBuyOrder(uint _orderId) public payable {
        // to update time in cintract and end leases
        updateTime();
        checkExpiredLeases();
        Order storage order = orderArray[_orderId];
        require(msg.value >= order.sellPrice, "Insufficient value sent");
        require(!order.fulfilled, "Order already fulfilled");

        order.owner = msg.sender;
        order.fulfilled = true;
        balances[msg.sender] += order.noOfGWTokens;
        payable(order.seller).transfer(msg.value);
        credsMarketPrice = order.sellPrice;
    }

    function createLeaseOrder(
        uint _leasePrice,
        uint _noOfGWTokens,
        uint256 _duration
    ) public {
        // to update time in cintract and end leases
        updateTime();
        checkExpiredLeases();

        require(balances[msg.sender] >= _noOfGWTokens, "Insufficient GWTokens");
        //require(usdtToken.transferFrom(msg.sender, address(this), _collateral), "Collateral transfer failed");

        orderArray.push(
            Order({
                seller: msg.sender,
                owner: msg.sender,
                orderId: orderArray.length,
                sellPrice: 0,
                isBuy: false,
                isSale: false,
                isLease: true,
                leaseFee: _leasePrice,
                leaseDuration: _duration,
                fulfilled: false,
                noOfGWTokens: _noOfGWTokens,
                createdAt: block.timestamp
            })
        );
        balances[msg.sender] -= _noOfGWTokens;
        // emit LeaseCreated(msg.sender, leaseId, _noOfGWTokens, _collateral);
    }

    function takeOnLease(uint _orderId) public payable {
        // to update time in cintract and end leases
        updateTime();
        checkExpiredLeases();
        Order storage order = orderArray[_orderId];
        require(msg.value >= order.leaseFee, "Insufficient value sent");
        require(!order.fulfilled, "Lease already fulfilled");

        order.owner = msg.sender;
        order.fulfilled = true;
        order.createdAt = block.timestamp;
        balances[msg.sender] += order.noOfGWTokens;
        payable(order.seller).transfer(msg.value);
    }

    function endLease(uint _orderId) public payable onlyAdmin {
        Order storage order = orderArray[_orderId];
        balances[order.owner] -= order.noOfGWTokens;
        order.owner = order.seller;
    }

    modifier onlyAdmin() {
        _;
    }

    function updateTime() public {
        LatestTimestamp = block.timestamp;
    }

    function checkExpiredLeases() public {
        updateTime();
        for (uint256 index = 0; index < orderArray.length; index++) {
            if (
                orderArray[index].createdAt + orderArray[index].leaseDuration >
                LatestTimestamp
            ) {
                endLease(index);
            }
        }
    }

    bool public isVerified;

    function checkVerifiedSensors(string memory _code) public returns (bool) {
        for (uint256 index = 0; index < verifiedSensors.length; index++) {
            if (
                keccak256(abi.encodePacked(verifiedSensors[index])) ==
                keccak256(abi.encodePacked(_code))
            ) {
                isVerified = true;
                return true;
            }
        }
        return false;
    }
}
