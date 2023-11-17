"use client";
import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import DashboardStatsItem from "@/components/Dashboard/DashboardStatsItem";
import Divider from "@/components/CustomUI/Divider/Divider";
import ProductList from "@/components/Markets/ProductList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import NewDeposit from "./NewDeposit";
import AmintDepositRow from "./AmintDepositRow";

const dasboardStatsItem = [
  {
    heading: "Total amount of AMINT Deposited",
    value: "1324.32",
    showSubHeading: false,
  },
  {
    heading: "Total Number of Deposits",
    value: "6",
    showSubHeading: false,
  },
  {
    heading: "Total accumulated Fees",
    value: "12.0123",
    showSubHeading: false,
  },
  {
    heading: "Total Fees withdrawn",
    value: "5.34",
    showSubHeading: false,
  },
];

const tableDetails = [
  {
    id: 1,
    AmintDeposited: 1200,
    DepositedTime: "5 days ago",
    lockInPeriod: "30 days",
    ETHPriceAtDeposit: "1.234",
  },
  {
    id: 2,
    AmintDeposited: 1500,
    DepositedTime: "4 days ago",
    lockInPeriod: "60 days",
    ETHPriceAtDeposit: "1.225",
  },
];

const page = () => {
  const { isConnected } = useAccount();
  return (
    <>
      {/* Main area */}
      {isConnected ? (
        <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden h-full">
          {/* <div className={`absolute w-[1740px] rotate-[14deg] h-[1200px] z-0`}>
            <Image
              src={heroPattern}
              alt="grid bg"
              className="w-full h-full"
              style={{ objectFit: "cover", opacity: 0.4 }}
            ></Image>
          </div> */}

          <ProductList></ProductList>
          <Divider />
          <div className="flex gap-[30px]">
            {dasboardStatsItem.map((item, index) => (
              <div className="flex border border-lineGrey min-w-[150px] w-full">
                <DashboardStatsItem
                  props={{
                    heading: item.heading,
                    value: item.value,
                    showSubHeading: item.showSubHeading,
                  }}
                />
              </div>
            ))}
          </div>
          <Divider />
          <NewDeposit />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-textGrey/0">Id</TableHead>
                <TableHead className="text-textGrey">Amint Deposited</TableHead>
                <TableHead className="text-textGrey">Deposited Time</TableHead>
                <TableHead className="text-textGrey">Lock In period</TableHead>
                <TableHead className="text-textGrey">Abond minted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableDetails.map((details, index) => (
                <AmintDepositRow details={details} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};

export default page;
