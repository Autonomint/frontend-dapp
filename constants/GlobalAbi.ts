export const GLOBALABI = [
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
    inputs: [],
    name: "getOmniChainData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "normalizedAmount",
            type: "uint256",
          },
          { internalType: "uint256", name: "ethVaultValue", type: "uint256" },
          { internalType: "uint256", name: "cdsPoolValue", type: "uint256" },
          { internalType: "uint256", name: "totalCDSPool", type: "uint256" },
          {
            internalType: "uint256",
            name: "ethRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ethValueRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "noOfLiquidations",
            type: "uint128",
          },
          { internalType: "uint64", name: "nonce", type: "uint64" },
          { internalType: "uint64", name: "cdsCount", type: "uint64" },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmountWithOptionFees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalAvailableLiquidationAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdtAmountDepositedTillNow",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "burnedUSDaInRedeem",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastCumulativeRate",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinWei",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinUSD",
            type: "uint256",
          },
          { internalType: "uint128", name: "noOfBorrowers", type: "uint128" },
          { internalType: "uint256", name: "totalInterest", type: "uint256" },
          { internalType: "uint256", name: "abondUSDaPool", type: "uint256" },
          {
            internalType: "uint256",
            name: "ethProfitsOfLiquidators",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdaGainedFromLiquidation",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalInterestFromLiquidation",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interestFromExternalProtocolDuringLiquidation",
            type: "uint256",
          },
        ],
        internalType: "struct IGlobalVariables.OmniChainData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_usda", type: "address" },
      { internalType: "address", name: "_cds", type: "address" },
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
    inputs: [
      {
        internalType: "enum IGlobalVariables.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "tokensToSend", type: "uint256" },
        ],
        internalType: "struct IGlobalVariables.USDaOftTransferData",
        name: "_oftTransferData",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          {
            internalType: "uint256",
            name: "nativeTokensToSend",
            type: "uint256",
          },
        ],
        internalType: "struct IGlobalVariables.NativeTokenTransferData",
        name: "_nativeTokenTransferData",
        type: "tuple",
      },
      { internalType: "address", name: "_refundAddress", type: "address" },
    ],
    name: "oftOrNativeReceiveFromOtherChains",
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
      {
        internalType: "enum IGlobalVariables.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IGlobalVariables.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
      {
        components: [
          { internalType: "uint256", name: "nativeFee", type: "uint256" },
          { internalType: "uint256", name: "lzTokenFee", type: "uint256" },
        ],
        internalType: "struct MessagingFee",
        name: "_fee",
        type: "tuple",
      },
      { internalType: "bytes", name: "_options", type: "bytes" },
      { internalType: "address", name: "_refundAddress", type: "address" },
    ],
    name: "send",
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
    inputs: [
      {
        internalType: "enum IGlobalVariables.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
      { internalType: "uint128", name: "_liqIndex", type: "uint128" },
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
        name: "_liquidationInfo",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "nativeFee", type: "uint256" },
          { internalType: "uint256", name: "lzTokenFee", type: "uint256" },
        ],
        internalType: "struct MessagingFee",
        name: "_fee",
        type: "tuple",
      },
      { internalType: "bytes", name: "_options", type: "bytes" },
      { internalType: "address", name: "_refundAddress", type: "address" },
    ],
    name: "sendForLiquidation",
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
    inputs: [{ internalType: "address", name: "_borrowLiq", type: "address" }],
    name: "setBorrowLiq",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrow", type: "address" }],
    name: "setBorrowing",
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
      { internalType: "address", name: "_globalVariables", type: "address" },
    ],
    name: "setDstGlobalVariablesAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "normalizedAmount",
            type: "uint256",
          },
          { internalType: "uint256", name: "ethVaultValue", type: "uint256" },
          { internalType: "uint256", name: "cdsPoolValue", type: "uint256" },
          { internalType: "uint256", name: "totalCDSPool", type: "uint256" },
          {
            internalType: "uint256",
            name: "ethRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ethValueRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "noOfLiquidations",
            type: "uint128",
          },
          { internalType: "uint64", name: "nonce", type: "uint64" },
          { internalType: "uint64", name: "cdsCount", type: "uint64" },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmountWithOptionFees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalAvailableLiquidationAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdtAmountDepositedTillNow",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "burnedUSDaInRedeem",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastCumulativeRate",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinWei",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinUSD",
            type: "uint256",
          },
          { internalType: "uint128", name: "noOfBorrowers", type: "uint128" },
          { internalType: "uint256", name: "totalInterest", type: "uint256" },
          { internalType: "uint256", name: "abondUSDaPool", type: "uint256" },
          {
            internalType: "uint256",
            name: "ethProfitsOfLiquidators",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdaGainedFromLiquidation",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalInterestFromLiquidation",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "interestFromExternalProtocolDuringLiquidation",
            type: "uint256",
          },
        ],
        internalType: "struct IGlobalVariables.OmniChainData",
        name: "_omniChainData",
        type: "tuple",
      },
    ],
    name: "setOmniChainData",
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
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
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
  { stateMutability: "payable", type: "receive" },
] as const;
