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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
 */
export const abondABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
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
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'whitelist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
 */
export const abondAddress = {
  80001: '0x0763375b04a329E874443CbA630FE79e513FaF99',
  11155111: '0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
 */
export const abondConfig = { address: abondAddress, abi: abondABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AMINT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
 */
export const amintABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
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
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'whitelist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
 */
export const amintAddress = {
  80001: '0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59',
  11155111: '0x1347ED038461D00Df065B6F491b838999e84f6Cc',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
 */
export const amintConfig = { address: amintAddress, abi: amintABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BorrowingContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export const borrowingContractABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_cds', internalType: 'address', type: 'address' },
      { name: '_protocolToken', internalType: 'address', type: 'address' },
      { name: '_priceFeedAddress', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'Borrowing_DepositFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_GettingETHPriceFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_LiquidateBurnFailed' },
  {
    type: 'error',
    inputs: [],
    name: 'Borrowing_LiquidateEthTransferToCdsFailed',
  },
  { type: 'error', inputs: [], name: 'Borrowing_MUSDMintFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawBurnFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawEthTransferFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_WithdrawMUSDTransferFailed' },
  { type: 'error', inputs: [], name: 'Borrowing_pTokenMintFailed' },
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
        name: 'liquidationIndex',
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
        name: 'cdsProfits',
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
    name: 'Trinity',
    outputs: [
      { name: '', internalType: 'contract ITrinityToken', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'calculateCumulativeRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'depositToAaveProtocol',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'depositToCompoundProtocol',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_ethPrice', internalType: 'uint128', type: 'uint128' },
      { name: '_depositTime', internalType: 'uint64', type: 'uint64' },
      { name: '_strikePrice', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'depositTokens',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAPY',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
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
    name: 'getUSDValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'initializeTreasury',
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastEthprice',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastTotalCDSPool',
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
    name: 'protocolToken',
    outputs: [
      { name: '', internalType: 'contract IProtocolToken', type: 'address' },
    ],
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
    inputs: [{ name: '_apy', internalType: 'uint8', type: 'uint8' }],
    name: 'setAPY',
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
    inputs: [{ name: '_timeLimit', internalType: 'uint64', type: 'uint64' }],
    name: 'setWithdrawTimeLimit',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalAmintSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalDiracSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawFromAaveProtocol',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint64', type: 'uint64' }],
    name: 'withdrawFromCompoundProtocol',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export const borrowingContractAddress = {
  80001: '0x1A3D344b58303952EFbcF01b410d943852F0b0e6',
  11155111: '0x2745155BB6d1f83f9477c0EA01a4b09e05571033',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export const borrowingContractConfig = {
  address: borrowingContractAddress,
  abi: borrowingContractABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CDS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
 */
export const cdsABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_trinity', internalType: 'address', type: 'address' },
      { name: 'priceFeed', internalType: 'address', type: 'address' },
      { name: '_usdt', internalType: 'address', type: 'address' },
    ],
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
    name: 'Trinity_token',
    outputs: [
      { name: '', internalType: 'contract ITrinityToken', type: 'address' },
    ],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'fees', internalType: 'uint128', type: 'uint128' }],
    name: 'calculateCumulativeRate',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
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
    name: 'ethVault',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fallbackEthPrice',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'depositor', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'getCDSDepositDetails',
    outputs: [
      {
        name: '',
        internalType: 'struct CDSTest.CdsAccountDetails',
        type: 'tuple',
        components: [
          { name: 'depositedTime', internalType: 'uint64', type: 'uint64' },
          { name: 'depositedAmount', internalType: 'uint128', type: 'uint128' },
          { name: 'withdrawedTime', internalType: 'uint64', type: 'uint64' },
          {
            name: 'withdrawedAmount',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'withdrawed', internalType: 'bool', type: 'bool' },
          { name: 'depositPrice', internalType: 'uint128', type: 'uint128' },
          { name: 'depositValue', internalType: 'uint128', type: 'uint128' },
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
            internalType: 'uint128',
            type: 'uint128',
          },
        ],
      },
      { name: '', internalType: 'uint64', type: 'uint64' },
    ],
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
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
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
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
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
        internalType: 'struct CDSTest.LiquidationInfo',
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
  { stateMutability: 'payable', type: 'receive' },
] as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
 */
export const cdsAddress = {
  80001: '0xb9e7d1263aC519e57C97D375Eb6553F91886C384',
  11155111: '0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
 */
export const cdsConfig = { address: cdsAddress, abi: cdsABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Options
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B)
 */
export const optionsABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'percent', internalType: 'uint8', type: 'uint8' }],
    name: 'depositOption',
    outputs: [],
  },
  {
    stateMutability: 'pure',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B)
 */
