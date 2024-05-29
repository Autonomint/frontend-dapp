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
  borrowingContractAbi,
  treasuryAbi,
  cdsAddress,
  cdsAbi,
  treasuryAddress,
  borrowingContractAddress,
  useWriteUsDaApprove,
  useWriteBorrowingContractCalculateCumulativeRate,
  useReadBorrowingContractLastCumulativeRate,
  useReadBorrowingContractGetUsdValue,
  useWriteBorrowingContractWithDraw,
  useReadTreasuryQuote,
  useReadBorrowingContractQuote
} from "@/abiAndHooks";
import { Options } from '@layerzerolabs/lz-v2-utilities'
import { useAccount, useBalance, useChainId, useWaitForTransactionReceipt, useReadContract } from "wagmi";
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
import TransactionLoader from "../CustomUI/transaction";
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
  status: "DEPOSITED" | "WITHDREW" | "LIQUIDATED";
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


const Withdrawcopy = ({
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
      headline: "Total Amount (Amint minted + Interest)",
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
  // const [withdrawalTime, setWithdrawalTime] = useState(details.status);
  const [depositData, setDepositData] = useState(depositDetails);
  const chainId = useChainId();
  const toastId = useRef<string | number>("");
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const [spinner, setSpinner] = useState(false);
  // to store eventsValue we get from events while withdrawing
  const eventsValue = useRef(events);
  // get eth price from BorrowingContract getUSDValue function
  const { data: ethPrice } = useReadBorrowingContractGetUsdValue({

    query: { staleTime: 10 * 1000, }
  });
  const Eid = chainId===11155111? 40245: 40161;
  const options  = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString() as `0x${string}`;

  const {data:nativeFee } = useReadTreasuryQuote({ query: { enabled: !!address },args:[Eid, 1,
    {recipient:"0x0000000000000000000000000000000000000000",tokensToSend:0n},
    {recipient:"0x0000000000000000000000000000000000000000",nativeTokensToSend:0n}, options, false],
  });




  const {data:nativeFee2 } = useReadBorrowingContractQuote({query:{enabled:!!address},args:[Eid, {
    normalizedAmount: 5n,
    ethVaultValue: 10n,
    cdsPoolValue: 15n,
    totalCDSPool: 20n,
    noOfLiquidations: 25n,
    ethRemainingInWithdraw: 30n,
    ethValueRemainingInWithdraw: 35n,
    nonce: 40n
  }, options, false]})

  const {
    isPending: cumulativeRateLoading,
    isError: cumulativeRateError,
    // Data for the cumulative rate
    data: cumulativeRate,
    // Function to calculate the cumulative rate
    writeContract: calculateCumulativeRate,
    // Function to reset the cumulative rate
    reset: cumulativeReset,
  } = useWriteBorrowingContractCalculateCumulativeRate({
    // Error handling
    mutation: {
      onError(error) {
        console.log(error);
        cumulativeReset?.();
        // Show custom toast notification for error
        setOpenConfirmNotice(true);

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
          {duration:5000, id: toastId.current },
        );
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
                  transactionHash: data,
                  linkLabel: "View Transaction",
                  toastClosebuttonHoverColor: "#90e398",
                  toastClosebuttonColor: "#57C262",
                }}
              />
            );
          },
          // Set duration to Infinity for persistent toast
          {duration:5000, id: toastId.current },
        );

      },
    }
  }

  );
  //get last cumulative rate from BorrowingContract using our custom useBorrowingContractLastCumulativeRate hook
  const { data: lastCumulativeRate } = useReadBorrowingContractLastCumulativeRate({
    query: { staleTime: 10 * 1000 }
  });
  const { isLoading: ispendingCumulative, isSuccess: cumulativeRateSuccess, data: culmulativeData } = useWaitForTransactionReceipt({
    hash: cumulativeRate, // Transaction hash to wait for
    confirmations: 3, // Number of confirmations required

  });

  useEffect(() => {
    if (culmulativeData) {
      // Perform the amint approval after the cumulative rate is calculated
      amintApprove?.({
        args: [
          borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
          ] as `0x${string}`, // address of borrowing contract based on chainId
          BigInt(
            BigInt(details.normalizedAmount ? Number(details.normalizedAmount)*10**6 : 0) *
            (lastCumulativeRate ?? 0n)
          ) / BigInt(10 ** 27) + 1000000n, // Total amint amount
        ],
      });
    }

  }, [culmulativeData])



  const {
    isPending: amintApproveLoading,
    isSuccess: amintApproveSuccess,
    isError: amintApproveError,
    writeContract: amintApprove,
    reset: approveReset,
    data: amintApproveHash,
  } = useWriteUsDaApprove({
    mutation: {
      onError(error) {
        console.log(error);
        approveReset?.();
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
                    headline: `Uhh Ohh! ${error.message}`,
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
      onSuccess(data) {
        toast.custom(
          (t) => {
            toastId.current = t;
            return (
              <div>
              <CustomToast
                props={{
                  t: toastId.current,
                  toastMainColor: "#268730",
                  headline: "Transaction Submitted",
                  transactionHash: data,
                  linkLabel: "View Transaction",
                  toastClosebuttonHoverColor: "#90e398",
                  toastClosebuttonColor: "#57C262",
                }}
              />
            </div>
            );
          },
          { duration: 5000 }
        );
      }

    }

  });

  const { data: usdaHashData, isSuccess: usdaHashSucces, isError: usdaHashError, isLoading: usdaHashLoading } = useWaitForTransactionReceipt({
    hash: amintApproveHash,
  })

  useEffect(() => {
    if (usdaHashData && usdaHashSucces) {
      withdrawBorrowAmount()
    }

  }, [usdaHashData])


  const withdrawBorrowAmount = async () => {
    if(nativeFee && nativeFee2){
    borrowWithdraw?.({
      args: [
        address as `0x${string}`,
        BigInt(details.index),
      ],
      value: nativeFee.nativeFee + nativeFee2.nativeFee
    });
  }
  }


  const {
    isPending: borrowWithdrawisLoadingone,
    writeContract: borrowWithdraw, // Function for borrowing withdrawal
    reset: borrowReset, // Function for resetting borrowing
    data: borrowWithdrawData, // Data for borrowing withdrawal
  } = useWriteBorrowingContractWithDraw({
    mutation: {
      onSuccess(data) {
        // Reset approve, cumulative, and borrow values
        toast.custom(
          (t) => {
            return (
              <div>
                <CustomToast
                  props={{
                    t: toastId.current,
                    toastMainColor: "#268730",
                    headline: "Transaction Submitted",
                    transactionHash: data,
                    linkLabel: "View Transaction",
                    toastClosebuttonHoverColor: "#90e398",
                    toastClosebuttonColor: "#57C262",
                  }}
                />
              </div>
            );
          },
          {duration:5000, id: toastId.current },
          
        );
      },
      onError(error) {
        // Error callback for borrowing withdrawal
        setOpenConfirmNotice(true);
        approveReset?.();
        toast.custom(
          (t) => (
            <div>
              <CustomToast
                props={{
                  t: toastId.current,
                  toastMainColor: "#B43939",
                  headline: `Uhh Ohh! ${error.message}`,
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
    }
  });


  const {
    isLoading: borrowWithdrawisLoading, // Flag indicating if the transaction for borrowing and withdrawing is loading
    isSuccess: borrowWithdrawtransactionSuccess,
    isError: borrowWithdrawtransactionError,
    data: withdrawDataLog
    // Flag indicating if the transaction for borrowing and withdrawing was successful
  } = useWaitForTransactionReceipt({
    hash: borrowWithdrawData, // Hash of the transaction for borrowing and withdrawing
    confirmations: 2, // Number of confirmations required for the transaction
  });

  useEffect(() => {
    if ( borrowWithdrawtransactionSuccess) {
      handleRefetch();
      console.log("transaction completed -- hashedrefetched", withdrawDataLog.blockHash);
      approveReset?.();
      cumulativeReset?.();
      borrowReset?.();
      handleSheetOpenChange(!sheetOpen)
      // Display custom toast for successful transaction
      toast.custom(
        (t) => (
          <CustomToast
            props={{
              t: toastId.current,
              toastMainColor: "#268730",
              headline: "Transaction Completed. Withdrawal Done",
              transactionHash: borrowWithdrawData,
              linkLabel: "View Transaction",
              toastClosebuttonHoverColor: "#90e398",
              toastClosebuttonColor: "#57C262",
            }}
          />
        ),
        { id: toastId.current, duration: 5000}
      );
    }
    else if (borrowWithdrawtransactionError) {
      toast.custom(
        (t) => (
          <div>
            <CustomToast
              key={2}
              props={{
                t: toastId.current,
                toastMainColor: "#B43939",
                headline: `Uhh Ohh! Failed to withdraw`,
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
    }
  }, [withdrawDataLog])

  //using custom hook to mutate backend withdraw
  // const { mutate: backendWithdraw, isPending, isSuccess: backendWithdrawSuccess } = useMutation({
  //   // Specify the mutation function
  //   mutationFn: withdrawFromBackend,

  //   // Handle any errors that occur during the mutation
  //   onError(error: any) {
  //     console.log(error);
  //     queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
  //   },

  //   // Perform actions after the mutation is completed or rejected
  //   onSettled() {
  //     // Invalidate the query for `dCDSdepositorsData`
  //     queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
  //     // Invalidate the queries for `dCDSdeposits`
  //     queryClient.invalidateQueries({ queryKey: ["dCDSdeposits"] });
  //     handleRefetch()
  //     setOpenConfirmNotice(true)

  //   },
  // });

  // async function withdrawFromBackend(data: withdrawData) {
  //   let bodyValue = JSON.stringify({
  //     ...data,
  //   });
  //   console.log(bodyValue);
  //   const response = await fetch(`${BACKEND_API_URL}/borrows/withdraw`, {
  //     method: "PATCH",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: bodyValue,
  //   });

  //   const result = await response.json();

  //   if (!response.ok) {
  //     throw new Error(result.message);
  //   }

  //   return result;
  // }

  /**
   * Handles the withdrawal time based on the current value of withdrawalTime.
   *
   */
  function handleWithdrawalTime() {
    setOpenConfirmNotice(false)
    cumulativeReset?.();
    approveReset?.();
    borrowReset?.();
    if (details.status === "DEPOSITED") {
      calculateCumulativeRate?.({})
    } 
  }
  /**
   * Updates the deposit data based on the provided details.
   * If the details are available, it updates each value in the depositData array.
   * If the details are not available, it sets each value in the depositData array to '-'.
   */

  function handleDepositData() {
    // Calculate the totalAmintAmnt
    

    if (details) {
      const totalAmintAmnt = lastCumulativeRate===undefined ? BigInt(Number(details.normalizedAmount)*10**6) :(
        BigInt(
          BigInt(details.normalizedAmount? Number(details.normalizedAmount)*10**6 : 0) *
          (lastCumulativeRate)
        ) / BigInt(10 ** 27))

      totalAmintAmount.current = totalAmintAmnt;
      // If details are available, update each value in the depositData array
      const updatedData = [...depositData];
      updatedData[0].value = details.depositedAmount + ` (${(Number(details.depositedAmount) * Number(details.ethPrice)).toFixed(2)} $) `;
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


  useEffect(() => {
    setSpinner(true);
    handleDepositData();
    handleAmountProtected()
    setOpenConfirmNotice(true);
    setSpinner(false);

  }, [details, sheetOpen]);



  return (
    <div

    >
      {spinner ? <Spinner /> : (
        <div
          className={" w-full     lg:max-w-screen-lg  max-h-screen "}
        >
          <div className="flex flex-col min-[1440px]:gap-6 2dppx:gap-[10px] gap-[10px]">
            <div className="flex justify-end w-full">
              {/* <SheetClose onClick={() => { handleSheetOpenChange(!sheetOpen) }} asChild>
                <Button
                  variant={"ghostOutline"}
                  size={"primary"}
                  className="flex gap-[10px] border border-borderGrey rounded-none"
                  onClick={() => handleSheetOpenChange(!sheetOpen)}
                >
                  <Cross2Icon className="w-4 h-4" />
                  <p className="text-transparent dark:text-[#808080]  bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                    Close
                  </p>
                </Button>
              </SheetClose> */}
            </div>
            <SheetHeader>
              <SheetTitle className="text-[#020202] px-4 dark:text-[#90AFFF] font-medium min-[1440px]:text-4xl 2dppx:text-2xl text-2xl tracking-[-1.8px]">
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


              <div className="flex justify-between min-[1440px]:px-4 2dppx:px-2 px-4 min-[1440px]:py-[10px] 2dppx:py-[5px] py-[5px]  border-b border-lineGrey">
                <div className="flex gap-2">
                  <p className="text-base text-black dark:text-[#DEDEDE]">
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
                    className="text-[#020202] relative text-xs rounded-none  border-0 border-b-2 border-[#020202] bg-[#DEDEDE] py-1"
                    onClick={handleAmountProtected}
                  >
                    View
                  </Button>
                ) : (
                  <>{amountProtected}</>
                )}
              </div>
            </div>

            {
   
                    details.status === "LIQUIDATED" ? (
                      <div className="p-4 text-center">

                        <Note note="Note: This deposit has already been liquidated" />
                      </div>
                    ) : details.status==="WITHDREW"?(
                      <div className="p-4 text-center">

                        <Note note="Note: Amount fully withdrawn" />
                      </div>
                    )
                  :
                  details.status==="DEPOSITED" && openConfirmNotice ? (
            <>
              <ConfirmNotice
                withdrawalTime={details.status}
                handleWithdrawal={handleWithdrawalTime}
                amintToMint={details.status === "DEPOSITED" ? Number(totalAmintAmount.current) : Number(details.depositedAmount) / 2}
              />
            </>
            ) :
            (
            <div className="flex flex-col items-center justify-center gap-2">

              <TransactionLoader
                heading={"Calculate Interest #1"}
                subheadingBefore={"Transaction Hash: 0x1234567890abcdef"}
                status={cumulativeRateLoading ? "Loading" : (!cumulativeRateError && ispendingCumulative) ? "Progress" : cumulativeRateSuccess ? "Completed" : cumulativeRateError ? "Failed" : "Pending"}
                className={`${cumulativeRateLoading || (!cumulativeRateError && ispendingCumulative) ? "w-[90%] border-[#FFFFFF] px-4 py-3" : "bg-gray-100  dark:bg-[#141414]"} `}
              />
              <TransactionLoader
                heading={"Approve USDa #2"}
                subheadingBefore={"Transaction Hash: 0x1234567890abcdef"}
                status={amintApproveLoading ? "Loading" : (!amintApproveError && usdaHashLoading) ? "Progress" : amintApproveSuccess ? "Completed" : amintApproveError ? "Failed" : "Pending"}
                className={`${amintApproveLoading || (!amintApproveError && usdaHashLoading) ? "w-[90%] px-4 py-3 border-[#FFFFFF] " : "bg-gray-100 dark:bg-[#141414]"} `}

              />
              <TransactionLoader
                heading={"Withdraw #3"}
                subheadingBefore={"Transaction Hash: 0x1234567890abcdef"}
                status={borrowWithdrawisLoadingone ? "Loading" : (borrowWithdrawisLoading ) ? "Progress" : borrowWithdrawtransactionSuccess  ? "Completed" : borrowWithdrawtransactionError ? "Failed" : "Pending"}
                className={`${borrowWithdrawisLoadingone || (borrowWithdrawisLoading && !borrowWithdrawtransactionError ) ? "w-[90%] px-4 py-3 border-[#FFFFFF] " : "bg-gray-100  dark:bg-[#141414]"} `}
              />
            </div>
            ) 
              }

          </div>
        </div>
      )}

    </div>
  );
};

export default Withdrawcopy;
