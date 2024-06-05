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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const abondAddress = {
  84532: '0x37df4e70eDc4525Be0d7380730a7224Cf5205c14',
  11155111: '0xdd8F438822473bc650567231C940b55C3B1E98B3',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const abondConfig = { address: abondAddress, abi: abondAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BorrowingContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const borrowingContractAbi = [
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
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'depositedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'borrowAmount',
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
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'borrowDebt',
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
    inputs: [],
    name: 'omniChainBorrowingCDSPoolValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'omniChainBorrowingNoOfLiquidations',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
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
      { name: '_dstEid', internalType: 'uint32', type: 'uint32' },
      {
        name: '_message',
        internalType: 'struct IBorrowing.OmniChainBorrowingData',
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
            name: 'noOfLiquidations',
            internalType: 'uint128',
            type: 'uint128',
          },
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
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
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
    inputs: [{ name: '_ratePerSec', internalType: 'uint128', type: 'uint128' }],
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
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateLastEthVaultValue',
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const borrowingContractAddress = {
  84532: '0x739E6a6C4233011D99F68d96D8A3560E690a64A3',
  11155111: '0xE5D4b991861E70D563e7d061e017e5566935941f',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const borrowingContractConfig = {
  address: borrowingContractAddress,
  abi: borrowingContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CDS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const cdsAbi = [
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
        name: 'depositedUSDa',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'index', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'liquidationAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'normalizedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'depositVal',
        internalType: 'uint128',
        type: 'uint128',
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
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrewUSDa',
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
    inputs: [{ name: 'fees', internalType: 'uint128', type: 'uint128' }],
    name: 'calculateCumulativeRate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_dstEid', internalType: 'uint32', type: 'uint32' },
      {
        name: 'functionToDo',
        internalType: 'enum CDSInterface.FunctionToDo',
        type: 'uint8',
      },
      {
        name: 'optionsFeesToGetFromOtherChain',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'cdsAmountToGetFromOtherChain',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'liqAmountToGetFromOtherChain',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'liquidationInfo',
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
      { name: 'liqIndex', internalType: 'uint128', type: 'uint128' },
      {
        name: 'fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_options', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'callLzSendFromExternal',
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
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
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
    inputs: [],
    name: 'omniChainCDSTotalAvailableLiquidationAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'omniChainCDSTotalCdsDepositedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
      { name: '_dstEid', internalType: 'uint32', type: 'uint32' },
      {
        name: '_functionToDo',
        internalType: 'enum CDSInterface.FunctionToDo',
        type: 'uint8',
      },
      {
        name: 'optionsFeesToGetFromOtherChain',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'cdsAmountToGetFromOtherChain',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'liqAmountToGetFromOtherChain',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'liquidationInfo',
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
      { name: 'liqIndex', internalType: 'uint128', type: 'uint128' },
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
    inputs: [{ name: '_index', internalType: 'uint64', type: 'uint64' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawTimeLimit',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const cdsAddress = {
  84532: '0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A',
  11155111: '0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const cdsConfig = { address: cdsAddress, abi: cdsAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Options
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
 */
export const optionsAddress = {
  84532: '0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec',
  11155111: '0x7C6441B23f21A7A5cd5965B516D8054F119bA53f',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
 */
export const optionsConfig = {
  address: optionsAddress,
  abi: optionsAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TESTUSDT_ABI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const testusdtAbiAddress = {
  84532: '0xfBAE0d4337d936538995A26685f69644e6427213',
  11155111: '0xC1fd34E478c147f0460dc013D636c63BC407D480',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const testusdtAbiConfig = {
  address: testusdtAbiAddress,
  abi: testusdtAbiAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Treasury
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const treasuryAbi = [
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
  { type: 'error', inputs: [], name: 'Treasury_AaveDepositAndMintFailed' },
  { type: 'error', inputs: [], name: 'Treasury_AavePoolAddressZero' },
  { type: 'error', inputs: [], name: 'Treasury_AaveWithdrawFailed' },
  { type: 'error', inputs: [], name: 'Treasury_CompoundDepositAndMintFailed' },
  { type: 'error', inputs: [], name: 'Treasury_CompoundWithdrawFailed' },
  {
    type: 'error',
    inputs: [],
    name: 'Treasury_EthTransferToCdsLiquidatorFailed',
  },
  {
    type: 'error',
    inputs: [],
    name: 'Treasury_WithdrawExternalProtocolInterestFailed',
  },
  { type: 'error', inputs: [], name: 'Treasury_ZeroDeposit' },
  { type: 'error', inputs: [], name: 'Treasury_ZeroWithdraw' },
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
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'count', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DepositToAave',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'count', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DepositToCompound',
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
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'count', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawFromAave',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'count', internalType: 'uint64', type: 'uint64', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawFromCompound',
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
    name: 'abondUSDaPool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approveUSDa',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approveUsdt',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'depositor', internalType: 'address', type: 'address' }],
    name: 'borrowing',
    outputs: [
      { name: 'depositedAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'totalBorrowedAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'hasBorrowed', internalType: 'bool', type: 'bool' },
      { name: 'hasDeposited', internalType: 'bool', type: 'bool' },
      { name: 'borrowerIndex', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'aBondAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'calculateYieldsForExternalProtocol',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_depositingAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: '_ethPrice', internalType: 'uint128', type: 'uint128' },
      { name: '_depositTime', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'deposit',
    outputs: [
      {
        name: '',
        internalType: 'struct ITreasury.DepositResult',
        type: 'tuple',
        components: [
          { name: 'hasDeposited', internalType: 'bool', type: 'bool' },
          { name: 'borrowerIndex', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    stateMutability: 'payable',
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
    name: 'getBalanceInTreasury',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'depositor', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'getBorrowing',
    outputs: [
      {
        name: '',
        internalType: 'struct ITreasury.GetBorrowingResult',
        type: 'tuple',
        components: [
          { name: 'totalIndex', internalType: 'uint64', type: 'uint64' },
          {
            name: 'depositDetails',
            internalType: 'struct ITreasury.DepositDetails',
            type: 'tuple',
            components: [
              { name: 'depositedTime', internalType: 'uint64', type: 'uint64' },
              {
                name: 'depositedAmount',
                internalType: 'uint128',
                type: 'uint128',
              },
              {
                name: 'depositedAmountUsdValue',
                internalType: 'uint128',
                type: 'uint128',
              },
              {
                name: 'downsidePercentage',
                internalType: 'uint64',
                type: 'uint64',
              },
              {
                name: 'ethPriceAtDeposit',
                internalType: 'uint128',
                type: 'uint128',
              },
              {
                name: 'borrowedAmount',
                internalType: 'uint128',
                type: 'uint128',
              },
              {
                name: 'normalizedAmount',
                internalType: 'uint128',
                type: 'uint128',
              },
              { name: 'withdrawed', internalType: 'bool', type: 'bool' },
              {
                name: 'withdrawAmount',
                internalType: 'uint128',
                type: 'uint128',
              },
              { name: 'liquidated', internalType: 'bool', type: 'bool' },
              {
                name: 'ethPriceAtWithdraw',
                internalType: 'uint64',
                type: 'uint64',
              },
              { name: 'withdrawTime', internalType: 'uint64', type: 'uint64' },
              {
                name: 'aBondTokensAmount',
                internalType: 'uint128',
                type: 'uint128',
              },
              { name: 'strikePrice', internalType: 'uint128', type: 'uint128' },
              { name: 'optionFees', internalType: 'uint128', type: 'uint128' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'maximum', internalType: 'bool', type: 'bool' }],
    name: 'getExternalProtocolCumulativeRate',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_borrowing', internalType: 'address', type: 'address' },
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_abondAddress', internalType: 'address', type: 'address' },
      { name: '_cdsContract', internalType: 'address', type: 'address' },
      { name: '_borrowLiquidation', internalType: 'address', type: 'address' },
      { name: '_usdt', internalType: 'address', type: 'address' },
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
    name: 'noOfBorrowers',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
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
        internalType: 'enum ITreasury.FunctionToDo',
        type: 'uint8',
      },
      {
        name: '_oftTransferData',
        internalType: 'struct ITreasury.USDaOftTransferData',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'tokensToSend', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_nativeTokenTransferData',
        internalType: 'struct ITreasury.NativeTokenTransferData',
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
    name: 'omniChainTreasuryEthProfitsOfLiquidators',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'omniChainTreasuryNoOfBorrowers',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'omniChainTreasuryTotalVolumeOfBorrowersAmountinUSD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'omniChainTreasuryTotalVolumeOfBorrowersAmountinWei',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
      { name: '_dstEid', internalType: 'uint32', type: 'uint32' },
      {
        name: '_functionToDo',
        internalType: 'enum ITreasury.FunctionToDo',
        type: 'uint8',
      },
      {
        name: '_oftTransferData',
        internalType: 'struct ITreasury.USDaOftTransferData',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'tokensToSend', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_nativeTokenTransferData',
        internalType: 'struct ITreasury.NativeTokenTransferData',
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
      { name: '_treasuryAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setDstTreasuryAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_wethGateway', internalType: 'address', type: 'address' },
      { name: '_comet', internalType: 'address', type: 'address' },
      {
        name: '_aavePoolAddressProvider',
        internalType: 'address',
        type: 'address',
      },
      { name: '_aToken', internalType: 'address', type: 'address' },
      { name: '_weth', internalType: 'address', type: 'address' },
    ],
    name: 'setExternalProtocolAddresses',
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
    inputs: [],
    name: 'totalVolumeOfBorrowersAmountinUSD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalVolumeOfBorrowersAmountinWei',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'transferEthToCdsLiquidators',
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
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'operation', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateAbondUSDaPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'depositor', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      {
        name: 'depositDetail',
        internalType: 'struct ITreasury.DepositDetails',
        type: 'tuple',
        components: [
          { name: 'depositedTime', internalType: 'uint64', type: 'uint64' },
          { name: 'depositedAmount', internalType: 'uint128', type: 'uint128' },
          {
            name: 'depositedAmountUsdValue',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'downsidePercentage',
            internalType: 'uint64',
            type: 'uint64',
          },
          {
            name: 'ethPriceAtDeposit',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'borrowedAmount', internalType: 'uint128', type: 'uint128' },
          {
            name: 'normalizedAmount',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'withdrawed', internalType: 'bool', type: 'bool' },
          { name: 'withdrawAmount', internalType: 'uint128', type: 'uint128' },
          { name: 'liquidated', internalType: 'bool', type: 'bool' },
          {
            name: 'ethPriceAtWithdraw',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'withdrawTime', internalType: 'uint64', type: 'uint64' },
          {
            name: 'aBondTokensAmount',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'strikePrice', internalType: 'uint128', type: 'uint128' },
          { name: 'optionFees', internalType: 'uint128', type: 'uint128' },
        ],
      },
    ],
    name: 'updateDepositDetails',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'operation', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateEthProfitsOfLiquidators',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: '_bool', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateHasBorrowed',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateInterestFromExternalProtocol',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateTotalBorrowedAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'updateTotalDepositedAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateTotalInterest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateTotalInterestFromLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'operation', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateUSDaGainedFromLiquidation',
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
    name: 'usdaGainedFromLiquidation',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'toAddress', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'toAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'withdrawExternalProtocolInterest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'aBondAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'withdrawFromExternalProtocol',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'toAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawInterest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const treasuryAddress = {
  84532: '0x80f872b6402D1FB4BffF4837efe9E4b49cB91909',
  11155111: '0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const treasuryConfig = {
  address: treasuryAddress,
  abi: treasuryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDa
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const usDaAddress = {
  84532: '0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd',
  11155111: '0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64',
} as const

/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const usDaConfig = { address: usDaAddress, abi: usDaAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbond = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondAllowance = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondDecimals = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondName = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondOwner = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondPaused = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondSymbol = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"userStates"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useReadAbondUserStates = /*#__PURE__*/ createUseReadContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'userStates',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"userStatesAtDeposits"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbond = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondApprove = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondBurn = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'burnFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondBurnFromUser = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'burnFromUser',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondMint = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondPause = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondSetAbondData = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'setAbondData',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"setBorrowingContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWriteAbondUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useSimulateAbond = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useSimulateAbondApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useSimulateAbondBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useSimulateAbondBurnFrom = /*#__PURE__*/ createUseSimulateContract(
  { abi: abondAbi, address: abondAddress, functionName: 'burnFrom' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useSimulateAbondMint = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useSimulateAbondPause = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useSimulateAbondTransfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: abondAbi, address: abondAddress, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useSimulateAbondUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: abondAbi,
  address: abondAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link abondAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
 */
export const useWatchAbondEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: abondAbi,
  address: abondAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link abondAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x37df4e70eDc4525Be0d7380730a7224Cf5205c14)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdd8F438822473bc650567231C940b55C3B1E98B3)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContract = /*#__PURE__*/ createUseReadContract({
  abi: borrowingContractAbi,
  address: borrowingContractAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"allowInitializePath"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"endpoint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractEndpoint =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'endpoint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"getAbondYields"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractGetUsdValue =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'getUSDValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"isComposeMsgSender"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractIsComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'isComposeMsgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"lastCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractLastCumulativeRate =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'lastCumulativeRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"nextNonce"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractNextNonce =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'nextNonce',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"oAppVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractOAppVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'oAppVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"omniChainBorrowingCDSPoolValue"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractOmniChainBorrowingCdsPoolValue =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'omniChainBorrowingCDSPoolValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"omniChainBorrowingNoOfLiquidations"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractOmniChainBorrowingNoOfLiquidations =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'omniChainBorrowingNoOfLiquidations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"peers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractPeers =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'peers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"quote"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useReadBorrowingContractQuote =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'quote',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWriteBorrowingContract = /*#__PURE__*/ createUseWriteContract({
  abi: borrowingContractAbi,
  address: borrowingContractAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWriteBorrowingContractLiquidate =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'liquidate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWriteBorrowingContractLzReceive =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"redeemYields"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWriteBorrowingContractSetBorrowLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setBorrowLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWriteBorrowingContractSetDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWriteBorrowingContractSetDstEid =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setDstEid',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setLTV"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWriteBorrowingContractSetOptions =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setOptions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWriteBorrowingContractSetPeer =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setPeer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWriteBorrowingContractUpdateLastEthVaultValue =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'updateLastEthVaultValue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useSimulateBorrowingContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useSimulateBorrowingContractLiquidate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'liquidate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useSimulateBorrowingContractLzReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"redeemYields"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useSimulateBorrowingContractSetBorrowLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setBorrowLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useSimulateBorrowingContractSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useSimulateBorrowingContractSetDstEid =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setDstEid',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setLTV"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useSimulateBorrowingContractSetOptions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setOptions',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useSimulateBorrowingContractSetPeer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'setPeer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useSimulateBorrowingContractUpdateLastEthVaultValue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    functionName: 'updateLastEthVaultValue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingContractAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWatchBorrowingContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__ and `eventName` set to `"Deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWatchBorrowingContractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__ and `eventName` set to `"PeerSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
 */
export const useWatchBorrowingContractPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingContractAbi,
    address: borrowingContractAddress,
    eventName: 'PeerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingContractAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x739E6a6C4233011D99F68d96D8A3560E690a64A3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xE5D4b991861E70D563e7d061e017e5566935941f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCds = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"allowInitializePath"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"cdsDetails"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsCdsDetails = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'cdsDetails',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"endpoint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"getCDSDepositDetails"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsGetCdsDepositDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'getCDSDepositDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"isComposeMsgSender"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsIsComposeMsgSender = /*#__PURE__*/ createUseReadContract(
  { abi: cdsAbi, address: cdsAddress, functionName: 'isComposeMsgSender' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"nextNonce"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"oAppVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsOAppVersion = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'oAppVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"omniChainCDSTotalAvailableLiquidationAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsOmniChainCdsTotalAvailableLiquidationAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'omniChainCDSTotalAvailableLiquidationAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"omniChainCDSTotalCdsDepositedAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsOmniChainCdsTotalCdsDepositedAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'omniChainCDSTotalCdsDepositedAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsOwner = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"peers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsPeers = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"quote"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsQuote = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'quote',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"totalAvailableLiquidationAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsUsda = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'usda',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"withdrawTimeLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useReadCdsWithdrawTimeLimit = /*#__PURE__*/ createUseReadContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'withdrawTimeLimit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCds = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsCalculateCumulativeRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'calculateCumulativeRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"callLzSendFromExternal"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsCallLzSendFromExternal =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'callLzSendFromExternal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsLzReceive = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'lzReceive',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"redeemUSDT"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsRedeemUsdt = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'redeemUSDT',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsSetAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setAdmin',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setBorrowLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsSetBorrowingContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setBorrowingContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsSetDelegate = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setDelegate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsSetDstEid = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setDstEid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsSetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsSetTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setTreasury',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setUSDaLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsSetUsDaLimit = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setUSDaLimit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setUsdtLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsSetUsdtLimit = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setUsdtLimit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setWithdrawTimeLimit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract(
  { abi: cdsAbi, address: cdsAddress, functionName: 'upgradeToAndCall' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWriteCdsWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCds = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"calculateCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsCalculateCumulativeRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'calculateCumulativeRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"callLzSendFromExternal"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsCallLzSendFromExternal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'callLzSendFromExternal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsInitialize = /*#__PURE__*/ createUseSimulateContract(
  { abi: cdsAbi, address: cdsAddress, functionName: 'initialize' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsLzReceive = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'lzReceive',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"redeemUSDT"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsRedeemUsdt = /*#__PURE__*/ createUseSimulateContract(
  { abi: cdsAbi, address: cdsAddress, functionName: 'redeemUSDT' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsSetAdmin = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setAdmin',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setBorrowLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsSetBorrowingContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setBorrowingContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cdsAbi,
    address: cdsAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsSetDstEid = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setDstEid',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsSetPeer = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cdsAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useSimulateCdsWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: cdsAbi,
  address: cdsAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWatchCdsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cdsAbi,
  address: cdsAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__ and `eventName` set to `"Deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWatchCdsOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cdsAbi,
    address: cdsAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__ and `eventName` set to `"PeerSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWatchCdsPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cdsAbi,
    address: cdsAddress,
    eventName: 'PeerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cdsAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1ed5b275fE5eDcf7ddb9c6E253c77F6849E8A9df)
 */
export const useWatchCdsWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cdsAbi,
    address: cdsAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optionsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
 */
export const useReadOptions = /*#__PURE__*/ createUseReadContract({
  abi: optionsAbi,
  address: optionsAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
 */
export const useReadOptionsOwner = /*#__PURE__*/ createUseReadContract({
  abi: optionsAbi,
  address: optionsAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
 */
export const useReadOptionsProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: optionsAbi,
  address: optionsAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optionsAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
 */
export const useWriteOptions = /*#__PURE__*/ createUseWriteContract({
  abi: optionsAbi,
  address: optionsAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
 */
export const useWriteOptionsInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: optionsAbi,
  address: optionsAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
 */
export const useSimulateOptions = /*#__PURE__*/ createUseSimulateContract({
  abi: optionsAbi,
  address: optionsAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link optionsAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
 */
export const useWatchOptionsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: optionsAbi,
  address: optionsAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link optionsAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x10E070504eB1B4f03d29b9B5DeccAd3e49c134Ec)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7C6441B23f21A7A5cd5965B516D8054F119bA53f)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbi = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"SEND"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiSend = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'SEND',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"SEND_AND_CALL"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiAllowance = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"approvalRequired"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"combineOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiDecimals = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"endpoint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"enforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiIsPeer = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'isPeer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"msgInspector"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiName = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"nextNonce"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"oApp"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiOApp = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'oApp',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"oAppVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiOwner = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiPaused = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"peers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiPeers = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"preCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiPreCrime = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'preCrime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiQuoteOft = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'quoteOFT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"quoteSend"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiQuoteSend = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'quoteSend',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"sharedDecimals"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiSymbol = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useReadTestusdtAbiToken = /*#__PURE__*/ createUseReadContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useWriteTestusdtAbi = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useWriteTestusdtAbiApprove = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useWriteTestusdtAbiBurn = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useWriteTestusdtAbiMint = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useWriteTestusdtAbiPause = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useWriteTestusdtAbiSend = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'send',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useWriteTestusdtAbiSetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"setPreCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useWriteTestusdtAbiUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useSimulateTestusdtAbi = /*#__PURE__*/ createUseSimulateContract({
  abi: testusdtAbiAbi,
  address: testusdtAbiAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testusdtAbiAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
 */
export const useWatchTestusdtAbiEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testusdtAbiAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasury = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"abondUSDaPool"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryAbondUsDaPool = /*#__PURE__*/ createUseReadContract(
  { abi: treasuryAbi, address: treasuryAddress, functionName: 'abondUSDaPool' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"allowInitializePath"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"borrowing"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryBorrowing = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'borrowing',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"calculateYieldsForExternalProtocol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryCalculateYieldsForExternalProtocol =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'calculateYieldsForExternalProtocol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"endpoint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"getBalanceInTreasury"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryGetBalanceInTreasury =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'getBalanceInTreasury',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"getBorrowing"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryGetBorrowing = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'getBorrowing',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"getExternalProtocolCumulativeRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryGetExternalProtocolCumulativeRate =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'getExternalProtocolCumulativeRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"isComposeMsgSender"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryIsComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'isComposeMsgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"nextNonce"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"noOfBorrowers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryNoOfBorrowers = /*#__PURE__*/ createUseReadContract(
  { abi: treasuryAbi, address: treasuryAddress, functionName: 'noOfBorrowers' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"oAppVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryOAppVersion = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'oAppVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"omniChainTreasuryEthProfitsOfLiquidators"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryOmniChainTreasuryEthProfitsOfLiquidators =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'omniChainTreasuryEthProfitsOfLiquidators',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"omniChainTreasuryNoOfBorrowers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryOmniChainTreasuryNoOfBorrowers =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'omniChainTreasuryNoOfBorrowers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"omniChainTreasuryTotalVolumeOfBorrowersAmountinUSD"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryOmniChainTreasuryTotalVolumeOfBorrowersAmountinUsd =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'omniChainTreasuryTotalVolumeOfBorrowersAmountinUSD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"omniChainTreasuryTotalVolumeOfBorrowersAmountinWei"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryOmniChainTreasuryTotalVolumeOfBorrowersAmountinWei =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'omniChainTreasuryTotalVolumeOfBorrowersAmountinWei',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryOwner = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"peers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryPeers = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryProxiableUuid = /*#__PURE__*/ createUseReadContract(
  { abi: treasuryAbi, address: treasuryAddress, functionName: 'proxiableUUID' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"quote"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryQuote = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'quote',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"totalVolumeOfBorrowersAmountinUSD"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryTotalVolumeOfBorrowersAmountinUsd =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'totalVolumeOfBorrowersAmountinUSD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"totalVolumeOfBorrowersAmountinWei"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryTotalVolumeOfBorrowersAmountinWei =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'totalVolumeOfBorrowersAmountinWei',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"usdaGainedFromLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useReadTreasuryUsdaGainedFromLiquidation =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'usdaGainedFromLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"approveUSDa"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryApproveUsDa = /*#__PURE__*/ createUseWriteContract(
  { abi: treasuryAbi, address: treasuryAddress, functionName: 'approveUSDa' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"approveUsdt"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryApproveUsdt = /*#__PURE__*/ createUseWriteContract(
  { abi: treasuryAbi, address: treasuryAddress, functionName: 'approveUsdt' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryLzReceive = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'lzReceive',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"oftOrNativeReceiveFromOtherChains"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryOftOrNativeReceiveFromOtherChains =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'oftOrNativeReceiveFromOtherChains',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasurySetDelegate = /*#__PURE__*/ createUseWriteContract(
  { abi: treasuryAbi, address: treasuryAddress, functionName: 'setDelegate' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasurySetDstEid = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'setDstEid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setDstTreasuryAddress"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasurySetDstTreasuryAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setDstTreasuryAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setExternalProtocolAddresses"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasurySetExternalProtocolAddresses =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setExternalProtocolAddresses',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasurySetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"transferEthToCdsLiquidators"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryTransferEthToCdsLiquidators =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'transferEthToCdsLiquidators',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateAbondUSDaPool"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateAbondUsDaPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateAbondUSDaPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateDepositDetails"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateDepositDetails =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateDepositDetails',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateEthProfitsOfLiquidators"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateEthProfitsOfLiquidators =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateEthProfitsOfLiquidators',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateHasBorrowed"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateHasBorrowed =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateHasBorrowed',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateInterestFromExternalProtocol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateInterestFromExternalProtocol =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateInterestFromExternalProtocol',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateTotalBorrowedAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateTotalBorrowedAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateTotalBorrowedAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateTotalDepositedAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateTotalDepositedAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateTotalDepositedAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateTotalInterest"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateTotalInterest =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateTotalInterest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateTotalInterestFromLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateTotalInterestFromLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateTotalInterestFromLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateUSDaGainedFromLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpdateUsDaGainedFromLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateUSDaGainedFromLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  address: treasuryAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withdrawExternalProtocolInterest"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryWithdrawExternalProtocolInterest =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'withdrawExternalProtocolInterest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withdrawFromExternalProtocol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryWithdrawFromExternalProtocol =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'withdrawFromExternalProtocol',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withdrawInterest"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWriteTreasuryWithdrawInterest =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'withdrawInterest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasury = /*#__PURE__*/ createUseSimulateContract({
  abi: treasuryAbi,
  address: treasuryAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"approveUSDa"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryApproveUsDa =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'approveUSDa',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"approveUsdt"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryApproveUsdt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'approveUsdt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryLzReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"oftOrNativeReceiveFromOtherChains"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryOftOrNativeReceiveFromOtherChains =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'oftOrNativeReceiveFromOtherChains',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasurySetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasurySetDstEid =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setDstEid',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setDstTreasuryAddress"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasurySetDstTreasuryAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setDstTreasuryAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setExternalProtocolAddresses"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasurySetExternalProtocolAddresses =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setExternalProtocolAddresses',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasurySetPeer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'setPeer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"transferEthToCdsLiquidators"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryTransferEthToCdsLiquidators =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'transferEthToCdsLiquidators',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateAbondUSDaPool"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateAbondUsDaPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateAbondUSDaPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateDepositDetails"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateDepositDetails =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateDepositDetails',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateEthProfitsOfLiquidators"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateEthProfitsOfLiquidators =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateEthProfitsOfLiquidators',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateHasBorrowed"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateHasBorrowed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateHasBorrowed',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateInterestFromExternalProtocol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateInterestFromExternalProtocol =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateInterestFromExternalProtocol',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateTotalBorrowedAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateTotalBorrowedAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateTotalBorrowedAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateTotalDepositedAmount"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateTotalDepositedAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateTotalDepositedAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateTotalInterest"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateTotalInterest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateTotalInterest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateTotalInterestFromLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateTotalInterestFromLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateTotalInterestFromLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"updateUSDaGainedFromLiquidation"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpdateUsDaGainedFromLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'updateUSDaGainedFromLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withdrawExternalProtocolInterest"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryWithdrawExternalProtocolInterest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'withdrawExternalProtocolInterest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withdrawFromExternalProtocol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryWithdrawFromExternalProtocol =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'withdrawFromExternalProtocol',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"withdrawInterest"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useSimulateTreasuryWithdrawInterest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    address: treasuryAddress,
    functionName: 'withdrawInterest',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: treasuryAbi,
  address: treasuryAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"Deposit"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"DepositToAave"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryDepositToAaveEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'DepositToAave',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"DepositToCompound"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryDepositToCompoundEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'DepositToCompound',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"PeerSet"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'PeerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"WithdrawFromAave"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryWithdrawFromAaveEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'WithdrawFromAave',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"WithdrawFromCompound"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x80f872b6402D1FB4BffF4837efe9E4b49cB91909)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4037E8dFE4CC62070593fBCd8C2bC648D29D34dB)
 */
export const useWatchTreasuryWithdrawFromCompoundEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    address: treasuryAddress,
    eventName: 'WithdrawFromCompound',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDa = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"SEND"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaSend = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'SEND',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"SEND_AND_CALL"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaSendAndCall = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'SEND_AND_CALL',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"approvalRequired"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaApprovalRequired = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'approvalRequired',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"combineOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaCombineOptions = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'combineOptions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"decimalConversionRate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"endpoint"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"enforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaEnforcedOptions = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'enforcedOptions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"isComposeMsgSender"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaIsPeer = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'isPeer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"msgInspector"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaMsgInspector = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'msgInspector',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaName = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"nextNonce"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"oApp"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaOApp = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'oApp',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"oAppVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaOAppVersion = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'oAppVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"oftVersion"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaOftVersion = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'oftVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaOwner = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaPaused = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"peers"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaPeers = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"preCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaPreCrime = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'preCrime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"quoteOFT"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaQuoteOft = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'quoteOFT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"quoteSend"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaQuoteSend = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'quoteSend',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"sharedDecimals"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaSharedDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'sharedDecimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaToken = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useReadUsDaTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDa = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaBurn = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burnFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaBurnFromUser = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burnFromUser',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"lzReceive"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaLzReceive = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'lzReceive',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaMint = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaPause = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaSend = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'send',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setBorrowingContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaSetCdsContract = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setCdsContract',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setDelegate"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaSetDelegate = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setDelegate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setDstEid"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaSetDstEid = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setDstEid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setEnforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaSetMsgInspector = /*#__PURE__*/ createUseWriteContract(
  { abi: usDaAbi, address: usDaAddress, functionName: 'setMsgInspector' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setPeer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaSetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setPreCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaSetPreCrime = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setPreCrime',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWriteUsDaUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDa = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaBurnFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'burnFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"burnFromUser"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaLzReceive = /*#__PURE__*/ createUseSimulateContract(
  { abi: usDaAbi, address: usDaAddress, functionName: 'lzReceive' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaMint = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaPause = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaSend = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'send',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setBorrowingContract"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaSetDstEid = /*#__PURE__*/ createUseSimulateContract(
  { abi: usDaAbi, address: usDaAddress, functionName: 'setDstEid' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setEnforcedOptions"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaSetPeer = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"setPreCrime"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useSimulateUsDaUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: usDaAbi,
  address: usDaAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usDaAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWatchUsDaEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usDaAbi,
  address: usDaAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usDaAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x356F165ce6c6Ab223F983d9eC988202Af4f4CB64)
 */
export const useWatchUsDaUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usDaAbi,
    address: usDaAddress,
    eventName: 'Upgraded',
  })