export const optionsAddress = {
  80001: '0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f',
  11155111: '0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B)
 */
export const optionsConfig = {
  address: optionsAddress,
  abi: optionsABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Treasury
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export const treasuryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_borrowing', internalType: 'address', type: 'address' },
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_cdsContract', internalType: 'address', type: 'address' },
      { name: '_wethGateway', internalType: 'address', type: 'address' },
      { name: '_cEther', internalType: 'address', type: 'address' },
      {
        name: '_aavePoolAddressProvider',
        internalType: 'address',
        type: 'address',
      },
      { name: '_aToken', internalType: 'address', type: 'address' },
      { name: '_usdt', internalType: 'address', type: 'address' },
    ],
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
  { type: 'error', inputs: [], name: 'Treasury_ZeroDeposit' },
  { type: 'error', inputs: [], name: 'Treasury_ZeroWithdraw' },
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
    name: 'aToken',
    outputs: [{ name: '', internalType: 'contract IATOKEN', type: 'address' }],
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
      { name: 'totalPTokens', internalType: 'uint128', type: 'uint128' },
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
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint64', type: 'uint64' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'depositToAave',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'depositToCompound',
    outputs: [],
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
      { name: '', internalType: 'uint64', type: 'uint64' },
      {
        name: '',
        internalType: 'struct Treasury.DepositDetails',
        type: 'tuple',
        components: [
          { name: 'depositedTime', internalType: 'uint64', type: 'uint64' },
          { name: 'depositedAmount', internalType: 'uint128', type: 'uint128' },
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
          { name: 'pTokensAmount', internalType: 'uint128', type: 'uint128' },
          { name: 'strikePrice', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
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
    ],
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'trinity',
    outputs: [
      { name: '', internalType: 'contract ITrinityToken', type: 'address' },
    ],
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
          { name: 'pTokensAmount', internalType: 'uint128', type: 'uint128' },
          { name: 'strikePrice', internalType: 'uint64', type: 'uint64' },
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
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: '_bool', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateHasBorrowed',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'updateTotalPTokensDecrease',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'updateTotalPTokensIncrease',
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
      { name: '_ethPrice', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'index', internalType: 'uint64', type: 'uint64' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawFromAave',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint64', type: 'uint64' }],
    name: 'withdrawFromCompound',
    outputs: [],
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export const treasuryAddress = {
  80001: '0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C',
  11155111: '0x2d02bEE765f2A32ceE7eE5402533c469060d9190',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export const treasuryConfig = {
  address: treasuryAddress,
  abi: treasuryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDTContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export const usdtContractABI = [
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_upgradedAddress', type: 'address' }],
    name: 'deprecate',
    outputs: [],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'deprecated',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_evilUser', type: 'address' }],
    name: 'addBlackList',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'upgradedAddress',
    outputs: [{ name: '', type: 'address' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maximumFee',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'receiver', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: '_mint',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_maker', type: 'address' }],
    name: 'getBlackListStatus',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' },
    ],
    name: 'allowed',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'who', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getOwner',
    outputs: [{ name: '', type: 'address' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newBasisPoints', type: 'uint256' },
      { name: 'newMaxFee', type: 'uint256' },
    ],
    name: 'setParams',
    outputs: [],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'issue',
    outputs: [],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'redeem',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'basisPointsRate',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'isBlackListed',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_clearedUser', type: 'address' }],
    name: 'removeBlackList',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_UINT',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_blackListedUser', type: 'address' }],
    name: 'destroyBlackFunds',
    outputs: [],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: '_giveMeATokens',
    outputs: [],
  },
  {
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_initialSupply', type: 'uint256' },
      { name: '_name', type: 'string' },
      { name: '_symbol', type: 'string' },
      { name: '_decimals', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'amount', type: 'uint256', indexed: false }],
    name: 'Issue',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'amount', type: 'uint256', indexed: false }],
    name: 'Redeem',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newAddress', type: 'address', indexed: false }],
    name: 'Deprecate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'feeBasisPoints', type: 'uint256', indexed: false },
      { name: 'maxFee', type: 'uint256', indexed: false },
    ],
    name: 'Params',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_blackListedUser', type: 'address', indexed: false },
      { name: '_balance', type: 'uint256', indexed: false },
    ],
    name: 'DestroyedBlackFunds',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_user', type: 'address', indexed: false }],
    name: 'AddedBlackList',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_user', type: 'address', indexed: false }],
    name: 'RemovedBlackList',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Pause' },
  { type: 'event', anonymous: false, inputs: [], name: 'Unpause' },
] as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export const usdtContractAddress = {
  80001: '0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d',
  11155111: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"whitelist"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
 */
export function useAbondWhitelist<
  TFunctionName extends 'whitelist',
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
    functionName: 'whitelist',
    ...config,
  } as UseContractReadConfig<typeof abondABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
 */
