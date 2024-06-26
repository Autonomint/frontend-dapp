export const CDSABI = [
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "implementation", type: "address" },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  { inputs: [], name: "ERC1967NonPayable", type: "error" },
  { inputs: [], name: "EndPointUnavailable", type: "error" },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "InvalidDelegate", type: "error" },
  { inputs: [], name: "InvalidEndpointCall", type: "error" },
  { inputs: [], name: "InvalidInitialization", type: "error" },
  {
    inputs: [{ internalType: "uint16", name: "optionType", type: "uint16" }],
    name: "InvalidOptionType",
    type: "error",
  },
  { inputs: [], name: "LzTokenUnavailable", type: "error" },
  {
    inputs: [{ internalType: "uint32", name: "eid", type: "uint32" }],
    name: "NoPeer",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "msgValue", type: "uint256" }],
    name: "NotEnoughNative",
    type: "error",
  },
  { inputs: [], name: "NotInitializing", type: "error" },
  {
    inputs: [{ internalType: "address", name: "addr", type: "address" }],
    name: "OnlyEndpoint",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint32", name: "eid", type: "uint32" },
      { internalType: "bytes32", name: "sender", type: "bytes32" },
    ],
    name: "OnlyPeer",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    inputs: [
      { internalType: "uint8", name: "bits", type: "uint8" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  { inputs: [], name: "UUPSUnauthorizedCallContext", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "slot", type: "bytes32" }],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      { indexed: false, internalType: "uint64", name: "index", type: "uint64" },
      {
        indexed: false,
        internalType: "uint128",
        name: "depositedUSDa",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "depositedUSDT",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositedTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "ethPriceAtDeposit",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "lockingPeriod",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liquidationAmount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "optedForLiquidation",
        type: "bool",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint32", name: "eid", type: "uint32" },
      {
        indexed: false,
        internalType: "bytes32",
        name: "peer",
        type: "bytes32",
      },
    ],
    name: "PeerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      { indexed: false, internalType: "uint64", name: "index", type: "uint64" },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawUSDa",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "withdrawETH",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "ethPriceAtWithdraw",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "optionsFees",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "optionsFeesWithdrawn",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint32", name: "srcEid", type: "uint32" },
          { internalType: "bytes32", name: "sender", type: "bytes32" },
          { internalType: "uint64", name: "nonce", type: "uint64" },
        ],
        internalType: "struct Origin",
        name: "origin",
        type: "tuple",
      },
    ],
    name: "allowInitializePath",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint128", name: "fees", type: "uint128" }],
    name: "calculateCumulativeRate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "_dstEid", type: "uint32" },
      {
        internalType: "enum CDSInterface.FunctionToDo",
        name: "functionToDo",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "optionsFeesToGetFromOtherChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cdsAmountToGetFromOtherChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liqAmountToGetFromOtherChain",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "liquidationAmount",
            type: "uint128",
          },
          { internalType: "uint128", name: "profits", type: "uint128" },
          { internalType: "uint128", name: "ethAmount", type: "uint128" },
          {
            internalType: "uint256",
            name: "availableLiquidationAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CDSInterface.LiquidationInfo",
        name: "liquidationInfo",
        type: "tuple",
      },
      { internalType: "uint128", name: "liqIndex", type: "uint128" },
      {
        components: [
          { internalType: "uint256", name: "nativeFee", type: "uint256" },
          { internalType: "uint256", name: "lzTokenFee", type: "uint256" },
        ],
        internalType: "struct MessagingFee",
        name: "fee",
        type: "tuple",
      },
      { internalType: "bytes", name: "_options", type: "bytes" },
    ],
    name: "callLzSendFromExternal",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "guid", type: "bytes32" },
          { internalType: "uint64", name: "nonce", type: "uint64" },
          {
            components: [
              { internalType: "uint256", name: "nativeFee", type: "uint256" },
              { internalType: "uint256", name: "lzTokenFee", type: "uint256" },
            ],
            internalType: "struct MessagingFee",
            name: "fee",
            type: "tuple",
          },
        ],
        internalType: "struct MessagingReceipt",
        name: "receipt",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "cdsCount",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "cdsDetails",
    outputs: [
      { internalType: "uint64", name: "index", type: "uint64" },
      { internalType: "bool", name: "hasDeposited", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint128", name: "usdtAmount", type: "uint128" },
      { internalType: "uint128", name: "usdaAmount", type: "uint128" },
      { internalType: "bool", name: "_liquidate", type: "bool" },
      { internalType: "uint128", name: "_liquidationAmount", type: "uint128" },
      { internalType: "uint128", name: "lockingPeriod", type: "uint128" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "endpoint",
    outputs: [
      {
        internalType: "contract ILayerZeroEndpointV2",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "depositor", type: "address" },
      { internalType: "uint64", name: "index", type: "uint64" },
    ],
    name: "getCDSDepositDetails",
    outputs: [
      {
        components: [
          { internalType: "uint64", name: "depositedTime", type: "uint64" },
          { internalType: "uint256", name: "depositedAmount", type: "uint256" },
          { internalType: "uint64", name: "withdrawedTime", type: "uint64" },
          {
            internalType: "uint256",
            name: "withdrawedAmount",
            type: "uint256",
          },
          { internalType: "bool", name: "withdrawed", type: "bool" },
          { internalType: "uint128", name: "depositPrice", type: "uint128" },
          { internalType: "uint128", name: "depositValue", type: "uint128" },
          { internalType: "bool", name: "depositValueSign", type: "bool" },
          { internalType: "bool", name: "optedLiquidation", type: "bool" },
          {
            internalType: "uint128",
            name: "InitialLiquidationAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "liquidationAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "liquidationindex",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "normalizedAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CDSInterface.CdsAccountDetails",
        name: "",
        type: "tuple",
      },
      { internalType: "uint64", name: "", type: "uint64" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_usda", type: "address" },
      { internalType: "address", name: "priceFeed", type: "address" },
      { internalType: "address", name: "_usdt", type: "address" },
      { internalType: "address", name: "_multiSign", type: "address" },
      { internalType: "address", name: "_endpoint", type: "address" },
      { internalType: "address", name: "_delegate", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint32", name: "srcEid", type: "uint32" },
          { internalType: "bytes32", name: "sender", type: "bytes32" },
          { internalType: "uint64", name: "nonce", type: "uint64" },
        ],
        internalType: "struct Origin",
        name: "",
        type: "tuple",
      },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "address", name: "_sender", type: "address" },
    ],
    name: "isComposeMsgSender",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint32", name: "srcEid", type: "uint32" },
          { internalType: "bytes32", name: "sender", type: "bytes32" },
          { internalType: "uint64", name: "nonce", type: "uint64" },
        ],
        internalType: "struct Origin",
        name: "_origin",
        type: "tuple",
      },
      { internalType: "bytes32", name: "_guid", type: "bytes32" },
      { internalType: "bytes", name: "_message", type: "bytes" },
      { internalType: "address", name: "_executor", type: "address" },
      { internalType: "bytes", name: "_extraData", type: "bytes" },
    ],
    name: "lzReceive",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "", type: "uint32" },
      { internalType: "bytes32", name: "", type: "bytes32" },
    ],
    name: "nextNonce",
    outputs: [{ internalType: "uint64", name: "nonce", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oAppVersion",
    outputs: [
      { internalType: "uint64", name: "senderVersion", type: "uint64" },
      { internalType: "uint64", name: "receiverVersion", type: "uint64" },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "omniChainCDSTotalAvailableLiquidationAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "omniChainCDSTotalCdsDepositedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "eid", type: "uint32" }],
    name: "peers",
    outputs: [{ internalType: "bytes32", name: "peer", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "_dstEid", type: "uint32" },
      {
        internalType: "enum CDSInterface.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "optionsFeesToGetFromOtherChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cdsAmountToGetFromOtherChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liqAmountToGetFromOtherChain",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "liquidationAmount",
            type: "uint128",
          },
          { internalType: "uint128", name: "profits", type: "uint128" },
          { internalType: "uint128", name: "ethAmount", type: "uint128" },
          {
            internalType: "uint256",
            name: "availableLiquidationAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CDSInterface.LiquidationInfo",
        name: "liquidationInfo",
        type: "tuple",
      },
      { internalType: "uint128", name: "liqIndex", type: "uint128" },
      { internalType: "bytes", name: "_options", type: "bytes" },
      { internalType: "bool", name: "_payInLzToken", type: "bool" },
    ],
    name: "quote",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "nativeFee", type: "uint256" },
          { internalType: "uint256", name: "lzTokenFee", type: "uint256" },
        ],
        internalType: "struct MessagingFee",
        name: "fee",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint128", name: "_usdaAmount", type: "uint128" },
      { internalType: "uint64", name: "usdaPrice", type: "uint64" },
      { internalType: "uint64", name: "usdtPrice", type: "uint64" },
    ],
    name: "redeemUSDT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "setBorrowLiquidation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "setBorrowingContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_delegate", type: "address" }],
    name: "setDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "_eid", type: "uint32" }],
    name: "setDstEid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "_eid", type: "uint32" },
      { internalType: "bytes32", name: "_peer", type: "bytes32" },
    ],
    name: "setPeer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_treasury", type: "address" }],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "percent", type: "uint8" }],
    name: "setUSDaLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "amount", type: "uint64" }],
    name: "setUsdtLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "_timeLimit", type: "uint64" }],
    name: "setWithdrawTimeLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAvailableLiquidationAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalCdsDepositedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint128", name: "index", type: "uint128" },
      {
        components: [
          {
            internalType: "uint128",
            name: "liquidationAmount",
            type: "uint128",
          },
          { internalType: "uint128", name: "profits", type: "uint128" },
          { internalType: "uint128", name: "ethAmount", type: "uint128" },
          {
            internalType: "uint256",
            name: "availableLiquidationAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CDSInterface.LiquidationInfo",
        name: "liquidationData",
        type: "tuple",
      },
    ],
    name: "updateLiquidationInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "updateTotalAvailableLiquidationAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint128", name: "_amount", type: "uint128" }],
    name: "updateTotalCdsDepositedAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint128", name: "_amount", type: "uint128" }],
    name: "updateTotalCdsDepositedAmountWithOptionFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdaLimit",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdtAmountDepositedTillNow",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdtLimit",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "_index", type: "uint64" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const testnet = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "EndPointUnavailable",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDelegate",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEndpointCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "optionType",
        type: "uint16",
      },
    ],
    name: "InvalidOptionType",
    type: "error",
  },
  {
    inputs: [],
    name: "LzTokenUnavailable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "eid",
        type: "uint32",
      },
    ],
    name: "NoPeer",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "msgValue",
        type: "uint256",
      },
    ],
    name: "NotEnoughNative",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "OnlyEndpoint",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "eid",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "sender",
        type: "bytes32",
      },
    ],
    name: "OnlyPeer",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "bits",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "depositedUSDa",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "depositedUSDT",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositedTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "ethPriceAtDeposit",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "lockingPeriod",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liquidationAmount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "optedForLiquidation",
        type: "bool",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "eid",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "peer",
        type: "bytes32",
      },
    ],
    name: "PeerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawUSDa",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "withdrawETH",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "ethPriceAtWithdraw",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "optionsFees",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "optionsFeesWithdrawn",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "srcEid",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct Origin",
        name: "origin",
        type: "tuple",
      },
    ],
    name: "allowInitializePath",
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
    inputs: [
      {
        internalType: "uint128",
        name: "fees",
        type: "uint128",
      },
    ],
    name: "calculateCumulativeRate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_dstEid",
        type: "uint32",
      },
      {
        internalType: "enum CDSInterface.FunctionToDo",
        name: "functionToDo",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "optionsFeesToGetFromOtherChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cdsAmountToGetFromOtherChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liqAmountToGetFromOtherChain",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "liquidationAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "profits",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "ethAmount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "availableLiquidationAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CDSInterface.LiquidationInfo",
        name: "liquidationInfo",
        type: "tuple",
      },
      {
        internalType: "uint128",
        name: "liqIndex",
        type: "uint128",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "nativeFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lzTokenFee",
            type: "uint256",
          },
        ],
        internalType: "struct MessagingFee",
        name: "fee",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "_options",
        type: "bytes",
      },
    ],
    name: "callLzSendFromExternal",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "guid",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "nativeFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lzTokenFee",
                type: "uint256",
              },
            ],
            internalType: "struct MessagingFee",
            name: "fee",
            type: "tuple",
          },
        ],
        internalType: "struct MessagingReceipt",
        name: "receipt",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "cdsCount",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
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
    name: "cdsDetails",
    outputs: [
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        internalType: "bool",
        name: "hasDeposited",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "usdtAmount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "usdaAmount",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "_liquidate",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "_liquidationAmount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "lockingPeriod",
        type: "uint128",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "endpoint",
    outputs: [
      {
        internalType: "contract ILayerZeroEndpointV2",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
    ],
    name: "getCDSDepositDetails",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "depositedTime",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "depositedAmount",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "withdrawedTime",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "withdrawedAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "withdrawed",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "depositPrice",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "depositValue",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "depositValueSign",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "optedLiquidation",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "InitialLiquidationAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "liquidationAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "liquidationindex",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "normalizedAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CDSInterface.CdsAccountDetails",
        name: "",
        type: "tuple",
      },
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_usda",
        type: "address",
      },
      {
        internalType: "address",
        name: "priceFeed",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdt",
        type: "address",
      },
      {
        internalType: "address",
        name: "_multiSign",
        type: "address",
      },
      {
        internalType: "address",
        name: "_endpoint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_delegate",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "srcEid",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct Origin",
        name: "",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "isComposeMsgSender",
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
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "srcEid",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct Origin",
        name: "_origin",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "_guid",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_executor",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "lzReceive",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "nextNonce",
    outputs: [
      {
        internalType: "uint64",
        name: "nonce",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oAppVersion",
    outputs: [
      {
        internalType: "uint64",
        name: "senderVersion",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "receiverVersion",
        type: "uint64",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "omniChainCDSTotalAvailableLiquidationAmount",
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
    name: "omniChainCDSTotalCdsDepositedAmount",
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "eid",
        type: "uint32",
      },
    ],
    name: "peers",
    outputs: [
      {
        internalType: "bytes32",
        name: "peer",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_dstEid",
        type: "uint32",
      },
      {
        internalType: "enum CDSInterface.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "optionsFeesToGetFromOtherChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cdsAmountToGetFromOtherChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liqAmountToGetFromOtherChain",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "liquidationAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "profits",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "ethAmount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "availableLiquidationAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CDSInterface.LiquidationInfo",
        name: "liquidationInfo",
        type: "tuple",
      },
      {
        internalType: "uint128",
        name: "liqIndex",
        type: "uint128",
      },
      {
        internalType: "bytes",
        name: "_options",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "_payInLzToken",
        type: "bool",
      },
    ],
    name: "quote",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "nativeFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lzTokenFee",
            type: "uint256",
          },
        ],
        internalType: "struct MessagingFee",
        name: "fee",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_usdaAmount",
        type: "uint128",
      },
      {
        internalType: "uint64",
        name: "usdaPrice",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "usdtPrice",
        type: "uint64",
      },
    ],
    name: "redeemUSDT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setBorrowLiquidation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setBorrowingContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_delegate",
        type: "address",
      },
    ],
    name: "setDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_eid",
        type: "uint32",
      },
    ],
    name: "setDstEid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_eid",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_peer",
        type: "bytes32",
      },
    ],
    name: "setPeer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "percent",
        type: "uint8",
      },
    ],
    name: "setUSDaLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "amount",
        type: "uint64",
      },
    ],
    name: "setUsdtLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_timeLimit",
        type: "uint64",
      },
    ],
    name: "setWithdrawTimeLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAvailableLiquidationAmount",
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
    name: "totalCdsDepositedAmount",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "index",
        type: "uint128",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "liquidationAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "profits",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "ethAmount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "availableLiquidationAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CDSInterface.LiquidationInfo",
        name: "liquidationData",
        type: "tuple",
      },
    ],
    name: "updateLiquidationInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "updateTotalAvailableLiquidationAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_amount",
        type: "uint128",
      },
    ],
    name: "updateTotalCdsDepositedAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_amount",
        type: "uint128",
      },
    ],
    name: "updateTotalCdsDepositedAmountWithOptionFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "usda",
    outputs: [
      {
        internalType: "contract IUSDa",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdaLimit",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdtAmountDepositedTillNow",
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
    name: "usdtLimit",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_index",
        type: "uint64",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
