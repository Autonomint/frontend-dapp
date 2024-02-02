export const OPTIONSABI = [
  {
    inputs: [
      { internalType: "address", name: "_priceFeed", type: "address" },
      { internalType: "address", name: "_treasuryAddress", type: "address" },
      { internalType: "address", name: "_cdsAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "uint128", name: "_ethPrice", type: "uint128" },
      { internalType: "uint256", name: "_ethVolatility", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      {
        internalType: "enum Options.StrikePrice",
        name: "_strikePrice",
        type: "uint8",
      },
    ],
    name: "calculateOptionPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "calculateStandardDeviation",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLatestPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "updateDailyEMA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint128", name: "depositedAmount", type: "uint128" },
      { internalType: "uint128", name: "strikePrice", type: "uint128" },
      { internalType: "uint64", name: "ethPrice", type: "uint64" },
    ],
    name: "withdrawOption",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "pure",
    type: "function",
  },
] as const;
