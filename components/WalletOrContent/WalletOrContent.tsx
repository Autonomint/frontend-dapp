"use client";
import React, { useEffect, useState } from "react";
import heroPattern from "@/app/assets/gridBg.svg";
import DashboardStatsItem from "@/components/Dashboard/DashboardStatsItem";

import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import Divider from "@/components/CustomUI/Divider/Divider";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import Image from "next/image";

import DepositAndWithDrawTable from "@/components/Table/OurTable";
import { useAccount, useChainId,ConnectorData } from "wagmi";
import {
  abondAddress,
  amintAddress,
  useBorrowingContractRead,
} from "@/abiAndHooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import displayNumberWithPrecision from "@/app/utils/precision";
import { formatEther } from "viem";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import { error } from "console";

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
  // destructure isConnected and address from useAccount hook of wagmi
  const { isConnected, address,connector:activeConnector } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  // manage dashboardStats items
  const [dashboardStats, setDashboardStats] = useState(dasboardStatsItem);
  // manage refetching
  const [shouldRefetch, setShouldRefetch] = useState(1);
  // get ethPrice from use Borrowing Contract using wagmi useContractRead Hook
  const { data: ethPrice } = useBorrowingContractRead({
    functionName: "getUSDValue",
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      window.location.reload();
    };

    if (activeConnector) {
      activeConnector.on('change', handleConnectorUpdate);
    }

    return () => {
      if (activeConnector) {
        activeConnector.off('change', handleConnectorUpdate);
      }
    };
  }, [activeConnector]);

  /**
   * Retrieves the depositor data for a given address.
   *
   * @param {`0x${string}` | undefined} address - The address of the depositor.
   * @return {Promise} A Promise that resolves to the depositor data.
   */
  function getDepositorData(address: `0x${string}` | undefined) {
    return fetch(`${BACKEND_API_URL}/borrows/totalDeposits/${chainId}/${address}`).then((response) =>
      response.json()
    )
  }

  // Fetch depositor data using the useQuery hook

  const {
    data: depositorData, // the fetched depositor data
    error: depositorDataError, // any error that occurred during the fetch
  } = useQuery({
    queryKey: ["depositorsData", shouldRefetch, chainId, address],
    queryFn: () => getDepositorData(address ? address : undefined),
    enabled: !!address, // enable the query only if user is connected and we have a address
  });

  /**
   * Retrieves deposits for a given address.
   *
   * @param {`0x${string}` | undefined} address - The address to retrieve deposits for.
   * @return {Promise} A promise that resolves to the JSON response from the server.
   */
  function getDeposits(address: `0x${string}` | undefined) {
    return fetch(`${BACKEND_API_URL}/borrows/${chainId}/${address}`).then(
      (response) => response.json().then((data) => data.sort((a: any, b: any) => a.index - b.index)));
  }
  // Use the useQuery hook to fetch the data
  const { data: deposits, error: depositsError } = useQuery({
    queryKey: ["deposits", chainId, address, shouldRefetch],
    queryFn: (): Promise<any> => getDeposits(address ? address : undefined),
    enabled: !!address,
  });
  console.log("deposits", deposits);
  /**
   * Handles the refetch action.
   *
   * @return {void} This function does not return a value.
   */
  function handleRefetch() {
    setShouldRefetch(shouldRefetch + 1);
  }
  /**
   * Handles the stats item.
   */
  function handleStatsItem() {
    // Check for errors or specific status codes
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

    // Update stats based on depositorData
    if (depositorData) {
      const updatedStats = [...dashboardStats];
      const ethPriceNow = ethPrice ? ethPrice : 0n;
      // Calculate and format the value for the first stat item

      updatedStats[0].value =
        chainId === 5 || chainId === 11155111
          ? `$${parseFloat(
              (
                (depositorData.totalDepositedAmount *
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
                  console.log(updatedStats[0].value)
      // Update the value for the second stat item
      updatedStats[1].value =
        chainId === 5 || chainId === 11155111
          ?( parseFloat(depositorData.totalAmint)).toFixed(2)
          : parseFloat(depositorData.totalAmint).toFixed(2);

      // Update the value for the third stat item
      updatedStats[2].value =
        chainId === 5 || chainId === 11155111
          ? parseFloat(depositorData.totalAbond).toFixed(2)
          : parseFloat(depositorData.totalAbond).toFixed(2);

      // Update the subheading highlight based on the chainId
      updatedStats[0].subheadingHighlight =
        chainId ===5 || chainId === 11155111
          ? depositorData.totalIndex
          : depositorData.totalIndex;

      setDashboardStats(updatedStats);
    } else {
      // If depositorData is null, set default values for stats
      const updatedStats = [...dashboardStats];
      updatedStats[0].value = "-";
      updatedStats[1].value = "-";
      updatedStats[2].value = "-";
      updatedStats[0].subheadingHighlight = "-";
    }

  }

  useEffect(() => {
    // Log the returned data and error
    console.log("returned data", depositorData);
    console.log("error0", depositorDataError);
    // Call the handleStatsItem function to keep values updated as soon as we have new data from depositorData
    handleStatsItem();
    // Log the dashboard stats
    console.log(dashboardStats);
  }, [depositorData, depositorDataError]);

  return (
    <>
      {isConnected ? (
        <div className="relative p-2 xl:p-6 sm:p-2 rounded-[10px] bg-white  dark:bg-[#141414] dark:shadow-none  shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden h-full min-h-[90vh] md:min-h-[82vh]">
          
          <div className="z-10 flex flex-row flex-wrap items-center justify-between w-full gap-1 mt-3 sm:gap-2 lg:gap-4 xl:gap-7 lg:flex-nowrap">
            {dashboardStats.map((item, index) => (
              // Render a div for each item in the dashboardStats array
              <div
                key={`index${item.heading}`}
                className="flex border border-lineGrey dark:border-[#5B5B5B] rounded-lg w-full my-1 sm:w-[49%]"
              >
                <DashboardStatsItem
                  props={{
                    // Pass the heading, value, and other props to the DashboardStatsItem component
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
          {/* Deposit Component */}
          <CreateNewDeposit handleRefetch={handleRefetch} />
          {/* Table Component */}
          <div className="mb-10 overflow-x-scroll overflow-y-scroll max-h-[18rem] md:overflow-x-auto">

          <DepositAndWithDrawTable
            tableData={deposits}
            handleRefetch={handleRefetch}
            />
            </div>
        </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};

export default WalletOrContent;
