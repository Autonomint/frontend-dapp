"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import heroPattern from "@/app/assets/gridBg.svg";
import wallets from "@/app/assets/wallet icons.svg";
import linkIcon from "@/app/assets/link.svg";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useConnect } from "wagmi";

const ConnectWallet = () => {
  //using useConnect from wagmi hooks
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] w-full  flex flex-col gap-[30px] flex-1 items-center justify-center min-h-[90vh] md:min-h-[80vh] self-stretch overflow-hidden">
      <div
        className={`absolute w-[1733.078px] rotate-[14deg] h-[1108.473px] z-0 rounded-xl shrink-0`}
      >
        <Image
          src={heroPattern}
          alt="grid bg"
          className="w-full h-full"
          style={{ objectFit: "cover", opacity: 1 }}
        ></Image>
      </div>

      <div className="absolute rounded-[10px] bg-[radial-gradient(164.42%_90.44%_at_64.54%_36.64%,#FFF_0%,rgba(255,255,255,0.73)_100%);] w-full h-full shrink-0"></div>
      <div className="flex flex-col gap-[30px] items-center justify-center z-10">
        <Image src={wallets} alt="wallets" width={266.044} height={82}></Image>
        <div className="flex flex-col gap-[10px]">
          <p className="text-center font-medium text-5xl tracking-[-2.4px] text-textPrimary">
            Connect your wallet to get started
          </p>
          <p className="text-base font-medium text-center text-textSecondary">
            Connect with your wallet of choice to start get started with the
            Dapp.
          </p>
        </div>
        {/* connect with wallet onClick on connect wallet button */}
        <Button
          variant={"primary"}
          className="flex items-center justify-center gap-[5px]"
          onClick={() => connect()}
        >
          <p className="text-white bg-clip-text bg-[linear-gradient(180deg,_#FFF_-0.23%,_#EEE 100%)] text-transparent font-semibold text-base">
            Connect Wallet
          </p>
          <Image src={linkIcon} alt="link icon" width={24} height={24}></Image>
        </Button>
      </div>
    </div>
  );
};

export default ConnectWallet;
