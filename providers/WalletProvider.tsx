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

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli,sepolia, polygonMumbai],
  [
    // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API as string }),
    infuraProvider({ apiKey:"db13973dc7f54cbab913af8ebc58e376" }),
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
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [new MetaMaskConnector({ chains })],
});

const WalletProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WalletProvider;
