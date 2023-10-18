import Image from "next/image";
import React from "react";

interface Props {
  props: {
    image: string;
    label: string;
  };
}

const NavItems = ({ props: { image, label } }: Props) => {
  return (
    <div className="flex flex-col items-center gap-[10px] px-4 py-4">
      <Image src={image} width={24} height={24} alt="Deposit and withdraw" />
      <p className="text-xs font-normal text-textGrey text-center">{label}</p>
    </div>
  );
};

export default NavItems;
