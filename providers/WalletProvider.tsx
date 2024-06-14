"use client";
import { PropsWithChildren } from "react";

import { WagmiProvider } from 'wagmi'

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { baseSepolia, sepolia } from 'viem/chains'

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
  projectId, 
  metadata, 
});

// createWeb3Modal({
//   wagmiConfig: config,
//   projectId,
//   enableAnalytics: true,
// })

const WalletProvider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default WalletProvider;
