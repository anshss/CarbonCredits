registryAbi = [
  {
    inputs: [],
    name: "checkExpiredLeases",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_code",
        type: "string",
      },
    ],
    name: "checkVerifiedSensors",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
    ],
    name: "createBuyOrder",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_leasePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_noOfGWTokens",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "createLeaseOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_sellPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_noOfGWTokens",
        type: "uint256",
      },
    ],
    name: "createSellOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
    ],
    name: "endLease",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_usdtAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "lessor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "leaseId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "noOfGWTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
    ],
    name: "LeaseCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "lessee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "leaseId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "extraAmount",
        type: "uint256",
      },
    ],
    name: "LeaseEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "lessee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "leaseId",
        type: "uint256",
      },
    ],
    name: "LeaseTaken",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
    ],
    name: "takeOnLease",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_walletAdd",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_newValue",
        type: "uint256",
      },
    ],
    name: "updateGWTokenBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updateTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "credsMarketPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isVerified",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LatestTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orderArray",
    outputs: [
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sellPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isBuy",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isSale",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isLease",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "leaseFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "leaseDuration",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fulfilled",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "noOfGWTokens",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdtToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
registryAddress = "0x418BFe0F8D7D919DC2191CE12C06Dcbac7478478";
