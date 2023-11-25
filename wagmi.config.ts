import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
import { BorrowingABI } from "./constants/BorrowingAbi";
import {ABOND_SEPOLIA, 
  ABOND_MATIC,
  AMINT_MATIC,
  AMINT_SEPOLIA,
  BORROWING_MATIC,
  BORROWING_SEPOLIA,
  CDS_MATIC,
  CDS_SEPOLIA,
} from "./constants/Addresses";
import * as chains from "wagmi/chains";
import { AmintABI } from "./constants/AmintAbi";
import { AbondABI } from "./constants/ABondAbi";
import { CDSABI } from "./constants/CDSAbi";

export default defineConfig({
  out: "abiAndHooks.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20ABI,
    },
    {
      name: "BorrowingContract",
      abi: BorrowingABI,
      address: {
        [chains.polygonMumbai.id]: BORROWING_MATIC,
        [chains.sepolia.id]: BORROWING_SEPOLIA,
      },
    },
    {
      name: "CDS",
      abi: CDSABI,
      address: {
        [chains.polygonMumbai.id]: CDS_MATIC,
        [chains.sepolia.id]: CDS_SEPOLIA,
      },
    },
    {
      name: "AMINT",
      abi: AmintABI,
      address: {
        [chains.polygonMumbai.id]: AMINT_MATIC,
        [chains.sepolia.id]: AMINT_SEPOLIA,
      },
    },
    {
      name: "ABOND",
      abi: AbondABI,
      address: {
        [chains.polygonMumbai.id]: ABOND_MATIC,
        [chains.sepolia.id]: ABOND_SEPOLIA,
      },
    },
  ],
  plugins: [react()],
});
