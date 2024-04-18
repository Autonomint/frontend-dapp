'use client'
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";
import { useAccount, useDisconnect, useEnsName } from "wagmi";
import NetworkSwitch from "../ConnectWallet/NetworkSwitch";
import { set } from "react-hook-form";
import { Cross2Icon } from "@radix-ui/react-icons"
interface Props {
  props: {
    image: string;
    buttonText: string;
  };
}

const Profile = ({ props: { image, buttonText } }: Props) => {

  const { address, isConnected } = useAccount();
  const [isHovering, setIsHovering] = useState(false);
  // const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  return (
    <>
      {isConnected && (
        <div className="z-50 flex flex-col items-center gap-3 bottom-14">

          <div className="relative flex items-center justify-center">
            <NetworkSwitch />
          </div>
          <div className="min-[1440px]:w-[4rem] min-[1440px]:h-[4rem] 2dppx:w-[3.5rem] 2dppx:h-[3.5rem] w-[3rem] h-[3rem]">
            <Image
              src={image}
              alt="user Profile"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <p className="hidden text-sm font-normal text-center text-textGrey md:flex dark:text-[#EEEEEE]">
            {truncateWeb3WalletAddress(address)}
          </p>

          <div className="relative">

            <Button variant={"outline"} className=" dark:border-[#EEEEEE]" onClick={() => setIsHovering(!isHovering)} >
              <p className="text-transparent font-semibold text-sm text-center bg-clip-text bg-gradient-to-b from-[#808080] to-[#000]  dark:text-[#EEEEEE]">
                Account
              </p>
            </Button>
            {
              isHovering ? (
                <div className="absolute flex-col overflow-hidden gap-2 -top-24 -left-8 z-50 border border-[#5B5B5B] flex rounded-xl  w-[140px] bg-black h-[160px]">
                  <div className="flex justify-end w-full py-2 px-1 border-b border-[#5B5B5B] bg-[#141414]">
                    <Button variant={"outline"} className=" dark:border-[#EEEEEE]" onClick={() => setIsHovering(!isHovering)} >
                      <p className="text-transparent font-semibold text-sm text-center bg-clip-text bg-gradient-to-b from-[#808080] to-[#000]  dark:text-[#EEEEEE]">
                       <Cross2Icon className="w-4 h-4" />
                      </p>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 p-2">

                  <Button variant={"outline"} className=" dark:border-[#5B5B5B] w-full " onClick={() => disconnect()}>
                    <p className="text-transparent  font-semibold text-sm text-center bg-clip-text bg-gradient-to-b from-[#808080] to-[#000]  dark:text-[#EEEEEE]">
                      verify Joseon
                    </p>
                  </Button>
                  <Button variant={"outline"} className=" dark:border-[#5B5B5B] w-full" onClick={() => disconnect()}>
                    <p className="text-transparent font-semibold text-sm text-center bg-clip-text bg-gradient-to-b from-[#808080] to-[#000]  dark:text-[#EEEEEE]">
                      {buttonText}
                    </p>
                  </Button>
                  </div>
                </div>
              ) : ""
            }


          </div>


        </div>
      )}
    </>
  );
};

export default Profile;
