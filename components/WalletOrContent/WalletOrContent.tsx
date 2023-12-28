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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import displayNumberWithPrecision from "@/app/utils/precision";
import { formatEther } from "viem";
import { BACKEND_API_URL } from "@/constants/BackendUrl";

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
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const [dashboardStats, setDashboardStats] = useState(dasboardStatsItem);
  const [shouldRefetch, setShouldRefetch] = useState(1);
  const { data: ethPrice } = useBorrowingContractRead({
    functionName: "getUSDValue",
    staleTime: 10 * 1000,
  });
  function getDepositorData(address: `0x${string}` | undefined) {
    return fetch(`${BACKEND_API_URL}/borrows/${address}`).then(
      (response) => response.json()
    );
  }
  const { data: depositorData, error: depositorDataError } = useQuery({
    queryKey: ["depositorsData", shouldRefetch,chainId, address],
    queryFn: () => getDepositorData(address ? address : undefined),
    enabled: !!address,
  });
  function getDeposits(address: `0x${string}` | undefined) {
    return fetch(`${BACKEND_API_URL}/borrows/${chainId}/${address}`).then(
      (response) => response.json()
    );
  }
  const { data: deposits, error: depositsError } = useQuery({
    queryKey: ["deposits",chainId, address, shouldRefetch],
    queryFn: (): Promise<any> => getDeposits(address ? address : undefined),
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
      updatedStats[0].value =
        chainId === 80001
          ? `$${parseFloat(
              (
                (depositorData.totalDepositedAmountInPolygon *
                  Number(ethPriceNow)) /
                100
              ).toString()
            ).toFixed(2)}`
          : `$${parseFloat(
              (
                (depositorData.totalDepositedAmountInEthereum *
                  Number(ethPriceNow)) /
                100
              ).toString()
            ).toFixed(2)}`;
      updatedStats[1].value =
        chainId === 80001
          ? parseFloat(depositorData.totalAmintInPolygon).toFixed(2)
          : parseFloat(depositorData.totalAmintInEthereum).toFixed(2);
      updatedStats[2].value =
        chainId === 80001
          ? parseFloat(depositorData.totalAbondInPolygon).toPrecision(2)
          : parseFloat(depositorData.totalAbondInEthereum).toFixed(2);
      updatedStats[0].subheadingHighlight =
        chainId === 80001
          ? depositorData.totalIndexInPolygon
          : depositorData.totalIndexInEthereum;
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
        <div className="relative p-1 xl:p-6 sm:p-2 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden h-full">
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
          <div className="flex flex-row gap-1 sm:gap-2 lg:gap-4 xl:gap-7 z-10 flex-wrap lg:flex-nowrap w-full justify-between items-center">
            {dashboardStats.map((item, index) => (
              <div
                key={`index${item.heading}`}
                className="flex border border-lineGrey w-full sm:w-[49%]"
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
            tableData={deposits}
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
