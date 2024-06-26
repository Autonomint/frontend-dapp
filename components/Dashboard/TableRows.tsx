"use client";
import React, { useEffect, useRef, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import displayNumberWithPrecision from "@/app/utils/precision";


interface TableData {
  id: string;
  address: string;
  index: number;
  collateralType: string;
  depositedAmount: string;
  depositedTime: number;
  ethPrice: number;
  noOfAmintMinted: string;
  strikePrice: number;
  downsideProtectionPercentage: number;
  aprAtDeposit: number;
  withdrawTime1: string;
  withdrawTime2: string;
  withdrawAmount1: string;
  withdrawAmount2: string;
  normalizedAmount: string;
  amountYetToWithdraw: string;
  noOfAbondMinted: string;
  status: "DEPOSITED" | "WITHDREW" |  "LIQUIDATED";
}

const TableRows = ({
  details,
  interest,
  onClick,
  isnewtxn,
  islasttxn,
  ethprice
}: {
  details: TableData;
  interest?: string;
  onClick: Function;
  isnewtxn?: boolean;
  islasttxn?: boolean;
  ethprice: bigint | undefined;
}) => {
  const depositDetails = [
    {
      headline: "Eth Deposited",
      value: "0.00123",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "ETH Price at Deposit",
      value: "$1645.121",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Amint Amount minted",
      value: "1.234",
      tooltip: true,
      tooltipText: "80% of the total deposited amount",
    },
    {
      headline: "Total Amount (Amint minted + Interest Amount returned)",
      value: "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "APR at Deposit",
      value: "5%",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Downside percentage at Deposit",
      value: "20%",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Liquidated?",
      value: "No",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Interest rate gained",
      value: "3%",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Abond Minted",
      value: "-",
      tooltip: false,
      tooltipText: "",
    },
  ];
  const [depositData, setDepositData] = useState(depositDetails);
  const [amountProtected, setAmountProtected] = useState(0);
  
  const amountProtectedFuntion =()=>{
    if(ethprice === undefined) return;
    if (parseFloat(ethprice.toString())  > details.ethPrice) {
      setAmountProtected(0);
    }
    //if current ethPrice < depositedethPrice
    else if (parseFloat(ethprice.toString())  < details.ethPrice) {
      const amountProt =
        parseFloat(details.depositedAmount) *
        (details.ethPrice - parseFloat(ethprice.toString()));
      const amountProtPrecision = parseFloat(
        displayNumberWithPrecision((amountProt/100).toFixed(2))
      );
      setAmountProtected(amountProtPrecision);
    }
    //if current ethprice < 0.8 of depositedethPrice
    else if (
      parseFloat(ethprice.toString()) <=
      0.8 * details.ethPrice
    ) {
      const amountProt =
        0.2 * parseFloat(details.depositedAmount) * details.ethPrice;
      const amountProtPrecision = parseFloat(
        displayNumberWithPrecision((amountProt/100).toFixed(2))
      );
      setAmountProtected(amountProtPrecision);
    }
    
  }
  function handleDepositData() {
    if (details) {
      
      const updatedData = [...depositData];
      updatedData[0].value = details.depositedAmount;
      updatedData[1].value = `${details.ethPrice}`;
      updatedData[2].value = details.noOfAmintMinted;
      updatedData[4].value = `${details.aprAtDeposit}%`;
      updatedData[5].value = `${details.downsideProtectionPercentage}%`;
      updatedData[6].value = details.status === "LIQUIDATED" ? "Yes" : "No";
      // updatedData[7].value = details.depositedAmount;
      updatedData[8].value = details.noOfAbondMinted
        ? details.noOfAbondMinted
        : "-";
      setDepositData(updatedData);
    } else {
      const updatedData = [...depositData];
      updatedData[0].value = "-";
      updatedData[1].value = "-";
      updatedData[2].value = "-";
      updatedData[3].value = "-";
      updatedData[4].value = "-";
      updatedData[5].value = "-";
      updatedData[6].value = "-";
      updatedData[7].value = "-";
      updatedData[8].value = "-";
      setDepositData(updatedData);
    }
  }

  useEffect(() => {
    amountProtectedFuntion()
    handleDepositData();
  }, [details , ethprice]);
  return (
      <TableRow onClick={()=>onClick()} className={` ${islasttxn && isnewtxn ? "bg-[#ABFFDE] dark:bg-[#3A3A3A]":""} hover:bg-[#E4EDFF] active:bg-[#E4EDFF] dark:active:bg-[#002A11]  dark:border cursor-pointer`}>
        <TableCell className="w-3 text-borderGrey dark:text-[#EEEEEE]">
          {`#${details.index}`}
        </TableCell>
        <TableCell className="text-textGrey  dark:text-[#EEEEEE]">
          {details.depositedAmount}
        </TableCell>
        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
          {details.noOfAmintMinted}
        </TableCell>
        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
          {amountProtected}
        </TableCell>
        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
            {details.noOfAbondMinted === null ? "-" : details.noOfAbondMinted}
        </TableCell>
        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
            {details.status === "LIQUIDATED" ? "Yes" : "No"}
        </TableCell>
        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
            <Button variant={"outline"}  className={`${details.status=="DEPOSITED"?"bg-[#020202]":"bg-[#3b3a3a] dark:bg-[#464646]"}py-1 px-2 mr-4 min-w-24  text-white`} >{details.status =="DEPOSITED"?"Repay" : details.status=="LIQUIDATED"?"Liquidated":"Repaid"}</Button>
        </TableCell>
      </TableRow>
  );
};

export default TableRows;
