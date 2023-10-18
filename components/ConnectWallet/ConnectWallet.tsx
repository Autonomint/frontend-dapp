import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import heroPattern from "@/app/assets/gridBg.svg";
import wallets from "@/app/assets/wallet icons.svg";
import linkIcon from "@/app/assets/link.svg";

const ConnectWallet = () => {
  return (
    <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] h-full flex flex-col gap-[30px] flex-1 items-center justify-center self-stretch overflow-hidden">
      <div className={`absolute w-[1740px] rotate-[14deg] h-[1200px] z-0`}>
        <Image
          src={heroPattern}
          alt="grid bg"
          className="w-full h-full"
          style={{ objectFit: "cover", opacity: 0.4 }}
        ></Image>
      </div>
      <div className="flex flex-col gap-[30px] items-center justify-center z-10">
        <Image src={wallets} alt="wallets" width={266.044} height={82}></Image>
        <div className="flex flex-col gap-[10px]">
          <p className="text-center font-medium text-5xl tracking-[-2.4px] text-textPrimary">
            Connect your wallet to get started
          </p>
          <p className="text-center font-medium text-base text-textSecondary">
            Connect with your wallet of choice to start get started with the
            Dapp.
          </p>
        </div>
        <Button
          variant={"primary"}
          className="flex items-center justify-center gap-[5px]"
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
