"use client";
import React, { useEffect, useRef, useState } from "react";
import { TableCell, TableRow } from "../ui/table";


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
  status: "DEPOSITED" | "WITHDREW1" | "WITHDREW2" | "LIQUIDATED";
}

const TableRows = ({
  details,
  interest,
  handleRefetch,
  onClick
}: {
  details: TableData;
  interest?: number;
  handleRefetch: Function;
  onClick: Function;
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
    handleDepositData();
  }, [details]);


  return (

      <TableRow onClick={()=>onClick()} className="hover:bg-[#E4EDFF] active:bg-[#E4EDFF] cursor-pointer">
        <TableCell className="w-3 text-borderGrey">
          {`#${details.index}`}
        </TableCell>
        <TableCell className="text-textGrey">
          {details.depositedAmount}
        </TableCell>
        <TableCell className="text-textGrey">
          {details.noOfAmintMinted}
        </TableCell>
        <TableCell className="text-textGrey">
          {interest}%
        </TableCell>
        <TableCell className="text-textGrey">
            {details.noOfAbondMinted === null ? "-" : details.noOfAbondMinted}
        </TableCell>
        <TableCell className="text-textGrey">
            {details.status === "LIQUIDATED" ? "Yes" : "No"}
        </TableCell>

       
      </TableRow>


  );
};

export default TableRows;
