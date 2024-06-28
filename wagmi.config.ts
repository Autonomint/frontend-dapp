import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { BorrowingABI } from "./constants/BorrowingAbi";
import {
  SEPOLIA_USDA_ADDRESS,
  SEPOLIA_ABOND_ADDRESS,
  SEPOLIA_BORROWING_ADDRESS,
  SEPOLIA_CDS_ADDRESS,
  SEPOLIA_OPTIONS_ADDRESS,
  SEPOLIA_TESTUSDT_ADDRESS,
  SEPOLIA_TREASURY_ADDRESS,
  SEPOLIA_GLOBAL_ADDRESS,
  BASE_SEPOLIA_USDA_ADDRESS,
  BASE_SEPOLIA_ABOND_ADDRESS,
  BASE_SEPOLIA_BORROWING_ADDRESS,
  BASE_SEPOLIA_CDS_ADDRESS,
  BASE_SEPOLIA_OPTIONS_ADDRESS,
  BASE_SEPOLIA_TESTUSDT_ADDRESS,
  BASE_SEPOLIA_TREASURY_ADDRESS,
  BASE_SEPOLIA_GLOBAL_ADDRESS
} from "./constants/Addresses";
import * as chains from "wagmi/chains";
import { UsdaABI } from "./constants/UsdaABI";
import { AbondABI } from "./constants/ABondAbi";
import { CDSABI } from "./constants/CDSAbi";
import { TreasuryAbi } from "./constants/TreasuryAbi";
import { OPTIONSABI } from "./constants/OptionsAbi";
import { TusdtABI } from "./constants/TusdtABI";
import { GLOBALABI } from "./constants/GlobalAbi";


export default defineConfig({
  out: "abiAndHooks.ts",
  contracts: [

    {
      name: "BorrowingContract",
      abi: BorrowingABI,
      address: {
        [chains.sepolia.id]: SEPOLIA_BORROWING_ADDRESS,
        [chains.baseSepolia.id]: BASE_SEPOLIA_BORROWING_ADDRESS,

      },
    },
    {
      name: "TESTUSDT_ABI",
      abi: TusdtABI,
      address: {
        [chains.sepolia.id]: SEPOLIA_TESTUSDT_ADDRESS,
        [chains.baseSepolia.id]: BASE_SEPOLIA_TESTUSDT_ADDRESS,
      },
    },
    {
      name: "Treasury",
      abi: TreasuryAbi,
      address: {
        [chains.sepolia.id]: SEPOLIA_TREASURY_ADDRESS,
        [chains.baseSepolia.id]: BASE_SEPOLIA_TREASURY_ADDRESS,
      },
    },
    {
      name: "Options",
      abi: OPTIONSABI,
      address: {
        [chains.sepolia.id]:  SEPOLIA_OPTIONS_ADDRESS,
        [chains.baseSepolia.id]: BASE_SEPOLIA_OPTIONS_ADDRESS,
      },
    },
    {
      name: "CDS",
      abi: CDSABI,
      address: {
        [chains.sepolia.id]: SEPOLIA_CDS_ADDRESS,
        [chains.baseSepolia.id]: BASE_SEPOLIA_CDS_ADDRESS,
      },
    },
    {
      name: "USDa",
      abi: UsdaABI,
      address: {
        [chains.sepolia.id]: SEPOLIA_USDA_ADDRESS,
        [chains.baseSepolia.id]: BASE_SEPOLIA_USDA_ADDRESS,
      },
    },
    {
      name: "ABOND",
      abi: AbondABI,
      address: {
        [chains.sepolia.id]: SEPOLIA_ABOND_ADDRESS,
        [chains.baseSepolia.id]: BASE_SEPOLIA_ABOND_ADDRESS,
      },
    },
    {
      name:"GLOBAL",
      abi: GLOBALABI,
      address: {
        [chains.sepolia.id]: SEPOLIA_GLOBAL_ADDRESS,
        [chains.baseSepolia.id]: BASE_SEPOLIA_GLOBAL_ADDRESS,
      },
    }

  ],
  plugins: [react()],
});
