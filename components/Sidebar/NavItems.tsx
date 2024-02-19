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
      <div className="min-[1440px]:w-[1.5rem] min-[1440px]:h-[1.5rem] 2dppx:w-[1rem] 2dppx:h-[1rem] w-[1rem] h-[1rem]">
        <Image
          src={image}
          style={{ width: "100%", height: "100%" }}
          alt="Deposit and withdraw"
        />
      </div>
      <p className="text-xs font-normal text-center text-textGrey">{label}</p>
    </div>
  );
};

export default NavItems;
