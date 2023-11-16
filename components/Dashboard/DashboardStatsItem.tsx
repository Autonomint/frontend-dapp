"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAccount, useBalance, useChainId } from "wagmi";
interface Props {
  props: {
    index: number;
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
    index,
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
  // function getDepositorData(address: `0x${string}` | undefined) {
  //   return fetch(`http://43.204.73.16:3000/borrows/${address}`).then(
  //     (response) => response.json()
  //   );
  // }
  // const { data: depositorData } = useQuery({
  //   queryKey: ["depositorData"],
  //   queryFn: () =>
  //     getDepositorData("0x2Ea5DA7Dd4c252D1B63c106477d93f9878186f4F"),
  // });
  // console.log("returned data", depositorData);

  return (
    <div className="p-4 min-[1440px]:gap-[20px] gap-2 flex flex-col justify-between">
      <p className="text-textGrey font-normal min-[1440px]:text-[16px] text-sm whitespace-nowrap leading-none">
        {heading}
      </p>
      <p className="text-textGrey font-medium min-[1440px]:text-[32px] text-[24px] leading-none">
        {/* {value === "0" && index === 0
          ? depositorData?.error === "Not Found"
            ? "-"
            : depositorData?.totalDepositedAmount
          : value === "0" && index === 1
          ? depositorData?.error === "Not Found"
            ? "-"
            : depositorData?.totalAmint
          : value === "0" && index === 2
          ? depositorData?.error === "Not Found"
            ? "-"
            : depositorData?.totalAbond
          : "-"} */}
          {value}
      </p>
      {showSubHeading && (
        <p className="text-textGrey font-normal min-[1440px]:text-base leading-none text-sm">
          {subheadingBefore}{" "}
          <span className="text-[#020202] font-medium">
            {/* {tokenAddress
              ? data?.formatted.slice(0, 8)
              : subheadingHighlight === ""
              ? depositorData?.error === "Not Found"
                ? "-"
                : depositorData?.totalIndex
              : "-"} */}
              {tokenAddress?data?.formatted.slice(0, 8):subheadingHighlight}
          </span>{" "}
          {subheadingAfter}
        </p>
      )}
    </div>
  );
};

export default DashboardStatsItem;
