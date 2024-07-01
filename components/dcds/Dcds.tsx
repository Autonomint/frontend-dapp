"use client";

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
import AmintDepositRowCopy from "./Withdrawcopy";
import { RefreshCcw } from "lucide-react";

interface DepositDetail {
  id: string;
  address: string;
  index: number;
  chainId: number;
  depositedAmint: string;
  depositedUsdt: string;
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
    heading: "Total USDa / USDT Deposited",
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

const Dcds = () => {
  // getting isConnected && address from useAccount() of wagmi
  const { isConnected, address, connector: activeConnector } = useAccount();
  const [open2, setOpen2] = React.useState(false);
  // managing sheetOpen and sheetDetails
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [sheetDetails, setSheetDetails] = useState<DepositDetail>();
  const handleSheet = (details: DepositDetail) => {
    setSheetDetails(details)
    setSheetOpen(true);
  }
  const [newtxn, setNewtxn] = useState(false);

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
    return fetch(`${BACKEND_API_URL}/cds/totalDeposits/${chainId}/${address}`).then((response) =>
      response.json()
    );
  }
  function handleRefetch() {
    console.log("fsfsgsgsgg refetched")
    refetchCDSDepositorData().then(() => {
      setOpen2(true);
      setNewtxn(true);
    })
  }

  // Define a variable to store the result of the query
  const { data: dCDSdepositorData, error: dCDSdepositorDataError, refetch: refetchCDSDepositorData } = useQuery({
    // Specify the query key, which consists of the "dCDSdepositorsData",
    // chainId, and address values
    queryKey: ["dCDSdepositorsData", chainId, address],
    // Specify the query function to be executed
    queryFn: () => getCDSDepositorData(address ? address : undefined),
    // Enable the query only if the address value is truthy
    enabled: !!address,
  });

  useEffect(() => {
    refetchCDSDepositorData();
  }, [isConnected])


  // console.log("deposits", deposits);
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
      console.log(dCDSdepositorData)
      if (chainId === 5 || chainId === 11155111) {
        // Update values for Polygon chain
        updatedStats[0].value =
          (dCDSdepositorData.totalDepositedAmint == 'NaN' ? "0" : dCDSdepositorData.totalDepositedAmint) + " / " + (dCDSdepositorData.totalDepositedUsdt == "NaN" ? "0" : dCDSdepositorData.totalDepositedUsdt);
        updatedStats[1].value = dCDSdepositorData.totalIndex ?? "0";
        updatedStats[2].value = dCDSdepositorData.totalFees == null ? '0' : (parseFloat(dCDSdepositorData.totalFees) / 10 ** 18).toString();
        updatedStats[3].value =
          dCDSdepositorData.totalFeesWithdrawn == null ? '0' : (parseFloat(dCDSdepositorData.totalFeesWithdrawn) / 10 ** 18).toString();
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
  const [transform, setTransform] = useState(false)

  const RefreshTableData = async() => {
    const res = await fetch(`${BACKEND_API_URL}/cds/${chainId}/${address}`)
    return res
  }
  const OnclickRefreshHandler = async() => {
    setTransform(true)
    const data = await RefreshTableData()
    if(data){
      handleRefetch()
    }
    setTransform(false)
  }

  /**
   * This useEffect hook is responsible for logging the deposits, total data, error, and calling the handleStatsItem function.
   * It runs whenever dCDSdepositorData or dCDSdepositorDataError changes.
   */
  useEffect(() => {
    console.log("cds total data", dCDSdepositorData);
    console.log("error1", dCDSdepositorDataError);
    handleStatsItem();
    console.log(dCDSdepositorData);
  }, [dCDSdepositorData, dCDSdepositorDataError]);

  return (
    <>
      {
        !isConnected ? <ConnectWallet /> : (
          <div className="relative w-full rounded-[10px] px-2  dark:border-[#3A3A3A]  dark:shadow-none  flex flex-col self-stretch overflow-hidden ">
            <NewDeposit handleRefetch={handleRefetch} openDeposits={setOpen2} />
            <Dialog open={open2} onOpenChange={setOpen2} >
              <DialogContent className="min-w-[80%]">
     
                <div className="flex border  h-[74vh] w-full dark:border-[#3A3A3A] ">
                  <div className="flex w-full ">
                    <div className={`${!sheetDetails ? "basis-full" : "basis-full xl:basis-2/3 "}  overflow-hidden `}>
                      <div className="flex flex-col gap-[10px] ">
                        <div className="p-4">

                          <h2 className="text-black dark:text-[#90AFFF]  font-medium text-2xl min-[1280px]:text-3xl tracking-[-1.8px] min-[1440px]:text-4xl 2dppx:text-2xl">
                            Your Deposits
                          </h2>
                          <p className="text-textSecondary dark:text-[#EEEEEE]  text-sm min-[1440px]:text-base 2dppx:text-xs">
                            A list of all the deposits you have made.
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-3 right-5 ">
          <Button variant={"primary"} onClick={OnclickRefreshHandler} className="flex gap-2">Refresh <RefreshCcw className={`${transform ? "rotate-180":""}  duration-100 w-5 h-5 `}/></Button>
        </div>
                      <div className="min-h-[58.6vh] h-full overflow-y-scroll ">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-200 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-900">
                              <TableHead className="text-textGrey dark:text-[#C4C4C4]">Id</TableHead>
                              <TableHead className="text-textGrey dark:text-[#C4C4C4]">USDa / Usdt Deposited</TableHead>
                              <TableHead className="text-textGrey dark:text-[#C4C4C4]">Deposited Time</TableHead>
                              <TableHead className="text-textGrey dark:text-[#C4C4C4]">Lock In period</TableHead>
                              <TableHead className="text-textGrey dark:text-[#C4C4C4]">Withdraw</TableHead>

                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {!dCDSdepositorDataError
                              ? dCDSdepositorData?.deposits?.map((details: DepositDetail, index: number) => (
                                <AmintDepositRow isnewtxn={newtxn} islasttxn={dCDSdepositorData.deposits.length - 1 == index} key={details.id} onClick={() => handleSheet(details)} details={details} />
                              ))
                              : null}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    <div className={`${!sheetDetails ? "hidden basis-0" : "basis-1/3"} border-l h-[99.9%] overflow-y-scroll right-0 xl:overflow-auto absolute xl:relative border-black  bg-[#eeeeee] dark:bg-[#242424]`}>
                      <div className="absolute right-0 p-1 border border-black cursor-pointer dark:border-[#9E9E9E] w-fit" onClick={() => setSheetDetails(undefined)}><Cross2Icon /></div>

                      {
                        sheetDetails && <AmintDepositRowCopy
                          details={sheetDetails}
                          sheetOpen={sheetOpen}
                          handleSheetOpenChange={setSheetOpen}
                          handleRefetch={handleRefetch}
                        />
                      }
                    </div>
                  </div>
                </div>

              </DialogContent>
            </Dialog>

            {/* {
          sheetDetails && <Withdraw
            details={sheetDetails}
            sheetOpen={sheetOpen}
            handleSheetOpenChange={setSheetOpen}
            handleRefetch={handleRefetch}
          />
        } */}
          </div>
        )
      }
    </>
  );
};

export default Dcds;
