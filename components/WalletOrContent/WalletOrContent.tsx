"use client";
import React, { useEffect, useState } from "react";
import heroPattern from "@/app/assets/gridBg.svg";
import DashboardStatsItem from "@/components/Dashboard/DashboardStatsItem";

import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import Divider from "@/components/CustomUI/Divider/Divider";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import Image from "next/image";

import DepositAndWithDrawTable from "@/components/Table/OurTable";
import { useAccount } from "wagmi";
import { abondAddress, amintAddress } from "@/abiAndHooks";
import { useQuery } from "@tanstack/react-query";

const dasboardStatsItem = [
  {
    heading: "Total amount of ETH Deposited",
    value: "0",
    subheadingBefore: "Across a total of",
    subheadingHighlight: "",
    subheadingAfter: "investments",
    showSubHeading: true,
  },
  {
    heading: "Total amount of AMINT received.",
    value: "0",
    subheadingHighlight: "0",
    subheadingAfter: "AMINT is available in your wallet",
    showSubHeading: true,
    tokenAddress: amintAddress,
  },
  {
    heading: "Total amount of ABOND received.",
    value: "0",
    subheadingHighlight: "0",
    subheadingAfter: "ABOND is available in your wallet.",
    showSubHeading: true,
    tokenAddress: abondAddress,
  },
];

const tableDetails = [
  {
    id: 1,
    ethDeposited: "10.23",
    amintMinted: "12.0123",
    abondMinted: "12.0123",
    index: "index",
    liquidated: "Yes",
    interestRate: "3%",
  },
  {
    id: 2,
    ethDeposited: "10.23",
    amintMinted: "12.0123",
    abondMinted: "12.0123",
    index: "index",
    liquidated: "No",
    interestRate: "4%",
  },
];

const WalletOrContent = () => {
  const { isConnected } = useAccount();
  const [dashboardStats, setDashboardStats] = useState(dasboardStatsItem);
  function getDepositorData(address: `0x${string}` | undefined) {
    return fetch(`http://43.204.73.16:3000/borrows/${address}`).then(
      (response) => response.json()
    );
  }
  const { data: depositorData } = useQuery({
    queryKey: ["depositorData"],
    queryFn: () =>
      getDepositorData("0x2Ea5DA7Dd4c252D1B63c106477d93f9878186f4F"),
  });
  console.log("returned data", depositorData);

  function handleStatsItem() {
    if (depositorData) {
      const updatedStats = [...dashboardStats];
      updatedStats[0].value = depositorData.totalDepositedAmount;
      updatedStats[1].value = depositorData.totalAmint;
      updatedStats[2].value = depositorData.totalAbond;
      updatedStats[0].subheadingHighlight = depositorData.totalIndex;
      setDashboardStats(updatedStats);
    }
    else {
      const updatedStats = [...dashboardStats];
      updatedStats[0].value = "-";
      updatedStats[1].value = "-";
      updatedStats[2].value = "-";
      updatedStats[0].subheadingHighlight = "-";
      setDashboardStats(updatedStats);
    }
  }
  useEffect(() => {
    handleStatsItem();
    console.log(dashboardStats)
  }, [depositorData]);

  return (
    <>
      {isConnected ? (
        <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden h-full">
          {/* <div
            className={`absolute w-[1740px] rotate-[14deg] h-[1200px] z-0 opacity-30`}
          >
            <Image
              src={heroPattern}
              alt="grid bg"
              className="w-full h-full"
              style={{ objectFit: "cover", opacity: 0.4 }}
            ></Image>
          </div> */}
          <div className="flex gap-[30px] z-10">
            {dashboardStats.map((item, index) => (
              <div
                key={`index${item.heading}`}
                className="flex border border-lineGrey  w-full"
              >
                <DashboardStatsItem
                  props={{
                    index: index,
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
          <DepositAndWithDrawTable />
        </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};

export default WalletOrContent;
