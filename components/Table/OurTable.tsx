import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableRows from "./TableRows";

const tableDetails = [
  {
    id: 1,
    ethDeposited: "10.23",
    amintMinted: "12.0123",
    abondMinted: "12.0123",
    index: "index",
    liquidated: "Yes",
    interestRate: "3%",
  },
  {
    id: 2,
    ethDeposited: "10.23",
    amintMinted: "12.0123",
    abondMinted: "12.0123",
    index: "index",
    liquidated: "No",
    interestRate: "4%",
  },
];

const DepositAndWithDrawTable = () => {
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
        {tableDetails.map((details, index) => (
          <TableRows key={details.id} details={details} />
        ))}
      </TableBody>
    </Table>
  );
};

export default DepositAndWithDrawTable;
