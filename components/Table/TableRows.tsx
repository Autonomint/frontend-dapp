"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import payments from "@/app/assets/payments.svg";
import pace from "@/app/assets/pace.svg";
import ConfirmNotice from "../CustomUI/ConfirmNotice";
import Note from "../CustomUI/Note";
import SheetRow from "../CustomUI/SheetRow";
import {
  useBorrowingContractWithDraw,
  usePrepareBorrowingContractWithDraw,
} from "@/abiAndHooks";
import { useAccount } from "wagmi";

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
  withdrawTime1: number;
  withdrawTime2: number;
  amountYetToWithdraw: number;
  noOfAbondMinted: number;
  status: "DEPOSITED" | "WITHDREW1" | "WITHDREW2" | "LIQUIDATED";
}
const TableRows = ({
  details,
  interest,
}: {
  details: TableData;
  interest?: number;
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
  const [amountView, setAmountView] = useState(false);
  const [withdrawalTime, setWithdrawalTime] = useState(details.status);
  const [depositData, setDepositData] = useState(depositDetails);
  const { address } = useAccount();
  // const { config, error } = usePrepareBorrowingContractWithDraw({
  //   args: [
  //     address as `0x${string}`,
  //     BigInt(details.index),
  //     BigInt(details.ethPrice),
  //     BigInt(Date.now()),
  //   ],
  //   enabled: !!address,
  //   onError(error) {
  //     console.log(error);
  //   },
  // });
  // const { write } = useBorrowingContractWithDraw(config);

  async function withdrawFromBackend(address: `0x${string}` | undefined) {
    let bodyValue = JSON.stringify({
      address: address,
      index: details.index,
      borrowDebt: `4`,
      withdrawTime: `${Date.now()}`,
      withdrawAmount: 12,
      amountYetToWithdraw: 12,
      noOfAbond: 4,
    });
    console.log(bodyValue);
    const response = await fetch("http://43.204.73.16:3000/borrows/withdraw", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: bodyValue,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  }

  function handleWithdrawalTime() {
    if (withdrawalTime === "DEPOSITED") {
      // write?.();
      setOpenConfirmNotice(false);
      setSheetOpen(false);
    } else if (withdrawalTime === "WITHDREW1") {
      setOpenConfirmNotice(false);
      // setWithdrawalTime("liquidated");
      setSheetOpen(false);
    } else {
      // setWithdrawalTime("WITHDREW2");
      console.log(withdrawalTime);
    }
  }
  function handleDepositData() {
    if (details) {
      const updatedData = [...depositData];
      updatedData[0].value = details.depositedAmount;
      updatedData[1].value = `${details.ethPrice}`;
      updatedData[2].value = details.noOfAmintMinted;
      // updatedData[3].value = details.depositedAmount;
      // updatedData[4].value = details.depositedAmount;
      // updatedData[5].value = details.depositedAmount;
      // updatedData[6].value = details.depositedAmount;
      // updatedData[7].value = details.depositedAmount;
      updatedData[8].value = details.noOfAbondMinted
        ? `${details.noOfAbondMinted}`
        : "-";
    }
  }

  useEffect(() => {
    handleDepositData();
  }, [details]);

  return (
    <Sheet
      key={details.id}
      open={sheetOpen}
      onOpenChange={() => {
        setSheetOpen(!sheetOpen);
        setOpenConfirmNotice(false);
      }}
    >
      <TableRow className="hover:bg-[#E4EDFF] active:bg-[#E4EDFF]">
        <TableCell className="text-borderGrey w-3">
          {`#${details.index}`}
        </TableCell>
        <TableCell className="text-textGrey">
          <SheetTrigger>{details.depositedAmount}</SheetTrigger>
        </TableCell>
        <TableCell className="text-textGrey">
          <SheetTrigger>{details.noOfAmintMinted}</SheetTrigger>
        </TableCell>
        <TableCell className="text-textGrey">
          <SheetTrigger>{interest}%</SheetTrigger>
        </TableCell>
        <TableCell className="text-textGrey">
          <SheetTrigger>
            {details.noOfAbondMinted === null ? "-" : details.noOfAbondMinted}
          </SheetTrigger>
        </TableCell>
        <TableCell className="text-textGrey">
          <SheetTrigger>
            {details.status === "LIQUIDATED" ? "Yes" : "No"}
          </SheetTrigger>
        </TableCell>

        <SheetContent>
          <div className="flex flex-col min-[1440px]:gap-6 gap-[10px]">
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
              <SheetTitle className="text-textPrimary font-medium min-[1440px]:text-4xl text-2xl tracking-[-1.8px]">
                Deposit #1
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col">
              {depositDetails.map((detail, index) => (
                <SheetRow
                  key={detail.headline}
                  props={{
                    heading: detail.headline,
                    value: detail.value,
                  }}
                />
              ))}
              <div className="flex justify-between min-[1440px]:px-4 px-2 min-[1440px]:py-[10px] py-[5px] border-b border-lineGrey">
                <p className="text-base text-textSecondary">Amount Protected</p>
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
            {openConfirmNotice ? (
              <>
                <ConfirmNotice
                  withdrawalTime={withdrawalTime}
                  handleWithdrawal={handleWithdrawalTime}
                />
              </>
            ) : (
              <>
                {withdrawalTime === "DEPOSITED" ? (
                  <Button
                    variant={"primary"}
                    className="text-white"
                    onClick={() => {
                      setOpenConfirmNotice(true);
                    }}
                  >
                    Withdraw for the first time
                  </Button>
                ) : withdrawalTime === "WITHDREW1" ? (
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
                      onClick={() => {
                        setOpenConfirmNotice(true);
                      }}
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
    </Sheet>
  );
};

export default TableRows;
