"use client";
import { PropsWithChildren } from "react";
import {
  WagmiConfig,
  configureChains,
  createConfig,
  sepolia,
} from "wagmi";
import {polygonMumbai } from "@wagmi/core/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygonMumbai],
  [publicProvider()]
);
const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
  connectors: [new MetaMaskConnector({ chains })],
});

const WalletProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WalletProvider;
