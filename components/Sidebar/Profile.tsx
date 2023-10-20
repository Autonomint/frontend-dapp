import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";
import { useAccount, useDisconnect, useEnsName } from "wagmi";

interface Props {
  props: {
    image: string;

    buttonText: string;
  };
}

const Profile = ({ props: { image, buttonText } }: Props) => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  return (
    <>
      {isConnected && (
        <div className="flex flex-col items-center gap-5">
          <Image src={image} alt="user Profile" width={80} height={80} />
          <p className="text-center font-normal text-base text-textGrey">
            {truncateWeb3WalletAddress(address)}
            {ensName ? ` (${ensName})` : null}
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