export function useAbondDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      }
    : UseContractWriteConfig<typeof abondABI, 'decreaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'decreaseAllowance', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
 */
export function useAbondIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof abondAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof abondABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      }
    : UseContractWriteConfig<typeof abondABI, 'increaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof abondABI, 'increaseAllowance', TMode>({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
 */
export function usePrepareAbondDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
 */
export function usePrepareAbondIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof abondABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof abondAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: abondABI,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof abondABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link abondABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link abondABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0763375b04a329E874443CbA630FE79e513FaF99)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"whitelist"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
 */
export function useAmintWhitelist<
  TFunctionName extends 'whitelist',
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
    functionName: 'whitelist',
    ...config,
  } as UseContractReadConfig<typeof amintABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
 */
export function useAmintDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      }
    : UseContractWriteConfig<typeof amintABI, 'decreaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'decreaseAllowance', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
 */
export function useAmintIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof amintAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof amintABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      }
    : UseContractWriteConfig<typeof amintABI, 'increaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof amintABI, 'increaseAllowance', TMode>({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
 */
export function usePrepareAmintDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
 */
export function usePrepareAmintIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof amintABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof amintAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: amintABI,
    address: amintAddress[chainId as keyof typeof amintAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof amintABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link amintABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link amintABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80e513F3F190d914d4B1ED92F0078bbC1f67FC59)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1347ED038461D00Df065B6F491b838999e84f6Cc)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"Trinity"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractTrinity<
  TFunctionName extends 'Trinity',
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
    functionName: 'Trinity',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"admin"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractAdmin<
  TFunctionName extends 'admin',
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
    functionName: 'admin',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"getAPY"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractGetApy<
  TFunctionName extends 'getAPY',
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
    functionName: 'getAPY',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"getUSDValue"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"lastEthprice"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractLastEthprice<
  TFunctionName extends 'lastEthprice',
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
    functionName: 'lastEthprice',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"lastTotalCDSPool"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractLastTotalCdsPool<
  TFunctionName extends 'lastTotalCDSPool',
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
    functionName: 'lastTotalCDSPool',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"protocolToken"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractProtocolToken<
  TFunctionName extends 'protocolToken',
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
    functionName: 'protocolToken',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"totalAmintSupply"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractTotalAmintSupply<
  TFunctionName extends 'totalAmintSupply',
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
    functionName: 'totalAmintSupply',
    ...config,
  } as UseContractReadConfig<
    typeof borrowingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"totalDiracSupply"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractTotalDiracSupply<
  TFunctionName extends 'totalDiracSupply',
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
    functionName: 'totalDiracSupply',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withdrawTimeLimit"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractWithdrawTimeLimit<
  TFunctionName extends 'withdrawTimeLimit',
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
    functionName: 'withdrawTimeLimit',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"depositToAaveProtocol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractDepositToAaveProtocol<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'depositToAaveProtocol'
        >['request']['abi'],
        'depositToAaveProtocol',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'depositToAaveProtocol'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'depositToAaveProtocol',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'depositToAaveProtocol'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'depositToAaveProtocol',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'depositToAaveProtocol',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"depositToCompoundProtocol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractDepositToCompoundProtocol<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'depositToCompoundProtocol'
        >['request']['abi'],
        'depositToCompoundProtocol',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'depositToCompoundProtocol'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'depositToCompoundProtocol',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'depositToCompoundProtocol'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'depositToCompoundProtocol',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'depositToCompoundProtocol',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"depositTokens"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"initializeTreasury"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractInitializeTreasury<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'initializeTreasury'
        >['request']['abi'],
        'initializeTreasury',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'initializeTreasury'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'initializeTreasury',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initializeTreasury'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'initializeTreasury',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'initializeTreasury',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"liquidate"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAPY"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractSetApy<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'setAPY'
        >['request']['abi'],
        'setAPY',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setAPY' }
    : UseContractWriteConfig<typeof borrowingContractABI, 'setAPY', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setAPY'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof borrowingContractABI, 'setAPY', TMode>({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'setAPY',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAdmin"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setLTV"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setWithdrawTimeLimit"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withDraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withdrawFromAaveProtocol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractWithdrawFromAaveProtocol<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'withdrawFromAaveProtocol'
        >['request']['abi'],
        'withdrawFromAaveProtocol',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawFromAaveProtocol'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'withdrawFromAaveProtocol',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawFromAaveProtocol'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'withdrawFromAaveProtocol',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'withdrawFromAaveProtocol',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withdrawFromCompoundProtocol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function useBorrowingContractWithdrawFromCompoundProtocol<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof borrowingContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof borrowingContractABI,
          'withdrawFromCompoundProtocol'
        >['request']['abi'],
        'withdrawFromCompoundProtocol',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawFromCompoundProtocol'
      }
    : UseContractWriteConfig<
        typeof borrowingContractABI,
        'withdrawFromCompoundProtocol',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawFromCompoundProtocol'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof borrowingContractABI,
    'withdrawFromCompoundProtocol',
    TMode
  >({
    abi: borrowingContractABI,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: 'withdrawFromCompoundProtocol',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"depositToAaveProtocol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function usePrepareBorrowingContractDepositToAaveProtocol(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'depositToAaveProtocol'
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
    functionName: 'depositToAaveProtocol',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'depositToAaveProtocol'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"depositToCompoundProtocol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function usePrepareBorrowingContractDepositToCompoundProtocol(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'depositToCompoundProtocol'
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
    functionName: 'depositToCompoundProtocol',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'depositToCompoundProtocol'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"depositTokens"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"initializeTreasury"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function usePrepareBorrowingContractInitializeTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'initializeTreasury'
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
    functionName: 'initializeTreasury',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'initializeTreasury'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"liquidate"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAPY"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function usePrepareBorrowingContractSetApy(
  config: Omit<
    UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAPY'>,
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
    functionName: 'setAPY',
    ...config,
  } as UsePrepareContractWriteConfig<typeof borrowingContractABI, 'setAPY'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setAdmin"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setLTV"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setWithdrawTimeLimit"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withDraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withdrawFromAaveProtocol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function usePrepareBorrowingContractWithdrawFromAaveProtocol(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'withdrawFromAaveProtocol'
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
    functionName: 'withdrawFromAaveProtocol',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'withdrawFromAaveProtocol'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withdrawFromCompoundProtocol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
 */
export function usePrepareBorrowingContractWithdrawFromCompoundProtocol(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof borrowingContractABI,
      'withdrawFromCompoundProtocol'
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
    functionName: 'withdrawFromCompoundProtocol',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof borrowingContractABI,
    'withdrawFromCompoundProtocol'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Liquidate"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"Withdraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x1A3D344b58303952EFbcF01b410d943852F0b0e6)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2745155BB6d1f83f9477c0EA01a4b09e05571033)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"Trinity_token"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
 */
