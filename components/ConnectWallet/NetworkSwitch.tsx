"use client";
import Image from "next/image";
import React from "react";
import matic from "@/app/assets/matic.svg";
import sepolia from "@/app/assets/eth.svg";
import { useNetwork, useSwitchNetwork } from "wagmi";

interface NetworkSwitchProps {}

const NetworkSwitch: React.FC<NetworkSwitchProps> = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <>
      {chain && (
        <div className="absolute top-[11px] right-[-48px] h-[24px] w-[24px]">
          {chain.id === 80001 ? (
            <Image src={matic} width={24} height={24} alt="matic" />
          ) : (
            <Image src={sepolia} width={24} height={24} alt="sepolia" />
          )}
        </div>
      )}
      {chain?.unsupported ?null :<p>Unsupported Network</p>}

      {/* {chains.map((x) => (
        <button
          disabled={!switchNetwork || x.id === chain?.id}
          key={x.id}
          onClick={() => switchNetwork?.(x.id)}
        >
          {x.name}
          {isLoading && pendingChainId === x.id && ' (switching)'}
        </button>
      ))} */}

      <div>{error && error.message}</div>
    </>
  );
};

export default NetworkSwitch;
