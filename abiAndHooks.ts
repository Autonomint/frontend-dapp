import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ABOND
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const abondAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InsufficientBalance' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFromUser',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      { name: 'ethBacked', internalType: 'uint128', type: 'uint128' },
      { name: 'cumulativeRate', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setAbondData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setBorrowingContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'userStates',
    outputs: [
      { name: 'cumulativeRate', internalType: 'uint256', type: 'uint256' },
      { name: 'ethBacked', internalType: 'uint128', type: 'uint128' },
      { name: 'aBondBalance', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'userStatesAtDeposits',
    outputs: [
      { name: 'cumulativeRate', internalType: 'uint256', type: 'uint256' },
      { name: 'ethBacked', internalType: 'uint128', type: 'uint128' },
      { name: 'aBondBalance', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const abondAddress = {
  84532: '0xEb8A1381078500311D84Ae8673fcbd098D82Fc83',
  11155111: '0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const abondConfig = { address: abondAddress, abi: abondAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BorrowingContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const borrowingContractAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'Borrowing_DepositFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_GettingETHPriceFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_LiquidateBurnFailed' },
  {
    type: 'error',
    inputs: [],
    name: 'Borrowing_LiquidateEthTransferToCdsFailed',
  },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawBurnFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawEthTransferFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawUSDaTransferFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_abondMintFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_usdaMintFailed' },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  {
    type: 'error',
    inputs: [{ name: 'optionType', internalType: 'uint16', type: 'uint16' }],
    name: 'InvalidOptionType',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'depositedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'normalizedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'depositedTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'ethPrice',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'borrowAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'strikePrice',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
      {
        name: 'optionsFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'strikePricePercent',
        internalType: 'enum IOptions.StrikePrice',
        type: 'uint8',
        indexed: false,
      },
      { name: 'APR', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'liquidationAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'profits',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'ethAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'availableLiquidationAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Liquidate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'withdrawTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'withdrawAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'noOfAbond',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'borrowDebt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'calculateCumulativeRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: 'currentEthPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateRatio',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_strikePercent',
        internalType: 'enum IOptions.StrikePrice',
        type: 'uint8',
      },
      { name: '_strikePrice', internalType: 'uint64', type: 'uint64' },
      { name: '_volatility', internalType: 'uint256', type: 'uint256' },
      { name: '_depositingAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositTokens',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'aBondAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'getAbondYields',
    outputs: [
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLTV',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getUSDValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_cds', internalType: 'address', type: 'address' },
      { name: '_abondToken', internalType: 'address', type: 'address' },
      { name: '_multiSign', internalType: 'address', type: 'address' },
      { name: '_priceFeedAddress', internalType: 'address', type: 'address' },
      { name: 'chainId', internalType: 'uint64', type: 'uint64' },
      { name: '_globalVariables', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastCumulativeRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'liquidate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'aBondAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'redeemYields',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_APR', internalType: 'uint8', type: 'uint8' },
      { name: '_ratePerSec', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setAPR',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_admin', internalType: 'address', type: 'address' }],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_bondRatio', internalType: 'uint64', type: 'uint64' }],
    name: 'setBondRatio',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_borrowLiquidation', internalType: 'address', type: 'address' },
    ],
    name: 'setBorrowLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_LTV', internalType: 'uint8', type: 'uint8' }],
    name: 'setLTV',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_options', internalType: 'address', type: 'address' }],
    name: 'setOptions',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateLastEthVaultValue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'usdaPrice', internalType: 'uint32', type: 'uint32' }],
    name: 'updateRatePerSecByUSDaPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usda',
    outputs: [{ name: '', internalType: 'contract IUSDa', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_toAddress', internalType: 'address', type: 'address' },
      { name: '_index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withDraw',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const borrowingContractAddress = {
  84532: '0x6502432f446402B8F225E639B95d4d03317A26E4',
  11155111: '0x9E86696B805B739ba42a2Ef91ae4d75380B681aA',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const borrowingContractConfig = {
  address: borrowingContractAddress,
  abi: borrowingContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CDS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const cdsAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  {
    type: 'error',
    inputs: [{ name: 'optionType', internalType: 'uint16', type: 'uint16' }],
    name: 'InvalidOptionType',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'depositedUSDa',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'depositedUSDT',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'depositedTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'ethPriceAtDeposit',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'lockingPeriod',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'liquidationAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'optedForLiquidation',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'withdrawUSDa',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'withdrawTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'withdrawETH',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'ethPriceAtWithdraw',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'optionsFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'optionsFeesWithdrawn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'fees', internalType: 'uint128', type: 'uint128' }],
    name: 'calculateCumulativeRate',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cdsCount',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'cdsDetails',
    outputs: [
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      { name: 'hasDeposited', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'usdtAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'usdaAmount', internalType: 'uint128', type: 'uint128' },
      { name: '_liquidate', internalType: 'bool', type: 'bool' },
      { name: '_liquidationAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'lockingPeriod', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'depositor', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'getCDSDepositDetails',
    outputs: [
      {
        name: '',
        internalType: 'struct CDSInterface.CdsAccountDetails',
        type: 'tuple',
        components: [
          { name: 'depositedTime', internalType: 'uint64', type: 'uint64' },
          { name: 'depositedAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawedTime', internalType: 'uint64', type: 'uint64' },
          {
            name: 'withdrawedAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'withdrawed', internalType: 'bool', type: 'bool' },
          { name: 'depositPrice', internalType: 'uint128', type: 'uint128' },
          { name: 'depositValue', internalType: 'uint128', type: 'uint128' },
          { name: 'depositValueSign', internalType: 'bool', type: 'bool' },
          { name: 'optedLiquidation', internalType: 'bool', type: 'bool' },
          {
            name: 'InitialLiquidationAmount',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'liquidationAmount',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'liquidationindex',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'normalizedAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      { name: '', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_usda', internalType: 'address', type: 'address' },
      { name: 'priceFeed', internalType: 'address', type: 'address' },
      { name: '_usdt', internalType: 'address', type: 'address' },
      { name: '_multiSign', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_usdaAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'usdaPrice', internalType: 'uint64', type: 'uint64' },
      { name: 'usdtPrice', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'redeemUSDT',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_admin', internalType: 'address', type: 'address' }],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setBorrowLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setBorrowingContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setGlobalVariables',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'percent', internalType: 'uint8', type: 'uint8' }],
    name: 'setUSDaLimit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint64', type: 'uint64' }],
    name: 'setUsdtLimit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_timeLimit', internalType: 'uint64', type: 'uint64' }],
    name: 'setWithdrawTimeLimit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAvailableLiquidationAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalCdsDepositedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'index', internalType: 'uint128', type: 'uint128' },
      {
        name: 'liquidationData',
        internalType: 'struct CDSInterface.LiquidationInfo',
        type: 'tuple',
        components: [
          {
            name: 'liquidationAmount',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'profits', internalType: 'uint128', type: 'uint128' },
          { name: 'ethAmount', internalType: 'uint128', type: 'uint128' },
          {
            name: 'availableLiquidationAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'updateLiquidationInfo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateTotalAvailableLiquidationAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint128', type: 'uint128' }],
    name: 'updateTotalCdsDepositedAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint128', type: 'uint128' }],
    name: 'updateTotalCdsDepositedAmountWithOptionFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usda',
    outputs: [{ name: '', internalType: 'contract IUSDa', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdaLimit',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdtAmountDepositedTillNow',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdtLimit',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_index', internalType: 'uint64', type: 'uint64' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const cdsAddress = {
  84532: '0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919',
  11155111: '0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const cdsConfig = { address: cdsAddress, abi: cdsAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const globalAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EndPointUnavailable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  {
    type: 'error',
    inputs: [{ name: 'optionType', internalType: 'uint16', type: 'uint16' }],
    name: 'InvalidOptionType',
  },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getOmniChainData',
    outputs: [
      {
        name: '',
        internalType: 'struct IGlobalVariables.OmniChainData',
        type: 'tuple',
        components: [
          {
            name: 'normalizedAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'ethVaultValue', internalType: 'uint256', type: 'uint256' },
          { name: 'cdsPoolValue', internalType: 'uint256', type: 'uint256' },
          { name: 'totalCDSPool', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ethRemainingInWithdraw',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'ethValueRemainingInWithdraw',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'noOfLiquidations',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          { name: 'cdsCount', internalType: 'uint64', type: 'uint64' },
          {
            name: 'totalCdsDepositedAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalCdsDepositedAmountWithOptionFees',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalAvailableLiquidationAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'usdtAmountDepositedTillNow',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'burnedUSDaInRedeem',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'lastCumulativeRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'totalVolumeOfBorrowersAmountinWei',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalVolumeOfBorrowersAmountinUSD',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'noOfBorrowers', internalType: 'uint128', type: 'uint128' },
          { name: 'totalInterest', internalType: 'uint256', type: 'uint256' },
          { name: 'abondUSDaPool', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ethProfitsOfLiquidators',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'usdaGainedFromLiquidation',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalInterestFromLiquidation',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'interestFromExternalProtocolDuringLiquidation',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_usda', internalType: 'address', type: 'address' },
      { name: '_cds', internalType: 'address', type: 'address' },
      { name: '_endpoint', internalType: 'address', type: 'address' },
      { name: '_delegate', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
      { name: '_sender', internalType: 'address', type: 'address' },
    ],
    name: 'isComposeMsgSender',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_functionToDo',
        internalType: 'enum IGlobalVariables.FunctionToDo',
        type: 'uint8',
      },
      {
        name: '_oftTransferData',
        internalType: 'struct IGlobalVariables.USDaOftTransferData',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'tokensToSend', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_nativeTokenTransferData',
        internalType: 'struct IGlobalVariables.NativeTokenTransferData',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'nativeTokensToSend',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      { name: '_refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'oftOrNativeReceiveFromOtherChains',
    outputs: [
      {
        name: 'receipt',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_functionToDo',
        internalType: 'enum IGlobalVariables.FunctionToDo',
        type: 'uint8',
      },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quote',
    outputs: [
      {
        name: 'fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_functionToDo',
        internalType: 'enum IGlobalVariables.FunctionToDo',
        type: 'uint8',
      },
      {
        name: '_fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
      { name: '_refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'send',
    outputs: [
      {
        name: 'receipt',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_functionToDo',
        internalType: 'enum IGlobalVariables.FunctionToDo',
        type: 'uint8',
      },
      { name: '_liqIndex', internalType: 'uint128', type: 'uint128' },
      {
        name: '_liquidationInfo',
        internalType: 'struct CDSInterface.LiquidationInfo',
        type: 'tuple',
        components: [
          {
            name: 'liquidationAmount',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'profits', internalType: 'uint128', type: 'uint128' },
          { name: 'ethAmount', internalType: 'uint128', type: 'uint128' },
          {
            name: 'availableLiquidationAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      {
        name: '_fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
      { name: '_refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'sendForLiquidation',
    outputs: [
      {
        name: 'receipt',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrowLiq', internalType: 'address', type: 'address' }],
    name: 'setBorrowLiq',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrow', internalType: 'address', type: 'address' }],
    name: 'setBorrowing',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_eid', internalType: 'uint32', type: 'uint32' }],
    name: 'setDstEid',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_globalVariables', internalType: 'address', type: 'address' },
    ],
    name: 'setDstGlobalVariablesAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_omniChainData',
        internalType: 'struct IGlobalVariables.OmniChainData',
        type: 'tuple',
        components: [
          {
            name: 'normalizedAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'ethVaultValue', internalType: 'uint256', type: 'uint256' },
          { name: 'cdsPoolValue', internalType: 'uint256', type: 'uint256' },
          { name: 'totalCDSPool', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ethRemainingInWithdraw',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'ethValueRemainingInWithdraw',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'noOfLiquidations',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          { name: 'cdsCount', internalType: 'uint64', type: 'uint64' },
          {
            name: 'totalCdsDepositedAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalCdsDepositedAmountWithOptionFees',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalAvailableLiquidationAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'usdtAmountDepositedTillNow',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'burnedUSDaInRedeem',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'lastCumulativeRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'totalVolumeOfBorrowersAmountinWei',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalVolumeOfBorrowersAmountinUSD',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'noOfBorrowers', internalType: 'uint128', type: 'uint128' },
          { name: 'totalInterest', internalType: 'uint256', type: 'uint256' },
          { name: 'abondUSDaPool', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ethProfitsOfLiquidators',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'usdaGainedFromLiquidation',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalInterestFromLiquidation',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'interestFromExternalProtocolDuringLiquidation',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'setOmniChainData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const globalAddress = {
  84532: '0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b',
  11155111: '0xA687412e7De672a5F945B15Db24c50F91512A19C',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const globalConfig = { address: globalAddress, abi: globalAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Options
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const optionsAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_ethPrice', internalType: 'uint128', type: 'uint128' },
      { name: '_ethVolatility', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      {
        name: '_strikePrice',
        internalType: 'enum Options.StrikePrice',
        type: 'uint8',
      },
    ],
    name: 'calculateOptionPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'depositedAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'strikePrice', internalType: 'uint128', type: 'uint128' },
      { name: 'ethPrice', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'calculateStrikePriceGains',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_treasuryAddress', internalType: 'address', type: 'address' },
      { name: '_cdsAddress', internalType: 'address', type: 'address' },
      { name: '_borrowingAddress', internalType: 'address', type: 'address' },
      { name: '_globalVariables', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const optionsAddress = {
  84532: '0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416',
  11155111: '0xc28aED6c4b9C05B457fa2367799B803B02785972',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const optionsConfig = {
  address: optionsAddress,
  abi: optionsAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TESTUSDT_ABI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const testusdtAbiAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'EndPointUnavailable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidLocalDecimals' },
  {
    type: 'error',
    inputs: [{ name: 'options', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidOptions',
  },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
  },
  { type: 'error', inputs: [], name: 'OnlySelf' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'error',
    inputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
    name: 'SimulationResult',
  },
  {
    type: 'error',
    inputs: [
      { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SlippageExceeded',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_enforcedOptions',
        internalType: 'struct EnforcedOptionParam[]',
        type: 'tuple[]',
        components: [
          { name: 'eid', internalType: 'uint32', type: 'uint32' },
          { name: 'msgType', internalType: 'uint16', type: 'uint16' },
          { name: 'options', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
    ],
    name: 'EnforcedOptionSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'inspector',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'MsgInspectorSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'srcEid',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'toAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountReceivedLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OFTReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'dstEid',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'fromAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountSentLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountReceivedLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OFTSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'preCrimeAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PreCrimeSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SEND',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SEND_AND_CALL',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'approvalRequired',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFromUser',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_msgType', internalType: 'uint16', type: 'uint16' },
      { name: '_extraOptions', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'combineOptions',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimalConversionRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'msgType', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'enforcedOptions',
    outputs: [{ name: 'enforcedOption', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_lzEndpoint', internalType: 'address', type: 'address' },
      { name: '_delegate', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
      { name: '_sender', internalType: 'address', type: 'address' },
    ],
    name: 'isComposeMsgSender',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isPeer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_packets',
        internalType: 'struct InboundPacket[]',
        type: 'tuple[]',
        components: [
          {
            name: 'origin',
            internalType: 'struct Origin',
            type: 'tuple',
            components: [
              { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
              { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
              { name: 'nonce', internalType: 'uint64', type: 'uint64' },
            ],
          },
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'executor', internalType: 'address', type: 'address' },
          { name: 'message', internalType: 'bytes', type: 'bytes' },
          { name: 'extraData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'lzReceiveAndRevert',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceiveSimulate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'msgInspector',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oApp',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oftVersion',
    outputs: [
      { name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' },
      { name: 'version', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'preCrime',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'quoteOFT',
    outputs: [
      {
        name: 'oftLimit',
        internalType: 'struct OFTLimit',
        type: 'tuple',
        components: [
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'maxAmountLD', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'oftFeeDetails',
        internalType: 'struct OFTFeeDetail[]',
        type: 'tuple[]',
        components: [
          { name: 'feeAmountLD', internalType: 'int256', type: 'int256' },
          { name: 'description', internalType: 'string', type: 'string' },
        ],
      },
      {
        name: 'oftReceipt',
        internalType: 'struct OFTReceipt',
        type: 'tuple',
        components: [
          { name: 'amountSentLD', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountReceivedLD',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quoteSend',
    outputs: [
      {
        name: 'msgFee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: '_fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'send',
    outputs: [
      {
        name: 'msgReceipt',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
      {
        name: 'oftReceipt',
        internalType: 'struct OFTReceipt',
        type: 'tuple',
        components: [
          { name: 'amountSentLD', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountReceivedLD',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_eid', internalType: 'uint32', type: 'uint32' }],
    name: 'setDstEid',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_enforcedOptions',
        internalType: 'struct EnforcedOptionParam[]',
        type: 'tuple[]',
        components: [
          { name: 'eid', internalType: 'uint32', type: 'uint32' },
          { name: 'msgType', internalType: 'uint16', type: 'uint16' },
          { name: 'options', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'setEnforcedOptions',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_msgInspector', internalType: 'address', type: 'address' },
    ],
    name: 'setMsgInspector',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_preCrime', internalType: 'address', type: 'address' }],
    name: 'setPreCrime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sharedDecimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const testusdtAbiAddress = {
  84532: '0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0',
  11155111: '0x80521C415b472B52854E4D19F187D050AD5ECAbA',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const testusdtAbiConfig = {
  address: testusdtAbiAddress,
  abi: testusdtAbiAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Treasury
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const treasuryAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'Borrowing_DepositFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_GettingETHPriceFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_LiquidateBurnFailed' },
  {
    type: 'error',
    inputs: [],
    name: 'Borrowing_LiquidateEthTransferToCdsFailed',
  },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawBurnFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawEthTransferFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawUSDaTransferFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_abondMintFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_usdaMintFailed' },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  {
    type: 'error',
    inputs: [{ name: 'optionType', internalType: 'uint16', type: 'uint16' }],
    name: 'InvalidOptionType',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'depositedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'normalizedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'depositedTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'ethPrice',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'borrowAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'strikePrice',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
      {
        name: 'optionsFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'strikePricePercent',
        internalType: 'enum IOptions.StrikePrice',
        type: 'uint8',
        indexed: false,
      },
      { name: 'APR', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'liquidationAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'profits',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'ethAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'availableLiquidationAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Liquidate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'withdrawTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'withdrawAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'noOfAbond',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'borrowDebt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'calculateCumulativeRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: 'currentEthPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateRatio',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_strikePercent',
        internalType: 'enum IOptions.StrikePrice',
        type: 'uint8',
      },
      { name: '_strikePrice', internalType: 'uint64', type: 'uint64' },
      { name: '_volatility', internalType: 'uint256', type: 'uint256' },
      { name: '_depositingAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositTokens',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'aBondAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'getAbondYields',
    outputs: [
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLTV',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getUSDValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_cds', internalType: 'address', type: 'address' },
      { name: '_abondToken', internalType: 'address', type: 'address' },
      { name: '_multiSign', internalType: 'address', type: 'address' },
      { name: '_priceFeedAddress', internalType: 'address', type: 'address' },
      { name: 'chainId', internalType: 'uint64', type: 'uint64' },
      { name: '_globalVariables', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastCumulativeRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'liquidate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'aBondAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'redeemYields',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_APR', internalType: 'uint8', type: 'uint8' },
      { name: '_ratePerSec', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setAPR',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_admin', internalType: 'address', type: 'address' }],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_bondRatio', internalType: 'uint64', type: 'uint64' }],
    name: 'setBondRatio',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_borrowLiquidation', internalType: 'address', type: 'address' },
    ],
    name: 'setBorrowLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_LTV', internalType: 'uint8', type: 'uint8' }],
    name: 'setLTV',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_options', internalType: 'address', type: 'address' }],
    name: 'setOptions',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateLastEthVaultValue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'usdaPrice', internalType: 'uint32', type: 'uint32' }],
    name: 'updateRatePerSecByUSDaPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usda',
    outputs: [{ name: '', internalType: 'contract IUSDa', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_toAddress', internalType: 'address', type: 'address' },
      { name: '_index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withDraw',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const treasuryAddress = {
  84532: '0x13a7b78e65c7E389cc56Fc66a0342F90730120A8',
  11155111: '0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const treasuryConfig = {
  address: treasuryAddress,
  abi: treasuryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDa
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const usDaAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'EndPointUnavailable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidLocalDecimals' },
  {
    type: 'error',
    inputs: [{ name: 'options', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidOptions',
  },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
  },
  { type: 'error', inputs: [], name: 'OnlySelf' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'error',
    inputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
    name: 'SimulationResult',
  },
  {
    type: 'error',
    inputs: [
      { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SlippageExceeded',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_enforcedOptions',
        internalType: 'struct EnforcedOptionParam[]',
        type: 'tuple[]',
        components: [
          { name: 'eid', internalType: 'uint32', type: 'uint32' },
          { name: 'msgType', internalType: 'uint16', type: 'uint16' },
          { name: 'options', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
    ],
    name: 'EnforcedOptionSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'inspector',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'MsgInspectorSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'srcEid',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'toAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountReceivedLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OFTReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'dstEid',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'fromAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountSentLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountReceivedLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OFTSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'preCrimeAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PreCrimeSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SEND',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SEND_AND_CALL',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'approvalRequired',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFromUser',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_msgType', internalType: 'uint16', type: 'uint16' },
      { name: '_extraOptions', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'combineOptions',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimalConversionRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'msgType', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'enforcedOptions',
    outputs: [{ name: 'enforcedOption', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_lzEndpoint', internalType: 'address', type: 'address' },
      { name: '_delegate', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
      { name: '_sender', internalType: 'address', type: 'address' },
    ],
    name: 'isComposeMsgSender',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isPeer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_packets',
        internalType: 'struct InboundPacket[]',
        type: 'tuple[]',
        components: [
          {
            name: 'origin',
            internalType: 'struct Origin',
            type: 'tuple',
            components: [
              { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
              { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
              { name: 'nonce', internalType: 'uint64', type: 'uint64' },
            ],
          },
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'executor', internalType: 'address', type: 'address' },
          { name: 'message', internalType: 'bytes', type: 'bytes' },
          { name: 'extraData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'lzReceiveAndRevert',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceiveSimulate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'msgInspector',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oApp',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oftVersion',
    outputs: [
      { name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' },
      { name: 'version', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'preCrime',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'quoteOFT',
    outputs: [
      {
        name: 'oftLimit',
        internalType: 'struct OFTLimit',
        type: 'tuple',
        components: [
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'maxAmountLD', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'oftFeeDetails',
        internalType: 'struct OFTFeeDetail[]',
        type: 'tuple[]',
        components: [
          { name: 'feeAmountLD', internalType: 'int256', type: 'int256' },
          { name: 'description', internalType: 'string', type: 'string' },
        ],
      },
      {
        name: 'oftReceipt',
        internalType: 'struct OFTReceipt',
        type: 'tuple',
        components: [
          { name: 'amountSentLD', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountReceivedLD',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quoteSend',
    outputs: [
      {
        name: 'msgFee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: '_fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'send',
    outputs: [
      {
        name: 'msgReceipt',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
      {
        name: 'oftReceipt',
        internalType: 'struct OFTReceipt',
        type: 'tuple',
        components: [
          { name: 'amountSentLD', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountReceivedLD',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setBorrowingContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setCdsContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_eid', internalType: 'uint32', type: 'uint32' }],
    name: 'setDstEid',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_enforcedOptions',
        internalType: 'struct EnforcedOptionParam[]',
        type: 'tuple[]',
        components: [
          { name: 'eid', internalType: 'uint32', type: 'uint32' },
          { name: 'msgType', internalType: 'uint16', type: 'uint16' },
          { name: 'options', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'setEnforcedOptions',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_msgInspector', internalType: 'address', type: 'address' },
    ],
    name: 'setMsgInspector',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_preCrime', internalType: 'address', type: 'address' }],
    name: 'setPreCrime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sharedDecimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const usDaAddress = {
  84532: '0xD2007Ccf1847ab47323EF82E00367F25EC43a619',
  11155111: '0x5c8403C18BE1A7127d6526e43DfE61e2175105E4',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const usDaConfig = { address: usDaAddress, abi: usDaAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbond = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondAllowance = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondDecimals = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondName = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondOwner = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondPaused = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondSymbol = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"userStates"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondUserStates = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'userStates',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"userStatesAtDeposits"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useReadAbondUserStatesAtDeposits =
  /*#__PURE__*/ createUseReadContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'userStatesAtDeposits',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbond = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondApprove = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondBurn = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'burnFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondBurnFromUser = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'burnFromUser',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondMint = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondPause = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"setAbondData"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondSetAbondData = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'setAbondData',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"setBorrowingContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondSetBorrowingContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'setBorrowingContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWriteAbondUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbond = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondBurnFrom = /*#__PURE__*/ createUseSimulateContract(
  { abi: abondAbi, address: abondAddress, functionName: 'burnFrom' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondBurnFromUser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'burnFromUser',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondMint = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondPause = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"setAbondData"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondSetAbondData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'setAbondData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"setBorrowingContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondSetBorrowingContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'setBorrowingContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondTransfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: abondAbi, address: abondAddress, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useSimulateAbondUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: abondAbi,
    address: abondAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link abondAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWatchAbondEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: abondAbi,
  address: abondAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link abondAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWatchAbondApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: abondAbi,
    address: abondAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link abondAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWatchAbondInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: abondAbi,
    address: abondAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link abondAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWatchAbondOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: abondAbi,
    address: abondAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link abondAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWatchAbondPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: abondAbi,
    address: abondAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link abondAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWatchAbondTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: abondAbi,
    address: abondAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link abondAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWatchAbondUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: abondAbi,
    address: abondAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link abondAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xEb8A1381078500311D84Ae8673fcbd098D82Fc83)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0EbAbA5970E10Cf96Ab515852620dC016C6a6A4b)
 */
export const useWatchAbondUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: abondAbi,
    address: abondAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContract = /*#__PURE__*/ createUseReadContract({
  abi: borrowingContractAbi,
  address: borrowingContractAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContractUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"admin"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContractAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'admin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"getAbondYields"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContractGetAbondYields =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'getAbondYields',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"getLTV"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContractGetLtv =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'getLTV',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"getUSDValue"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContractGetUsdValue =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'getUSDValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"lastCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContractLastCumulativeRate =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'lastCumulativeRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContractOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContractProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"usda"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useReadBorrowingContractUsda = /*#__PURE__*/ createUseReadContract(
  {
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'usda',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContract = /*#__PURE__*/ createUseWriteContract({
  abi: borrowingContractAbi,
  address: borrowingContractAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractCalculateCumulativeRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'calculateCumulativeRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"calculateRatio"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractCalculateRatio =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'calculateRatio',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"depositTokens"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractDepositTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'depositTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"liquidate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractLiquidate =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'liquidate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"redeemYields"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractRedeemYields =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'redeemYields',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setAPR"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractSetApr =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setAPR',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setAdmin"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractSetAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setBondRatio"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractSetBondRatio =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setBondRatio',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setBorrowLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractSetBorrowLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setBorrowLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setLTV"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractSetLtv =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setLTV',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractSetOptions =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setOptions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractSetTreasury =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"updateLastEthVaultValue"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractUpdateLastEthVaultValue =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'updateLastEthVaultValue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"updateRatePerSecByUSDaPrice"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractUpdateRatePerSecByUsDaPrice =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'updateRatePerSecByUSDaPrice',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"withDraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWriteBorrowingContractWithDraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'withDraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractCalculateCumulativeRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'calculateCumulativeRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"calculateRatio"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractCalculateRatio =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'calculateRatio',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"depositTokens"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractDepositTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'depositTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"liquidate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractLiquidate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'liquidate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"redeemYields"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractRedeemYields =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'redeemYields',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setAPR"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractSetApr =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setAPR',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setAdmin"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractSetAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setBondRatio"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractSetBondRatio =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setBondRatio',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setBorrowLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractSetBorrowLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setBorrowLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setLTV"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractSetLtv =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setLTV',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractSetOptions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setOptions',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"updateLastEthVaultValue"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractUpdateLastEthVaultValue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'updateLastEthVaultValue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"updateRatePerSecByUSDaPrice"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractUpdateRatePerSecByUsDaPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'updateRatePerSecByUSDaPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"withDraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useSimulateBorrowingContractWithDraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'withDraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWatchBorrowingContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__ and `eventName` set to `"Deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWatchBorrowingContractDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWatchBorrowingContractInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__ and `eventName` set to `"Liquidate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWatchBorrowingContractLiquidateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    eventName: 'Liquidate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWatchBorrowingContractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWatchBorrowingContractUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__ and `eventName` set to `"Withdraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6502432f446402B8F225E639B95d4d03317A26E4)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9E86696B805B739ba42a2Ef91ae4d75380B681aA)
 */
export const useWatchBorrowingContractWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCds = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"admin"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsAdmin = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'admin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"cdsCount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsCdsCount = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'cdsCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"cdsDetails"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsCdsDetails = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'cdsDetails',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"getCDSDepositDetails"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsGetCdsDepositDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'getCDSDepositDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsOwner = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"totalAvailableLiquidationAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsTotalAvailableLiquidationAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'totalAvailableLiquidationAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"totalCdsDepositedAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsTotalCdsDepositedAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'totalCdsDepositedAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"usda"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsUsda = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'usda',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"usdaLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsUsdaLimit = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'usdaLimit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"usdtAmountDepositedTillNow"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsUsdtAmountDepositedTillNow =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'usdtAmountDepositedTillNow',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"usdtLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useReadCdsUsdtLimit = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'usdtLimit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCds = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsCalculateCumulativeRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'calculateCumulativeRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"redeemUSDT"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsRedeemUsdt = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'redeemUSDT',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setAdmin"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsSetAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setAdmin',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setBorrowLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsSetBorrowLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setBorrowLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setBorrowingContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsSetBorrowingContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setBorrowingContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setGlobalVariables"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsSetGlobalVariables =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setGlobalVariables',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsSetTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setTreasury',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setUSDaLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsSetUsDaLimit = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setUSDaLimit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setUsdtLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsSetUsdtLimit = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setUsdtLimit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setWithdrawTimeLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsSetWithdrawTimeLimit =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setWithdrawTimeLimit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"updateLiquidationInfo"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsUpdateLiquidationInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'updateLiquidationInfo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"updateTotalAvailableLiquidationAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsUpdateTotalAvailableLiquidationAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'updateTotalAvailableLiquidationAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"updateTotalCdsDepositedAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsUpdateTotalCdsDepositedAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'updateTotalCdsDepositedAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"updateTotalCdsDepositedAmountWithOptionFees"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsUpdateTotalCdsDepositedAmountWithOptionFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'updateTotalCdsDepositedAmountWithOptionFees',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract(
  { abi: cdsAbi, address: cdsAddress, functionName: 'upgradeToAndCall' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWriteCdsWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCds = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsCalculateCumulativeRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'calculateCumulativeRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsInitialize = /*#__PURE__*/ createUseSimulateContract(
  { abi: cdsAbi, address: cdsAddress, functionName: 'initialize' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"redeemUSDT"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsRedeemUsdt = /*#__PURE__*/ createUseSimulateContract(
  { abi: cdsAbi, address: cdsAddress, functionName: 'redeemUSDT' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setAdmin"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsSetAdmin = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setAdmin',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setBorrowLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsSetBorrowLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setBorrowLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setBorrowingContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsSetBorrowingContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setBorrowingContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setGlobalVariables"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsSetGlobalVariables =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setGlobalVariables',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setUSDaLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsSetUsDaLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setUSDaLimit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setUsdtLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsSetUsdtLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setUsdtLimit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setWithdrawTimeLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsSetWithdrawTimeLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setWithdrawTimeLimit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"updateLiquidationInfo"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsUpdateLiquidationInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'updateLiquidationInfo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"updateTotalAvailableLiquidationAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsUpdateTotalAvailableLiquidationAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'updateTotalAvailableLiquidationAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"updateTotalCdsDepositedAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsUpdateTotalCdsDepositedAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'updateTotalCdsDepositedAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"updateTotalCdsDepositedAmountWithOptionFees"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsUpdateTotalCdsDepositedAmountWithOptionFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'updateTotalCdsDepositedAmountWithOptionFees',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useSimulateCdsWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWatchCdsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cdsAbi,
  address: cdsAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__ and `eventName` set to `"Deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWatchCdsDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cdsAbi,
    address: cdsAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWatchCdsInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cdsAbi,
    address: cdsAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWatchCdsOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cdsAbi,
    address: cdsAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWatchCdsUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cdsAbi,
    address: cdsAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__ and `eventName` set to `"Withdraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F)
 */
export const useWatchCdsWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cdsAbi,
    address: cdsAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobal = /*#__PURE__*/ createUseReadContract({
  abi: globalAbi,
  address: globalAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"allowInitializePath"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"endpoint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"getOmniChainData"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalGetOmniChainData =
  /*#__PURE__*/ createUseReadContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'getOmniChainData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"isComposeMsgSender"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalIsComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'isComposeMsgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"nextNonce"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"oAppVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalOAppVersion = /*#__PURE__*/ createUseReadContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'oAppVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalOwner = /*#__PURE__*/ createUseReadContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"peers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalPeers = /*#__PURE__*/ createUseReadContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"quote"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useReadGlobalQuote = /*#__PURE__*/ createUseReadContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'quote',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobal = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalLzReceive = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'lzReceive',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"oftOrNativeReceiveFromOtherChains"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalOftOrNativeReceiveFromOtherChains =
  /*#__PURE__*/ createUseWriteContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'oftOrNativeReceiveFromOtherChains',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"send"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSend = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'send',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"sendForLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSendForLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'sendForLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setBorrowLiq"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSetBorrowLiq = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'setBorrowLiq',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setBorrowing"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSetBorrowing = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'setBorrowing',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSetDelegate = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'setDelegate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSetDstEid = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'setDstEid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setDstGlobalVariablesAddress"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSetDstGlobalVariablesAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'setDstGlobalVariablesAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setOmniChainData"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSetOmniChainData =
  /*#__PURE__*/ createUseWriteContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'setOmniChainData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalSetTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'setTreasury',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWriteGlobalUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobal = /*#__PURE__*/ createUseSimulateContract({
  abi: globalAbi,
  address: globalAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalLzReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"oftOrNativeReceiveFromOtherChains"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalOftOrNativeReceiveFromOtherChains =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'oftOrNativeReceiveFromOtherChains',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"send"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSend = /*#__PURE__*/ createUseSimulateContract({
  abi: globalAbi,
  address: globalAddress,
  functionName: 'send',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"sendForLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSendForLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'sendForLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setBorrowLiq"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSetBorrowLiq =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'setBorrowLiq',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setBorrowing"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSetBorrowing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'setBorrowing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSetDstEid =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'setDstEid',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setDstGlobalVariablesAddress"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSetDstGlobalVariablesAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'setDstGlobalVariablesAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setOmniChainData"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSetOmniChainData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'setOmniChainData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSetPeer = /*#__PURE__*/ createUseSimulateContract(
  { abi: globalAbi, address: globalAddress, functionName: 'setPeer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link globalAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useSimulateGlobalUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: globalAbi,
    address: globalAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link globalAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWatchGlobalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: globalAbi,
  address: globalAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link globalAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWatchGlobalInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: globalAbi,
    address: globalAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link globalAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWatchGlobalOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: globalAbi,
    address: globalAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link globalAbi}__ and `eventName` set to `"PeerSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWatchGlobalPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: globalAbi,
    address: globalAddress,
    eventName: 'PeerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link globalAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const useWatchGlobalUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: globalAbi,
    address: globalAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optionsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useReadOptions = /*#__PURE__*/ createUseReadContract({
  abi: optionsAbi,
  address: optionsAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useReadOptionsUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"calculateOptionPrice"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useReadOptionsCalculateOptionPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'calculateOptionPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"calculateStrikePriceGains"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useReadOptionsCalculateStrikePriceGains =
  /*#__PURE__*/ createUseReadContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'calculateStrikePriceGains',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useReadOptionsOwner = /*#__PURE__*/ createUseReadContract({
  abi: optionsAbi,
  address: optionsAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useReadOptionsProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: optionsAbi,
  address: optionsAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optionsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useWriteOptions = /*#__PURE__*/ createUseWriteContract({
  abi: optionsAbi,
  address: optionsAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useWriteOptionsInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: optionsAbi,
  address: optionsAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useWriteOptionsRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useWriteOptionsTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useWriteOptionsUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link optionsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useSimulateOptions = /*#__PURE__*/ createUseSimulateContract({
  abi: optionsAbi,
  address: optionsAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useSimulateOptionsInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useSimulateOptionsRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useSimulateOptionsTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useSimulateOptionsUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: optionsAbi,
    address: optionsAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link optionsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useWatchOptionsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: optionsAbi,
  address: optionsAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link optionsAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useWatchOptionsInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: optionsAbi,
    address: optionsAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link optionsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useWatchOptionsOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: optionsAbi,
    address: optionsAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link optionsAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc28aED6c4b9C05B457fa2367799B803B02785972)
 */
export const useWatchOptionsUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: optionsAbi,
    address: optionsAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbi = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"SEND"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiSend = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'SEND',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"SEND_AND_CALL"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiSendAndCall =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'SEND_AND_CALL',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"allowInitializePath"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiAllowance = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"approvalRequired"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiApprovalRequired =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'approvalRequired',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"combineOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiCombineOptions =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'combineOptions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"decimalConversionRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiDecimalConversionRate =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'decimalConversionRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiDecimals = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"endpoint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"enforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiEnforcedOptions =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'enforcedOptions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"isComposeMsgSender"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiIsComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'isComposeMsgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"isPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiIsPeer = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'isPeer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"msgInspector"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiMsgInspector =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'msgInspector',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiName = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"nextNonce"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"oApp"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiOApp = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'oApp',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"oAppVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiOAppVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'oAppVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"oftVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiOftVersion = /*#__PURE__*/ createUseReadContract(
  {
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'oftVersion',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiOwner = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiPaused = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"peers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiPeers = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"preCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiPreCrime = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'preCrime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"quoteOFT"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiQuoteOft = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'quoteOFT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"quoteSend"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiQuoteSend = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'quoteSend',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"sharedDecimals"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiSharedDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'sharedDecimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiSymbol = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiToken = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useReadTestusdtAbiTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbi = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiApprove = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiBurn = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiBurnFrom = /*#__PURE__*/ createUseWriteContract(
  {
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'burnFrom',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiBurnFromUser =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'burnFromUser',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiLzReceive =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiLzReceiveAndRevert =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'lzReceiveAndRevert',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"lzReceiveSimulate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiLzReceiveSimulate =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'lzReceiveSimulate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiMint = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiPause = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"send"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiSend = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'send',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiSetDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiSetDstEid =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setDstEid',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setEnforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiSetEnforcedOptions =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setEnforcedOptions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setMsgInspector"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiSetMsgInspector =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setMsgInspector',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiSetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setPreCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiSetPreCrime =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setPreCrime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiTransfer = /*#__PURE__*/ createUseWriteContract(
  {
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'transfer',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWriteTestusdtAbiUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbi = /*#__PURE__*/ createUseSimulateContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'burnFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiBurnFromUser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'burnFromUser',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiLzReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiLzReceiveAndRevert =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'lzReceiveAndRevert',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"lzReceiveSimulate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiLzReceiveSimulate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'lzReceiveSimulate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"send"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiSend =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'send',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiSetDstEid =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setDstEid',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setEnforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiSetEnforcedOptions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setEnforcedOptions',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setMsgInspector"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiSetMsgInspector =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setMsgInspector',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiSetPeer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setPeer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setPreCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiSetPreCrime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'setPreCrime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useSimulateTestusdtAbiUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"EnforcedOptionSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiEnforcedOptionSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'EnforcedOptionSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"MsgInspectorSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiMsgInspectorSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'MsgInspectorSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"OFTReceived"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiOftReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'OFTReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"OFTSent"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiOftSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'OFTSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"PeerSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'PeerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"PreCrimeSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiPreCrimeSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'PreCrimeSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x701faF8A1D4E1F5FD3D6Df631354a6754D4552a0)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x80521C415b472B52854E4D19F187D050AD5ECAbA)
 */
export const useWatchTestusdtAbiUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasury = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasuryUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"admin"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasuryAdmin = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'admin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"getAbondYields"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasuryGetAbondYields =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'getAbondYields',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"getLTV"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasuryGetLtv = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'getLTV',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"getUSDValue"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasuryGetUsdValue = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'getUSDValue',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"lastCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasuryLastCumulativeRate =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'lastCumulativeRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasuryOwner = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasuryProxiableUuid = /*#__PURE__*/ createUseReadContract(
  { abi: treasuryAbi, address: treasuryAddress, functionName: 'proxiableUUID' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"usda"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useReadTreasuryUsda = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'usda',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryCalculateCumulativeRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'calculateCumulativeRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"calculateRatio"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryCalculateRatio =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'calculateRatio',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"depositTokens"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryDepositTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'depositTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"liquidate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryLiquidate = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'liquidate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"redeemYields"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryRedeemYields =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'redeemYields',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setAPR"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasurySetApr = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'setAPR',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setAdmin"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasurySetAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'setAdmin',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setBondRatio"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasurySetBondRatio =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setBondRatio',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setBorrowLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasurySetBorrowLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setBorrowLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setLTV"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasurySetLtv = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'setLTV',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasurySetOptions = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'setOptions',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasurySetTreasury = /*#__PURE__*/ createUseWriteContract(
  { abi: treasuryAbi, address: treasuryAddress, functionName: 'setTreasury' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateLastEthVaultValue"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryUpdateLastEthVaultValue =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateLastEthVaultValue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateRatePerSecByUSDaPrice"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryUpdateRatePerSecByUsDaPrice =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateRatePerSecByUSDaPrice',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withDraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWriteTreasuryWithDraw = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'withDraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasury = /*#__PURE__*/ createUseSimulateContract({
  abi: treasuryAbi,
  address: treasuryAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryCalculateCumulativeRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'calculateCumulativeRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"calculateRatio"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryCalculateRatio =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'calculateRatio',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"depositTokens"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryDepositTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'depositTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"liquidate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryLiquidate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'liquidate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"redeemYields"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryRedeemYields =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'redeemYields',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setAPR"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasurySetApr =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setAPR',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setAdmin"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasurySetAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setBondRatio"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasurySetBondRatio =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setBondRatio',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setBorrowLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasurySetBorrowLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setBorrowLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setLTV"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasurySetLtv =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setLTV',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasurySetOptions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setOptions',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasurySetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateLastEthVaultValue"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryUpdateLastEthVaultValue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateLastEthVaultValue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateRatePerSecByUSDaPrice"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryUpdateRatePerSecByUsDaPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateRatePerSecByUSDaPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withDraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useSimulateTreasuryWithDraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'withDraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWatchTreasuryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: treasuryAbi,
  address: treasuryAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"Deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWatchTreasuryDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWatchTreasuryInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"Liquidate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWatchTreasuryLiquidateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'Liquidate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWatchTreasuryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWatchTreasuryUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"Withdraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x13a7b78e65c7E389cc56Fc66a0342F90730120A8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6)
 */
export const useWatchTreasuryWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDa = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"SEND"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaSend = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'SEND',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"SEND_AND_CALL"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaSendAndCall = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'SEND_AND_CALL',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"allowInitializePath"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"approvalRequired"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaApprovalRequired = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'approvalRequired',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"combineOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaCombineOptions = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'combineOptions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"decimalConversionRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaDecimalConversionRate =
  /*#__PURE__*/ createUseReadContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'decimalConversionRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"endpoint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"enforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaEnforcedOptions = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'enforcedOptions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"isComposeMsgSender"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaIsComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'isComposeMsgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"isPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaIsPeer = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'isPeer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"msgInspector"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaMsgInspector = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'msgInspector',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaName = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"nextNonce"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"oApp"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaOApp = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'oApp',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"oAppVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaOAppVersion = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'oAppVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"oftVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaOftVersion = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'oftVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaOwner = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaPaused = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"peers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaPeers = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"preCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaPreCrime = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'preCrime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"quoteOFT"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaQuoteOft = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'quoteOFT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"quoteSend"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaQuoteSend = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'quoteSend',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"sharedDecimals"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaSharedDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'sharedDecimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaToken = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useReadUsDaTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDa = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaBurn = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burnFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaBurnFromUser = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burnFromUser',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaLzReceive = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'lzReceive',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaLzReceiveAndRevert =
  /*#__PURE__*/ createUseWriteContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'lzReceiveAndRevert',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"lzReceiveSimulate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaLzReceiveSimulate =
  /*#__PURE__*/ createUseWriteContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'lzReceiveSimulate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaMint = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaPause = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"send"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaSend = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'send',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setBorrowingContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaSetBorrowingContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'setBorrowingContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setCdsContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaSetCdsContract = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setCdsContract',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaSetDelegate = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setDelegate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaSetDstEid = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setDstEid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setEnforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaSetEnforcedOptions =
  /*#__PURE__*/ createUseWriteContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'setEnforcedOptions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setMsgInspector"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaSetMsgInspector = /*#__PURE__*/ createUseWriteContract(
  { abi: usDaAbi, address: usDaAddress, functionName: 'setMsgInspector' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaSetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setPreCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaSetPreCrime = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setPreCrime',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWriteUsDaUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDa = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaBurnFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burnFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaBurnFromUser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'burnFromUser',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaLzReceive = /*#__PURE__*/ createUseSimulateContract(
  { abi: usDaAbi, address: usDaAddress, functionName: 'lzReceive' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaLzReceiveAndRevert =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'lzReceiveAndRevert',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"lzReceiveSimulate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaLzReceiveSimulate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'lzReceiveSimulate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaMint = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaPause = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"send"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaSend = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'send',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setBorrowingContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaSetBorrowingContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'setBorrowingContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setCdsContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaSetCdsContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'setCdsContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaSetDstEid = /*#__PURE__*/ createUseSimulateContract(
  { abi: usDaAbi, address: usDaAddress, functionName: 'setDstEid' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setEnforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaSetEnforcedOptions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'setEnforcedOptions',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setMsgInspector"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaSetMsgInspector =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'setMsgInspector',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaSetPeer = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setPreCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaSetPreCrime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'setPreCrime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useSimulateUsDaUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usDaAbi,
    address: usDaAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usDaAbi,
  address: usDaAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"EnforcedOptionSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaEnforcedOptionSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'EnforcedOptionSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"MsgInspectorSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaMsgInspectorSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'MsgInspectorSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"OFTReceived"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaOftReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'OFTReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"OFTSent"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaOftSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'OFTSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"PeerSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'PeerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"PreCrimeSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaPreCrimeSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'PreCrimeSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xD2007Ccf1847ab47323EF82E00367F25EC43a619)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5c8403C18BE1A7127d6526e43DfE61e2175105E4)
 */
export const useWatchUsDaUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'Upgraded',
  })
