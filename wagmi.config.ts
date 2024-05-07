import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { BorrowingABI } from "./constants/BorrowingAbi";
import {
  DEV_PROXY_ABOND_ADDRESS,
  DEV_PROXY_AMINT_ADDRESS,
  DEV_PROXY_BORROWING_ADDRESS,
  DEV_PROXY_CDS_ADDRESS,
  DEV_PROXY_MULTISIGN_ADDRESS,
  DEV_PROXY_OPTIONS_ADDRESS,
  DEV_PROXY_TESTUSDT_ADDRESS,
  DEV_PROXY_TREASURY_ADDRESS,
} from "./constants/Addresses";
import * as chains from "wagmi/chains";
import { AmintABI } from "./constants/AmintAbi";
import { AbondABI } from "./constants/ABondAbi";
import { CDSABI } from "./constants/CDSAbi";
import { TreasuryAbi } from "./constants/TreasuryAbi";
import { OPTIONSABI } from "./constants/OptionsAbi";
import { USDT_ABI } from "./constants/UsdtAbi";


export default defineConfig({
  out: "abiAndHooks.ts",
  contracts: [

    {
      name: "BorrowingContract",
      abi: BorrowingABI,
      address: {
        [chains.sepolia.id]: DEV_PROXY_BORROWING_ADDRESS,

      },
    },
    {
      name: "USDTContract",
      abi: USDT_ABI,
      address: {
        [chains.sepolia.id]: DEV_PROXY_TESTUSDT_ADDRESS,
      },
    },
    {
      name: "Treasury",
      abi: TreasuryAbi,
      address: {
        [chains.sepolia.id]: DEV_PROXY_TREASURY_ADDRESS,
      },
    },
    {
      name: "Options",
      abi: OPTIONSABI,
      address: {
        [chains.sepolia.id]: DEV_PROXY_OPTIONS_ADDRESS,
      },
    },
    {
      name: "CDS",
      abi: CDSABI,
      address: {
        [chains.sepolia.id]: DEV_PROXY_CDS_ADDRESS,
      },
    },
    {
      name: "AMINT",
      abi: AmintABI,
      address: {
        [chains.sepolia.id]: DEV_PROXY_AMINT_ADDRESS,
      },
    },
    {
      name: "ABOND",
      abi: AbondABI,
      address: {
        [chains.sepolia.id]: DEV_PROXY_ABOND_ADDRESS,
      },
    },

  ],
  plugins: [react()],
});
