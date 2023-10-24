"use client";
import React, { useEffect, useState } from "react";
import { ABOND_MATIC, AMINT_MATIC } from "@/constants/Addresses";
import heroPattern from "@/app/assets/gridBg.svg";
import DashboardStatsItem from "@/components/Dashboard/DashboardStatsItem";

import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import Divider from "@/components/CustomUI/Divider/Divider";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import Image from "next/image";

import OurTable from "@/components/Table/OurTable";
import { useAccount, useBalance } from "wagmi";

const dasboardStatsItem = [
  {
    heading: "Total amount of AMINT Deposited",
    value: "1324.32",
    subheadingBefore: "Across a total of",
    subheadingHighlight: "3",
    subheadingAfter: "investments",
    showSubHeading: true,
  },
  {
    heading: "Total amount of AMINT received.",
    value: "12.0123",
    subheadingHighlight: "0",
    subheadingAfter: "AMINT is available in your wallet",
    showSubHeading: true,
    tokenAddress: AMINT_MATIC,
  },
  {
    heading: "Total amount of ABOND received.",
    value: "12.0123",
    subheadingHighlight: "0",
    subheadingAfter: "ABOND is available in your wallet.",
    showSubHeading: true,
    tokenAddress: ABOND_MATIC,
  },
];

const WalletOrContent = () => {
  const { isConnected } = useAccount();

  // useEffect(() => {
  //   const newArray = [...dasboardStatsItem];
  //   newArray[2] = { ...newArray[2], subheadingHighlight: data?.formatted as string };
  //   newArray[1] = { ...newArray[1], subheadingHighlight: data?.formatted as string };
  //   setDashboardStats(newArray);
  // }, [dashboardStats]);

  return (
    <>
      {isConnected ? (
        <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden h-full">
          <div
            className={`absolute w-[1740px] rotate-[14deg] h-[1200px] -z-10`}
          >
            <Image
              src={heroPattern}
              alt="grid bg"
              className="w-full h-full"
              style={{ objectFit: "cover", opacity: 0.1 }}
            ></Image>
          </div>
          <div className="flex gap-[30px] z-10">
            {dasboardStatsItem.map((item, index) => (
              <div
                key={`index${item.heading}`}
                className="flex border border-lineGrey min-w-[150px] w-full"
              >
                <DashboardStatsItem
                  props={{
                    heading: item.heading,
                    value: item.value,
                    showSubHeading: true,
                    subheadingBefore: item.subheadingBefore,
                    subheadingHighlight: item.subheadingHighlight,
                    subheadingAfter: item.subheadingAfter,
                    tokenAddress: item.tokenAddress,
                  }}
                />
              </div>
            ))}
          </div>
          <Divider />
          <CreateNewDeposit />
          <OurTable />
        </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};

export default WalletOrContent;
