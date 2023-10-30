"use client"
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
      80001: `0x${string}`;
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
  });

  return (
    <div className="p-4 gap-[20px] flex flex-col">
      <p className="text-textGrey font-normal text-[16px] whitespace-nowrap leading-4">
        {heading}
      </p>
      <p className="text-textGrey font-medium text-[32px] leading-none">
        {value}
      </p>
      {showSubHeading && (
        <p className="text-textGrey font-normal text-base leading-none">
          {subheadingBefore}{" "}
          <span className="text-[#020202] font-medium">
            {tokenAddress ? data?.formatted : subheadingHighlight}
          </span>{" "}
          {subheadingAfter}
        </p>
      )}
    </div>
  );
};

export default DashboardStatsItem;
