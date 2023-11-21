import Note from "@/components/CustomUI/Note";
import SheetRow from "@/components/CustomUI/SheetRow";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TableCell, TableRow } from "@/components/ui/table";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import calculateTimeDifference from "../utils/calculateTimeDifference";

const depositDetails = [
  {
    headline: "AMINT Deposited",
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

interface DepositDetail {
  id: string;
  address: string;
  index: number;
  depositedAmint: string;
  depositedTime: string;
  ethPriceAtDeposit: number;
  Apr: number;
  lockingPeriod: number;
  ethPriceAtWithdraw: number;
  liquidationAmount: string;
  optedForLiquidation: boolean;
  withdrawTime: number;
  withdrawAmount: number;
  withdrawEthAmount: number;
  fees: string;
  status: "DEPOSITED" | "WITHDREW";
}

const AmintDepositRow = ({ details }: { details: DepositDetail }) => {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [amountView, setAmountView] = React.useState(false);
  const [depositData, setDepositData] = useState(depositDetails);
  function handleDepositData() {
    if (details) {
      const updatedData = [...depositData];
      updatedData[0].value = details.depositedAmint;
      updatedData[1].value = `${details.ethPriceAtDeposit}`;
      updatedData[2].value = calculateTimeDifference(details.depositedTime);
      updatedData[3].value = `${details.lockingPeriod} days`;
      updatedData[4].value = calculateTimeDifference(details.depositedTime);
      updatedData[5].value = `${details.Apr}`;
      updatedData[6].value = `${details.Apr}`;
      updatedData[7].value = details.optedForLiquidation ? "Yes" : "No";
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
      setDepositData(updatedData);
    }
  }

  useEffect(() => {
    handleDepositData();
  }, [details]);

  return (
    <Sheet key={details.id} open={sheetOpen} onOpenChange={setSheetOpen}>
      <TableRow
        key={details.id}
        className="hover:bg-[#E4EDFF] active:bg-[#E4EDFF]"
      >
        <TableCell className="text-borderGrey">{`#${details.index}`}</TableCell>
        <TableCell className="text-textGrey">
          <SheetTrigger>{details.depositedAmint}</SheetTrigger>
        </TableCell>
        <TableCell className="text-textGrey">
          <SheetTrigger>
            {calculateTimeDifference(details.depositedTime)}
          </SheetTrigger>
        </TableCell>
        <TableCell className="text-textGrey">
          <SheetTrigger>{details.lockingPeriod} days</SheetTrigger>
        </TableCell>
        <TableCell className="text-textGrey">
          <SheetTrigger>{details.ethPriceAtDeposit}</SheetTrigger>
        </TableCell>
      </TableRow>
      <SheetContent>
        <div className="flex flex-col gap-6">
          <div className="flex w-full justify-end">
            <SheetClose asChild>
              <Button
                variant={"ghostOutline"}
                size={"primary"}
                className="flex gap-[10px] border border-borderGrey"
              >
                <Cross2Icon className="h-4 w-4" />
                <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                  Close
                </p>
              </Button>
            </SheetClose>
          </div>
          <SheetHeader>
            <SheetTitle className="text-textPrimary font-medium text-4xl tracking-[-1.8px]">
              Deposit #1
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col">
            {depositDetails.map((detail, index) => (
              <SheetRow
                props={{
                  heading: detail.headline,
                  value: detail.value,
                }}
              />
            ))}
            <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
              <p className="text-base text-textSecondary">
                Total Amount accured
              </p>
              {!amountView ? (
                <Button
                  variant={"ghostOutline"}
                  size={"row"}
                  className="text-textHighlight font-medium text-xs leading-none"
                  onClick={() => setAmountView(!amountView)}
                >
                  View
                </Button>
              ) : (
                <>{`3.42`}</>
              )}
            </div>
          </div>
          <Note note="Note: Your amount will be used to offer protection to borrowers & protocol in return for fixed yields" />
          <Button variant={"primary"} className="text-white">
            Withdraw
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AmintDepositRow;
