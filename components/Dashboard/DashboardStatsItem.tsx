"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAccount, useBalance, useChainId } from "wagmi";
interface Props {
  props: {
    heading: string;
    value: string;
    subheadingBefore?: string;
    subheadingHighlight?: string;
    subheadingAfter?: string;
    showSubHeading: boolean;
    tokenAddress?: {
      11155111: `0x${string}`;
    };
  };
}

const DashboardStatsItem = ({
  props: {
    heading,
    value,
    subheadingBefore,
    subheadingHighlight,
    subheadingAfter,
    showSubHeading,
    tokenAddress,
  },
}: Props) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data, isError, isLoading } = useBalance({
    address: tokenAddress ? address : undefined,
    token: tokenAddress
      ? tokenAddress[chainId as keyof typeof tokenAddress]
      : undefined,
    watch: true,
  });



  return (
    <div className="p-2 sm:p-2 lg:p-4 min-[1440px]:gap-[20px] 2dppx:gap-2 gap-3 md:gap-1 lg:gap-2 flex flex-col justify-between w-full">
      <p className="text-textGrey font-normal min-[1440px]:text-[16px] 2dppx:text-sm text-sm whitespace-nowrap leading-none">
        {heading}
      </p>
      <p className="text-textGrey font-medium min-[1440px]:text-[32px] 2dppx:text-[24px] text-[24px] leading-none">
        {value}
      </p>
      {showSubHeading && (
        <p className="text-textGrey font-normal min-[1440px]:text-base 2dppx:text-sm leading-none text-sm">
          {subheadingBefore}{" "}
          <span className="text-[#020202] font-medium"> 
            {tokenAddress ? data?.formatted.slice(0, 8) : subheadingHighlight}
          </span>{" "}
          {subheadingAfter}
        </p>
      )}
    </div>
  );
};

export default DashboardStatsItem;
