"use client";
import { PropsWithChildren } from "react";

import { WagmiProvider } from 'wagmi'

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { baseSepolia, sepolia } from 'viem/chains'
import { createWeb3Modal } from "@web3modal/wagmi/react";

export const projectId ="c5e418f96f8c8cb7719d88f933f581f2"

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://www.dev.testnet.app.autonomint.com/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
  chains: [sepolia,baseSepolia],
  projectId, 
  metadata, 
});



const WalletProvider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default WalletProvider;
