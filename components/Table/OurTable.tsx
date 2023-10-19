"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cross2Icon } from "@radix-ui/react-icons";
import Row from "../CustomUI/Row";
import Note from "../CustomUI/Note";
import Image from "next/image";

import payments from "@/app/assets/payments.svg";
import pace from "@/app/assets/pace.svg";
import ConfirmNotice from "../CustomUI/ConfirmNotice";

const tableDetails = [
  {
    ethDeposited: "10.23",
    amintMinted: "12.0123",
    abondMinted: "12.0123",
    index: "index",
    liquidated: "Yes",
    interestRate: "3%",
  },
  {
    ethDeposited: "10.23",
    amintMinted: "12.0123",
    abondMinted: "12.0123",
    index: "index",
    liquidated: "No",
    interestRate: "4%",
  },
];

const depositDetails = [
  {
    headline: "Eth Deposited",
    value: "0.00123",
  },
  {
    headline: "ETH Price at Deposit",
    value: "$1645.121",
  },
  {
    headline: "Amint Amount minted",
    value: "1.234",
  },
  {
    headline: "Total Amount (Amint minted + Interest Amount returned)",
    value: "1.934",
  },
  {
    headline: "APY at Deposit",
    value: "5%",
  },
  {
    headline: "Downside percentage at Deposit",
    value: "5%",
  },
  {
    headline: "Liquidated?",
    value: "No",
  },
  {
    headline: "Interest rate gained",
    value: "3%",
  },
  {
    headline: "Abond Minted",
    value: "-",
  },
];

const OurTable = () => {
  const [openConfirmNotice, setOpenConfirmNotice] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [withdrawalTime, setWithdrawalTime] = React.useState("first");
  function handleWithdrawalTime(){
    if(withdrawalTime === "first"){
      setWithdrawalTime("second");
    }else{
      setWithdrawalTime("first");
    }
  }
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-textGrey">ETH Deposited</TableHead>
            <TableHead className="text-textGrey">AMint minted</TableHead>
            <TableHead className="text-textGrey">Interest rate</TableHead>
            <TableHead className="text-textGrey">Abond minted</TableHead>
            <TableHead className="text-textGrey">Liquidated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableDetails.map((details, index) => (
            <TableRow key={index}>
              <TableCell className="text-textGrey">
                <SheetTrigger>{details.ethDeposited}</SheetTrigger>
              </TableCell>
              <TableCell className="text-textGrey">
                <SheetTrigger>{details.amintMinted}</SheetTrigger>
              </TableCell>
              <TableCell className="text-textGrey">
                <SheetTrigger>{details.interestRate}</SheetTrigger>
              </TableCell>
              <TableCell className="text-textGrey">
                <SheetTrigger>{details.abondMinted}</SheetTrigger>
              </TableCell>
              <TableCell className="text-textGrey">
                <SheetTrigger>{details.liquidated}</SheetTrigger>
              </TableCell>

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
                      <Row
                        props={{
                          heading: detail.headline,
                          value: detail.value,
                        }}
                      />
                    ))}
                    <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                      <p className="text-base text-textSecondary">
                        Amount Protected
                      </p>
                      <Button
                        variant={"ghostOutline"}
                        size={"row"}
                        className="text-textHighlight font-medium text-xs leading-none"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                  {openConfirmNotice ? (
                    <>
                      <ConfirmNotice withdrawalTime={withdrawalTime} handleWithdrawal={handleWithdrawalTime}/>
                    </>
                  ) : (
                    <>
                      {withdrawalTime === "first" ? (
                        <Button
                          variant={"primary"}
                          className="text-white"
                          onClick={() => {
                            setOpenConfirmNotice(true);
                          }}
                        >
                          Withdraw for the first time
                        </Button>
                      ) : withdrawalTime === "second" ? (
                        <>
                          <div className="px-[15px] flex flex-col border border-lineGrey rounded bg-gradient-to-r from-white to-[#eee]">
                            <div className="py-[15px] flex items-center justify-between border-b border-lineGrey">
                              <div className="flex gap-[10px] items-center">
                                <Image
                                  src={payments}
                                  alt="payment"
                                  width={24}
                                  height={24}
                                />
                                <p className="text-base text-textSecondary">
                                  First time withdrawal amount
                                </p>
                              </div>

                              <p>######</p>
                            </div>
                            <div className="py-[15px] flex items-center justify-between">
                              <div className="flex gap-[10px] items-center">
                                <Image
                                  src={pace}
                                  alt="time left"
                                  width={24}
                                  height={24}
                                />
                                <p className="text-base text-textSecondary">
                                  Second Time Withdrawal time
                                </p>
                              </div>
                              <p className="text-textHighlight font-medium text-base">
                                ######
                              </p>
                            </div>
                          </div>
                          <Button
                            variant={"primary"}
                            className="text-white"
                            onClick={() => setSheetOpen(false)}
                          >
                            Withdraw for the second time
                          </Button>
                        </>
                      ) : (
                        <>
                          <Note note="position is already liquidated" />
                        </>
                      )}
                    </>
                  )}
                </div>
              </SheetContent>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Sheet>
  );
};

export default OurTable;
