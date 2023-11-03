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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
 */
export const abondAddress = {
  80001: '0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e',
  11155111: '0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
 */
export const abondConfig = { address: abondAddress, abi: abondABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AMINT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
 */
export const amintAddress = {
  80001: '0x331CbB5D8D41e67231162101D9f22c4b5638026F',
  11155111: '0x63546736dBDE164B950F68E71B435581FC8caa46',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
 */
export const amintConfig = { address: amintAddress, abi: amintABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BorrowingContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
] as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
 */
export const borrowingContractAddress = {
  80001: '0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90',
  11155111: '0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4',
} as const

/**
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
 */
export const borrowingContractConfig = {
  address: borrowingContractAddress,
  abi: borrowingContractABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link abondABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xd7d71fF19A4895F4a7Cbe7Fe1Ff50c8f6AA7Fe5e)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x35524fbE9B9D28020d0b0c39963DfeCce7b2F5d2)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x331CbB5D8D41e67231162101D9f22c4b5638026F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x63546736dBDE164B950F68E71B435581FC8caa46)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"getUSDValue"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"totalNormalizedAmount"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setLTV"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withDraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"setLTV"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link borrowingContractABI}__ and `functionName` set to `"withDraw"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link borrowingContractABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA2b7904DdB913ba4E34965e9384c98E210F2Ae90)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x17656A9cAb0112193afAD5CEC417e975Ef9A37A4)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc20ABI, ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
    abi: erc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>)
}
