"use client";
// protocl tokens
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
import { Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import payments from "@/app/assets/payments.svg";
import pace from "@/app/assets/pace.svg";
import ConfirmNotice from "../CustomUI/ConfirmNotice";
import Note from "../CustomUI/Note";
import SheetRow from "../CustomUI/SheetRow";
import {
  borrowingContractABI,
  borrowingContractAddress,
  useAmintApprove,
  useBorrowingContractCalculateCumulativeRate,
  useBorrowingContractLastCumulativeRate,
  useBorrowingContractRead,
  useBorrowingContractWithDraw,
  usePrepareBorrowingContractCalculateCumulativeRate,
} from "@/abiAndHooks";
import { useAccount, useChainId, useWaitForTransaction } from "wagmi";
import { toast } from "sonner";
import CustomToast from "../CustomUI/CustomToast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { formatEther } from "viem";
import displayNumberWithPrecision from "@/app/utils/precision";
import { calculate30DaysFromStoredTime } from "@/app/utils/calculateNext30Days";
import decodeEventLogsFromAbi from "@/app/utils/decodeEventLogsFromAbi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import { set } from "zod";
import Spinner from "../CustomUI/Spinner";
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

type withdrawData = {
  address: `0x${string}` | undefined;
  index: number;
  chainId: number;
  borrowDebt: string;
  withdrawTime: string;
  withdrawAmount: string;
  amountYetToWithdraw: string;
  noOfAbond: string;
  totalDebtAmount: string;
};


const Withdraw = ({
  details,
  handleSheetOpenChange,
  sheetOpen,
  handleRefetch
}: {
  details: TableData;
  handleSheetOpenChange: (value: boolean) => void;
  sheetOpen: boolean;
  handleRefetch: Function;
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
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
  const [amountView, setAmountView] = useState(false);
  const [amountProtected, setAmountProtected] = useState<number>(0);
  const totalAmintAmount = useRef<bigint>(BigInt(0));
  const [withdrawalTime, setWithdrawalTime] = useState(details.status);
  const [depositData, setDepositData] = useState(depositDetails);
  const chainId = useChainId();
  const toastId = useRef<string | number>("");
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const [spinner, setSpinner] = useState(false);
  // to store eventsValue we get from events while withdrawing
  const eventsValue = useRef(events);
  // get eth price from BorrowingContract getUSDValue function
  const { data: ethPrice } = useBorrowingContractRead({
    functionName: "getUSDValue",
    staleTime: 10 * 1000,
  });

  const {
    isLoading: cumulativeRateLoading,
    // Data for the cumulative rate
    data: cumulativeRate,
    // Function to calculate the cumulative rate
    write: calculateCumulativeRate,
    // Function to reset the cumulative rate
    reset: cumulativeReset,
  } = useBorrowingContractCalculateCumulativeRate({
    // Error handling
    onError(error) {
      console.log(error);
      // Show custom toast notification for error
      toast.custom(
        (t) => {
          toastId.current = t;
          return (
            <div>
              <CustomToast
                key={2}
                props={{
                  t,
                  toastMainColor: "#B43939",
                  headline: `Uhh Ohh! ${error.name}`,
                  toastClosebuttonHoverColor: "#e66d6d",
                  toastClosebuttonColor: "#C25757",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    },
    // Success handling
    onSuccess(data, variables, context) {
      // Show custom toast notification for success
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
        // Set duration to Infinity for persistent toast
        { duration: Infinity }
      );
    },
  });
  //get last cumulative rate from BorrowingContract using our custom useBorrowingContractLastCumulativeRate hook
  const { data: lastCumulativeRate } = useBorrowingContractLastCumulativeRate({
    watch: true,
  });
  const { isLoading, isSuccess: transactionSuccess } = useWaitForTransaction({
    hash: cumulativeRate?.hash, // Transaction hash to wait for
    confirmations: 3, // Number of confirmations required
    onSuccess(data) {
      console.log("transaction completed---", cumulativeRate?.hash, cumulativeRate); // Log transaction completion data
      toast.custom(
        (t) => (
          <CustomToast
            props={{
              t: toastId.current, // Toast ID
              toastMainColor: "#268730", // Main color of the toast
              headline:
                "Transaction Completed. Please Approve Amint to move Forward", // Headline of the toast
              transactionHash: cumulativeRate?.hash, // Transaction hash to display
              linkLabel: "View Transaction", // Label for transaction link
              toastClosebuttonHoverColor: "#90e398", // Hover color of the close button
              toastClosebuttonColor: "#57C262", // Color of the close button
            }}
          />
        ),
        { id: toastId.current } // ID of the toast
      );
      console.log()
      amintApprove?.({
        args: [
          borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
          ] as `0x${string}`, // address of borrowing contract based on chainId
          BigInt(
            BigInt(details.normalizedAmount ? details.normalizedAmount : 0) *
            (lastCumulativeRate ?? 0n)
          ) / BigInt(10 ** 27), // Total amint amount
        ],
      });
    },
  });

  const {
    isLoading: amintApproveLoading,
    data: amintApproveData,
    write: amintApprove,
    reset: approveReset,
  } = useAmintApprove();
  // Use the useWaitForTransaction hook to get the amint transaction status
  const { data: amintTransactionAllowed, isLoading: amintTransactionLoading } = useWaitForTransaction({
    hash: amintApproveData?.hash, // Hash of the amint approval transaction
    onSuccess(data) {
      // Show a custom toast when the transaction is successful
      toast.custom(
        (t) => {
          return (
            <div>
              <CustomToast
                props={{
                  t: toastId.current,
                  toastMainColor: "#268730",
                  headline: "Amint is Approved,Please Confirm Final Withdrawal",
                  transactionHash: amintApproveData?.hash,
                  linkLabel: "View Transaction",
                  toastClosebuttonHoverColor: "#90e398",
                  toastClosebuttonColor: "#57C262",
                }}
              />
            </div>
          );
        },
        { id: toastId.current }
      );

      // Perform the borrow withdrawal after the transaction is successful
      borrowWithdraw?.({
        args: [
          address as `0x${string}`,
          BigInt(details.index),
          BigInt(ethPrice ? ethPrice : 0),
          BigInt(Date.now())
        ],
      });
    },
  });
  const {
    isLoading: borrowWithdrawisLoadingone,
    write: borrowWithdraw, // Function for borrowing withdrawal
    reset: borrowReset, // Function for resetting borrowing
    data: borrowWithdrawData, // Data for borrowing withdrawal
  } = useBorrowingContractWithDraw({
    onSuccess(data) {
      // Success callback for borrowing withdrawal
      toast.custom(
        (t) => {
          return (
            <div>
              <CustomToast
                props={{
                  t: toastId.current,
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
        { id: toastId.current }
      );
    },
    onError(error) {
      // Error callback for borrowing withdrawal
      toast.custom(
        (t) => (
          <div>
            <CustomToast
              props={{
                t: toastId.current,
                toastMainColor: "#B43939",
                headline: `Uhh Ohh! ${error.name}`,
                toastClosebuttonHoverColor: "#e66d6d",
                toastClosebuttonColor: "#C25757",
              }}
            />
          </div>
        ),
        { id: toastId.current }
      );
      setTimeout(() => {
        // Dismiss the toast after 5 seconds
        toast.dismiss(toastId.current);
      }, 5000);
    },
  });


  const {
    isLoading: borrowWithdrawisLoading, // Flag indicating if the transaction for borrowing and withdrawing is loading
    isSuccess: borrowWithdrawtransactionSuccess, // Flag indicating if the transaction for borrowing and withdrawing was successful
  } = useWaitForTransaction({
    hash: borrowWithdrawData?.hash, // Hash of the transaction for borrowing and withdrawing
    confirmations: 1, // Number of confirmations required for the transaction
    onSuccess(data) {
      // Callback function executed when the transaction is successful
      console.log("transaction completed", borrowWithdrawData?.hash, data);

      // Get data logs based on the chain ID
      const dataLogs =
        chainId === 5 ? data.logs[6].data : data.logs[6].data;

      // Decode event logs from ABI
      const { eventName, args } = decodeEventLogsFromAbi(
        borrowingContractABI,
        //topics to filter and decode event variables
        ["0x2dc3b614e32706dcf24286e69af4692f4b2c24fc339d659e80b26d49379b6914"],
        "Withdraw",
        dataLogs
      ) as {
        eventName: string;
        args: { borrowDebt: bigint; withdrawAmount: bigint; noOfAbond: bigint };
      };
      // Update current events value
      eventsValue.current = {
        borrowDebt: args?.borrowDebt.toString(),
        withdrawAmount: args?.withdrawAmount.toString(),
        noOfAbond: args?.noOfAbond.toString(),
      };
      console.log(eventsValue)

      // Perform backend withdraw
      backendWithdraw?.({
        address: address as `0x${string}`,
        index: details.index,
        chainId: chainId,
        borrowDebt: eventsValue.current.borrowDebt,
        withdrawTime: `${Date.now()}`,
        withdrawAmount: eventsValue.current.withdrawAmount,
        amountYetToWithdraw: eventsValue.current.withdrawAmount,
        noOfAbond: eventsValue.current.noOfAbond,
        totalDebtAmount: eventsValue.current.borrowDebt,
      });

      // Display custom toast for successful transaction
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
        { id: toastId.current }
      );

      // Dismiss toast after 5 seconds
      setTimeout(() => {
        toast.dismiss(toastId.current);
      }, 5000);

      // Reset approve, cumulative, and borrow values

      approveReset?.();
      cumulativeReset?.();
      borrowReset?.();
      handleSheetOpenChange(!sheetOpen)
    },
    onError(error) {
      // Callback function executed when there is an error in the transaction
      // Display custom toast for error
      toast.custom(
        (t) => (
          <div>
            <CustomToast
              key={2}
              props={{
                t: toastId.current,
                toastMainColor: "#B43939",
                headline: `Uhh Ohh! ${error.name}`,
                toastClosebuttonHoverColor: "#e66d6d",
                toastClosebuttonColor: "#C25757",
              }}
            />
          </div>
        ),
        { duration: 5000, id: toastId.current }
      );

      // Reset approve, cumulative, and borrow values
      approveReset?.();
      cumulativeReset?.();
      borrowReset?.();
      handleSheetOpenChange(!sheetOpen)
    },
  });
  //using custom hook to mutate backend withdraw
  const { mutate: backendWithdraw, isPending } = useMutation({
    // Specify the mutation function
    mutationFn: withdrawFromBackend,

    // Handle any errors that occur during the mutation
    onError(error: any) {
      console.log(error);
      queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
    },

    // Perform actions after the mutation is completed or rejected
    onSettled() {
      // Invalidate the query for `dCDSdepositorsData`
      queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
      // Invalidate the queries for `dCDSdeposits`
      queryClient.invalidateQueries({ queryKey: ["dCDSdeposits"] });
      handleRefetch()
    },
  });

  async function withdrawFromBackend(data: withdrawData) {
    let bodyValue = JSON.stringify({
      ...data,
    });
    console.log(bodyValue);
    const response = await fetch(`${BACKEND_API_URL}/borrows/withdraw`, {
      method: "PATCH",
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

  /**
   * Handles the withdrawal time based on the current value of withdrawalTime.
   *
   */
  function handleWithdrawalTime() {
    if (withdrawalTime === "DEPOSITED") {
      // write?.();
      /*
      Call calculateCumulativeRate function to calculate the cumulative rate before withdrawal and then we are calling approval function to approve the withdrawal and then finally we are withdrawing on success of approval
      */

      calculateCumulativeRate?.();
      // setOpenConfirmNotice(false);
    } else if (withdrawalTime === "WITHDREW1") {
      //TODO you have to manage second withdrawal it is not handled currently and simply shows a toast message
      toast.custom(
        (t) => (
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
        ),
        { duration: 5000 }
      );
      setOpenConfirmNotice(false);
      // setWithdrawalTime("liquidated");
      handleSheetOpenChange(false)
    } else {
      // setWithdrawalTime("WITHDREW2");
      console.log(withdrawalTime);
    }
  }
  /**
   * Updates the deposit data based on the provided details.
   * If the details are available, it updates each value in the depositData array.
   * If the details are not available, it sets each value in the depositData array to '-'.
   */

  function handleDepositData() {
    // Calculate the totalAmintAmnt
    setSpinner(true);
    const totalAmintAmnt =
      BigInt(
        BigInt(details.normalizedAmount ? details.normalizedAmount : 0) *
        (lastCumulativeRate ?? 0n)
      ) / BigInt(10 ** 27);

    totalAmintAmount.current = totalAmintAmnt;

    if (details) {
      // If details are available, update each value in the depositData array
      const updatedData = [...depositData];
      updatedData[0].value = details.depositedAmount + ` (${(Number(details.depositedAmount)*Number(details.ethPrice)).toFixed(2)} $) `;
      updatedData[1].value = `${details.ethPrice}`;
      updatedData[2].value = details.noOfAmintMinted;
      updatedData[3].value = (parseFloat(totalAmintAmnt.toString()) / 10 ** 6).toString();
      updatedData[4].value = `${details.aprAtDeposit}%`;
      updatedData[5].value = `${details.downsideProtectionPercentage}%`;
      updatedData[6].value = details.status === "LIQUIDATED" ? "Yes" : "No";
      // updatedData[7].value = details.depositedAmount;
      updatedData[8].value = details.noOfAbondMinted
        ? details.noOfAbondMinted
        : "-";
      setDepositData(updatedData);
    } else {
      // If details are not available, set each value in the depositData array to '-'
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
    setSpinner(false);
  }


  const handleAmountProtected = () => {
    //check if we have current ethPrice available or not
    if (ethPrice) {
      //if current ethPrice > deposited time ethPrice
      if (parseFloat(ethPrice.toString()) / 100 > details.ethPrice) {
        setAmountProtected(0);
      }
      //if current ethPrice < depositedethPrice
      else if (parseFloat(ethPrice.toString()) / 100 < details.ethPrice) {
        const amountProt =
          parseFloat(details.depositedAmount) *
          (details.ethPrice - parseFloat(ethPrice.toString()) / 100);
        const amountProtPrecision = parseFloat(
          displayNumberWithPrecision(amountProt.toString())
        );
        setAmountProtected(amountProtPrecision);
      }
      //if current ethprice < 0.8 of depositedethPrice
      else if (
        parseFloat(ethPrice.toString()) / 100 <=
        0.8 * details.ethPrice
      ) {
        // 
        const amountProt =
          0.2 * parseFloat(details.depositedAmount) * details.ethPrice;
        const amountProtPrecision = parseFloat(
          displayNumberWithPrecision(amountProt.toString())
        );
        setAmountProtected(amountProtPrecision);
      }
      setAmountView(!amountView);
    } else {
      setAmountView(!amountView);
      setAmountProtected(0);
    }
  };


  const SecondWithdrawalTime = () => {
    const storedDate = new Date(parseInt(details.withdrawTime1));
    return storedDate.getTime() + 30 * 24 * 60 * 60 * 1000;
  }

  useEffect(() => {
    handleDepositData();
    setWithdrawalTime(details.status);
    handleAmountProtected()
  }, [details,sheetOpen]);



  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={() => {
        handleSheetOpenChange(!sheetOpen);
        setOpenConfirmNotice(false);
        setAmountView(false);
      }}
    >
      {spinner ? <Spinner /> : (
        <SheetContent
          className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
        >
          <div className="flex flex-col min-[1440px]:gap-6 2dppx:gap-[10px] gap-[10px]">
            <div className="flex justify-end w-full">
              <SheetClose onClick={() => { handleSheetOpenChange(!sheetOpen) }} asChild>
                <Button
                  variant={"ghostOutline"}
                  size={"primary"}
                  className="flex gap-[10px] border border-borderGrey"

                >
                  <Cross2Icon className="w-4 h-4" />
                  <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                    Close
                  </p>
                </Button>
              </SheetClose>
            </div>
            <SheetHeader>
              <SheetTitle className="text-textPrimary font-medium min-[1440px]:text-4xl 2dppx:text-2xl text-2xl tracking-[-1.8px]">
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
                    showTooltip: detail.tooltip,
                    tooltipText: detail.tooltipText,
                  }}
                />
              ))}
              <div className="flex justify-between min-[1440px]:px-4 2dppx:px-2 px-2 min-[1440px]:py-[10px] 2dppx:py-[5px] py-[5px] border-b border-lineGrey">
                <div className="flex gap-2">
                  <p className="text-base text-textSecondary">
                    Amount Protected
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircledIcon className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>upto 20% of the deposited amount value</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {!amountView ? (
                  <Button
                    variant={"ghostOutline"}
                    size={"row"}
                    className="text-xs font-medium leading-none text-textHighlight"
                    onClick={handleAmountProtected}
                  >
                    View
                  </Button>
                ) : (
                  <>{amountProtected}</>
                )}
              </div>
            </div>
            {openConfirmNotice ? (
              <>
                <ConfirmNotice
                  withdrawalTime={withdrawalTime}
                  handleWithdrawal={handleWithdrawalTime}
                  amintToMint={withdrawalTime === "DEPOSITED" ? Number(totalAmintAmount.current) : Number(details.depositedAmount)/2}
                  isLoading={isLoading || borrowWithdrawisLoadingone || cumulativeRateLoading || amintApproveLoading || borrowWithdrawisLoading || amintTransactionLoading || isPending}
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
                        <p className="text-base font-medium text-textHighlight">
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
                      disabled={SecondWithdrawalTime() < Date.now() ? false : true}
                    >
                      Withdraw for the second time
                    </Button>
                  </>
                ) : (
                  <>
                    {details.status === "LIQUIDATED" ? (
                      <Note note="position is already liquidated" />
                    ) : (
                      <Note note="amount fully withdrawn" />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </SheetContent>
      )}


    </Sheet>
  );
};

export default Withdraw;
