export const TreasuryAbi = [
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
  { inputs: [], name: "Treasury_AaveDepositAndMintFailed", type: "error" },
  { inputs: [], name: "Treasury_AavePoolAddressZero", type: "error" },
  { inputs: [], name: "Treasury_AaveWithdrawFailed", type: "error" },
  { inputs: [], name: "Treasury_CompoundDepositAndMintFailed", type: "error" },
  { inputs: [], name: "Treasury_CompoundWithdrawFailed", type: "error" },
  {
    inputs: [],
    name: "Treasury_EthTransferToCdsLiquidatorFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Treasury_WithdrawExternalProtocolInterestFailed",
    type: "error",
  },
  { inputs: [], name: "Treasury_ZeroDeposit", type: "error" },
  { inputs: [], name: "Treasury_ZeroWithdraw", type: "error" },
  { inputs: [], name: "UUPSUnauthorizedCallContext", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "slot", type: "bytes32" }],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint64", name: "count", type: "uint64" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DepositToAave",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint64", name: "count", type: "uint64" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DepositToCompound",
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint64", name: "count", type: "uint64" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawFromAave",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint64", name: "count", type: "uint64" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawFromCompound",
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
    inputs: [],
    name: "abondUSDaPool",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
    inputs: [
      { internalType: "address", name: "_address", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "approveUSDa",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_address", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "approveUsdt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "depositor", type: "address" }],
    name: "borrowing",
    outputs: [
      { internalType: "uint256", name: "depositedAmount", type: "uint256" },
      { internalType: "uint256", name: "totalBorrowedAmount", type: "uint256" },
      { internalType: "bool", name: "hasBorrowed", type: "bool" },
      { internalType: "bool", name: "hasDeposited", type: "bool" },
      { internalType: "uint64", name: "borrowerIndex", type: "uint64" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint128", name: "aBondAmount", type: "uint128" },
    ],
    name: "calculateYieldsForExternalProtocol",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_depositingAmount", type: "uint256" },
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint128", name: "_ethPrice", type: "uint128" },
      { internalType: "uint64", name: "_depositTime", type: "uint64" },
    ],
    name: "deposit",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "hasDeposited", type: "bool" },
          { internalType: "uint64", name: "borrowerIndex", type: "uint64" },
        ],
        internalType: "struct ITreasury.DepositResult",
        name: "",
        type: "tuple",
      },
    ],
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
    inputs: [],
    name: "getBalanceInTreasury",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "depositor", type: "address" },
      { internalType: "uint64", name: "index", type: "uint64" },
    ],
    name: "getBorrowing",
    outputs: [
      {
        components: [
          { internalType: "uint64", name: "totalIndex", type: "uint64" },
          {
            components: [
              { internalType: "uint64", name: "depositedTime", type: "uint64" },
              {
                internalType: "uint128",
                name: "depositedAmount",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "depositedAmountUsdValue",
                type: "uint128",
              },
              {
                internalType: "uint64",
                name: "downsidePercentage",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "ethPriceAtDeposit",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "borrowedAmount",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "normalizedAmount",
                type: "uint128",
              },
              { internalType: "bool", name: "withdrawed", type: "bool" },
              {
                internalType: "uint128",
                name: "withdrawAmount",
                type: "uint128",
              },
              { internalType: "bool", name: "liquidated", type: "bool" },
              {
                internalType: "uint64",
                name: "ethPriceAtWithdraw",
                type: "uint64",
              },
              { internalType: "uint64", name: "withdrawTime", type: "uint64" },
              {
                internalType: "uint128",
                name: "aBondTokensAmount",
                type: "uint128",
              },
              { internalType: "uint128", name: "strikePrice", type: "uint128" },
              { internalType: "uint128", name: "optionFees", type: "uint128" },
            ],
            internalType: "struct ITreasury.DepositDetails",
            name: "depositDetails",
            type: "tuple",
          },
        ],
        internalType: "struct ITreasury.GetBorrowingResult",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "maximum", type: "bool" }],
    name: "getExternalProtocolCumulativeRate",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_borrowing", type: "address" },
      { internalType: "address", name: "_tokenAddress", type: "address" },
      { internalType: "address", name: "_abondAddress", type: "address" },
      { internalType: "address", name: "_cdsContract", type: "address" },
      { internalType: "address", name: "_borrowLiquidation", type: "address" },
      { internalType: "address", name: "_usdt", type: "address" },
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
    name: "noOfBorrowers",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
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
        internalType: "enum ITreasury.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "tokensToSend", type: "uint256" },
        ],
        internalType: "struct ITreasury.USDaOftTransferData",
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
        internalType: "struct ITreasury.NativeTokenTransferData",
        name: "_nativeTokenTransferData",
        type: "tuple",
      },
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
    name: "omniChainTreasuryEthProfitsOfLiquidators",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "omniChainTreasuryNoOfBorrowers",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "omniChainTreasuryTotalVolumeOfBorrowersAmountinUSD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "omniChainTreasuryTotalVolumeOfBorrowersAmountinWei",
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
        internalType: "enum ITreasury.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "tokensToSend", type: "uint256" },
        ],
        internalType: "struct ITreasury.USDaOftTransferData",
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
        internalType: "struct ITreasury.NativeTokenTransferData",
        name: "_nativeTokenTransferData",
        type: "tuple",
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
      { internalType: "address", name: "_treasuryAddress", type: "address" },
    ],
    name: "setDstTreasuryAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_wethGateway", type: "address" },
      { internalType: "address", name: "_comet", type: "address" },
      {
        internalType: "address",
        name: "_aavePoolAddressProvider",
        type: "address",
      },
      { internalType: "address", name: "_aToken", type: "address" },
      { internalType: "address", name: "_weth", type: "address" },
    ],
    name: "setExternalProtocolAddresses",
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
    inputs: [],
    name: "totalVolumeOfBorrowersAmountinUSD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVolumeOfBorrowersAmountinWei",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "borrower", type: "address" },
      { internalType: "uint128", name: "amount", type: "uint128" },
    ],
    name: "transferEthToCdsLiquidators",
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
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bool", name: "operation", type: "bool" },
    ],
    name: "updateAbondUSDaPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "depositor", type: "address" },
      { internalType: "uint64", name: "index", type: "uint64" },
      {
        components: [
          { internalType: "uint64", name: "depositedTime", type: "uint64" },
          { internalType: "uint128", name: "depositedAmount", type: "uint128" },
          {
            internalType: "uint128",
            name: "depositedAmountUsdValue",
            type: "uint128",
          },
          {
            internalType: "uint64",
            name: "downsidePercentage",
            type: "uint64",
          },
          {
            internalType: "uint128",
            name: "ethPriceAtDeposit",
            type: "uint128",
          },
          { internalType: "uint128", name: "borrowedAmount", type: "uint128" },
          {
            internalType: "uint128",
            name: "normalizedAmount",
            type: "uint128",
          },
          { internalType: "bool", name: "withdrawed", type: "bool" },
          { internalType: "uint128", name: "withdrawAmount", type: "uint128" },
          { internalType: "bool", name: "liquidated", type: "bool" },
          {
            internalType: "uint64",
            name: "ethPriceAtWithdraw",
            type: "uint64",
          },
          { internalType: "uint64", name: "withdrawTime", type: "uint64" },
          {
            internalType: "uint128",
            name: "aBondTokensAmount",
            type: "uint128",
          },
          { internalType: "uint128", name: "strikePrice", type: "uint128" },
          { internalType: "uint128", name: "optionFees", type: "uint128" },
        ],
        internalType: "struct ITreasury.DepositDetails",
        name: "depositDetail",
        type: "tuple",
      },
    ],
    name: "updateDepositDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bool", name: "operation", type: "bool" },
    ],
    name: "updateEthProfitsOfLiquidators",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "borrower", type: "address" },
      { internalType: "bool", name: "_bool", type: "bool" },
    ],
    name: "updateHasBorrowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "updateInterestFromExternalProtocol",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "borrower", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "updateTotalBorrowedAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "borrower", type: "address" },
      { internalType: "uint128", name: "amount", type: "uint128" },
    ],
    name: "updateTotalDepositedAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "updateTotalInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "updateTotalInterestFromLiquidation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bool", name: "operation", type: "bool" },
    ],
    name: "updateUSDaGainedFromLiquidation",
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
    name: "usdaGainedFromLiquidation",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "borrower", type: "address" },
      { internalType: "address", name: "toAddress", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint64", name: "index", type: "uint64" },
    ],
    name: "withdraw",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "toAddress", type: "address" },
      { internalType: "uint128", name: "amount", type: "uint128" },
    ],
    name: "withdrawExternalProtocolInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint128", name: "aBondAmount", type: "uint128" },
    ],
    name: "withdrawFromExternalProtocol",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "toAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "withdrawInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
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
    name: "Treasury_AaveDepositAndMintFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Treasury_AavePoolAddressZero",
    type: "error",
  },
  {
    inputs: [],
    name: "Treasury_AaveWithdrawFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Treasury_CompoundDepositAndMintFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Treasury_CompoundWithdrawFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Treasury_EthTransferToCdsLiquidatorFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Treasury_WithdrawExternalProtocolInterestFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Treasury_ZeroDeposit",
    type: "error",
  },
  {
    inputs: [],
    name: "Treasury_ZeroWithdraw",
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
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
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
        name: "count",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DepositToAave",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "count",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DepositToCompound",
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
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "count",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawFromAave",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "count",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawFromCompound",
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
    name: "abondUSDaPool",
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
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approveUSDa",
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
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approveUsdt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "depositor",
        type: "address",
      },
    ],
    name: "borrowing",
    outputs: [
      {
        internalType: "uint256",
        name: "depositedAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalBorrowedAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasBorrowed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasDeposited",
        type: "bool",
      },
      {
        internalType: "uint64",
        name: "borrowerIndex",
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
        name: "user",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "aBondAmount",
        type: "uint128",
      },
    ],
    name: "calculateYieldsForExternalProtocol",
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
        name: "_depositingAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "_ethPrice",
        type: "uint128",
      },
      {
        internalType: "uint64",
        name: "_depositTime",
        type: "uint64",
      },
    ],
    name: "deposit",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "hasDeposited",
            type: "bool",
          },
          {
            internalType: "uint64",
            name: "borrowerIndex",
            type: "uint64",
          },
        ],
        internalType: "struct ITreasury.DepositResult",
        name: "",
        type: "tuple",
      },
    ],
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
    inputs: [],
    name: "getBalanceInTreasury",
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
        name: "depositor",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
    ],
    name: "getBorrowing",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "totalIndex",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint64",
                name: "depositedTime",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "depositedAmount",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "depositedAmountUsdValue",
                type: "uint128",
              },
              {
                internalType: "uint64",
                name: "downsidePercentage",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "ethPriceAtDeposit",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "borrowedAmount",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "normalizedAmount",
                type: "uint128",
              },
              {
                internalType: "bool",
                name: "withdrawed",
                type: "bool",
              },
              {
                internalType: "uint128",
                name: "withdrawAmount",
                type: "uint128",
              },
              {
                internalType: "bool",
                name: "liquidated",
                type: "bool",
              },
              {
                internalType: "uint64",
                name: "ethPriceAtWithdraw",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "withdrawTime",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "aBondTokensAmount",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "strikePrice",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "optionFees",
                type: "uint128",
              },
            ],
            internalType: "struct ITreasury.DepositDetails",
            name: "depositDetails",
            type: "tuple",
          },
        ],
        internalType: "struct ITreasury.GetBorrowingResult",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "maximum",
        type: "bool",
      },
    ],
    name: "getExternalProtocolCumulativeRate",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrowing",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_abondAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_cdsContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrowLiquidation",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdt",
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
    name: "noOfBorrowers",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
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
    inputs: [
      {
        internalType: "enum ITreasury.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokensToSend",
            type: "uint256",
          },
        ],
        internalType: "struct ITreasury.USDaOftTransferData",
        name: "_oftTransferData",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nativeTokensToSend",
            type: "uint256",
          },
        ],
        internalType: "struct ITreasury.NativeTokenTransferData",
        name: "_nativeTokenTransferData",
        type: "tuple",
      },
    ],
    name: "oftOrNativeReceiveFromOtherChains",
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
    name: "omniChainTreasuryEthProfitsOfLiquidators",
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
    name: "omniChainTreasuryNoOfBorrowers",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "omniChainTreasuryTotalVolumeOfBorrowersAmountinUSD",
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
    name: "omniChainTreasuryTotalVolumeOfBorrowersAmountinWei",
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
        internalType: "enum ITreasury.FunctionToDo",
        name: "_functionToDo",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokensToSend",
            type: "uint256",
          },
        ],
        internalType: "struct ITreasury.USDaOftTransferData",
        name: "_oftTransferData",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nativeTokensToSend",
            type: "uint256",
          },
        ],
        internalType: "struct ITreasury.NativeTokenTransferData",
        name: "_nativeTokenTransferData",
        type: "tuple",
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
        internalType: "address",
        name: "_treasuryAddress",
        type: "address",
      },
    ],
    name: "setDstTreasuryAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wethGateway",
        type: "address",
      },
      {
        internalType: "address",
        name: "_comet",
        type: "address",
      },
      {
        internalType: "address",
        name: "_aavePoolAddressProvider",
        type: "address",
      },
      {
        internalType: "address",
        name: "_aToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
    ],
    name: "setExternalProtocolAddresses",
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
    inputs: [],
    name: "totalVolumeOfBorrowersAmountinUSD",
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
    name: "totalVolumeOfBorrowersAmountinWei",
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
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "transferEthToCdsLiquidators",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "operation",
        type: "bool",
      },
    ],
    name: "updateAbondUSDaPool",
    outputs: [],
    stateMutability: "nonpayable",
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
      {
        components: [
          {
            internalType: "uint64",
            name: "depositedTime",
            type: "uint64",
          },
          {
            internalType: "uint128",
            name: "depositedAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "depositedAmountUsdValue",
            type: "uint128",
          },
          {
            internalType: "uint64",
            name: "downsidePercentage",
            type: "uint64",
          },
          {
            internalType: "uint128",
            name: "ethPriceAtDeposit",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "borrowedAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "normalizedAmount",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "withdrawed",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "withdrawAmount",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "liquidated",
            type: "bool",
          },
          {
            internalType: "uint64",
            name: "ethPriceAtWithdraw",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "withdrawTime",
            type: "uint64",
          },
          {
            internalType: "uint128",
            name: "aBondTokensAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "strikePrice",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "optionFees",
            type: "uint128",
          },
        ],
        internalType: "struct ITreasury.DepositDetails",
        name: "depositDetail",
        type: "tuple",
      },
    ],
    name: "updateDepositDetails",
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
      {
        internalType: "bool",
        name: "operation",
        type: "bool",
      },
    ],
    name: "updateEthProfitsOfLiquidators",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_bool",
        type: "bool",
      },
    ],
    name: "updateHasBorrowed",
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
    name: "updateInterestFromExternalProtocol",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "updateTotalBorrowedAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "updateTotalDepositedAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "updateTotalInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "updateTotalInterestFromLiquidation",
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
      {
        internalType: "bool",
        name: "operation",
        type: "bool",
      },
    ],
    name: "updateUSDaGainedFromLiquidation",
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
    name: "usdaGainedFromLiquidation",
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
        name: "borrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "withdrawExternalProtocolInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "aBondAmount",
        type: "uint128",
      },
    ],
    name: "withdrawFromExternalProtocol",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
