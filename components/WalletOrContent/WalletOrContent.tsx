"use client";
import React, { useEffect, useState } from "react";
import heroPattern from "@/app/assets/gridBg.svg";
import DashboardStatsItem from "@/components/Dashboard/DashboardStatsItem";

import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import Divider from "@/components/CustomUI/Divider/Divider";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import Image from "next/image";

import DepositAndWithDrawTable from "@/components/Table/OurTable";
import { useAccount, useChainId } from "wagmi";
import {
  abondAddress,
  amintAddress,
  useBorrowingContractRead,
} from "@/abiAndHooks";
import { useQuery } from "@tanstack/react-query";
import displayNumberWithPrecision from "@/app/utils/precision";
import { formatEther } from "viem";

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

const WalletOrContent = () => {
  const { isConnected, address } = useAccount();
  const chainId=useChainId();
  const [dashboardStats, setDashboardStats] = useState(dasboardStatsItem);
  const [shouldRefetch, setShouldRefetch] = useState(1);
  const { data: ethPrice } = useBorrowingContractRead({
    functionName: "getUSDValue",
    staleTime: 10 * 1000,
  });
  function getDepositorData(address: `0x${string}` | undefined) {
    return fetch(`http://43.204.73.16:3000/borrows/${address}`).then(
      (response) => response.json()
    );
  }
  const { data: depositorData, error: depositorDataError } = useQuery({
    queryKey: ["depositorsData", shouldRefetch],
    queryFn: () => getDepositorData(address ? address : undefined),
    enabled: !!address,
  });

  function handleRefetch() {
    setShouldRefetch(shouldRefetch + 1);
  }
  function handleStatsItem() {
    if (
      depositorDataError ||
      depositorData?.statusCode === 404 ||
      depositorData?.statusCode === 500
    ) {
      const updatedStats = [...dashboardStats];
      updatedStats[0].value = "-";
      updatedStats[1].value = "-";
      updatedStats[2].value = "-";
      updatedStats[0].subheadingHighlight = "-";
      setDashboardStats(updatedStats);
      return;
    }

    if (depositorData) {
      const updatedStats = [...dashboardStats];
      const ethPriceNow = ethPrice ? ethPrice : 0n;
      updatedStats[0].value = `$${
        (depositorData.totalDepositedAmount * Number(ethPriceNow)) / 100
      }`;
      updatedStats[1].value = depositorData.totalAmint;
      // updatedStats[2].value = displayNumberWithPrecision(
      //   formatEther(depositorData.totalAbond)
      // );
      updatedStats[0].subheadingHighlight = depositorData.totalIndex;
      setDashboardStats(updatedStats);
    } else {
      const updatedStats = [...dashboardStats];
      updatedStats[0].value = "-";
      updatedStats[1].value = "-";
      updatedStats[2].value = "-";
      updatedStats[0].subheadingHighlight = "-";
    }
    console.log("returned data", depositorData);
  }
  useEffect(() => {
    console.log("returned data", depositorData);
    console.log("error0", depositorDataError);
    handleStatsItem();
    console.log(dashboardStats);
  }, [depositorData, depositorDataError]);

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
          <CreateNewDeposit handleRefetch={handleRefetch} />
          <DepositAndWithDrawTable
            tableData={depositorData?.borrows}
            handleRefetch={handleRefetch}
          />
        </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};

export default WalletOrContent;
