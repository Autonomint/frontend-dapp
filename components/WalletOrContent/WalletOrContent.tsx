"use client";
import React, { useEffect, useState } from "react";
import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import DepositAndWithDrawTable from "@/components/Table/OurTable";
import { useAccount, useChainId } from "wagmi";
import {
  useReadBorrowingContractGetUsdValue
} from "@/abiAndHooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { set } from "react-hook-form";

const WalletOrContent = () => {
  // destructure isConnected and address from useAccount hook of wagmi
  const { isConnected, address, connector: activeConnector } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const [open2, setOpen2] = React.useState(false);
  // manage dashboardStats items
  // const [dashboardStats, setDashboardStats] = useState(dasboardStatsItem);
  // manage refetching
  const [shouldRefetch, setShouldRefetch] = useState(1);
  const [newtxn,setnewtxn]=useState(false)
  // get ethPrice from use Borrowing Contract using wagmi useContractRead Hook
  const { data: ethPrice } = useReadBorrowingContractGetUsdValue({
    query:{staleTime: 10 * 1000}
  });

  // useEffect(() => {
  //   const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
  //     window.location.reload();
  //   };

  //   if (activeConnector) {
  //     activeConnector.on('change', handleConnectorUpdate);
  //   }

  //   return () => {
  //     if (activeConnector) {
  //       activeConnector.off('change', handleConnectorUpdate);
  //     }
  //   };
  // }, [activeConnector]);

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
    setOpen2(true);
    setnewtxn(true)
  }
  /**
   * Handles the stats item.
   */
  // function handleStatsItem() {
  //   // Check for errors or specific status codes
  //   if (
  //     depositorDataError ||
  //     depositorData?.statusCode === 404 ||
  //     depositorData?.statusCode === 500
  //   ) {
  //     const updatedStats = [...dashboardStats];
  //     updatedStats[0].value = "-";
  //     updatedStats[1].value = "-";
  //     updatedStats[2].value = "-";
  //     updatedStats[0].subheadingHighlight = "-";
  //     setDashboardStats(updatedStats);
  //     return;
  //   }

  //   // Update stats based on depositorData
  //   if (depositorData) {
  //     const updatedStats = [...dashboardStats];
  //     const ethPriceNow = ethPrice ? ethPrice : 0n;
  //     // Calculate and format the value for the first stat item

  //     updatedStats[0].value =
  //       chainId === 5 || chainId === 11155111
  //         ? `$${parseFloat(
  //           (
  //             (depositorData.totalDepositedAmount *
  //               Number(ethPriceNow)) /
  //             100
  //           ).toString()
  //         ).toFixed(2)}`
  //         : `$${parseFloat(
  //           (
  //             (depositorData.totalDepositedAmountInEthereum *
  //               Number(ethPriceNow)) /
  //             100
  //           ).toString()
  //         ).toFixed(2)}`;
  //     console.log(updatedStats[0].value)
  //     // Update the value for the second stat item
  //     updatedStats[1].value =
  //       chainId === 5 || chainId === 11155111
  //         ? (parseFloat(depositorData.totalAmint)).toFixed(2)
  //         : parseFloat(depositorData.totalAmint).toFixed(2);

  //     // Update the value for the third stat item
  //     updatedStats[2].value =
  //       chainId === 5 || chainId === 11155111
  //         ? parseFloat(depositorData.totalAbond).toFixed(2)
  //         : parseFloat(depositorData.totalAbond).toFixed(2);

  //     // Update the subheading highlight based on the chainId
  //     updatedStats[0].subheadingHighlight =
  //       chainId === 5 || chainId === 11155111
  //         ? depositorData.totalIndex
  //         : depositorData.totalIndex;

  //     setDashboardStats(updatedStats);
  //   } else {
  //     // If depositorData is null, set default values for stats
  //     const updatedStats = [...dashboardStats];
  //     updatedStats[0].value = "-";
  //     updatedStats[1].value = "-";
  //     updatedStats[2].value = "-";
  //     updatedStats[0].subheadingHighlight = "-";
  //   }

  // }

  useEffect(() => {
    // Log the returned data and error
    console.log("returned data", depositorData);
    console.log("error0", depositorDataError);
    // Call the handleStatsItem function to keep values updated as soon as we have new data from depositorData
    // handleStatsItem();
    // Log the dashboard stats
    // console.log(dashboardStats);
  }, [depositorData, depositorDataError]);

  return (
    <>
      {isConnected ? (
        <div className="relative p-2 sm:p-2 rounded-[10px] dark:bg-[#141414] dark:shadow-none flex flex-col self-stretch overflow-hidden h-full ">

          <CreateNewDeposit handleRefetch={handleRefetch} openPositions={setOpen2} />


          <Dialog open={open2} onOpenChange={setOpen2}  >
            <DialogContent className="min-w-[80%] ">
              {/* <div className="flex justify-end w-full ">
                <DialogClose asChild>
                  <Button
                    variant={"ghostOutline"}
                    size={"primary"}
                    className="flex gap-[10px] border border-borderGrey rounded-none "
                  >
                    <Cross2Icon className="w-4 h-4" />
                    <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                      Close
                    </p>
                  </Button>
                </DialogClose>
              </div> */}
              {/* <DialogHeader className="flex items-start -mt-5">
                <DialogTitle className="text-textPrimary  font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-3xl text-2xl ">
                  <div className="flex flex-col gap-[10px] ">
                    <h2 className="text-black dark:text-[#90AFFF]  font-medium text-2xl min-[1280px]:text-3xl tracking-[-1.8px] min-[1440px]:text-4xl 2dppx:text-2xl">
                      Your Deposits
                    </h2>
                    <p className="text-textSecondary dark:text-[#EEEEEE]  text-sm min-[1440px]:text-base 2dppx:text-xs">
                      A list of all the deposits you have made.
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader> */}
              <div className="flex border  h-[74vh] w-full ">

                <DepositAndWithDrawTable
                  tableData={deposits}
                  handleRefetch={handleRefetch}
                  newtxn ={newtxn}
                />
              </div>
            </DialogContent>
          </Dialog>

        </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};

export default WalletOrContent;