export function useCdsTrinityToken<
  TFunctionName extends 'Trinity_token',
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
    functionName: 'Trinity_token',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"amintLimit"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"cdsCount"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"ethVault"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
 */
export function useCdsEthVault<
  TFunctionName extends 'ethVault',
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
    functionName: 'ethVault',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"fallbackEthPrice"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"getCDSDepositDetails"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
 */
export function useCdsGetCdsDepositDetails<
  TFunctionName extends 'getCDSDepositDetails',
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
    functionName: 'getCDSDepositDetails',
    ...config,
  } as UseContractReadConfig<typeof cdsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"lastCumulativeRate"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"totalAvailableLiquidationAmount"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"treasury"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"redeemUSDT"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAmintLimit"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"withdraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"redeemUSDT"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"setAmintLimit"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cdsABI}__ and `functionName` set to `"withdraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cdsABI}__ and `eventName` set to `"Withdraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb9e7d1263aC519e57C97D375Eb6553F91886C384)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"withdrawOption"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"depositOption"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B)
 */
export function useOptionsDepositOption<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof optionsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof optionsABI,
          'depositOption'
        >['request']['abi'],
        'depositOption',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'depositOption'
      }
    : UseContractWriteConfig<typeof optionsABI, 'depositOption', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'depositOption'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof optionsABI, 'depositOption', TMode>({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'depositOption',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link optionsABI}__ and `functionName` set to `"depositOption"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x82B32A3376C766754C09Fd4323D1166FE1FeAD3f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B)
 */
export function usePrepareOptionsDepositOption(
  config: Omit<
    UsePrepareContractWriteConfig<typeof optionsABI, 'depositOption'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof optionsAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: optionsABI,
    address: optionsAddress[chainId as keyof typeof optionsAddress],
    functionName: 'depositOption',
    ...config,
  } as UsePrepareContractWriteConfig<typeof optionsABI, 'depositOption'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"aToken"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"borrow"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"getBalanceInTreasury"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"totalInterest"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"trinity"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function useTreasuryTrinity<
  TFunctionName extends 'trinity',
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
    functionName: 'trinity',
    ...config,
  } as UseContractReadConfig<typeof treasuryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"usdt"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"depositToAave"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function useTreasuryDepositToAave<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'depositToAave'
        >['request']['abi'],
        'depositToAave',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'depositToAave'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'depositToAave', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'depositToAave'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'depositToAave', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'depositToAave',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"depositToCompound"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function useTreasuryDepositToCompound<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'depositToCompound'
        >['request']['abi'],
        'depositToCompound',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'depositToCompound'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'depositToCompound', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'depositToCompound'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'depositToCompound', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'depositToCompound',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function useTreasurySetBorrowingContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'setBorrowingContract'
        >['request']['abi'],
        'setBorrowingContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setBorrowingContract'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'setBorrowingContract',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setBorrowingContract'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'setBorrowingContract', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'setBorrowingContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"transferEthToCdsLiquidators"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateDepositDetails"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateHasBorrowed"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalBorrowedAmount"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalPTokensDecrease"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function useTreasuryUpdateTotalPTokensDecrease<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateTotalPTokensDecrease'
        >['request']['abi'],
        'updateTotalPTokensDecrease',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalPTokensDecrease'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateTotalPTokensDecrease',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalPTokensDecrease'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalPTokensDecrease',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalPTokensDecrease',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalPTokensIncrease"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function useTreasuryUpdateTotalPTokensIncrease<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'updateTotalPTokensIncrease'
        >['request']['abi'],
        'updateTotalPTokensIncrease',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateTotalPTokensIncrease'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'updateTotalPTokensIncrease',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateTotalPTokensIncrease'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof treasuryABI,
    'updateTotalPTokensIncrease',
    TMode
  >({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'updateTotalPTokensIncrease',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromAave"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function useTreasuryWithdrawFromAave<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'withdrawFromAave'
        >['request']['abi'],
        'withdrawFromAave',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawFromAave'
      }
    : UseContractWriteConfig<typeof treasuryABI, 'withdrawFromAave', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawFromAave'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'withdrawFromAave', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawFromAave',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromCompound"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function useTreasuryWithdrawFromCompound<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof treasuryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof treasuryABI,
          'withdrawFromCompound'
        >['request']['abi'],
        'withdrawFromCompound',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawFromCompound'
      }
    : UseContractWriteConfig<
        typeof treasuryABI,
        'withdrawFromCompound',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawFromCompound'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof treasuryABI, 'withdrawFromCompound', TMode>({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawFromCompound',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawInterest"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"depositToAave"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function usePrepareTreasuryDepositToAave(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'depositToAave'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'depositToAave',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'depositToAave'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"depositToCompound"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function usePrepareTreasuryDepositToCompound(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'depositToCompound'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'depositToCompound',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'depositToCompound'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"setBorrowingContract"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function usePrepareTreasurySetBorrowingContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'setBorrowingContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'setBorrowingContract',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'setBorrowingContract'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"transferEthToCdsLiquidators"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateDepositDetails"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateHasBorrowed"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalBorrowedAmount"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalPTokensDecrease"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function usePrepareTreasuryUpdateTotalPTokensDecrease(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'updateTotalPTokensDecrease'
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
    functionName: 'updateTotalPTokensDecrease',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateTotalPTokensDecrease'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"updateTotalPTokensIncrease"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function usePrepareTreasuryUpdateTotalPTokensIncrease(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof treasuryABI,
      'updateTotalPTokensIncrease'
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
    functionName: 'updateTotalPTokensIncrease',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'updateTotalPTokensIncrease'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromAave"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function usePrepareTreasuryWithdrawFromAave(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'withdrawFromAave'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawFromAave',
    ...config,
  } as UsePrepareContractWriteConfig<typeof treasuryABI, 'withdrawFromAave'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawFromCompound"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
 */
export function usePrepareTreasuryWithdrawFromCompound(
  config: Omit<
    UsePrepareContractWriteConfig<typeof treasuryABI, 'withdrawFromCompound'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof treasuryAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: treasuryABI,
    address: treasuryAddress[chainId as keyof typeof treasuryAddress],
    functionName: 'withdrawFromCompound',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof treasuryABI,
    'withdrawFromCompound'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link treasuryABI}__ and `functionName` set to `"withdrawInterest"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link treasuryABI}__ and `eventName` set to `"Withdraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6Efdb64eeb97d53ED3a32c92bcb918464f2a5F8C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2d02bEE765f2A32ceE7eE5402533c469060d9190)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"deprecated"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractDeprecated<
  TFunctionName extends 'deprecated',
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
    functionName: 'deprecated',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"upgradedAddress"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractUpgradedAddress<
  TFunctionName extends 'upgradedAddress',
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
    functionName: 'upgradedAddress',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"balances"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractBalances<
  TFunctionName extends 'balances',
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
    functionName: 'balances',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"maximumFee"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractMaximumFee<
  TFunctionName extends 'maximumFee',
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
    functionName: 'maximumFee',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"getBlackListStatus"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractGetBlackListStatus<
  TFunctionName extends 'getBlackListStatus',
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
    functionName: 'getBlackListStatus',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"allowed"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractAllowed<
  TFunctionName extends 'allowed',
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
    functionName: 'allowed',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"getOwner"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractGetOwner<
  TFunctionName extends 'getOwner',
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
    functionName: 'getOwner',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"basisPointsRate"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractBasisPointsRate<
  TFunctionName extends 'basisPointsRate',
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
    functionName: 'basisPointsRate',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"isBlackListed"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractIsBlackListed<
  TFunctionName extends 'isBlackListed',
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
    functionName: 'isBlackListed',
    ...config,
  } as UseContractReadConfig<
    typeof usdtContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"MAX_UINT"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractMaxUint<
  TFunctionName extends 'MAX_UINT',
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
    functionName: 'MAX_UINT',
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"deprecate"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractDeprecate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'deprecate'
        >['request']['abi'],
        'deprecate',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'deprecate' }
    : UseContractWriteConfig<typeof usdtContractABI, 'deprecate', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'deprecate'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'deprecate', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'deprecate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"addBlackList"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractAddBlackList<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'addBlackList'
        >['request']['abi'],
        'addBlackList',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'addBlackList'
      }
    : UseContractWriteConfig<typeof usdtContractABI, 'addBlackList', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'addBlackList'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'addBlackList', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'addBlackList',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"_mint"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          '_mint'
        >['request']['abi'],
        '_mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: '_mint' }
    : UseContractWriteConfig<typeof usdtContractABI, '_mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: '_mint'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, '_mint', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: '_mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"setParams"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractSetParams<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'setParams'
        >['request']['abi'],
        'setParams',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setParams' }
    : UseContractWriteConfig<typeof usdtContractABI, 'setParams', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setParams'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'setParams', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'setParams',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"issue"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractIssue<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'issue'
        >['request']['abi'],
        'issue',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'issue' }
    : UseContractWriteConfig<typeof usdtContractABI, 'issue', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'issue'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'issue', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'issue',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"redeem"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractRedeem<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'redeem'
        >['request']['abi'],
        'redeem',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'redeem' }
    : UseContractWriteConfig<typeof usdtContractABI, 'redeem', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'redeem'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'redeem', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'redeem',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"removeBlackList"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractRemoveBlackList<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'removeBlackList'
        >['request']['abi'],
        'removeBlackList',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'removeBlackList'
      }
    : UseContractWriteConfig<
        typeof usdtContractABI,
        'removeBlackList',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'removeBlackList'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'removeBlackList', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'removeBlackList',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"destroyBlackFunds"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractDestroyBlackFunds<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          'destroyBlackFunds'
        >['request']['abi'],
        'destroyBlackFunds',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'destroyBlackFunds'
      }
    : UseContractWriteConfig<
        typeof usdtContractABI,
        'destroyBlackFunds',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'destroyBlackFunds'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, 'destroyBlackFunds', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'destroyBlackFunds',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"_giveMeATokens"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractGiveMeATokens<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof usdtContractAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdtContractABI,
          '_giveMeATokens'
        >['request']['abi'],
        '_giveMeATokens',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: '_giveMeATokens'
      }
    : UseContractWriteConfig<
        typeof usdtContractABI,
        '_giveMeATokens',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: '_giveMeATokens'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof usdtContractABI, '_giveMeATokens', TMode>({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: '_giveMeATokens',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"deprecate"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function usePrepareUsdtContractDeprecate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'deprecate'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'deprecate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'deprecate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"addBlackList"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function usePrepareUsdtContractAddBlackList(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'addBlackList'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'addBlackList',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'addBlackList'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"_mint"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function usePrepareUsdtContractMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, '_mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: '_mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, '_mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"setParams"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function usePrepareUsdtContractSetParams(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'setParams'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'setParams',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'setParams'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"issue"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function usePrepareUsdtContractIssue(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'issue'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'issue',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'issue'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"redeem"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function usePrepareUsdtContractRedeem(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'redeem'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'redeem',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'redeem'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"removeBlackList"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function usePrepareUsdtContractRemoveBlackList(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'removeBlackList'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'removeBlackList',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, 'removeBlackList'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"destroyBlackFunds"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function usePrepareUsdtContractDestroyBlackFunds(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, 'destroyBlackFunds'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: 'destroyBlackFunds',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof usdtContractABI,
    'destroyBlackFunds'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdtContractABI}__ and `functionName` set to `"_giveMeATokens"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function usePrepareUsdtContractGiveMeATokens(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdtContractABI, '_giveMeATokens'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    functionName: '_giveMeATokens',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdtContractABI, '_giveMeATokens'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Issue"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractIssueEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Issue'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Issue',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Issue'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Redeem"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractRedeemEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Redeem'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Redeem',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Redeem'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Deprecate"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractDeprecateEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Deprecate'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Deprecate',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Deprecate'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Params"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractParamsEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Params'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Params',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Params'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"DestroyedBlackFunds"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractDestroyedBlackFundsEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'DestroyedBlackFunds'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'DestroyedBlackFunds',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'DestroyedBlackFunds'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"AddedBlackList"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractAddedBlackListEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'AddedBlackList'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'AddedBlackList',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'AddedBlackList'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"RemovedBlackList"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractRemovedBlackListEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'RemovedBlackList'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'RemovedBlackList',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'RemovedBlackList'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Pause"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractPauseEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Pause'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Pause',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Pause'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdtContractABI}__ and `eventName` set to `"Unpause"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0756F780B89D65c7BBeaB65C0b7B94dE8e1d3a8d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7169D38820dfd117C3FA1f22a697dBA58d90BA06)
 */
export function useUsdtContractUnpauseEvent(
  config: Omit<
    UseContractEventConfig<typeof usdtContractABI, 'Unpause'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof usdtContractAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: usdtContractABI,
    address: usdtContractAddress[chainId as keyof typeof usdtContractAddress],
    eventName: 'Unpause',
    ...config,
  } as UseContractEventConfig<typeof usdtContractABI, 'Unpause'>)
}
