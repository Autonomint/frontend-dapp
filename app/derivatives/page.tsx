"use client";
import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import DashboardStatsItem from "@/components/Dashboard/DashboardStatsItem";
import Divider from "@/components/CustomUI/Divider/Divider";
import ProductList from "@/components/Markets/ProductList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import NewDeposit from "./NewDeposit";
import AmintDepositRow from "./AmintDepositRow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import displayNumberWithPrecision from "../utils/precision";
import { formatEther } from "viem";
import { BACKEND_API_URL } from "@/constants/BackendUrl";

interface DepositDetail {
  id: string;
  address: string;
  index: number;
  chainId: number;
  depositedAmint: string;
  depositedTime: string;
  ethPriceAtDeposit: number;
  aprAtDeposit: number;
  lockingPeriod: number;
  ethPriceAtWithdraw: number;
  liquidationAmount: string;
  optedForLiquidation: boolean;
  withdrawTime: number;
  withdrawAmount: string;
  withdrawEthAmount: string;
  fees: string;
  status: "DEPOSITED" | "WITHDREW";
}
const dasboardStatsItem = [
  {
    heading: "Total AMINT Deposited",
    value: "1324.32",
    showSubHeading: false,
  },
  {
    heading: "Total Number of Deposits",
    value: "-",
    showSubHeading: false,
  },
  {
    heading: "Total accumulated Fees",
    value: "-",
    showSubHeading: false,
  },
  {
    heading: "Total Fees withdrawn",
    value: "5.34",
    showSubHeading: false,
  },
];

