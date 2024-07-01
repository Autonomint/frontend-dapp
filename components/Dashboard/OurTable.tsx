'use client';
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRows from "./TableRows";
import Spinner from "../CustomUI/Spinner";
import Withdrawcopy from "../Dashboard/Withdrawcopy";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { useAccount } from "wagmi";
import { BACKEND_API_URL } from "@/constants/BackendUrl";

interface TableData {
  id: string;
  address: string;
  index: number;
  collateralType: string;
  depositedAmount: string;
  depositedTime: number;
  ethPrice: number;
  noOfAmintMinted: string;
  normalizedAmount: string;
  strikePrice: number;
  downsideProtectionPercentage: number;
  aprAtDeposit: number;
  withdrawTime1: string;
  withdrawTime2: string;
  withdrawAmount1: string;
  withdrawAmount2: string;
  amountYetToWithdraw: string;
  noOfAbondMinted: string;
  status: "DEPOSITED" | "WITHDREW" | "LIQUIDATED";
}

const DepositAndWithDrawTable = ({
  tableData,
  handleRefetch,
  newtxn
}: {
  tableData: TableData[];
  handleRefetch: Function;
  newtxn?: boolean;
}) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const handleSheet = (details: TableData) => {
    setSelectedId(details.id);
  }
  const sheetDetails = tableData?.find(item => item.id === selectedId);
  const {address,chainId} = useAccount()
  const [transform, setTransform] = useState(false)
  const RefreshTableData = async() => {
    const res = await fetch(`${BACKEND_API_URL}/borrows/refresh/${chainId}/${address}`, {
      method: "POST"
    });
   
    return res
  }
  const OnclickRefreshHandler = async() => {
    setTransform(true)
    const data = await RefreshTableData()
    console.log(data)
    if(data){
      handleRefetch()
    }
    setTransform(false)
  }
  





  return (
    <div className="flex w-full h-[74vh] ">
      <div className={`${!sheetDetails ? "basis-full" : "basis-full xl:basis-2/3 "} relative  overflow-hidden `}>
        <div className="flex flex-col gap-[10px] h-[10vh] ">
          <div className="p-4">
            <h2 className="text-black dark:text-[#FFFFFF]  font-medium text-2xl min-[1280px]:text-3xl tracking-[-1.8px] min-[1440px]:text-4xl 2dppx:text-2xl">
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
        <div className="overflow-y-scroll h-[63vh] ">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-white dark:bg-gray-900 dark:hover:bg-gray-900">
                <TableHead className="w-3 opacity-1 text-textGrey dark:text-[#C4C4C4]">Id</TableHead>
                <TableHead className="text-textGrey dark:text-[#C4C4C4]">ETH Deposited</TableHead>
                <TableHead className="text-textGrey dark:text-[#C4C4C4]">USDa minted</TableHead>
                <TableHead className="text-textGrey dark:text-[#C4C4C4]">Amount Protected (in USD)</TableHead>
                <TableHead className="text-textGrey dark:text-[#C4C4C4]">Abond minted</TableHead>
                <TableHead className="text-textGrey dark:text-[#C4C4C4]">Liquidated</TableHead>
                <TableHead className="text-textGrey dark:text-[#C4C4C4]">Repay</TableHead>
              </TableRow>
            </TableHeader>


            <TableBody>
              {tableData && tableData?.map((details, index) => {
                return <TableRows isnewtxn={newtxn} islasttxn={tableData.length - 1 == index} key={details.id} onClick={() => handleSheet(details)} details={details} interest={details.noOfAbondMinted ? "3%" : "-"} />
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className={`${!sheetDetails ? "hidden basis-0" : "basis-1/3"} border-l h-[99.9%] overflow-y-scroll right-0 xl:overflow-auto absolute xl:relative border-black  bg-[#eeeeee] dark:bg-[#242424]`}>
        <div className="absolute right-0 p-1 border border-black dark:border-[#9E9E9E] cursor-pointer w-fit" onClick={() => setSelectedId(undefined)}><Cross2Icon /></div>
        {
          selectedId && sheetDetails && <Withdrawcopy
            details={sheetDetails}
            handleRefetch={handleRefetch}
          />
        }
      </div>
    </div>
  );
};

export default DepositAndWithDrawTable;
