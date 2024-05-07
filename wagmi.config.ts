import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { BorrowingABI } from "./constants/BorrowingAbi";
import {
  PROXY_AMINT_ADDRESS,
  PROXY_ABOND_ADDRESS,
  PROXY_MULTISIGN_ADDRESS,
  PROXY_TESTUSDT_ADDRESS,
  PROXY_CDS_ADDRESS,
  PROXY_BORROWING_ADDRESS,
  PROXY_TREASURY_ADDRESS,
  PROXY_OPTIONS_ADDRESS,
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
        [chains.sepolia.id]: PROXY_BORROWING_ADDRESS,

      },
    },
    {
      name: "USDTContract",
      abi: USDT_ABI,
      address: {
        [chains.sepolia.id]: PROXY_TESTUSDT_ADDRESS,
      },
    },
    {
      name: "Treasury",
      abi: TreasuryAbi,
      address: {
        [chains.sepolia.id]: PROXY_TREASURY_ADDRESS,
      },
    },
    {
      name: "Options",
      abi: OPTIONSABI,
      address: {
        [chains.sepolia.id]: PROXY_OPTIONS_ADDRESS,
      },
    },
    {
      name: "CDS",
      abi: CDSABI,
      address: {
        [chains.sepolia.id]:PROXY_CDS_ADDRESS,
      },
    },
    {
      name: "AMINT",
      abi: AmintABI,
      address: {
        [chains.sepolia.id]: PROXY_AMINT_ADDRESS,
      },
    },
    {
      name: "ABOND",
      abi: AbondABI,
      address: {
        [chains.sepolia.id]: PROXY_ABOND_ADDRESS,
      },
    },

  ],
  plugins: [react()],
});
