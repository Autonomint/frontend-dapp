export const OPTIONSABI = [
  {
    inputs: [{ internalType: "uint8", name: "percent", type: "uint8" }],
    name: "depositOption",
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
