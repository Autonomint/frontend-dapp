"use client";
import { PropsWithChildren } from "react";
import {
  WagmiConfig,
  configureChains,

} from "wagmi";
import { polygonMumbai,optimismSepolia,bscTestnet} from "@wagmi/core/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { goerli } from "@wagmi/core/chains";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { baseSepolia, sepolia } from 'viem/chains'
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli,sepolia, polygonMumbai,optimismSepolia,bscTestnet,baseSepolia],
  [
    // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API as string }),
    infuraProvider({ apiKey:"db13973dc7f54cbab913af8ebc58e376" }),
    publicProvider(),
  ]
);
export const projectId ="077109262f9ea2fe0fbbf0bf65fd7e57"

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://www.dev.testnet.app.autonomint.com/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
  chains: [sepolia,baseSepolia],
  projectId, // required
  metadata, 

});

// createWeb3Modal({
//   wagmiConfig: config,
//   projectId,
//   enableAnalytics: true,
// })

const WalletProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WalletProvider;
