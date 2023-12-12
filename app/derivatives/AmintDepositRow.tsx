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
import React, { useEffect, useRef, useState } from "react";
import calculateTimeDifference from "../utils/calculateTimeDifference";
import {
  useAmintApprove,
  useBorrowingContractGetApy,
  useBorrowingContractGetUsdValue,
  useCdsWithdraw,
  useCdsWithdrawEvent,
} from "@/abiAndHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, useChainId, useWaitForTransaction } from "wagmi";
import { toast } from "sonner";
import CustomToast from "@/components/CustomUI/CustomToast";
import { parseEther } from "viem";
import { formatDateFromUnixTimestamp } from "../utils/calculateNext30Days";
import ConfirmNoticeCds from "./ConfirmNoticeCds";
import { BACKEND_API_URL } from "@/constants/BackendUrl";

const events = {
  withdrewAmint: "0",
  withdrawETH: "0",
};

interface DepositDetail {
  id: string;
  address: string;
  index: number;
  depositedAmint: string;
  depositedTime: string;
  ethPriceAtDeposit: number;
  aprAtDeposit: number;
  lockingPeriod: number;
  ethPriceAtWithdraw: number;
  liquidationAmount: string;
  optedForLiquidation: boolean;
  withdrawTime: number;
  withdrawAmount: string;
  withdrawEthAmount: string;
  fees: string;
  status: "DEPOSITED" | "WITHDREW";
}

const AmintDepositRow = ({ details }: { details: DepositDetail }) => {
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
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [amountView, setAmountView] = React.useState(false);
  const [depositData, setDepositData] = useState(depositDetails);
  const [status, setStatus] = useState(details.status);
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
  const toastId = useRef<string | number>("");
  const { address } = useAccount();
  const chainId = useChainId();
  const eventsValue = useRef(events);
  const queryClient = useQueryClient();
  const { data: ethPrice } = useBorrowingContractGetUsdValue({
    staleTime: 10 * 1000,
  });
  const { data: currentApy } = useBorrowingContractGetApy({
    enabled: !!address,
  });
  const { write: cdsWithdraw, data: cdsWithdrawData } = useCdsWithdraw({
    onError(error) {
      console.log(error);
      toast.custom(
        (t) => {
          toastId.current=t;
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
        )},
        { duration: 5000 }
      );
    },
    onSuccess(data) {
      console.log(data?.hash);
      setSheetOpen(false);
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
        { duration: Infinity }
      );
    },
  });
  const unwatch = useCdsWithdrawEvent({
    listener(log) {
      console.log(log);
      if (!!log) {
        eventsValue.current = log[0].args.withdrewAmint
          ? {
              ...eventsValue.current,
              withdrewAmint: log[0]?.args?.withdrewAmint.toString(),
              withdrawETH: log[0]?.args?.withdrawETH
                ? log[0]?.args?.withdrawETH.toString()
                : "0",
            }
          : { ...eventsValue.current };
        backendCDSWithdraw(address);
      }
      if (log[0].args) {
        unwatch?.();
      }
    },
  });

  const { mutate: backendCDSWithdraw } = useMutation({
    mutationFn: withdrawCDSFromBackend,
    onError(error) {
      console.log(error);
      queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
      queryClient.invalidateQueries({ queryKey: ["dCDSdeposits"] });
    },
  });
  useWaitForTransaction({
    hash: cdsWithdrawData?.hash,
    onSuccess() {
      toast.custom(
        (t) => (
          <div>
            <CustomToast
              props={{
                t: toastId.current,
                toastMainColor: "#268730",
                headline:
                  "Transaction Completed.Withdrawal Completed Successfully",
                transactionHash: cdsWithdrawData?.hash,
                linkLabel: "View Transaction",
                toastClosebuttonHoverColor: "#90e398",
                toastClosebuttonColor: "#57C262",
              }}
            />
          </div>
        ),
        { id: toastId.current }
      );
      setTimeout(() => {
        toast.dismiss(toastId.current);
      }, 5000);
    },
  });
  async function withdrawCDSFromBackend(address: `0x${string}` | undefined) {
    let bodyValue = JSON.stringify({
      address: address,
      index: details.index,
      chainId: chainId,
      withdrawTime: `${Date.now()}`,
      withdrawAmount: eventsValue.current.withdrewAmint,
      withdrawEthAmount: eventsValue.current.withdrawETH,
      ethPriceAtWithdraw: Number(ethPrice || 0),
      fees: parseEther("4").toString(),
      feesWithdrawn: parseEther("2").toString(),
    });
    console.log(bodyValue);
    const response = await fetch(`${BACKEND_API_URL}/cds/withdraw`, {
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
  function handleDepositData() {
    if (details) {
      const updatedData = [...depositData];
      updatedData[0].value = details.depositedAmint;
      updatedData[1].value = `${details.ethPriceAtDeposit}`;
      updatedData[2].value = formatDateFromUnixTimestamp(details.depositedTime);
      updatedData[3].value = `${details.lockingPeriod} days`;
      updatedData[4].value = calculateTimeDifference(details.depositedTime);
      updatedData[5].value = `${details.aprAtDeposit}%`;
      updatedData[6].value = `${details.aprAtDeposit}%`;
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
  function handleWithdrawal() {
    cdsWithdraw?.({ args: [BigInt(details.index)] });
  }

  useEffect(() => {
    handleDepositData();
    setStatus(details.status);
  }, [details]);

  return (
    <Sheet
      key={details.id}
      open={sheetOpen}
      onOpenChange={() => {
        setSheetOpen(!sheetOpen);
        setOpenConfirmNotice(false);
        setAmountView(false);
      }}
    >
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
          <SheetTrigger>-</SheetTrigger>
        </TableCell>
      </TableRow>
      <SheetContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
        <div className="flex flex-col min-[1440px]:gap-6 gap-2">
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
            {depositData.map((detail, index) => (
              <SheetRow
                key={index}
                props={{
                  heading: detail.headline,
                  value: detail.value,
                }}
              />
            ))}
            <div className="flex justify-between min-[1440px]:px-4 px-2 min-[1440px]:py-[10px] py-[5px] border-b border-lineGrey">
              <p className="min-[1440px]:text-base text-sm text-textSecondary">
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
                <p className=" min-[1440px]:text-base text-textHighlight font-medium text-sm leading-none">{`3.42`}</p>
              )}
            </div>
          </div>
          <Note note="Note: Your amount will be used to offer protection to borrowers & protocol in return for fixed yields" />
          {openConfirmNotice ? (
            <>
              <ConfirmNoticeCds
                handleWithdrawal={handleWithdrawal}
                // amintToMint={BigInt(details.normalizedAmount)}
              />
            </>
          ) : (
            <Button
              variant={"primary"}
              className="text-white"
              onClick={() => setOpenConfirmNotice(true)}
              disabled={status === "WITHDREW" ? true : false}
            >
              Withdraw
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AmintDepositRow;
