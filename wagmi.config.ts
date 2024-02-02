import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
import { BorrowingABI } from "./constants/BorrowingAbi";
import {
  Quotor_GOERLI,
  AMINT_GOERLI,
  ABOND_GOERLI,
  USDT_GOERLI,
  MULTISIGN_GOERLI,
  CDS_GOERLI,
  BORROWING_GOERLI,
  TREASURY_GOERLI,
  OPTIONS_GOERLI
} from "./constants/Addresses";
import * as chains from "wagmi/chains";
import { AmintABI } from "./constants/AmintAbi";
import { AbondABI } from "./constants/ABondAbi";
import { CDSABI } from "./constants/CDSAbi";
import { TreasuryAbi } from "./constants/TreasuryAbi";
import { OPTIONSABI } from "./constants/OptionsAbi";
import { USDT_ABI } from "./constants/UsdtAbi";
import { Quoter } from "./constants/QuoterAbi";

import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'

export default defineConfig({
  out: "abiAndHooks.ts",
  contracts: [
    // {
    //   name: "erc20",
    //   abi: erc20ABI,
    // },


    {
      name: "BorrowingContract",
      abi: BorrowingABI,
      address: {
        [chains.goerli.id]: BORROWING_GOERLI,
      },
    },
    {
      name: "USDTContract",
      abi: USDT_ABI,
      address: {
        [chains.goerli.id]: USDT_GOERLI,
      },
    },
    {
      name: "Treasury",
      abi: TreasuryAbi,
      address: {
        [chains.goerli.id]: TREASURY_GOERLI,
      },
    },
    {
      name: "Options",
      abi: OPTIONSABI,
      address: {
        [chains.goerli.id]: OPTIONS_GOERLI,
      },
    },
    {
      name: "CDS",
      abi: CDSABI,
      address: {
        [chains.goerli.id]: CDS_GOERLI,
      },
    },
    {
      name: "AMINT",
      abi: AmintABI,
      address: {
        [chains.goerli.id]: AMINT_GOERLI,
      },
    },
    {
      name: "ABOND",
      abi: AbondABI,
      address: {
        [chains.goerli.id]: ABOND_GOERLI,
      },
    },
    {
      name: "Quoter",
      abi: Quoter as any,
      address: {
        [chains.goerli.id]: Quotor_GOERLI,
      },
    }
  ],
  plugins: [react()],
});
