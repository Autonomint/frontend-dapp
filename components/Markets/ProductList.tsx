import { ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import uniswap from "@/app/assets/uni.svg";
import cake from "@/app/assets/cake.svg";
import sushi from "@/app/assets/sushi.svg";
import snx from "@/app/assets/snx.svg";

const ProductList = () => {
  return (
    <div className="flex gap-6 min-[1440px]:gap-3 items-center">
      <p className="flex items-center gap-2 whitespace-nowrap">
        AMINT can be bought from <ArrowRightIcon width={16} height={16} />
      </p>
      <Button
        variant={"secondary"}
        className="flex gap-[10px] items-center justify-center w-full min-w-[150px]"
      >
        <Image src={uniswap} width={32} height={32} alt="uniswap"></Image>
        <p className="min-[1440px]:text-base text-sm">Uniswap</p>
      </Button>
      <Button
        variant={"secondary"}
        className="flex gap-[10px] items-center justify-center w-full min-w-[150px]"
      >
        <Image src={cake} width={32} height={32} alt="uniswap"></Image>
        <p className="min-[1440px]:text-base text-sm">Pancake</p>
      </Button>
      <Button
        variant={"secondary"}
        className="flex gap-[10px] items-center justify-center w-full min-w-[150px]"
      >
        <Image src={sushi} width={32} height={32} alt="uniswap"></Image>
        <p className="min-[1440px]:text-base text-sm">Sushiswap</p>
      </Button>
      <Button
        variant={"secondary"}
        className="flex gap-[10px] items-center justify-center w-full min-w-[150px]"
      >
        <Image src={snx} width={32} height={32} alt="uniswap"></Image>
        <p className="min-[1440px]:text-base text-sm">Synthetix</p>
      </Button>
    </div>
  );
};

export default ProductList;
