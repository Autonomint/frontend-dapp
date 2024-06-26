'use client';
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Withdraw from "./Withdraw";
import TableRows from "./TableRows";
import Spinner from "../CustomUI/Spinner";

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
  status: "DEPOSITED" | "WITHDREW1" | "WITHDREW2" | "LIQUIDATED";
}

const DepositAndWithDrawTable = ({
  tableData,
  handleRefetch,
}: {
  tableData: TableData[];
  handleRefetch: Function;
}) => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [sheetDetails, setSheetDetails] = useState<TableData>();
  const handleSheet = (details: TableData) => {
    setSheetDetails(details)
    setSheetOpen(true);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-3 opacity-1 text-textGrey dark:text-[#C4C4C4]">Id</TableHead>
          <TableHead className="text-textGrey dark:text-[#C4C4C4]">ETH Deposited</TableHead>
          <TableHead className="text-textGrey dark:text-[#C4C4C4]">Amint minted</TableHead>
          <TableHead className="text-textGrey dark:text-[#C4C4C4]">Interest rate</TableHead>
          <TableHead className="text-textGrey dark:text-[#C4C4C4]">Abond minted</TableHead>
          <TableHead className="text-textGrey dark:text-[#C4C4C4]">Liquidated</TableHead>
        </TableRow>
      </TableHeader>

          <TableBody>
            {/* if there is tableData map over it */}
            {tableData && tableData?.map((details, index) => (
              // Iterate over each element in the tableData array
              <TableRows  key={details.id} onClick={() => handleSheet(details)} details={details} interest={3} handleRefetch={handleRefetch} />
            ))}
          </TableBody>
        
      {
        sheetDetails && <Withdraw
          details={sheetDetails}
          sheetOpen={sheetOpen}
          handleSheetOpenChange={setSheetOpen}
          handleRefetch={handleRefetch}
          />
      }
    </Table>
  );
};

export default DepositAndWithDrawTable;
