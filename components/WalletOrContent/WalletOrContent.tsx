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
  DialogContent,
} from "@/components/ui/dialog";


const WalletOrContent = () => {
  // destructure isConnected and address from useAccount hook of wagmi
  const { isConnected, address, connector: activeConnector } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const [open2, setOpen2] = React.useState(false);
  const [newtxn,setnewtxn]=useState(false)
  // get ethPrice from use Borrowing Contract using wagmi useContractRead Hook
  const { data: ethPrice } = useReadBorrowingContractGetUsdValue({
    query:{staleTime: 10 * 1000}
  });


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
    queryKey: ["depositorsData", chainId, address],
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
  const { data: deposits, error: depositsError,refetch:dataRefetech } = useQuery({
    queryKey: ["deposits", chainId, address],
    queryFn: (): Promise<any> => getDeposits(address ? address : undefined),
    enabled: !!address,
  });
  /**
   * Handles the refetch action.
   *
   * @return {void} This function does not return a value.
   */
  function handleRefetch() {
    dataRefetech()
    console.log("refetching")
    setOpen2(true);
    setnewtxn(true)
  }
  console.log("deposits",deposits)


  return (
    <>
      {isConnected ? (
        <div className="relative p-2 sm:p-2 rounded-[10px]  flex flex-col self-stretch overflow-hidden h-full ">
          <CreateNewDeposit handleRefetch={handleRefetch} openPositions={setOpen2} />
          <Dialog open={open2} onOpenChange={setOpen2}  >
            <DialogContent className="min-w-[80%] ">
              <div className="flex border  h-[74vh] w-full dark:border-[#3A3A3A]">
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