const page = () => {
  // getting isConnected && address from useAccount() of wagmi
  const { isConnected, address } = useAccount();
  console.log("isConnected", isConnected);
  
  // getting chainId from useChainId() of wagmi
  const chainId = useChainId();
  // getting queryClient from useQueryClient() of tanstack/react-query
  const queryClient = useQueryClient();
  // managing dashboardStats to dasboardStatsItem
  const [dashboardStats, setDashboardStats] = useState(dasboardStatsItem);
  /**
   * Retrieves the CDS depositor data for a given address.
   *
   * @param {string} address - The address of the CDS depositor.
   * @return {Promise<any>} - A promise that resolves with the depositor data.
   */
  async function getCDSDepositorData(
    address: `0x${string}` | undefined
  ): Promise<any> {
    return fetch(`${BACKEND_API_URL}/cds/${address}`).then((response) =>
      response.json()
    );
  }
  

  // Define a variable to store the result of the query
  const { data: dCDSdepositorData, error: dCDSdepositorDataError } = useQuery({
    // Specify the query key, which consists of the "dCDSdepositorsData",
    // chainId, and address values
    queryKey: ["dCDSdepositorsData", chainId, address],
    // Specify the query function to be executed
    queryFn: () => getCDSDepositorData(address ? address : undefined),
    // Enable the query only if the address value is truthy
    enabled: !!address,
  });


  /**
   * Retrieves the deposit details for a specific address.
   *
   * @param {`0x${string}` | undefined} address - The address to retrieve the deposit details for.
   * @return {Promise<DepositDetail[]>} A promise that resolves to an array of deposit details.
   */
  async function getDeposits(
    address: `0x${string}` | undefined
  ): Promise<DepositDetail[]> {
    const response = await fetch(`${BACKEND_API_URL}/cds/${chainId}/${address}`);
    return await response.json();
  }

  // Fetch and store deposits using react-query
  const { data: deposits, error: depositsError } = useQuery<DepositDetail[]>({
    // Set the query key to include chainId and address
    queryKey: ["dCDSdeposits", chainId, address],
    // Call the getDeposits function to fetch deposits
    queryFn: () => getDeposits(address ? address : undefined),
    // Enable the query only if address is truthy
    enabled: !!address,
  });

  function handleStatsItem() {
    // Check for error or 404 status code
    
    if (dCDSdepositorDataError || dCDSdepositorData?.statusCode === 404) {
      // Set dashboard stats values to "-"
      const updatedStats = [...dashboardStats];
      updatedStats[0].value = "-";
      updatedStats[1].value = "-";
      updatedStats[2].value = "-";
      updatedStats[3].value = "-";
      setDashboardStats(updatedStats);
      return;
    }


    // Update dashboard stats based on chainId
    if (dCDSdepositorData) {
      const updatedStats = [...dashboardStats];

      if (chainId === 80001) {
        // Update values for Polygon chain
        updatedStats[0].value =
          dCDSdepositorData.totalDepositedAmintInPolygon ?? "0";
        updatedStats[1].value = dCDSdepositorData.totalIndexInPolygon ?? "0";
        updatedStats[2].value = dCDSdepositorData.totalFeesInPolygon ?? "0";
        updatedStats[3].value =
          dCDSdepositorData.totalFeesWithdrawnInPolygon ?? "0";
      } else if (chainId === 11155111) {
        // Update values for Ethereum chain
        updatedStats[0].value =
          dCDSdepositorData.totalDepositedAmintInEthereum ?? "0";
        updatedStats[1].value = dCDSdepositorData.totalIndexInEthereum ?? "0";
        updatedStats[2].value = dCDSdepositorData.totalFeesInEthereum ?? "0";
        updatedStats[3].value =
          dCDSdepositorData.totalFeesWithdrawnInEthereum ?? "0";
      } else {
        // Default values
        updatedStats[0].value = "0";
        updatedStats[1].value = "0";
        updatedStats[2].value = "0";
        updatedStats[3].value = "0";
      }
      
      setDashboardStats(updatedStats);
    } else {
      // Set dashboard stats values to "-"
      const updatedStats = [...dashboardStats];
      updatedStats[0].value = "-";
      updatedStats[1].value = "-";
      updatedStats[2].value = "-";
      updatedStats[3].value = "-";
    }

    console.log("cds data", dCDSdepositorData);
  }
  /**
   * This useEffect hook is responsible for logging the deposits, total data, error, and calling the handleStatsItem function.
   * It runs whenever dCDSdepositorData or dCDSdepositorDataError changes.
   */
  useEffect(() => {
    console.log("cds deposits", deposits);
    console.log("cds total data", dCDSdepositorData);
    console.log("error1", dCDSdepositorDataError);
    handleStatsItem();
    console.log(dCDSdepositorData);
  }, [dCDSdepositorData, dCDSdepositorDataError]);

  return (
    <>
      {/* Main area */}
      {/* Check if wallet is connected and render dashboard otherwise render connect wallet Component */}
      {isConnected ? (
        <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden h-full">
          {/* removed code for the grid pattern of background */}
          {/* <div className={`absolute w-[1740px] rotate-[14deg] h-[1200px] z-0`}>
            <Image
              src={heroPattern}
              alt="grid bg"
              className="w-full h-full"
              style={{ objectFit: "cover", opacity: 0.4 }}
            ></Image>
          </div> */}


          <ProductList></ProductList>
          <Divider />
          <div className="z-10 flex flex-row flex-wrap items-center justify-between w-full gap-1 sm:gap-2 lg:gap-4 xl:gap-7 lg:flex-nowrap">
            {dashboardStats.map((item, index) => (
              // Iterate over the dashboardStats array
              <div className="flex border border-lineGrey w-full sm:w-[48%]">
                <DashboardStatsItem
                  // Pass the following props to the DashboardStatsItem component
                  key={item.heading + index}
                  props={{
                    // The heading of the item
                    heading: item.heading,
                    // The value of the item
                    value: item.value,
                    // Whether to show the subheading or not
                    showSubHeading: item.showSubHeading,
                  }}
                />
              </div>
            ))}
          </div>
          <Divider />
          {/* // New deposit section */}
          <NewDeposit />
          {/* // Deposits table section */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-textGrey/0">Id</TableHead>
                <TableHead className="text-textGrey">Amint Deposited</TableHead>
                <TableHead className="text-textGrey">Deposited Time</TableHead>
                <TableHead className="text-textGrey">Lock In period</TableHead>
                <TableHead className="text-textGrey">Abond minted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/*
            This block checks if there is no error in the 'deposits' data.
            If there is no error, it maps over the 'deposits' array and renders an 'AmintDepositRow' component for each item.
            Otherwise, it renders nothing.
            */}
              {!depositsError
                ? deposits?.map((details: DepositDetail) => (
                    <AmintDepositRow key={details.id} details={details} />
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};

export default page;
