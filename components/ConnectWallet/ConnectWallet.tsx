"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import heroPattern from "@/app/assets/gridBg.svg";
import wallets from "@/app/assets/wallet icons.svg";
import linkIcon from "@/app/assets/link.svg";


import { useWeb3Modal ,createWeb3Modal } from '@web3modal/wagmi/react'
import { config,projectId } from "@/providers/WalletProvider";
import { Link2 } from "lucide-react";
const ConnectWallet = () => {
  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
  })
  const { open, close } = useWeb3Modal()
    const onConnect = ()=>{
      open()
    }
  return (
    <div className="relative p-6 rounded-[10px] bg-none w-full  flex flex-col gap-[30px] flex-1 items-center justify-center min-h-[70vh] md:min-h-[70vh] self-stretch overflow-hidden">
      <div
        className={`absolute w-[1733.078px] rotate-[14deg] h-[1108.473px] z-0 rounded-xl shrink-0`}
      >
      
      </div>

      <div className="absolute rounded-[10px]   overflow-hidden w-full h-full shrink-0"></div>
      <div className="flex flex-col gap-[30px] items-center justify-center z-10">
        <Image src={wallets} alt="wallets" width={266.044} height={82}></Image>
        <div className="flex flex-col gap-[10px]">
          <p className="text-center font-medium text-3xl sm:text-4xl md:5xl tracking-[-2.4px] text-[#020202] dark:text-[#FFFFFF]">
            Connect your wallet to get started
          </p>
          <p className="text-base font-medium text-center text-[#020202] dark:text-[#EEEEEE]">
            Connect with your wallet of choice to start get started with the
            Dapp.
          </p>
        </div>
        {/* connect with wallet onClick on connect wallet button */}
        <Button
          variant={"outline"}
          className="hover:bg-[#d3d2d2] flex items-center justify-center gap-[5px] rounded-none  px-8 py-2 mt-2 h-fit font-semibold text-black bg-[#DEDEDE]  dark:bg-[#3A3A3A] dark:border-white dark:text-white border-0  border-b-2 border-[#020202]  cursor-pointer"
          onClick={onConnect}
        >
          <p className="text-[#020202] dark:text-white bg-clip-text bg-[linear-gradient(180deg,_#FFF_-0.23%,_#EEE 100%)] font-semibold text-base">
            Connect Wallet
          </p>
          <Link2 size={20} />
        </Button>
      </div>
    </div>
  );
}; 
export default ConnectWallet;
