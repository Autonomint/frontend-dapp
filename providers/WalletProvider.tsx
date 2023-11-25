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

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API as string }),
    publicProvider(),
  ]
);
// export const noopStorage: any = {
//   getItem: (key) => "",
//   setItem: (key, value) => null,
//   removeItem: (key) => null,
// };

// const storage = createStorage({
//   storage: noopStorage,
// });
const config = createConfig({
  // storage: createStorage({ storage: window.localStorage }),
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
  connectors: [new MetaMaskConnector({ chains })],
});

const WalletProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WalletProvider;
