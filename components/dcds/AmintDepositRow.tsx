import { TableCell, TableRow } from "@/components/ui/table";
import React, { useEffect, useRef, useState } from "react";
import calculateTimeDifference from "@/app/utils/calculateTimeDifference";
import { Button } from "../ui/button";



interface DepositDetail {
  id: string;
  address: string;
  index: number;
  depositedAmint: string;
  depositedTime: string;
  depositedUsdt: string;
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

const AmintDepositRow = ({ details ,onClick,isnewtxn,islasttxn}: { details: DepositDetail ,onClick: Function,isnewtxn:boolean,islasttxn:boolean}) => {
  const depositDetails = [
    {
      headline: "USDa Deposited",
      value: "1200",
    },
    {
      headline: "USDT Deposited",
      value: "1200",
    },
    {
      headline: "ETH Price at Deposit",
      value: "$1645.121",
    },
    {
      headline: "Deposit Time",
      value: "10 mins ago",
    },
    {
      headline: "Lock In Period",
      value: "30 days",
    },
    {
      headline: "Days passed since Deposit",
      value: "0 days",
    },
    {
      headline: "Deposit Time APR",
      value: "5%",
    },
    {
      headline: "Current Time APR",
      value: "5%",
    },
    {
      headline: "Opted for liquidations",
      value: "Yes",
    },
  ];

  const [status, setStatus] = useState(details.status);

  useEffect(() => {
    setStatus(details.status);
  }, [details]);

  return (
      <TableRow
      onClick={()=>onClick()}
        key={details.id}
        className={` ${islasttxn && isnewtxn ? "bg-[#57c262]":""} hover:bg-[#E4EDFF] active:bg-[#E4EDFF] dark:active:bg-[#002A11]  dark:border cursor-pointer`}
      >
        <TableCell className="text-borderGrey dark:text-[#EEEEEE]">{`#${details.index}`}</TableCell>
        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
        {details.depositedAmint =="undefined" ? 0:details.depositedAmint} / {details.depositedUsdt=="undefined"?0:details.depositedUsdt}
        </TableCell>
        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
          {new Date(Number(details.depositedTime)*1000).toLocaleString()}
        </TableCell>
        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
      {(Number(details.lockingPeriod)/86400000).toFixed(0)} days
        </TableCell>
        <TableCell className="text-textGrey dark:text-[#EEEEEE] "><Button variant={"outline"} className="mr-4 px-2 pt-1 bg-[#020202] text-white"> Withdraw</Button> </TableCell>
      </TableRow>
  );
};

export default AmintDepositRow;
