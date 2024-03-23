import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ABOND
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export const abondABI = [
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFromUser',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      { name: 'ethBacked', internalType: 'uint128', type: 'uint128' },
      { name: 'cumulativeRate', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setAbondData',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setBorrowingContract',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'userStates',
    outputs: [
      { name: 'cumulativeRate', internalType: 'uint256', type: 'uint256' },
      { name: 'ethBacked', internalType: 'uint128', type: 'uint128' },
      { name: 'aBondBalance', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
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
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export const abondAddress = {
  11155111: '0xd83780601Db14F911c7c02F697e6efdc8C20F6a7',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export const abondConfig = { address: abondAddress, abi: abondABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AMINT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export const amintABI = [
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFromUser',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setBorrowingContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setCdsContract',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export const amintAddress = {
  11155111: '0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export const amintConfig = { address: amintAddress, abi: amintABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BorrowingContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export const borrowingContractABI = [
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
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawAMINTTransferFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawBurnFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawEthTransferFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_abondMintFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_amintMintFailed' },
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
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'APY',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'abond',
    outputs: [
      { name: '', internalType: 'contract IABONDToken', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'amint',
    outputs: [{ name: '', internalType: 'contract IAMINT', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'calculateCumulativeRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: 'currentEthPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateRatio',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cds',
    outputs: [
      { name: '', internalType: 'contract CDSInterface', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cdsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: '_strikePercent',
        internalType: 'enum IOptions.StrikePrice',
        type: 'uint8',
      },
      { name: '_strikePrice', internalType: 'uint64', type: 'uint64' },
      { name: '_volatility', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositTokens',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ethRemainingInWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ethValueRemainingInWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getLTV',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getLastEthVaultValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getUSDValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_cds', internalType: 'address', type: 'address' },
      { name: '_abondToken', internalType: 'address', type: 'address' },
      { name: '_multiSign', internalType: 'address', type: 'address' },
      { name: '_priceFeedAddress', internalType: 'address', type: 'address' },
      { name: 'chainId', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastCDSPoolValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastCumulativeRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastEthVaultValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_index', internalType: 'uint64', type: 'uint64' },
      { name: 'currentEthPrice', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'liquidate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'multiSign',
    outputs: [
      { name: '', internalType: 'contract IMultiSign', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'noOfLiquidations',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'options',
    outputs: [{ name: '', internalType: 'contract IOptions', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'priceFeedAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ratePerSec',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'aBondAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'redeemYields',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_ratePerSec', internalType: 'uint128', type: 'uint128' }],
    name: 'setAPR',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_admin', internalType: 'address', type: 'address' }],
    name: 'setAdmin',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_bondRatio', internalType: 'uint64', type: 'uint64' }],
    name: 'setBondRatio',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_LTV', internalType: 'uint8', type: 'uint8' }],
    name: 'setLTV',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_options', internalType: 'address', type: 'address' }],
    name: 'setOptions',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_timeLimit', internalType: 'uint64', type: 'uint64' }],
    name: 'setWithdrawTimeLimit',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalNormalizedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [
      { name: '', internalType: 'contract ITreasury', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'treasuryAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateLastEthVaultValue',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_toAddress', internalType: 'address', type: 'address' },
      { name: '_index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withDraw',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export const borrowingContractAddress = {
  11155111: '0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export const borrowingContractConfig = {
  address: borrowingContractAddress,
  abi: borrowingContractABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CDS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export const cdsABI = [
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
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
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
        name: 'depositedAmint',
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
        name: 'withdrewAmint',
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PRECISION',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'amint',
    outputs: [{ name: '', internalType: 'contract IAMINT', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'amintLimit',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'borrowing',
    outputs: [
      { name: '', internalType: 'contract IBorrowing', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'borrowingContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'burnedAmintInRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'fees', internalType: 'uint128', type: 'uint128' }],
    name: 'calculateCumulativeRate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cdsCount',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'cdsDetails',
    outputs: [
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      { name: 'hasDeposited', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cumulativeValue',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cumulativeValueSign',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'usdtAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'amintAmount', internalType: 'uint128', type: 'uint128' },
      { name: '_liquidate', internalType: 'bool', type: 'bool' },
      { name: '_liquidationAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'deposit',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fallbackEthPrice',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amint', internalType: 'address', type: 'address' },
      { name: 'priceFeed', internalType: 'address', type: 'address' },
      { name: '_usdt', internalType: 'address', type: 'address' },
      { name: '_multiSign', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastCumulativeRate',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastEthPrice',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'liquidationIndex', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'liquidationIndexToInfo',
    outputs: [
      { name: 'liquidationAmount', internalType: 'uint128', type: 'uint128' },
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'multiSign',
    outputs: [
      { name: '', internalType: 'contract IMultiSign', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amintAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'amintPrice', internalType: 'uint64', type: 'uint64' },
      { name: 'usdtPrice', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'redeemUSDT',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_admin', internalType: 'address', type: 'address' }],
    name: 'setAdmin',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'percent', internalType: 'uint8', type: 'uint8' }],
    name: 'setAmintLimit',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'setBorrowingContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint64', type: 'uint64' }],
    name: 'setUsdtLimit',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_timeLimit', internalType: 'uint64', type: 'uint64' }],
    name: 'setWithdrawTimeLimit',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalAvailableLiquidationAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalCdsDepositedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalCdsDepositedAmountWithOptionFees',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [
      { name: '', internalType: 'contract ITreasury', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'treasuryAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'index', internalType: 'uint128', type: 'uint128' },
      {
        name: 'liquidationData',
        internalType: 'struct CDS.LiquidationInfo',
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
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateTotalAvailableLiquidationAmount',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint128', type: 'uint128' }],
    name: 'updateTotalCdsDepositedAmount',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint128', type: 'uint128' }],
    name: 'updateTotalCdsDepositedAmountWithOptionFees',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'usdt',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'usdtAmountDepositedTillNow',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'usdtLimit',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_index', internalType: 'uint64', type: 'uint64' }],
    name: 'withdraw',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawTimeLimit',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export const cdsAddress = {
  11155111: '0xb4E50c1abEC5316f24f94449B141acB336bFA3DC',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export const cdsConfig = { address: cdsAddress, abi: cdsABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Options
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export const optionsABI = [
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'depositedAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'strikePrice', internalType: 'uint128', type: 'uint128' },
      { name: 'ethPrice', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'calculateStrikePriceGains',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_treasuryAddress', internalType: 'address', type: 'address' },
      { name: '_cdsAddress', internalType: 'address', type: 'address' },
      { name: '_borrowingAddress', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export const optionsAddress = {
  11155111: '0xAC31e267FC123De9A61F3722a7d09c0c16b1f799',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export const optionsConfig = {
  address: optionsAddress,
  abi: optionsABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Treasury
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export const treasuryABI = [
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
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'WETH',
    outputs: [{ name: '', internalType: 'contract IWETH9', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'aToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'aavePoolAddressProvider',
    outputs: [
      {
        name: '',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'aaveWETH',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'abond',
    outputs: [
      { name: '', internalType: 'contract IABONDToken', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'abondAmintPool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'amint',
    outputs: [{ name: '', internalType: 'contract IAMINT', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approveAmint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approveUsdt',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'borrow',
    outputs: [
      { name: '', internalType: 'contract IBorrowing', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'borrowingContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cdsContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'comet',
    outputs: [
      {
        name: '',
        internalType: 'contract CometMainInterface',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'compoundAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: '_ethPrice', internalType: 'uint128', type: 'uint128' },
      { name: '_depositTime', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'deposit',
    outputs: [
      {
        name: '',
        internalType: 'struct Treasury.DepositResult',
        type: 'tuple',
        components: [
          { name: 'hasDeposited', internalType: 'bool', type: 'bool' },
          { name: 'borrowerIndex', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ethProfitsOfLiquidators',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'externalProtocolDepositCount',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getBalanceInTreasury',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'depositor', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'getBorrowing',
    outputs: [
      {
        name: '',
        internalType: 'struct Treasury.GetBorrowingResult',
        type: 'tuple',
        components: [
          { name: 'totalIndex', internalType: 'uint64', type: 'uint64' },
          {
            name: 'depositDetails',
            internalType: 'struct Treasury.DepositDetails',
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
              {
                name: 'externalProtocolCount',
                internalType: 'uint64',
                type: 'uint64',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'maximum', internalType: 'bool', type: 'bool' }],
    name: 'getExternalProtocolCumulativeRate',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_borrowing', internalType: 'address', type: 'address' },
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_abondAddress', internalType: 'address', type: 'address' },
      { name: '_cdsContract', internalType: 'address', type: 'address' },
      { name: '_wethGateway', internalType: 'address', type: 'address' },
      { name: '_comet', internalType: 'address', type: 'address' },
      {
        name: '_aavePoolAddressProvider',
        internalType: 'address',
        type: 'address',
      },
      { name: '_aToken', internalType: 'address', type: 'address' },
      { name: '_usdt', internalType: 'address', type: 'address' },
      { name: '_weth', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'noOfBorrowers',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'enum Treasury.Protocol', type: 'uint8' },
    ],
    name: 'protocolDeposit',
    outputs: [
      { name: 'depositIndex', internalType: 'uint64', type: 'uint64' },
      { name: 'depositedAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'totalCreditedTokens', internalType: 'uint256', type: 'uint256' },
      { name: 'depositedUsdValue', internalType: 'uint256', type: 'uint256' },
      { name: 'cumulativeRate', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalInterest',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalInterestFromLiquidation',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalVolumeOfBorrowersAmountinUSD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalVolumeOfBorrowersAmountinWei',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'transferEthToCdsLiquidators',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'operation', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateAbondAmintPool',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'depositor', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      {
        name: 'depositDetail',
        internalType: 'struct Treasury.DepositDetails',
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
          {
            name: 'externalProtocolCount',
            internalType: 'uint64',
            type: 'uint64',
          },
        ],
      },
    ],
    name: 'updateDepositDetails',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'operation', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateEthProfitsOfLiquidators',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: '_bool', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateHasBorrowed',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateInterestFromExternalProtocol',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateTotalBorrowedAmount',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'updateTotalDepositedAmount',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateTotalInterest',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'updateTotalInterestFromLiquidation',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'usdt',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'wethGateway',
    outputs: [
      {
        name: '',
        internalType: 'contract IWrappedTokenGatewayV3',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'toAddress', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'toAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'withdrawExternalProtocolInterest',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'aBondAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'withdrawFromExternalProtocol',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'toAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawInterest',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export const treasuryAddress = {
  11155111: '0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export const treasuryConfig = {
  address: treasuryAddress,
  abi: treasuryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDTContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export const usdtContractABI = [
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFromUser',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export const usdtContractAddress = {
  11155111: '0x0eaBdB5f7493CD504E471D06f5aA586f74973840',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export const usdtContractConfig = {
  address: usdtContractAddress,
  abi: usdtContractABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondUpgradeInterfaceVersion<
  TFunctionName extends 'UPGRADE_INTERFACE_VERSION',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"paused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondPaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"userStates"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondUserStates<
  TFunctionName extends 'userStates',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'userStates',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"userStatesAtDeposits"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondUserStatesAtDeposits<
  TFunctionName extends 'userStatesAtDeposits',
  TSelectData = ReadContractResult<typeof abondABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractRead({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'userStatesAtDeposits',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof abondABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof abondABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, TFunctionName, TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof abondABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'approve', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondBurn<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof abondABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burn' }
    : UseContractWriteConfig<typeof abondABI, 'burn', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'burn', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burnFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondBurnFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'burnFrom'
        >['request']['abi'],
        'burnFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burnFrom' }
    : UseContractWriteConfig<typeof abondABI, 'burnFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burnFrom'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'burnFrom', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'burnFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondBurnFromUser<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'burnFromUser'
        >['request']['abi'],
        'burnFromUser',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'burnFromUser'
      }
    : UseContractWriteConfig<typeof abondABI, 'burnFromUser', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burnFromUser'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'burnFromUser', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'burnFromUser',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof abondABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'initialize', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof abondABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof abondABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'mint', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondPause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof abondABI, 'pause'>['request']['abi'],
        'pause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'pause' }
    : UseContractWriteConfig<typeof abondABI, 'pause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pause'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'pause', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof abondABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'renounceOwnership', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"setAbondData"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondSetAbondData<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'setAbondData'
        >['request']['abi'],
        'setAbondData',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setAbondData'
      }
    : UseContractWriteConfig<typeof abondABI, 'setAbondData', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setAbondData'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'setAbondData', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'setAbondData',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondSetBorrowingContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'setBorrowingContract'
        >['request']['abi'],
        'setBorrowingContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setBorrowingContract'
      }
    : UseContractWriteConfig<typeof abondABI, 'setBorrowingContract', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setBorrowingContract'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'setBorrowingContract', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'setBorrowingContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof abondABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'transfer', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof abondABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'transferFrom', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof abondABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'transferOwnership', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondUnpause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unpause' }
    : UseContractWriteConfig<typeof abondABI, 'unpause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unpause'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'unpause', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      }
    : UseContractWriteConfig<typeof abondABI, 'upgradeToAndCall', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<typeof abondABI, 'upgradeToAndCall', TMode>({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burnFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'burnFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'burnFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondBurnFromUser(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'burnFromUser'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'burnFromUser',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'burnFromUser'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"setAbondData"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondSetAbondData(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'setAbondData'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'setAbondData',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'setAbondData'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondSetBorrowingContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'setBorrowingContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'setBorrowingContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'setBorrowingContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function usePrepareAbondUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof abondABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof abondABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[11155111],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Initialized"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[11155111],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Paused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondPausedEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Paused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[11155111],
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Paused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[11155111],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Unpaused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Unpaused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[11155111],
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Unpaused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Upgraded"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xd83780601Db14F911c7c02F697e6efdc8C20F6a7)
 */
export function useAbondUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[11155111],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintUpgradeInterfaceVersion<
  TFunctionName extends 'UPGRADE_INTERFACE_VERSION',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"paused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintPaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof amintABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractRead({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof amintABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof amintABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, TFunctionName, TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof amintABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'approve', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintBurn<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof amintABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burn' }
    : UseContractWriteConfig<typeof amintABI, 'burn', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'burn', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burnFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintBurnFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'burnFrom'
        >['request']['abi'],
        'burnFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burnFrom' }
    : UseContractWriteConfig<typeof amintABI, 'burnFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burnFrom'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'burnFrom', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'burnFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintBurnFromUser<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'burnFromUser'
        >['request']['abi'],
        'burnFromUser',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'burnFromUser'
      }
    : UseContractWriteConfig<typeof amintABI, 'burnFromUser', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burnFromUser'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'burnFromUser', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'burnFromUser',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof amintABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'initialize', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof amintABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof amintABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'mint', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintPause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof amintABI, 'pause'>['request']['abi'],
        'pause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'pause' }
    : UseContractWriteConfig<typeof amintABI, 'pause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pause'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'pause', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof amintABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'renounceOwnership', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintSetBorrowingContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'setBorrowingContract'
        >['request']['abi'],
        'setBorrowingContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setBorrowingContract'
      }
    : UseContractWriteConfig<typeof amintABI, 'setBorrowingContract', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setBorrowingContract'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'setBorrowingContract', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'setBorrowingContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"setCdsContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintSetCdsContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'setCdsContract'
        >['request']['abi'],
        'setCdsContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setCdsContract'
      }
    : UseContractWriteConfig<typeof amintABI, 'setCdsContract', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setCdsContract'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'setCdsContract', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'setCdsContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof amintABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'transfer', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof amintABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'transferFrom', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof amintABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'transferOwnership', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintUnpause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unpause' }
    : UseContractWriteConfig<typeof amintABI, 'unpause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unpause'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'unpause', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      }
    : UseContractWriteConfig<typeof amintABI, 'upgradeToAndCall', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<typeof amintABI, 'upgradeToAndCall', TMode>({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burnFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'burnFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'burnFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintBurnFromUser(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'burnFromUser'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'burnFromUser',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'burnFromUser'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintSetBorrowingContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'setBorrowingContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'setBorrowingContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'setBorrowingContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"setCdsContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintSetCdsContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'setCdsContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'setCdsContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'setCdsContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function usePrepareAmintUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof amintABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof amintABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[11155111],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Initialized"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[11155111],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Paused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintPausedEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Paused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[11155111],
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Paused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[11155111],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Unpaused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Unpaused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[11155111],
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Unpaused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Upgraded"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x163B51BdFA222a0dDf0EB3ec45CcbABC55993cEE)
 */
export function useAmintUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[11155111],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"APY"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractApy<
  TFunctionName extends 'APY',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'APY',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"PERMIT_TYPEHASH"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractPermitTypehash<
  TFunctionName extends 'PERMIT_TYPEHASH',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'PERMIT_TYPEHASH',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractUpgradeInterfaceVersion<
  TFunctionName extends 'UPGRADE_INTERFACE_VERSION',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"abond"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractAbond<
  TFunctionName extends 'abond',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'abond',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"amint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractAmint<
  TFunctionName extends 'amint',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'amint',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"cds"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractCds<
  TFunctionName extends 'cds',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'cds',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"cdsAddress"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractCdsAddress<
  TFunctionName extends 'cdsAddress',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'cdsAddress',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"ethRemainingInWithdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractEthRemainingInWithdraw<
  TFunctionName extends 'ethRemainingInWithdraw',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'ethRemainingInWithdraw',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"ethValueRemainingInWithdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractEthValueRemainingInWithdraw<
  TFunctionName extends 'ethValueRemainingInWithdraw',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'ethValueRemainingInWithdraw',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"getAbondYields"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractGetAbondYields<
  TFunctionName extends 'getAbondYields',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'getAbondYields',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"getLTV"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractGetLtv<
  TFunctionName extends 'getLTV',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'getLTV',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"getLastEthVaultValue"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractGetLastEthVaultValue<
  TFunctionName extends 'getLastEthVaultValue',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'getLastEthVaultValue',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"getUSDValue"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractGetUsdValue<
  TFunctionName extends 'getUSDValue',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'getUSDValue',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"lastCDSPoolValue"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractLastCdsPoolValue<
  TFunctionName extends 'lastCDSPoolValue',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'lastCDSPoolValue',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"lastCumulativeRate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractLastCumulativeRate<
  TFunctionName extends 'lastCumulativeRate',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'lastCumulativeRate',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"lastEthVaultValue"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractLastEthVaultValue<
  TFunctionName extends 'lastEthVaultValue',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'lastEthVaultValue',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"multiSign"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractMultiSign<
  TFunctionName extends 'multiSign',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'multiSign',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"noOfLiquidations"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractNoOfLiquidations<
  TFunctionName extends 'noOfLiquidations',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'noOfLiquidations',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"options"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractOptions<
  TFunctionName extends 'options',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'options',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"priceFeedAddress"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractPriceFeedAddress<
  TFunctionName extends 'priceFeedAddress',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'priceFeedAddress',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"ratePerSec"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractRatePerSec<
  TFunctionName extends 'ratePerSec',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'ratePerSec',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"totalNormalizedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractTotalNormalizedAmount<
  TFunctionName extends 'totalNormalizedAmount',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'totalNormalizedAmount',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"treasury"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractTreasury<
  TFunctionName extends 'treasury',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'treasury',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"treasuryAddress"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractTreasuryAddress<
  TFunctionName extends 'treasuryAddress',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'treasuryAddress',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"version"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractVersion<
  TFunctionName extends 'version',
  TSelectData = ReadContractResult<typeof borrowingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof borrowingContractABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractRead({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'version',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, TFunctionName, TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"calculateCumulativeRate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractCalculateCumulativeRate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'calculateCumulativeRate'
        >['request']['abi'],
        'calculateCumulativeRate',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'calculateCumulativeRate'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'calculateCumulativeRate',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'calculateCumulativeRate'
      } = {} as any,
) {
  return useContractWrite<
    typeof borrowingContractABI,
    'calculateCumulativeRate',
    TMode
  >({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'calculateCumulativeRate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"calculateRatio"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractCalculateRatio<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'calculateRatio'
        >['request']['abi'],
        'calculateRatio',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'calculateRatio'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'calculateRatio',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'calculateRatio'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'calculateRatio', TMode>(
    {
      abi: borrowingContractABI,
      address: borrowingContractAddress[11155111],
      functionName: 'calculateRatio',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"depositTokens"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractDepositTokens<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'depositTokens'
        >['request']['abi'],
        'depositTokens',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'depositTokens'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'depositTokens',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'depositTokens'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'depositTokens', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'depositTokens',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'initialize',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'initialize', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"liquidate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractLiquidate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'liquidate'
        >['request']['abi'],
        'liquidate',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'liquidate' }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'liquidate',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'liquidate'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'liquidate', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'liquidate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"redeemYields"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractRedeemYields<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'redeemYields'
        >['request']['abi'],
        'redeemYields',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'redeemYields'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'redeemYields',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'redeemYields'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'redeemYields', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'redeemYields',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof borrowingContractABI,
    'renounceOwnership',
    TMode
  >({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAPR"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractSetApr<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'setAPR'
        >['request']['abi'],
        'setAPR',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setAPR' }
    : UseContractWriteConfig<typeof borrowingContractABI, 'setAPR', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setAPR'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'setAPR', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setAPR',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAdmin"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractSetAdmin<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'setAdmin'
        >['request']['abi'],
        'setAdmin',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setAdmin' }
    : UseContractWriteConfig<typeof borrowingContractABI, 'setAdmin', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setAdmin'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'setAdmin', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setAdmin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setBondRatio"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractSetBondRatio<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'setBondRatio'
        >['request']['abi'],
        'setBondRatio',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setBondRatio'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'setBondRatio',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setBondRatio'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'setBondRatio', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setBondRatio',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setLTV"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractSetLtv<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'setLTV'
        >['request']['abi'],
        'setLTV',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setLTV' }
    : UseContractWriteConfig<typeof borrowingContractABI, 'setLTV', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setLTV'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'setLTV', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setLTV',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setOptions"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractSetOptions<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'setOptions'
        >['request']['abi'],
        'setOptions',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setOptions' }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'setOptions',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setOptions'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'setOptions', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setOptions',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setTreasury"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractSetTreasury<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'setTreasury'
        >['request']['abi'],
        'setTreasury',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setTreasury'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'setTreasury',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setTreasury'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'setTreasury', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setTreasury',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setWithdrawTimeLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractSetWithdrawTimeLimit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'setWithdrawTimeLimit'
        >['request']['abi'],
        'setWithdrawTimeLimit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setWithdrawTimeLimit'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'setWithdrawTimeLimit',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setWithdrawTimeLimit'
      } = {} as any,
) {
  return useContractWrite<
    typeof borrowingContractABI,
    'setWithdrawTimeLimit',
    TMode
  >({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setWithdrawTimeLimit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof borrowingContractABI,
    'transferOwnership',
    TMode
  >({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"updateLastEthVaultValue"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractUpdateLastEthVaultValue<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'updateLastEthVaultValue'
        >['request']['abi'],
        'updateLastEthVaultValue',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateLastEthVaultValue'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'updateLastEthVaultValue',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateLastEthVaultValue'
      } = {} as any,
) {
  return useContractWrite<
    typeof borrowingContractABI,
    'updateLastEthVaultValue',
    TMode
  >({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'updateLastEthVaultValue',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'upgradeToAndCall',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<
    typeof borrowingContractABI,
    'upgradeToAndCall',
    TMode
  >({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withDraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractWithDraw<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'withDraw'
        >['request']['abi'],
        'withDraw',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'withDraw' }
    : UseContractWriteConfig<typeof borrowingContractABI, 'withDraw', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withDraw'
      } = {} as any,
) {
  return useContractWrite<typeof borrowingContractABI, 'withDraw', TMode>({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'withDraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"calculateCumulativeRate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractCalculateCumulativeRate(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'calculateCumulativeRate'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'calculateCumulativeRate',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'calculateCumulativeRate'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"calculateRatio"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractCalculateRatio(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'calculateRatio'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'calculateRatio',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'calculateRatio'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"depositTokens"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractDepositTokens(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'depositTokens'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'depositTokens',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'depositTokens'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"liquidate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractLiquidate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'liquidate'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'liquidate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'liquidate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"redeemYields"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractRedeemYields(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'redeemYields'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'redeemYields',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'redeemYields'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'renounceOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAPR"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractSetApr(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAPR'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setAPR',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAPR'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAdmin"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractSetAdmin(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAdmin'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setAdmin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAdmin'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setBondRatio"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractSetBondRatio(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setBondRatio'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setBondRatio',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'setBondRatio'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setLTV"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractSetLtv(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setLTV'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setLTV',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setLTV'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setOptions"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractSetOptions(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setOptions'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setOptions',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setOptions'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setTreasury"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractSetTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setTreasury'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setTreasury',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'setTreasury'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setWithdrawTimeLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractSetWithdrawTimeLimit(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'setWithdrawTimeLimit'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'setWithdrawTimeLimit',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'setWithdrawTimeLimit'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'transferOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"updateLastEthVaultValue"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractUpdateLastEthVaultValue(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'updateLastEthVaultValue'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'updateLastEthVaultValue',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'updateLastEthVaultValue'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'upgradeToAndCall'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'upgradeToAndCall'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withDraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function usePrepareBorrowingContractWithDraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'withDraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    functionName: 'withDraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'withDraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Deposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractDepositEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Deposit'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    eventName: 'Deposit',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Deposit'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Initialized"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Liquidate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractLiquidateEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Liquidate'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    eventName: 'Liquidate',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Liquidate'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof borrowingContractABI,
    'OwnershipTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Upgraded"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb)
 */
export function useBorrowingContractWithdrawEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Withdraw'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: borrowingContractABI,
    address: borrowingContractAddress[11155111],
    eventName: 'Withdraw',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Withdraw'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"PRECISION"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsPrecision<
  TFunctionName extends 'PRECISION',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'PRECISION',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUpgradeInterfaceVersion<
  TFunctionName extends 'UPGRADE_INTERFACE_VERSION',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"amint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsAmint<
  TFunctionName extends 'amint',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'amint',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"amintLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsAmintLimit<
  TFunctionName extends 'amintLimit',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'amintLimit',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"borrowing"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsBorrowing<
  TFunctionName extends 'borrowing',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'borrowing',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"borrowingContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsBorrowingContract<
  TFunctionName extends 'borrowingContract',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'borrowingContract',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"burnedAmintInRedeem"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsBurnedAmintInRedeem<
  TFunctionName extends 'burnedAmintInRedeem',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'burnedAmintInRedeem',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"cdsCount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsCdsCount<
  TFunctionName extends 'cdsCount',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'cdsCount',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"cdsDetails"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsCdsDetails<
  TFunctionName extends 'cdsDetails',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'cdsDetails',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"cumulativeValue"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsCumulativeValue<
  TFunctionName extends 'cumulativeValue',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'cumulativeValue',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"cumulativeValueSign"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsCumulativeValueSign<
  TFunctionName extends 'cumulativeValueSign',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'cumulativeValueSign',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"fallbackEthPrice"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsFallbackEthPrice<
  TFunctionName extends 'fallbackEthPrice',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'fallbackEthPrice',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"lastCumulativeRate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsLastCumulativeRate<
  TFunctionName extends 'lastCumulativeRate',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'lastCumulativeRate',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"lastEthPrice"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsLastEthPrice<
  TFunctionName extends 'lastEthPrice',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'lastEthPrice',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"liquidationIndexToInfo"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsLiquidationIndexToInfo<
  TFunctionName extends 'liquidationIndexToInfo',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'liquidationIndexToInfo',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"multiSign"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsMultiSign<
  TFunctionName extends 'multiSign',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'multiSign',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"totalAvailableLiquidationAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsTotalAvailableLiquidationAmount<
  TFunctionName extends 'totalAvailableLiquidationAmount',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'totalAvailableLiquidationAmount',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"totalCdsDepositedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsTotalCdsDepositedAmount<
  TFunctionName extends 'totalCdsDepositedAmount',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'totalCdsDepositedAmount',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"totalCdsDepositedAmountWithOptionFees"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsTotalCdsDepositedAmountWithOptionFees<
  TFunctionName extends 'totalCdsDepositedAmountWithOptionFees',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'totalCdsDepositedAmountWithOptionFees',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"treasury"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsTreasury<
  TFunctionName extends 'treasury',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'treasury',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"treasuryAddress"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsTreasuryAddress<
  TFunctionName extends 'treasuryAddress',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'treasuryAddress',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"usdt"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUsdt<
  TFunctionName extends 'usdt',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'usdt',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"usdtAmountDepositedTillNow"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUsdtAmountDepositedTillNow<
  TFunctionName extends 'usdtAmountDepositedTillNow',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'usdtAmountDepositedTillNow',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"usdtLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUsdtLimit<
  TFunctionName extends 'usdtLimit',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'usdtLimit',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"withdrawTimeLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsWithdrawTimeLimit<
  TFunctionName extends 'withdrawTimeLimit',
  TSelectData = ReadContractResult<typeof cdsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'withdrawTimeLimit',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof cdsABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof cdsABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, TFunctionName, TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"calculateCumulativeRate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsCalculateCumulativeRate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'calculateCumulativeRate'
        >['request']['abi'],
        'calculateCumulativeRate',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'calculateCumulativeRate'
      }
    : UseContractWriteConfig<
        typeof cdsABI,
        'calculateCumulativeRate',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'calculateCumulativeRate'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'calculateCumulativeRate', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'calculateCumulativeRate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"deposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsDeposit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof cdsABI, 'deposit'>['request']['abi'],
        'deposit',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'deposit' }
    : UseContractWriteConfig<typeof cdsABI, 'deposit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'deposit'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'deposit', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'deposit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof cdsABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'initialize', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"redeemUSDT"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsRedeemUsdt<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'redeemUSDT'
        >['request']['abi'],
        'redeemUSDT',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'redeemUSDT' }
    : UseContractWriteConfig<typeof cdsABI, 'redeemUSDT', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'redeemUSDT'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'redeemUSDT', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'redeemUSDT',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof cdsABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'renounceOwnership', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAdmin"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsSetAdmin<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof cdsABI, 'setAdmin'>['request']['abi'],
        'setAdmin',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setAdmin' }
    : UseContractWriteConfig<typeof cdsABI, 'setAdmin', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setAdmin'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'setAdmin', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setAdmin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAmintLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsSetAmintLimit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'setAmintLimit'
        >['request']['abi'],
        'setAmintLimit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setAmintLimit'
      }
    : UseContractWriteConfig<typeof cdsABI, 'setAmintLimit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setAmintLimit'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'setAmintLimit', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setAmintLimit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsSetBorrowingContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'setBorrowingContract'
        >['request']['abi'],
        'setBorrowingContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setBorrowingContract'
      }
    : UseContractWriteConfig<typeof cdsABI, 'setBorrowingContract', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setBorrowingContract'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'setBorrowingContract', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setBorrowingContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setTreasury"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsSetTreasury<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'setTreasury'
        >['request']['abi'],
        'setTreasury',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setTreasury'
      }
    : UseContractWriteConfig<typeof cdsABI, 'setTreasury', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setTreasury'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'setTreasury', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setTreasury',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setUsdtLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsSetUsdtLimit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'setUsdtLimit'
        >['request']['abi'],
        'setUsdtLimit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setUsdtLimit'
      }
    : UseContractWriteConfig<typeof cdsABI, 'setUsdtLimit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setUsdtLimit'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'setUsdtLimit', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setUsdtLimit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setWithdrawTimeLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsSetWithdrawTimeLimit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'setWithdrawTimeLimit'
        >['request']['abi'],
        'setWithdrawTimeLimit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setWithdrawTimeLimit'
      }
    : UseContractWriteConfig<typeof cdsABI, 'setWithdrawTimeLimit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setWithdrawTimeLimit'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'setWithdrawTimeLimit', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setWithdrawTimeLimit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof cdsABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'transferOwnership', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateLiquidationInfo"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUpdateLiquidationInfo<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'updateLiquidationInfo'
        >['request']['abi'],
        'updateLiquidationInfo',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateLiquidationInfo'
      }
    : UseContractWriteConfig<typeof cdsABI, 'updateLiquidationInfo', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateLiquidationInfo'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'updateLiquidationInfo', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'updateLiquidationInfo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalAvailableLiquidationAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUpdateTotalAvailableLiquidationAmount<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'updateTotalAvailableLiquidationAmount'
        >['request']['abi'],
        'updateTotalAvailableLiquidationAmount',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalAvailableLiquidationAmount'
      }
    : UseContractWriteConfig<
        typeof cdsABI,
        'updateTotalAvailableLiquidationAmount',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalAvailableLiquidationAmount'
      } = {} as any,
) {
  return useContractWrite<
    typeof cdsABI,
    'updateTotalAvailableLiquidationAmount',
    TMode
  >({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'updateTotalAvailableLiquidationAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalCdsDepositedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUpdateTotalCdsDepositedAmount<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'updateTotalCdsDepositedAmount'
        >['request']['abi'],
        'updateTotalCdsDepositedAmount',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalCdsDepositedAmount'
      }
    : UseContractWriteConfig<
        typeof cdsABI,
        'updateTotalCdsDepositedAmount',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalCdsDepositedAmount'
      } = {} as any,
) {
  return useContractWrite<
    typeof cdsABI,
    'updateTotalCdsDepositedAmount',
    TMode
  >({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'updateTotalCdsDepositedAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalCdsDepositedAmountWithOptionFees"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUpdateTotalCdsDepositedAmountWithOptionFees<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'updateTotalCdsDepositedAmountWithOptionFees'
        >['request']['abi'],
        'updateTotalCdsDepositedAmountWithOptionFees',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalCdsDepositedAmountWithOptionFees'
      }
    : UseContractWriteConfig<
        typeof cdsABI,
        'updateTotalCdsDepositedAmountWithOptionFees',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalCdsDepositedAmountWithOptionFees'
      } = {} as any,
) {
  return useContractWrite<
    typeof cdsABI,
    'updateTotalCdsDepositedAmountWithOptionFees',
    TMode
  >({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'updateTotalCdsDepositedAmountWithOptionFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cdsABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      }
    : UseContractWriteConfig<typeof cdsABI, 'upgradeToAndCall', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'upgradeToAndCall', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsWithdraw<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cdsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof cdsABI, 'withdraw'>['request']['abi'],
        'withdraw',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof cdsABI, 'withdraw', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof cdsABI, 'withdraw', TMode>({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"calculateCumulativeRate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsCalculateCumulativeRate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'calculateCumulativeRate'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'calculateCumulativeRate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'calculateCumulativeRate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"deposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsDeposit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'deposit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'deposit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'deposit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"redeemUSDT"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsRedeemUsdt(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'redeemUSDT'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'redeemUSDT',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'redeemUSDT'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAdmin"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsSetAdmin(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setAdmin'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setAdmin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setAdmin'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAmintLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsSetAmintLimit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setAmintLimit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setAmintLimit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setAmintLimit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsSetBorrowingContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setBorrowingContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setBorrowingContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setBorrowingContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setTreasury"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsSetTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setTreasury'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setTreasury',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setTreasury'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setUsdtLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsSetUsdtLimit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setUsdtLimit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setUsdtLimit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setUsdtLimit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setWithdrawTimeLimit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsSetWithdrawTimeLimit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setWithdrawTimeLimit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'setWithdrawTimeLimit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setWithdrawTimeLimit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateLiquidationInfo"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsUpdateLiquidationInfo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'updateLiquidationInfo'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'updateLiquidationInfo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'updateLiquidationInfo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalAvailableLiquidationAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsUpdateTotalAvailableLiquidationAmount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof cdsABI,
      'updateTotalAvailableLiquidationAmount'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'updateTotalAvailableLiquidationAmount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof cdsABI,
    'updateTotalAvailableLiquidationAmount'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalCdsDepositedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsUpdateTotalCdsDepositedAmount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof cdsABI,
      'updateTotalCdsDepositedAmount'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'updateTotalCdsDepositedAmount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof cdsABI,
    'updateTotalCdsDepositedAmount'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalCdsDepositedAmountWithOptionFees"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsUpdateTotalCdsDepositedAmountWithOptionFees(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof cdsABI,
      'updateTotalCdsDepositedAmountWithOptionFees'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'updateTotalCdsDepositedAmountWithOptionFees',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof cdsABI,
    'updateTotalCdsDepositedAmountWithOptionFees'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function usePrepareCdsWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof cdsABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"Deposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsDepositEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'Deposit'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[11155111],
    eventName: 'Deposit',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'Deposit'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"Initialized"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[11155111],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"Upgraded"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[11155111],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"Withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb4E50c1abEC5316f24f94449B141acB336bFA3DC)
 */
export function useCdsWithdrawEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'Withdraw'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[11155111],
    eventName: 'Withdraw',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'Withdraw'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof optionsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsUpgradeInterfaceVersion<
  TFunctionName extends 'UPGRADE_INTERFACE_VERSION',
  TSelectData = ReadContractResult<typeof optionsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"calculateOptionPrice"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsCalculateOptionPrice<
  TFunctionName extends 'calculateOptionPrice',
  TSelectData = ReadContractResult<typeof optionsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'calculateOptionPrice',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"calculateStrikePriceGains"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsCalculateStrikePriceGains<
  TFunctionName extends 'calculateStrikePriceGains',
  TSelectData = ReadContractResult<typeof optionsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'calculateStrikePriceGains',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof optionsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof optionsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof optionsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof optionsABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof optionsABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof optionsABI, TFunctionName, TMode>({
    abi: optionsABI,
    address: optionsAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof optionsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof optionsABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof optionsABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof optionsABI, 'initialize', TMode>({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof optionsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof optionsABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof optionsABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof optionsABI, 'renounceOwnership', TMode>({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof optionsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof optionsABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof optionsABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof optionsABI, 'transferOwnership', TMode>({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof optionsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof optionsABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      }
    : UseContractWriteConfig<typeof optionsABI, 'upgradeToAndCall', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<typeof optionsABI, 'upgradeToAndCall', TMode>({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function usePrepareOptionsWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function usePrepareOptionsInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function usePrepareOptionsRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function usePrepareOptionsTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function usePrepareOptionsUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link optionsABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof optionsABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractEvent({
    abi: optionsABI,
    address: optionsAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof optionsABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link optionsABI}__ and `eventName` set to `"Initialized"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof optionsABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractEvent({
    abi: optionsABI,
    address: optionsAddress[11155111],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof optionsABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link optionsABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof optionsABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractEvent({
    abi: optionsABI,
    address: optionsAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof optionsABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link optionsABI}__ and `eventName` set to `"Upgraded"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAC31e267FC123De9A61F3722a7d09c0c16b1f799)
 */
export function useOptionsUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof optionsABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  return useContractEvent({
    abi: optionsABI,
    address: optionsAddress[11155111],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof optionsABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpgradeInterfaceVersion<
  TFunctionName extends 'UPGRADE_INTERFACE_VERSION',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"WETH"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWeth<
  TFunctionName extends 'WETH',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'WETH',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"aToken"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryAToken<
  TFunctionName extends 'aToken',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'aToken',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"aavePoolAddressProvider"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryAavePoolAddressProvider<
  TFunctionName extends 'aavePoolAddressProvider',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'aavePoolAddressProvider',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"aaveWETH"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryAaveWeth<
  TFunctionName extends 'aaveWETH',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'aaveWETH',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"abond"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryAbond<
  TFunctionName extends 'abond',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'abond',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"abondAmintPool"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryAbondAmintPool<
  TFunctionName extends 'abondAmintPool',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'abondAmintPool',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"amint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryAmint<
  TFunctionName extends 'amint',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'amint',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"borrow"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryBorrow<
  TFunctionName extends 'borrow',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'borrow',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"borrowing"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryBorrowing<
  TFunctionName extends 'borrowing',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'borrowing',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"borrowingContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryBorrowingContract<
  TFunctionName extends 'borrowingContract',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'borrowingContract',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"cdsContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryCdsContract<
  TFunctionName extends 'cdsContract',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'cdsContract',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"comet"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryComet<
  TFunctionName extends 'comet',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'comet',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"compoundAddress"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryCompoundAddress<
  TFunctionName extends 'compoundAddress',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'compoundAddress',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"ethProfitsOfLiquidators"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryEthProfitsOfLiquidators<
  TFunctionName extends 'ethProfitsOfLiquidators',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'ethProfitsOfLiquidators',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"externalProtocolDepositCount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryExternalProtocolDepositCount<
  TFunctionName extends 'externalProtocolDepositCount',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'externalProtocolDepositCount',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"getBalanceInTreasury"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryGetBalanceInTreasury<
  TFunctionName extends 'getBalanceInTreasury',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'getBalanceInTreasury',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"getBorrowing"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryGetBorrowing<
  TFunctionName extends 'getBorrowing',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'getBorrowing',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"getExternalProtocolCumulativeRate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryGetExternalProtocolCumulativeRate<
  TFunctionName extends 'getExternalProtocolCumulativeRate',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'getExternalProtocolCumulativeRate',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"noOfBorrowers"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryNoOfBorrowers<
  TFunctionName extends 'noOfBorrowers',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'noOfBorrowers',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"protocolDeposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryProtocolDeposit<
  TFunctionName extends 'protocolDeposit',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'protocolDeposit',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"totalInterest"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryTotalInterest<
  TFunctionName extends 'totalInterest',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'totalInterest',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"totalInterestFromLiquidation"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryTotalInterestFromLiquidation<
  TFunctionName extends 'totalInterestFromLiquidation',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'totalInterestFromLiquidation',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"totalVolumeOfBorrowersAmountinUSD"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryTotalVolumeOfBorrowersAmountinUsd<
  TFunctionName extends 'totalVolumeOfBorrowersAmountinUSD',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'totalVolumeOfBorrowersAmountinUSD',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"totalVolumeOfBorrowersAmountinWei"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryTotalVolumeOfBorrowersAmountinWei<
  TFunctionName extends 'totalVolumeOfBorrowersAmountinWei',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'totalVolumeOfBorrowersAmountinWei',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"usdt"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUsdt<
  TFunctionName extends 'usdt',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'usdt',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"wethGateway"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWethGateway<
  TFunctionName extends 'wethGateway',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'wethGateway',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof treasuryABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, TFunctionName, TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"approveAmint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryApproveAmint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'approveAmint'
        >['request']['abi'],
        'approveAmint',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'approveAmint'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'approveAmint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approveAmint'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'approveAmint', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'approveAmint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"approveUsdt"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryApproveUsdt<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'approveUsdt'
        >['request']['abi'],
        'approveUsdt',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'approveUsdt'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'approveUsdt', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approveUsdt'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'approveUsdt', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'approveUsdt',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"deposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryDeposit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'deposit'
        >['request']['abi'],
        'deposit',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'deposit' }
    : UseContractWriteConfig<typeof treasuryABI, 'deposit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'deposit'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'deposit', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'deposit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof treasuryABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'initialize', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'renounceOwnership', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"transferEthToCdsLiquidators"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryTransferEthToCdsLiquidators<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'transferEthToCdsLiquidators'
        >['request']['abi'],
        'transferEthToCdsLiquidators',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferEthToCdsLiquidators'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'transferEthToCdsLiquidators',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferEthToCdsLiquidators'
      } = {} as any,
) {
  return useContractWrite<
    typeof treasuryABI,
    'transferEthToCdsLiquidators',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'transferEthToCdsLiquidators',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'transferOwnership', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateAbondAmintPool"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpdateAbondAmintPool<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateAbondAmintPool'
        >['request']['abi'],
        'updateAbondAmintPool',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateAbondAmintPool'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateAbondAmintPool',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateAbondAmintPool'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'updateAbondAmintPool', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateAbondAmintPool',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateDepositDetails"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpdateDepositDetails<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateDepositDetails'
        >['request']['abi'],
        'updateDepositDetails',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateDepositDetails'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateDepositDetails',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateDepositDetails'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'updateDepositDetails', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateDepositDetails',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateEthProfitsOfLiquidators"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpdateEthProfitsOfLiquidators<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateEthProfitsOfLiquidators'
        >['request']['abi'],
        'updateEthProfitsOfLiquidators',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateEthProfitsOfLiquidators'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateEthProfitsOfLiquidators',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateEthProfitsOfLiquidators'
      } = {} as any,
) {
  return useContractWrite<
    typeof treasuryABI,
    'updateEthProfitsOfLiquidators',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateEthProfitsOfLiquidators',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateHasBorrowed"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpdateHasBorrowed<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateHasBorrowed'
        >['request']['abi'],
        'updateHasBorrowed',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateHasBorrowed'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'updateHasBorrowed', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateHasBorrowed'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'updateHasBorrowed', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateHasBorrowed',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateInterestFromExternalProtocol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpdateInterestFromExternalProtocol<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateInterestFromExternalProtocol'
        >['request']['abi'],
        'updateInterestFromExternalProtocol',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateInterestFromExternalProtocol'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateInterestFromExternalProtocol',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateInterestFromExternalProtocol'
      } = {} as any,
) {
  return useContractWrite<
    typeof treasuryABI,
    'updateInterestFromExternalProtocol',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateInterestFromExternalProtocol',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalBorrowedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpdateTotalBorrowedAmount<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateTotalBorrowedAmount'
        >['request']['abi'],
        'updateTotalBorrowedAmount',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalBorrowedAmount'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateTotalBorrowedAmount',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalBorrowedAmount'
      } = {} as any,
) {
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalBorrowedAmount',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateTotalBorrowedAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalDepositedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpdateTotalDepositedAmount<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateTotalDepositedAmount'
        >['request']['abi'],
        'updateTotalDepositedAmount',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalDepositedAmount'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateTotalDepositedAmount',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalDepositedAmount'
      } = {} as any,
) {
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalDepositedAmount',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateTotalDepositedAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalInterest"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpdateTotalInterest<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateTotalInterest'
        >['request']['abi'],
        'updateTotalInterest',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalInterest'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateTotalInterest',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalInterest'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'updateTotalInterest', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateTotalInterest',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalInterestFromLiquidation"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpdateTotalInterestFromLiquidation<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateTotalInterestFromLiquidation'
        >['request']['abi'],
        'updateTotalInterestFromLiquidation',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalInterestFromLiquidation'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateTotalInterestFromLiquidation',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalInterestFromLiquidation'
      } = {} as any,
) {
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalInterestFromLiquidation',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateTotalInterestFromLiquidation',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'upgradeToAndCall', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'upgradeToAndCall', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWithdraw<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof treasuryABI, 'withdraw', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'withdraw', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawExternalProtocolInterest"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWithdrawExternalProtocolInterest<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'withdrawExternalProtocolInterest'
        >['request']['abi'],
        'withdrawExternalProtocolInterest',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawExternalProtocolInterest'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'withdrawExternalProtocolInterest',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawExternalProtocolInterest'
      } = {} as any,
) {
  return useContractWrite<
    typeof treasuryABI,
    'withdrawExternalProtocolInterest',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'withdrawExternalProtocolInterest',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromExternalProtocol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWithdrawFromExternalProtocol<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'withdrawFromExternalProtocol'
        >['request']['abi'],
        'withdrawFromExternalProtocol',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawFromExternalProtocol'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'withdrawFromExternalProtocol',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawFromExternalProtocol'
      } = {} as any,
) {
  return useContractWrite<
    typeof treasuryABI,
    'withdrawFromExternalProtocol',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'withdrawFromExternalProtocol',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawInterest"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWithdrawInterest<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'withdrawInterest'
        >['request']['abi'],
        'withdrawInterest',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawInterest'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'withdrawInterest', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawInterest'
      } = {} as any,
) {
  return useContractWrite<typeof treasuryABI, 'withdrawInterest', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'withdrawInterest',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"approveAmint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryApproveAmint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'approveAmint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'approveAmint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'approveAmint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"approveUsdt"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryApproveUsdt(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'approveUsdt'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'approveUsdt',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'approveUsdt'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"deposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryDeposit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'deposit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'deposit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'deposit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"transferEthToCdsLiquidators"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryTransferEthToCdsLiquidators(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'transferEthToCdsLiquidators'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'transferEthToCdsLiquidators',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'transferEthToCdsLiquidators'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateAbondAmintPool"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpdateAbondAmintPool(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'updateAbondAmintPool'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateAbondAmintPool',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateAbondAmintPool'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateDepositDetails"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpdateDepositDetails(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'updateDepositDetails'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateDepositDetails',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateDepositDetails'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateEthProfitsOfLiquidators"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpdateEthProfitsOfLiquidators(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'updateEthProfitsOfLiquidators'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateEthProfitsOfLiquidators',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateEthProfitsOfLiquidators'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateHasBorrowed"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpdateHasBorrowed(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'updateHasBorrowed'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateHasBorrowed',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'updateHasBorrowed'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateInterestFromExternalProtocol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpdateInterestFromExternalProtocol(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'updateInterestFromExternalProtocol'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateInterestFromExternalProtocol',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateInterestFromExternalProtocol'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalBorrowedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpdateTotalBorrowedAmount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'updateTotalBorrowedAmount'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateTotalBorrowedAmount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateTotalBorrowedAmount'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalDepositedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpdateTotalDepositedAmount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'updateTotalDepositedAmount'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateTotalDepositedAmount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateTotalDepositedAmount'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalInterest"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpdateTotalInterest(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'updateTotalInterest'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateTotalInterest',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'updateTotalInterest'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalInterestFromLiquidation"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpdateTotalInterestFromLiquidation(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'updateTotalInterestFromLiquidation'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'updateTotalInterestFromLiquidation',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateTotalInterestFromLiquidation'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'withdraw'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawExternalProtocolInterest"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryWithdrawExternalProtocolInterest(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'withdrawExternalProtocolInterest'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'withdrawExternalProtocolInterest',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'withdrawExternalProtocolInterest'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromExternalProtocol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryWithdrawFromExternalProtocol(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'withdrawFromExternalProtocol'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'withdrawFromExternalProtocol',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'withdrawFromExternalProtocol'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawInterest"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function usePrepareTreasuryWithdrawInterest(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'withdrawInterest'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    functionName: 'withdrawInterest',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'withdrawInterest'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"Deposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryDepositEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'Deposit'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    eventName: 'Deposit',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'Deposit'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"DepositToAave"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryDepositToAaveEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'DepositToAave'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    eventName: 'DepositToAave',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'DepositToAave'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"DepositToCompound"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryDepositToCompoundEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'DepositToCompound'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    eventName: 'DepositToCompound',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'DepositToCompound'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"Initialized"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"Upgraded"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"Withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWithdrawEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'Withdraw'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    eventName: 'Withdraw',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'Withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"WithdrawFromAave"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWithdrawFromAaveEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'WithdrawFromAave'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    eventName: 'WithdrawFromAave',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'WithdrawFromAave'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"WithdrawFromCompound"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x92fe4AaB6496480E129D6952E124Bd3e392B7CAA)
 */
export function useTreasuryWithdrawFromCompoundEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'WithdrawFromCompound'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[11155111],
    eventName: 'WithdrawFromCompound',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'WithdrawFromCompound'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractUpgradeInterfaceVersion<
  TFunctionName extends 'UPGRADE_INTERFACE_VERSION',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"paused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractPaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof usdtContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdtContractABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof usdtContractABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, TFunctionName, TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof usdtContractABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'approve', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractBurn<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'burn'
        >['request']['abi'],
        'burn',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burn' }
    : UseContractWriteConfig<typeof usdtContractABI, 'burn', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'burn', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burnFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractBurnFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'burnFrom'
        >['request']['abi'],
        'burnFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burnFrom' }
    : UseContractWriteConfig<typeof usdtContractABI, 'burnFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burnFrom'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'burnFrom', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'burnFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractBurnFromUser<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'burnFromUser'
        >['request']['abi'],
        'burnFromUser',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'burnFromUser'
      }
    : UseContractWriteConfig<typeof usdtContractABI, 'burnFromUser', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burnFromUser'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'burnFromUser', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'burnFromUser',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof usdtContractABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'initialize', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof usdtContractABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'mint', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractPause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'pause'
        >['request']['abi'],
        'pause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'pause' }
    : UseContractWriteConfig<typeof usdtContractABI, 'pause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pause'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'pause', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<
        typeof usdtContractABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'renounceOwnership', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof usdtContractABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'transfer', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof usdtContractABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'transferFrom', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof usdtContractABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'transferOwnership', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractUnpause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unpause' }
    : UseContractWriteConfig<typeof usdtContractABI, 'unpause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unpause'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'unpause', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      }
    : UseContractWriteConfig<
        typeof usdtContractABI,
        'upgradeToAndCall',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<typeof usdtContractABI, 'upgradeToAndCall', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burnFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'burnFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'burnFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractBurnFromUser(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'burnFromUser'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'burnFromUser',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'burnFromUser'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof usdtContractABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof usdtContractABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function usePrepareUsdtContractUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof usdtContractABI,
    'upgradeToAndCall'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Initialized"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Paused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractPausedEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Paused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Paused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Unpaused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Unpaused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Unpaused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Upgraded"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0eaBdB5f7493CD504E471D06f5aA586f74973840)
 */
export function useUsdtContractUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[11155111],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Upgraded'>)
}
