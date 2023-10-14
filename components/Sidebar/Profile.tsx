import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";

interface Props {
  props: {
    image: string;
    address: string;
    buttonText: string;
  };
}

const Profile = ({ props: { image, address, buttonText } }: Props) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <Image src={image} alt="user Profile" width={80} height={80} />
      <p className="text-center font-normal text-base text-textGrey">
        {truncateWeb3WalletAddress(address)}
      </p>
      <Button variant={"outline"}>
        <p className="text-transparent font-semibold text-base text-center bg-clip-text bg-gradient-to-b from-[#808080] to-[#000] ">
          {buttonText}
        </p>
      </Button>
    </div>
  );
};

export default Profile;
