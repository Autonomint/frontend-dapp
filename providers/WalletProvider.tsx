"use client";
import { PropsWithChildren } from "react";
import {
  WagmiConfig,
  configureChains,
  createConfig,
  createStorage,
  sepolia,
} from "wagmi";
import { polygonMumbai } from "@wagmi/core/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { goerli } from "@wagmi/core/chains";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli,sepolia, polygonMumbai],
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
  url: 'http://localhost:3000', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}
// export const noopStorage: any = {
//   getItem: (key) => "",
//   setItem: (key, value) => null,
//   removeItem: (key) => null,
// };

// const storage = createStorage({
//   storage: noopStorage,
// });
const config = defaultWagmiConfig({
  chains: [sepolia],
  projectId, // required
  metadata, 

});
createWeb3Modal({
  wagmiConfig: config,
  projectId,
})

const WalletProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WalletProvider;
