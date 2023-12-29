import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableRows from "./TableRows";

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
  aprAtDeposit:number;
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-textGrey w-3 opacity-0">Id</TableHead>
          <TableHead className="text-textGrey">ETH Deposited</TableHead>
          <TableHead className="text-textGrey">AMint minted</TableHead>
          <TableHead className="text-textGrey">Interest rate</TableHead>
          <TableHead className="text-textGrey">Abond minted</TableHead>
          <TableHead className="text-textGrey">Liquidated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* if there is tableData map over it */}
        {tableData && tableData?.map((details, index) => (
          // Iterate over each element in the tableData array
          <TableRows key={details.id} details={details} interest={3} handleRefetch={handleRefetch} />
        ))}
      </TableBody>
    </Table>
  );
};

export default DepositAndWithDrawTable;
