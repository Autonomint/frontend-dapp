"use client";
import React, { useEffect, useRef, useState } from "react";
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
  borrowingContractAddress,
  useAmintAllowance,
  useAmintApprove,
  useBorrowingContractCalculateCumulativeRate,
  useBorrowingContractLastCumulativeRate,
  useBorrowingContractRead,
  useBorrowingContractWithDraw,
  useBorrowingContractWithdrawEvent,
  usePrepareBorrowingContractWithDraw,
} from "@/abiAndHooks";
import { useAccount, useChainId, useWaitForTransaction } from "wagmi";
import { toast } from "sonner";
import CustomToast from "../CustomUI/CustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatEther } from "viem";
import displayNumberWithPrecision from "@/app/utils/precision";
import { useWithdrawFromBackend } from "@/app/utils/backendHooks/useWithdrawFromBackend";
import { calculate30DaysFromStoredTime } from "@/app/utils/calculateNext30Days";

const events = {
  borrowDebt: "",
  withdrawAmount: "",
  noOfAbond: "",
};

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
}: {
  details: TableData;
  interest?: number;
  handleRefetch: Function;
}) => {
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
      value: "-",
    },
    {
      headline: "APY at Deposit",
      value: "5%",
    },
    {
      headline: "Downside percentage at Deposit",
      value: "20%",
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
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
  const [amountView, setAmountView] = useState(false);
  const [withdrawalTime, setWithdrawalTime] = useState(details.status);
  const [depositData, setDepositData] = useState(depositDetails);
  const chainId = useChainId();
  const toastId = useRef<string | number>("");
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const eventsValue = useRef(events);
  const { data: ethPrice } = useBorrowingContractRead({
    functionName: "getUSDValue",
    staleTime: 10 * 1000,
  });

  const {
    data: cumulativeRate,
    write: calculateCumulativeRate,
    reset: cumulativeReset,
  } = useBorrowingContractCalculateCumulativeRate({
    onError(error) {
      console.log(error);
      toast.custom((t) => (
        <div>
          <CustomToast
            key={2}
            props={{
              t,
              toastMainColor: "#B43939",
              headline: `Uhh Ohh! ${error.cause}`,
              toastClosebuttonHoverColor: "#e66d6d",
              toastClosebuttonColor: "#C25757",
            }}
          />
        </div>
      ));
    },
    onSuccess(data, variables, context) {
      toast.custom(
        (t) => {
          toastId.current = t;
          return (
            <CustomToast
              props={{
                t,
                toastMainColor: "#268730",
                headline: "Transaction Submitted",
                transactionHash: data?.hash,
                linkLabel: "View Transaction",
                toastClosebuttonHoverColor: "#90e398",
                toastClosebuttonColor: "#57C262",
              }}
            />
          );
        },
        { duration: 600 * 1000 }
      );
    },
    onSettled() {
      setSheetOpen(false);
      setOpenConfirmNotice(false);
    },
  });
  const { data: lastCumulativeRate } = useBorrowingContractLastCumulativeRate();

  const { isLoading, isSuccess: transactionSuccess } = useWaitForTransaction({
    hash: cumulativeRate?.hash,
    confirmations: 3,
    onSuccess(data) {
      console.log("transaction completed", cumulativeRate?.hash, data);
      toast.custom(
        (t) => (
          <CustomToast
            props={{
              t: toastId.current,
              toastMainColor: "#268730",
              headline:
                "Transaction Completed. Please Approve Amint to move Forward",
              transactionHash: cumulativeRate?.hash,
              linkLabel: "View Transaction",
              toastClosebuttonHoverColor: "#90e398",
              toastClosebuttonColor: "#57C262",
            }}
          />
        ),
        { duration: 20 * 1000, id: toastId.current }
      );
      amintApprove?.({
        args: [
          borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ] as `0x${string}`,
          BigInt(details.normalizedAmount),
        ],
      });
    },
  });

  const {
    data: amintApproveData,
    write: amintApprove,
    reset: approveReset,
  } = useAmintApprove();
  const { data: amintTransactionAllowed } = useWaitForTransaction({
    hash: amintApproveData?.hash,
    onSuccess() {
      borrowWithdraw?.({
        args: [
          address as `0x${string}`,
          BigInt(details.index),
          BigInt(ethPrice ? ethPrice : 0),
          BigInt(Date.now()),
        ],
      });
    },
  });
  const {
    write: borrowWithdraw,
    reset: borrowReset,
    data: borrowWithdrawData,
  } = useBorrowingContractWithDraw({
    onSuccess(data, variables, context) {
      toast.custom(
        (t) => {
          toastId.current = t;
          return (
            <div>
              <CustomToast
                props={{
                  t,
                  toastMainColor: "#268730",
                  headline: "Transaction Submitted",
                  transactionHash: data?.hash,
                  linkLabel: "View Transaction",
                  toastClosebuttonHoverColor: "#90e398",
                  toastClosebuttonColor: "#57C262",
                }}
              />
            </div>
          );
        },
        { duration: 600 * 1000 }
      );
    },
    onError(error, variables, context) {
      toast.custom((t) => (
        <div>
          <CustomToast
            props={{
              t,
              toastMainColor: "#B43939",
              headline: `Uhh Ohh! ${error.cause}`,
              toastClosebuttonHoverColor: "#e66d6d",
              toastClosebuttonColor: "#C25757",
            }}
          />
        </div>
      ));
    },
  });
  const {
    isLoading: borrowWithdrawisLoading,
    isSuccess: borrowWithdrawtransactionSuccess,
  } = useWaitForTransaction({
    hash: borrowWithdrawData?.hash,
    confirmations: 3,
    onSuccess(data) {
      console.log("transaction completed", borrowWithdrawData?.hash, data);
      toast.custom(
        (t) => (
          <CustomToast
            props={{
              t: toastId.current,
              toastMainColor: "#268730",
              headline: "Transaction Completed. Withdrawal Done",
              transactionHash: cumulativeRate?.hash,
              linkLabel: "View Transaction",
              toastClosebuttonHoverColor: "#90e398",
              toastClosebuttonColor: "#57C262",
            }}
          />
        ),
        { duration: 20 * 1000, id: toastId.current }
      );
      approveReset?.();
      cumulativeReset?.();
      borrowReset?.();
    },
    onError(error) {
      toast.custom((t) => (
        <div>
          <CustomToast
            key={2}
            props={{
              t,
              toastMainColor: "#B43939",
              headline: `Uhh Ohh! ${error.cause}`,
              toastClosebuttonHoverColor: "#e66d6d",
              toastClosebuttonColor: "#C25757",
            }}
          />
        </div>
      ));
      approveReset?.();
      cumulativeReset?.();
      borrowReset?.();
    },
  });
  const {
    mutate: backendWithdraw,
    reset: backendWithdrawReset,
    isSuccess: backendWithdrawSuccess,
  } = useWithdrawFromBackend();
  // const { mutate: backendWithdraw,reset:backendWithdrawReset,isSuccess:backendWithdrawSuccess } = useMutation({
  //   mutationFn: withdrawFromBackend,
  //   onError(error, variables, context) {
  //     console.log(error);
  //   },
  //   onSuccess(data, variables, context) {
  //     queryClient.invalidateQueries({ queryKey: ["depositorsData"] });
  //   },
  //   onSettled() {
  //     queryClient.invalidateQueries({ queryKey: ["depositorsData"] });
  //     handleRefetch();
  //     approveReset?.();
  //     cumulativeReset?.();
  //     borrowReset?.();
  //     setSheetOpen(false);
  //   },
  // });
  const unwatch = useBorrowingContractWithdrawEvent({
    listener(log) {
      console.log(log);
      if (!!log) {
        eventsValue.current =
          log[0].args.borrowDebt &&
          log[0].args.withdrawAmount &&
          log[0].args.noOfAbond
            ? {
                ...eventsValue.current,
                borrowDebt: log[0]?.args?.borrowDebt.toString(),
                withdrawAmount: log[0]?.args?.withdrawAmount.toString(),
                noOfAbond: log[0]?.args?.noOfAbond.toString(),
              }
            : { ...eventsValue.current };
        backendWithdraw?.({
          address: address as `0x${string}`,
          index: details.index,
          chainId: chainId,
          borrowDebt: eventsValue.current.borrowDebt,
          withdrawTime: `${Date.now()}`,
          withdrawAmount: eventsValue.current.withdrawAmount,
          amountYetToWithdraw: eventsValue.current.withdrawAmount,
          noOfAbond: eventsValue.current.noOfAbond,
        });
      }
      if (log[0].args) {
        unwatch?.();
      }
    },
  });

  function handleWithdrawalTime() {
    if (withdrawalTime === "DEPOSITED") {
      // write?.();
      calculateCumulativeRate?.();
      // setOpenConfirmNotice(false);
    } else if (withdrawalTime === "WITHDREW1") {
      toast.custom((t) => (
        <div>
          <CustomToast
            key={2}
            props={{
              t,
              toastMainColor: "#B43939",
              headline: `You have to wait for 30 days to withdraw after first withdrawal`,
              toastClosebuttonHoverColor: "#e66d6d",
              toastClosebuttonColor: "#C25757",
            }}
          />
        </div>
      ));
      setOpenConfirmNotice(false);
      // setWithdrawalTime("liquidated");
      setSheetOpen(false);
    } else {
      // setWithdrawalTime("WITHDREW2");
      console.log(withdrawalTime);
    }
  }
  function handleDepositData() {
    const totalAmintAmount =
      BigInt(
        BigInt(details.normalizedAmount ? details.normalizedAmount : 0) *
          (lastCumulativeRate ? lastCumulativeRate : BigInt(0))
      ) / BigInt(10 ** 27);
    if (details) {
      const updatedData = [...depositData];
      updatedData[0].value = details.depositedAmount;
      updatedData[1].value = `${details.ethPrice}`;
      updatedData[2].value = details.noOfAmintMinted;
      updatedData[3].value = displayNumberWithPrecision(
        formatEther(totalAmintAmount)
      );
      // updatedData[4].value = details.depositedAmount;
      updatedData[5].value = `${details.downsideProtectionPercentage}%`;
      // updatedData[6].value = details.depositedAmount;
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
    // if(backendWithdrawSuccess){
    //   backendWithdrawReset?.();
    // }
  }, [details]);
  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={() => {
        setSheetOpen(!sheetOpen);
        setOpenConfirmNotice(false);
        setAmountView(false);
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
            {details.status === "LIQUIDATED" || details.status === "WITHDREW2"
              ? "Yes"
              : "No"}
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
                Deposit #{details.index}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col">
              {depositData.map((detail, index) => (
                <SheetRow
                  key={detail.headline + index}
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
                  amintToMint={BigInt(details.normalizedAmount)}
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
                            First time withdrawed amount
                          </p>
                        </div>

                        <p>
                          {parseFloat(
                            details.withdrawAmount1
                              ? details.withdrawAmount1
                              : "0"
                          ).toFixed(4)}
                        </p>
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
                            Second Withdrawal time
                          </p>
                        </div>
                        <p className="text-textHighlight font-medium text-base">
                          {calculate30DaysFromStoredTime(details.withdrawTime1)}
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
