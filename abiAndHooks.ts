import {
  useNetwork,
  useChainId,
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export const abondAddress = {
  5: '0x809b57518a5319A1cF348f9425eC7721bD472719',
  11155111: '0x2b77d91d67642659924f8e339547f46a70992C62',
} as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export const abondConfig = { address: abondAddress, abi: abondABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AMINT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export const amintAddress = {
  5: '0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E',
  11155111: '0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742',
} as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export const amintConfig = { address: amintAddress, abi: amintABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BorrowingContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
      { name: '_ethPrice', internalType: 'uint128', type: 'uint128' },
      { name: '_depositTime', internalType: 'uint64', type: 'uint64' },
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
      { name: '_ethPrice', internalType: 'uint64', type: 'uint64' },
      { name: '_withdrawTime', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withDraw',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export const borrowingContractAddress = {
  5: '0xfBAE0d4337d936538995A26685f69644e6427213',
  11155111: '0xfBAE0d4337d936538995A26685f69644e6427213',
} as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export const borrowingContractConfig = {
  address: borrowingContractAddress,
  abi: borrowingContractABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CDS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
        internalType: 'uint128',
        type: 'uint128',
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
        internalType: 'uint128',
        type: 'uint128',
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
        internalType: 'uint128',
        type: 'uint128',
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export const cdsAddress = {
  5: '0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd',
  11155111: '0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd',
} as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export const cdsConfig = { address: cdsAddress, abi: cdsABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Options
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'depositedAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'strikePrice', internalType: 'uint128', type: 'uint128' },
      { name: 'ethPrice', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withdrawOption',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
] as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export const optionsAddress = {
  5: '0x0a4f5D3FF6950e6308CcC5e14a990650A608F620',
  11155111: '0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A',
} as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export const optionsConfig = {
  address: optionsAddress,
  abi: optionsABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Quoter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export const quoterABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WETH9', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'WETH9',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactInput',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIn', internalType: 'address', type: 'address' },
      { name: 'tokenOut', internalType: 'address', type: 'address' },
      { name: 'fee', internalType: 'uint24', type: 'uint24' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'sqrtPriceLimitX96', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'quoteExactInputSingle',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactOutput',
    outputs: [{ name: 'amountIn', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIn', internalType: 'address', type: 'address' },
      { name: 'tokenOut', internalType: 'address', type: 'address' },
      { name: 'fee', internalType: 'uint24', type: 'uint24' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'sqrtPriceLimitX96', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'quoteExactOutputSingle',
    outputs: [{ name: 'amountIn', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'amount0Delta', internalType: 'int256', type: 'int256' },
      { name: 'amount1Delta', internalType: 'int256', type: 'int256' },
      { name: 'path', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'uniswapV3SwapCallback',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export const quoterAddress = {
  5: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
} as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export const quoterConfig = { address: quoterAddress, abi: quoterABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Treasury
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
      { name: 'totalAbondTokens', internalType: 'uint128', type: 'uint128' },
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
    name: 'cEther',
    outputs: [{ name: '', internalType: 'contract ICEther', type: 'address' }],
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
              { name: 'withdrawNo', internalType: 'uint8', type: 'uint8' },
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
              { name: 'burnedAmint', internalType: 'uint256', type: 'uint256' },
              {
                name: 'externalProtocolCount',
                internalType: 'uint64',
                type: 'uint64',
              },
              {
                name: 'discountedPrice',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'cTokensCredited',
                internalType: 'uint128',
                type: 'uint128',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_borrowing', internalType: 'address', type: 'address' },
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_cdsContract', internalType: 'address', type: 'address' },
      { name: '_wethGateway', internalType: 'address', type: 'address' },
      {
        name: '_aavePoolAddressProvider',
        internalType: 'address',
        type: 'address',
      },
      { name: '_aToken', internalType: 'address', type: 'address' },
      { name: '_usdt', internalType: 'address', type: 'address' },
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
          { name: 'withdrawNo', internalType: 'uint8', type: 'uint8' },
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
          { name: 'burnedAmint', internalType: 'uint256', type: 'uint256' },
          {
            name: 'externalProtocolCount',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'discountedPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'cTokensCredited', internalType: 'uint128', type: 'uint128' },
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
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'updateTotalAbondTokensDecrease',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'updateTotalAbondTokensIncrease',
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
      { name: 'depositor', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withdrawFromAaveByUser',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'depositor', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withdrawFromCompoundByUser',
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export const treasuryAddress = {
  5: '0xF0C29E75985847a99D167C56abDA706ACc88Ff21',
  11155111: '0x0a4f5D3FF6950e6308CcC5e14a990650A608F620',
} as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export const treasuryConfig = {
  address: treasuryAddress,
  abi: treasuryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDTContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export const usdtContractAddress = {
  5: '0x6c902ece83048d58FB9c9F98626B948dFF7544FF',
  11155111: '0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E',
} as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"decimals"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"paused"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, TFunctionName, TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'approve', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'burn', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burnFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'burnFrom', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'burnFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'burnFromUser', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'burnFromUser',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'initialize', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'mint', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'pause', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'renounceOwnership', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'setBorrowingContract', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'setBorrowingContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'transfer', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'transferFrom', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'transferOwnership', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'unpause', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'upgradeToAndCall', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burnFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'burnFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'burnFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondBurnFromUser(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'burnFromUser'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'burnFromUser',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'burnFromUser'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondSetBorrowingContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'setBorrowingContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'setBorrowingContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'setBorrowingContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function usePrepareAbondUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function useAbondEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof abondABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    ...config,
  } as UseContractEventConfig<typeof abondABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function useAbondApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function useAbondInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function useAbondOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Paused"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function useAbondPausedEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Paused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Paused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function useAbondTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Unpaused"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function useAbondUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Unpaused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Unpaused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"Upgraded"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x809b57518a5319A1cF348f9425eC7721bD472719)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2b77d91d67642659924f8e339547f46a70992C62)
 */
export function useAbondUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof abondABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof abondABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"decimals"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"paused"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, TFunctionName, TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'approve', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'burn', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burnFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'burnFrom', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'burnFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'burnFromUser', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'burnFromUser',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'initialize', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'mint', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'pause', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'renounceOwnership', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'setBorrowingContract', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'setBorrowingContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"setCdsContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'setCdsContract', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'setCdsContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'transfer', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'transferFrom', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'transferOwnership', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'unpause', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'upgradeToAndCall', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burnFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'burnFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'burnFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintBurnFromUser(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'burnFromUser'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'burnFromUser',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'burnFromUser'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintSetBorrowingContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'setBorrowingContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'setBorrowingContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'setBorrowingContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"setCdsContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintSetCdsContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'setCdsContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'setCdsContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'setCdsContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function usePrepareAmintUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function useAmintEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof amintABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    ...config,
  } as UseContractEventConfig<typeof amintABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function useAmintApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function useAmintInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function useAmintOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Paused"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function useAmintPausedEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Paused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Paused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function useAmintTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Unpaused"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function useAmintUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Unpaused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Unpaused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"Upgraded"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x94ABB18eE78b3F4Ef303f24c50fd916cfB6f0742)
 */
export function useAmintUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof amintABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof amintABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'cdsAddress',
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, TFunctionName, TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"calculateCumulativeRate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'calculateCumulativeRate',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'calculateCumulativeRate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"calculateRatio"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'calculateRatio', TMode>(
    {
      abi: borrowingContractABI,
      address:
        borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
        ],
      functionName: 'calculateRatio',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"depositTokens"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'depositTokens', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'depositTokens',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'initialize', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"liquidate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'liquidate', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'liquidate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'renounceOwnership',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAPR"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'setAPR', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setAPR',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAdmin"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'setAdmin', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setAdmin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setBondRatio"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'setBondRatio', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setBondRatio',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setLTV"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'setLTV', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setLTV',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setOptions"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'setOptions', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setOptions',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setTreasury"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'setTreasury', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setTreasury',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setWithdrawTimeLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'setWithdrawTimeLimit',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setWithdrawTimeLimit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'transferOwnership',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"updateLastEthVaultValue"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'updateLastEthVaultValue',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'updateLastEthVaultValue',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'upgradeToAndCall',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withDraw"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'withDraw', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'withDraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"calculateCumulativeRate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractDepositTokens(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'depositTokens'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"liquidate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractLiquidate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'liquidate'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'liquidate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'liquidate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractSetApr(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAPR'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setAPR',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAPR'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAdmin"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractSetAdmin(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAdmin'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setAdmin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAdmin'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setBondRatio"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractSetBondRatio(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setBondRatio'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractSetLtv(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setLTV'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setLTV',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setLTV'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setOptions"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractSetOptions(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setOptions'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setOptions',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setOptions'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setTreasury"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractSetTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setTreasury'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function usePrepareBorrowingContractWithDraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'withDraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'withDraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'withDraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function useBorrowingContractEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Deposit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function useBorrowingContractDepositEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Deposit'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    eventName: 'Deposit',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Deposit'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function useBorrowingContractInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Liquidate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function useBorrowingContractLiquidateEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Liquidate'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    eventName: 'Liquidate',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Liquidate'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function useBorrowingContractOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function useBorrowingContractUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Withdraw"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xfBAE0d4337d936538995A26685f69644e6427213)
 */
export function useBorrowingContractWithdrawEvent(
  config: Omit<
    UseContractEventConfig<typeof borrowingContractABI, 'Withdraw'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof borrowingContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    eventName: 'Withdraw',
    ...config,
  } as UseContractEventConfig<typeof borrowingContractABI, 'Withdraw'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"PRECISION"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'PRECISION',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"amint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'amint',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"amintLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'amintLimit',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"borrowing"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'borrowing',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"borrowingContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'borrowingContract',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"burnedAmintInRedeem"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'burnedAmintInRedeem',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"cdsCount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'cdsCount',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"cdsDetails"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'cdsDetails',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"cumulativeValue"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'cumulativeValue',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"cumulativeValueSign"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'cumulativeValueSign',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"fallbackEthPrice"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'fallbackEthPrice',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"lastCumulativeRate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'lastCumulativeRate',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"lastEthPrice"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'lastEthPrice',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"liquidationIndexToInfo"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'liquidationIndexToInfo',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"multiSign"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'multiSign',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"totalAvailableLiquidationAmount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'totalAvailableLiquidationAmount',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"totalCdsDepositedAmount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'totalCdsDepositedAmount',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"totalCdsDepositedAmountWithOptionFees"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'totalCdsDepositedAmountWithOptionFees',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"treasury"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'treasury',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"treasuryAddress"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'treasuryAddress',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"usdt"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'usdt',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"usdtAmountDepositedTillNow"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'usdtAmountDepositedTillNow',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"usdtLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'usdtLimit',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"withdrawTimeLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'withdrawTimeLimit',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, TFunctionName, TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"calculateCumulativeRate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'calculateCumulativeRate', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'calculateCumulativeRate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"deposit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'deposit', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'deposit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'initialize', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"redeemUSDT"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'redeemUSDT', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'redeemUSDT',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'renounceOwnership', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAdmin"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'setAdmin', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setAdmin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAmintLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'setAmintLimit', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setAmintLimit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'setBorrowingContract', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setBorrowingContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setTreasury"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'setTreasury', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setTreasury',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setUsdtLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'setUsdtLimit', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setUsdtLimit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setWithdrawTimeLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'setWithdrawTimeLimit', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setWithdrawTimeLimit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'transferOwnership', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateLiquidationInfo"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'updateLiquidationInfo', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'updateLiquidationInfo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalAvailableLiquidationAmount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof cdsABI,
    'updateTotalAvailableLiquidationAmount',
    TMode
  >({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'updateTotalAvailableLiquidationAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalCdsDepositedAmount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof cdsABI,
    'updateTotalCdsDepositedAmount',
    TMode
  >({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'updateTotalCdsDepositedAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalCdsDepositedAmountWithOptionFees"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof cdsABI,
    'updateTotalCdsDepositedAmountWithOptionFees',
    TMode
  >({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'updateTotalCdsDepositedAmountWithOptionFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'upgradeToAndCall', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"withdraw"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof cdsABI, 'withdraw', TMode>({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"calculateCumulativeRate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsCalculateCumulativeRate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'calculateCumulativeRate'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'calculateCumulativeRate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'calculateCumulativeRate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"deposit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsDeposit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'deposit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'deposit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'deposit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"redeemUSDT"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsRedeemUsdt(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'redeemUSDT'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'redeemUSDT',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'redeemUSDT'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAdmin"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsSetAdmin(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setAdmin'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setAdmin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setAdmin'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAmintLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsSetAmintLimit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setAmintLimit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setAmintLimit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setAmintLimit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsSetBorrowingContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setBorrowingContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setBorrowingContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setBorrowingContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setTreasury"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsSetTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setTreasury'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setTreasury',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setTreasury'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setUsdtLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsSetUsdtLimit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setUsdtLimit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setUsdtLimit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setUsdtLimit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setWithdrawTimeLimit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsSetWithdrawTimeLimit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'setWithdrawTimeLimit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'setWithdrawTimeLimit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'setWithdrawTimeLimit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateLiquidationInfo"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsUpdateLiquidationInfo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'updateLiquidationInfo'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'updateLiquidationInfo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'updateLiquidationInfo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"updateTotalAvailableLiquidationAmount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"withdraw"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function usePrepareCdsWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cdsABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cdsABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function useCdsEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    ...config,
  } as UseContractEventConfig<typeof cdsABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"Deposit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function useCdsDepositEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'Deposit'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    eventName: 'Deposit',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'Deposit'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function useCdsInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function useCdsOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"Upgraded"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function useCdsUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"Withdraw"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7eAc043A7E4df19EFb31f8b5F37D73BF3a8e9ACd)
 */
export function useCdsWithdrawEvent(
  config: Omit<
    UseContractEventConfig<typeof cdsABI, 'Withdraw'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof cdsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: cdsABI,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    eventName: 'Withdraw',
    ...config,
  } as UseContractEventConfig<typeof cdsABI, 'Withdraw'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"calculateOptionPrice"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'calculateOptionPrice',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"withdrawOption"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function useOptionsWithdrawOption<
  TFunctionName extends 'withdrawOption',
  TSelectData = ReadContractResult<typeof optionsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'withdrawOption',
    ...config,
  } as UseContractReadConfig<typeof optionsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof optionsABI, TFunctionName, TMode>({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof optionsABI, 'initialize', TMode>({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof optionsABI, 'renounceOwnership', TMode>({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof optionsABI, 'transferOwnership', TMode>({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof optionsABI, 'upgradeToAndCall', TMode>({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function usePrepareOptionsWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function usePrepareOptionsInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function usePrepareOptionsRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function usePrepareOptionsTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function usePrepareOptionsUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link optionsABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function useOptionsEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof optionsABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    ...config,
  } as UseContractEventConfig<typeof optionsABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link optionsABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function useOptionsInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof optionsABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof optionsABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link optionsABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function useOptionsOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof optionsABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof optionsABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link optionsABI}__ and `eventName` set to `"Upgraded"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3e39681Db0F3E0E848f3F7B0835B8ad58639F49A)
 */
export function useOptionsUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof optionsABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof optionsABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link quoterABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function useQuoterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof quoterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof quoterABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof quoterAddress } = {} as any,
) {
  return useContractRead({
    abi: quoterABI,
    address: quoterAddress[5],
    ...config,
  } as UseContractReadConfig<typeof quoterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"WETH9"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function useQuoterWeth9<
  TFunctionName extends 'WETH9',
  TSelectData = ReadContractResult<typeof quoterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof quoterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof quoterAddress } = {} as any,
) {
  return useContractRead({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'WETH9',
    ...config,
  } as UseContractReadConfig<typeof quoterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"factory"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function useQuoterFactory<
  TFunctionName extends 'factory',
  TSelectData = ReadContractResult<typeof quoterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof quoterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof quoterAddress } = {} as any,
) {
  return useContractRead({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'factory',
    ...config,
  } as UseContractReadConfig<typeof quoterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"uniswapV3SwapCallback"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function useQuoterUniswapV3SwapCallback<
  TFunctionName extends 'uniswapV3SwapCallback',
  TSelectData = ReadContractResult<typeof quoterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof quoterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof quoterAddress } = {} as any,
) {
  return useContractRead({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'uniswapV3SwapCallback',
    ...config,
  } as UseContractReadConfig<typeof quoterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link quoterABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function useQuoterWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof quoterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof quoterABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof quoterABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof quoterABI, TFunctionName, TMode>({
    abi: quoterABI,
    address: quoterAddress[5],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"quoteExactInput"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function useQuoterQuoteExactInput<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof quoterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof quoterABI,
          'quoteExactInput'
        >['request']['abi'],
        'quoteExactInput',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'quoteExactInput'
      }
    : UseContractWriteConfig<typeof quoterABI, 'quoteExactInput', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'quoteExactInput'
      } = {} as any,
) {
  return useContractWrite<typeof quoterABI, 'quoteExactInput', TMode>({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'quoteExactInput',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"quoteExactInputSingle"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function useQuoterQuoteExactInputSingle<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof quoterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof quoterABI,
          'quoteExactInputSingle'
        >['request']['abi'],
        'quoteExactInputSingle',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'quoteExactInputSingle'
      }
    : UseContractWriteConfig<
        typeof quoterABI,
        'quoteExactInputSingle',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'quoteExactInputSingle'
      } = {} as any,
) {
  return useContractWrite<typeof quoterABI, 'quoteExactInputSingle', TMode>({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'quoteExactInputSingle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"quoteExactOutput"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function useQuoterQuoteExactOutput<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof quoterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof quoterABI,
          'quoteExactOutput'
        >['request']['abi'],
        'quoteExactOutput',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'quoteExactOutput'
      }
    : UseContractWriteConfig<typeof quoterABI, 'quoteExactOutput', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'quoteExactOutput'
      } = {} as any,
) {
  return useContractWrite<typeof quoterABI, 'quoteExactOutput', TMode>({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'quoteExactOutput',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"quoteExactOutputSingle"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function useQuoterQuoteExactOutputSingle<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof quoterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof quoterABI,
          'quoteExactOutputSingle'
        >['request']['abi'],
        'quoteExactOutputSingle',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'quoteExactOutputSingle'
      }
    : UseContractWriteConfig<
        typeof quoterABI,
        'quoteExactOutputSingle',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'quoteExactOutputSingle'
      } = {} as any,
) {
  return useContractWrite<typeof quoterABI, 'quoteExactOutputSingle', TMode>({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'quoteExactOutputSingle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link quoterABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function usePrepareQuoterWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof quoterABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof quoterAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: quoterABI,
    address: quoterAddress[5],
    ...config,
  } as UsePrepareContractWriteConfig<typeof quoterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"quoteExactInput"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function usePrepareQuoterQuoteExactInput(
  config: Omit<
    UsePrepareContractWriteConfig<typeof quoterABI, 'quoteExactInput'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof quoterAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'quoteExactInput',
    ...config,
  } as UsePrepareContractWriteConfig<typeof quoterABI, 'quoteExactInput'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"quoteExactInputSingle"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function usePrepareQuoterQuoteExactInputSingle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof quoterABI, 'quoteExactInputSingle'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof quoterAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'quoteExactInputSingle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof quoterABI, 'quoteExactInputSingle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"quoteExactOutput"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function usePrepareQuoterQuoteExactOutput(
  config: Omit<
    UsePrepareContractWriteConfig<typeof quoterABI, 'quoteExactOutput'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof quoterAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'quoteExactOutput',
    ...config,
  } as UsePrepareContractWriteConfig<typeof quoterABI, 'quoteExactOutput'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link quoterABI}__ and `functionName` set to `"quoteExactOutputSingle"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6)
 */
export function usePrepareQuoterQuoteExactOutputSingle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof quoterABI, 'quoteExactOutputSingle'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof quoterAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: quoterABI,
    address: quoterAddress[5],
    functionName: 'quoteExactOutputSingle',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof quoterABI,
    'quoteExactOutputSingle'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'UPGRADE_INTERFACE_VERSION',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"aToken"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'aToken',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"aavePoolAddressProvider"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'aavePoolAddressProvider',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"aaveWETH"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'aaveWETH',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"abondAmintPool"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'abondAmintPool',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"amint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'amint',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"borrow"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'borrow',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"borrowing"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'borrowing',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"borrowingContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'borrowingContract',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"cEther"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryCEther<
  TFunctionName extends 'cEther',
  TSelectData = ReadContractResult<typeof treasuryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'cEther',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"cdsContract"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'cdsContract',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"compoundAddress"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'compoundAddress',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"ethProfitsOfLiquidators"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'ethProfitsOfLiquidators',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"externalProtocolDepositCount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'externalProtocolDepositCount',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"getBalanceInTreasury"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'getBalanceInTreasury',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"getBorrowing"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'getBorrowing',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"noOfBorrowers"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'noOfBorrowers',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"protocolDeposit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'protocolDeposit',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"totalInterest"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'totalInterest',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"totalInterestFromLiquidation"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'totalInterestFromLiquidation',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"totalVolumeOfBorrowersAmountinUSD"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'totalVolumeOfBorrowersAmountinUSD',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"totalVolumeOfBorrowersAmountinWei"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'totalVolumeOfBorrowersAmountinWei',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"usdt"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'usdt',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"wethGateway"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'wethGateway',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, TFunctionName, TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"approveAmint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'approveAmint', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'approveAmint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"approveUsdt"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'approveUsdt', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'approveUsdt',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"deposit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'deposit', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'deposit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'initialize', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'renounceOwnership', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"transferEthToCdsLiquidators"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'transferEthToCdsLiquidators',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'transferEthToCdsLiquidators',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'transferOwnership', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateAbondAmintPool"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'updateAbondAmintPool', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateAbondAmintPool',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateDepositDetails"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'updateDepositDetails', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateDepositDetails',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateEthProfitsOfLiquidators"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'updateEthProfitsOfLiquidators',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateEthProfitsOfLiquidators',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateHasBorrowed"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'updateHasBorrowed', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateHasBorrowed',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateInterestFromExternalProtocol"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'updateInterestFromExternalProtocol',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateInterestFromExternalProtocol',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalAbondTokensDecrease"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryUpdateTotalAbondTokensDecrease<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateTotalAbondTokensDecrease'
        >['request']['abi'],
        'updateTotalAbondTokensDecrease',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalAbondTokensDecrease'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateTotalAbondTokensDecrease',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalAbondTokensDecrease'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalAbondTokensDecrease',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalAbondTokensDecrease',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalAbondTokensIncrease"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryUpdateTotalAbondTokensIncrease<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateTotalAbondTokensIncrease'
        >['request']['abi'],
        'updateTotalAbondTokensIncrease',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalAbondTokensIncrease'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateTotalAbondTokensIncrease',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalAbondTokensIncrease'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalAbondTokensIncrease',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalAbondTokensIncrease',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalBorrowedAmount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalBorrowedAmount',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalBorrowedAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalDepositedAmount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalDepositedAmount',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalDepositedAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalInterest"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'updateTotalInterest', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalInterest',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalInterestFromLiquidation"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalInterestFromLiquidation',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalInterestFromLiquidation',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'upgradeToAndCall', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdraw"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'withdraw', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawExternalProtocolInterest"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'withdrawExternalProtocolInterest',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawExternalProtocolInterest',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromAaveByUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryWithdrawFromAaveByUser<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'withdrawFromAaveByUser'
        >['request']['abi'],
        'withdrawFromAaveByUser',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawFromAaveByUser'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'withdrawFromAaveByUser',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawFromAaveByUser'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'withdrawFromAaveByUser', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawFromAaveByUser',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromCompoundByUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryWithdrawFromCompoundByUser<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'withdrawFromCompoundByUser'
        >['request']['abi'],
        'withdrawFromCompoundByUser',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawFromCompoundByUser'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'withdrawFromCompoundByUser',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawFromCompoundByUser'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'withdrawFromCompoundByUser',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawFromCompoundByUser',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawInterest"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'withdrawInterest', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawInterest',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"approveAmint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryApproveAmint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'approveAmint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'approveAmint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'approveAmint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"approveUsdt"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryApproveUsdt(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'approveUsdt'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'approveUsdt',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'approveUsdt'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"deposit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryDeposit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'deposit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'deposit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'deposit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"transferEthToCdsLiquidators"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateAbondAmintPool"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryUpdateAbondAmintPool(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'updateAbondAmintPool'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryUpdateDepositDetails(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'updateDepositDetails'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryUpdateHasBorrowed(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'updateHasBorrowed'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateHasBorrowed',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'updateHasBorrowed'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateInterestFromExternalProtocol"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateInterestFromExternalProtocol',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateInterestFromExternalProtocol'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalAbondTokensDecrease"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryUpdateTotalAbondTokensDecrease(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'updateTotalAbondTokensDecrease'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalAbondTokensDecrease',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateTotalAbondTokensDecrease'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalAbondTokensIncrease"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryUpdateTotalAbondTokensIncrease(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'updateTotalAbondTokensIncrease'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalAbondTokensIncrease',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateTotalAbondTokensIncrease'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalBorrowedAmount"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryUpdateTotalInterest(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'updateTotalInterest'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalInterest',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'updateTotalInterest'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalInterestFromLiquidation"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdraw"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'withdraw'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawExternalProtocolInterest"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawExternalProtocolInterest',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'withdrawExternalProtocolInterest'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromAaveByUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryWithdrawFromAaveByUser(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'withdrawFromAaveByUser'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawFromAaveByUser',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'withdrawFromAaveByUser'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromCompoundByUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryWithdrawFromCompoundByUser(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'withdrawFromCompoundByUser'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawFromCompoundByUser',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'withdrawFromCompoundByUser'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawInterest"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function usePrepareTreasuryWithdrawInterest(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'withdrawInterest'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawInterest',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'withdrawInterest'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"Deposit"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryDepositEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'Deposit'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    eventName: 'Deposit',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'Deposit'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"DepositToAave"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryDepositToAaveEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'DepositToAave'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    eventName: 'DepositToAave',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'DepositToAave'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"DepositToCompound"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryDepositToCompoundEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'DepositToCompound'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    eventName: 'DepositToCompound',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'DepositToCompound'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"Upgraded"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"Withdraw"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryWithdrawEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'Withdraw'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    eventName: 'Withdraw',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'Withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"WithdrawFromAave"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryWithdrawFromAaveEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'WithdrawFromAave'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    eventName: 'WithdrawFromAave',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'WithdrawFromAave'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"WithdrawFromCompound"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF0C29E75985847a99D167C56abDA706ACc88Ff21)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0a4f5D3FF6950e6308CcC5e14a990650A608F620)
 */
export function useTreasuryWithdrawFromCompoundEvent(
  config: Omit<
    UseContractEventConfig<typeof treasuryABI, 'WithdrawFromCompound'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    eventName: 'WithdrawFromCompound',
    ...config,
  } as UseContractEventConfig<typeof treasuryABI, 'WithdrawFromCompound'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, TFunctionName, TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'approve', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'burn', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burnFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'burnFrom', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'burnFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'burnFromUser', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'burnFromUser',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'initialize', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'mint', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'pause', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'renounceOwnership', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'transfer', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'transferFrom', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'transferOwnership', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'unpause', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
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
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'upgradeToAndCall', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burnFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'burnFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'burnFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"burnFromUser"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractBurnFromUser(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'burnFromUser'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'burnFromUser',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'burnFromUser'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function usePrepareUsdtContractUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function useUsdtContractEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function useUsdtContractApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function useUsdtContractInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function useUsdtContractOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Paused"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function useUsdtContractPausedEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Paused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Paused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function useUsdtContractTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Unpaused"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function useUsdtContractUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Unpaused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Unpaused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Upgraded"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6c902ece83048d58FB9c9F98626B948dFF7544FF)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x4eF259cECbE159Aabf1969e027ab4bd7Eadd033E)
 */
export function useUsdtContractUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Upgraded'>)
}
