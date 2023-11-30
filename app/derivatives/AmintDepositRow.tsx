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
  useBorrowingContractGetUsdValue,
  useCdsWithdraw,
  useCdsWithdrawEvent,
} from "@/abiAndHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "sonner";
import CustomToast from "@/components/CustomUI/CustomToast";
import { parseEther } from "viem";
import { formatDateFromUnixTimestamp } from "../utils/calculateNext30Days";

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
  Apr: number;
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
  const { address } = useAccount();
  const eventsValue = useRef(events);
  const queryClient = useQueryClient();
  const { data: ethPrice } = useBorrowingContractGetUsdValue({
    staleTime: 10 * 1000,
  });
  const { write: cdsWithdraw, data: cdsWithdrawData } = useCdsWithdraw({
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
    onSuccess(data) {
      console.log(data?.hash);
      toast.custom((t) => (
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
      ));
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
    },
  });
  useWaitForTransaction({
    hash: cdsWithdrawData?.hash,
    onSuccess() {
      toast.custom((t) => (
        <div>
          <CustomToast
            props={{
              t,
              toastMainColor: "#268730",
              headline: "Transaction Completed",
              transactionHash: cdsWithdrawData?.hash,
              linkLabel: "View Transaction",
              toastClosebuttonHoverColor: "#90e398",
              toastClosebuttonColor: "#57C262",
            }}
          />
        </div>
      ));
    },
  });
  async function withdrawCDSFromBackend(address: `0x${string}` | undefined) {
    let bodyValue = JSON.stringify({
      address: address,
      index: details.index,
      withdrawTime: `${Date.now()}`,
      withdrawAmount: eventsValue.current.withdrewAmint,
      withdrawEthAmount: eventsValue.current.withdrawETH,
      ethPriceAtWithdraw: Number(ethPrice || 0),
      fees: parseEther("4").toString(),
      feesWithdrawn: parseEther("2").toString(),
    });
    console.log(bodyValue);
    const response = await fetch("http://43.204.73.16:3000/cds/withdraw", {
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
            {depositData.map((detail, index) => (
              <SheetRow
                key={index}
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
          <Button
            variant={"primary"}
            className="text-white"
            onClick={() => cdsWithdraw?.({ args: [BigInt(details.index)] })}
            disabled={details.status === "WITHDREW" ? true : false}
          >
            Withdraw
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AmintDepositRow;
