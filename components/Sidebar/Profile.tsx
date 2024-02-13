import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";
import { useAccount, useDisconnect, useEnsName } from "wagmi";
import NetworkSwitch from "../ConnectWallet/NetworkSwitch";

interface Props {
  props: {
    image: string;
    buttonText: string;
  };
}

const Profile = ({ props: { image, buttonText } }: Props) => {
  const { address, isConnected } = useAccount();
  // const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  return (
    <>
      {isConnected && (
        <div className="absolute flex flex-col items-center gap-5 bottom-14">
          <div className="relative flex items-center justify-center">
            <NetworkSwitch />
          </div>
          <div className="min-[1440px]:w-[5rem] min-[1440px]:h-[5rem] 2dppx:w-[3.5rem] 2dppx:h-[3.5rem] w-[3.5rem] h-[3.5rem]">
            <Image
              src={image}
              alt="user Profile"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <p className="text-base font-normal text-center text-textGrey">
            {truncateWeb3WalletAddress(address)}
            {/* {ensName ? ` (${ensName})` : null} */}
          </p>
          <Button variant={"outline"} onClick={() => disconnect()}>
            <p className="text-transparent font-semibold text-base text-center bg-clip-text bg-gradient-to-b from-[#808080] to-[#000] ">
              {buttonText}
            </p>
          </Button>
        </div>
      )}
    </>
  );
};

export default Profile;
