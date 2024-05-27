import Image from "next/image";
import React from "react";

interface Props {
  props: {
    image?: string;
    label: string;
  };
}

const NavItems = ({ props: { image, label } }: Props) => {
  return (
    <div className="flex items-center gap-[4px]  py-3 px-2 ">
      {/* <div className="min-[1440px]:w-[1.5rem] min-[1440px]:h-[1.5rem] 2dppx:w-[1rem] 2dppx:h-[1rem] w-[1rem] h-[1rem]">
        <Image
          src={image}
          style={{ width: "100%", height: "100%" }}
          alt="Deposit and withdraw"
        />
      </div> */}
      <p className="text-[14px] text-center text-[#00000] dark:text-[#C4C4C4]">{label}</p>
      {/* {label === "Bridge" ? (
        <span className="relative text-[0.7rem] bottom-2 border border-black dark:border-white px-1 rounded-lg text-center ">coming soon</span>
      ):("")} */}
    </div>
  );
};

export default NavItems;
