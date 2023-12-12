"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";

import addIcon from "@/app/assets/add_circle.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import Link from "next/link";
import CustomToast from "../CustomUI/CustomToast";
import Note from "../CustomUI/Note";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useAccount, useChainId, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import {
  useBorrowingContractDepositEvent,
  useBorrowingContractDepositTokens,
  useBorrowingContractGetLtv,
  useBorrowingContractRead,
} from "@/abiAndHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import displayNumberWithPrecision from "@/app/utils/precision";
import { BACKEND_API_URL } from "@/constants/BackendUrl";

const formSchema = z.object({
  collateral: z.string(),
  collateralAmount: z
    .number()
    .positive({ message: "Value must be positive" })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .positive({ message: "Value must be positive" })
        .min(0.02)
    ),
  strikePrice: z.number().min(5).max(25),
});

const CreateNewDeposit = ({ handleRefetch }: { handleRefetch: () => void }) => {
  const [amintToBeMinted, setAmintToBeMinted] = useState("0");
  const [downsideProtectionAmnt, setDownsideProtectionAmnt] = useState("0");
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  const chainId = useChainId();
  // const timer = useRef<number>();
  const queryClient = useQueryClient();
  const normalizedAmount = useRef("");
  const toastId = useRef<string | number>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collateral: undefined,
      collateralAmount: 0,
      strikePrice: 5,
    },
  });
  const strikePrice = form.watch("strikePrice");
  const { data: ltv } = useBorrowingContractGetLtv({ enabled: !!address });

  const { mutate, reset: depositReset } = useMutation({
    mutationFn: storeToBackend,
    onError(error, variables, context) {
      console.log(error);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["depositorsData"] });
      queryClient.invalidateQueries({ queryKey: ["deposits"] });
      handleRefetch();
      form.reset();
    },
    retry: 4,
  });
  const unwatch = useBorrowingContractDepositEvent({
    listener(log) {
      console.log(log);
      if (!!log) {
        normalizedAmount.current = log[0].args.normalizedAmount
          ? log[0]?.args?.normalizedAmount.toString()
          : "";

        mutate(address);
      }
      if (log[0].args) {
        unwatch?.();
      }
    },
  });

  function getTotalIndex(address: `0x${string}` | undefined) {
    return fetch(`${BACKEND_API_URL}/borrows/index/${chainId}/${address}`).then(
      (response) => response.json()
    );
  }
  const { data: totalIndex } = useQuery({
    queryKey: ["totalIndex"],
    queryFn: () => getTotalIndex(address ? address : undefined),
    enabled: !!address,
    staleTime: 10 * 1000,
  });

  async function storeToBackend(address: `0x${string}` | undefined) {
    console.log(totalIndex);
    let bodyValue = JSON.stringify({
      address: address,
      collateralType: "ETH",
      index: totalIndex + 1,
      chainId: chainId,
      downsideProtectionPercentage: 100 - (ltv ? ltv : 0),
      aprAtDeposit: 5,
      depositedAmount: `${form.watch("collateralAmount")}`,
      depositedTime: `${Date.now()}`,
      ethPrice: Number(ethPrice ? ethPrice : 0) / 100,
      noOfAmintMinted: `${amintToBeMinted}`,
      strikePricePercent: strikePrice,
      normalizedAmount: normalizedAmount.current,
    });
    console.log(bodyValue);
    const response = await fetch(`${BACKEND_API_URL}/borrows/borrowAmint`, {
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

  const { data: ethPrice } = useBorrowingContractRead({
    functionName: "getUSDValue",
    staleTime: 10 * 1000,
  });
  const {
    data: depositData,
    write,
    reset,
  } = useBorrowingContractDepositTokens({
    functionName: "depositTokens",
    args: [
      BigInt(ethPrice ? ethPrice : 0),
      BigInt(Date.now()),
      BigInt(ethPrice ? (ethPrice * (100n + BigInt(strikePrice))) / 100n : 0),
    ],
    value: parseEther(form.watch("collateralAmount")?.toString()),
    onError(error) {
      setOpen(false);
      console.log(error);
      toast.custom(
        (t) => (
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
        ),
        { duration: 5000 }
      );
    },
    onSuccess(data) {
      setOpen(false);
      console.log(data?.hash);
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
  const { isLoading, isSuccess: transactionSuccess } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess(data) {
      console.log("transaction completed", depositData?.hash, data);
      toast.custom(
        () => (
          <CustomToast
            props={{
              t: toastId.current,
              toastMainColor: "#268730",
              headline: "Transaction Completed. A new Deposit has been created",
              transactionHash: depositData?.hash,
              linkLabel: "View Transaction",
              toastClosebuttonHoverColor: "#90e398",
              toastClosebuttonColor: "#57C262",
            }}
          />
        ),
        { id: toastId.current }
      );
      setTimeout(() => {
        toast.dismiss(toastId.current);
      }, 3000);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // console.log("depositData", depositData);
    write?.();
    // mutate(address);
  }

  const handleAmintToBeMinted = () => {
    const amintToMint =
      (form.watch("collateralAmount") * Number(ethPrice) * 80) / 10000;
    const amint2Decimal = displayNumberWithPrecision(amintToMint.toString());
    setAmintToBeMinted(amint2Decimal);
    const downsideProtection =
      (form.watch("collateralAmount") *
        Number(ethPrice) *
        (100 - (ltv ? ltv : 0))) /
      10000;
    const downsideProtection2Decimal = displayNumberWithPrecision(
      downsideProtection.toString()
    );
    setDownsideProtectionAmnt(downsideProtection2Decimal);
  };

  useEffect(() => {
    handleAmintToBeMinted();
  }, [form.watch("collateralAmount")]);

  useEffect(() => {
    if (transactionSuccess) {
      reset();
    }
    // return () => {
    //   window.clearTimeout(timer.current);
    // };
  }, [transactionSuccess]);

  useEffect(() => {
    return () => {
      unwatch?.();
      depositReset?.();
    };
  }, []);

  return (
    <div className="flex justify-between items-center mb-[30px]">
      <div className="flex flex-col gap-[8px] min-[1440px]:gap-[15px]">
        <h2 className="text-textPrimary leading-none font-medium text-3xl tracking-[-1.8px] min-[1440px]:text-4xl">
          Your Deposits
        </h2>
        <p className="text-textSecondary leading-none text-sm min-[1440px]:text-base">
          A list of all the deposits you have made.
        </p>
      </div>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(!open);
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant={"primary"}
            size={"full"}
            className="flex gap-[10px] items-center justify-center"
          >
            <Image src={addIcon} alt="add icon" width={24} height={24}></Image>
            <p className="text-white bg-clip-text bg-[linear-gradient(180deg,_#FFF_-0.23%,_#EEE 100%)] text-transparent font-semibold text-base">
              Create a New Deposit
            </p>
          </Button>
        </DialogTrigger>

        <DialogContent className={"w-[672px]"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} action="#">
              <div className="flex w-full justify-end">
                <DialogClose asChild>
                  <Button
                    variant={"ghostOutline"}
                    size={"primary"}
                    className="flex gap-[10px] border border-borderGrey "
                  >
                    <Cross2Icon className="h-4 w-4" />
                    <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                      Close
                    </p>
                  </Button>
                </DialogClose>
              </div>

              <DialogHeader className="flex items-start">
                <DialogTitle className="text-textPrimary font-medium min-[1440px]:text-4xl min-[1280px]:text-3xl text-2xl tracking-[-1.8px] leading-none ">
                  Make a New Deposit
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col min-[1440px]:pt-[30px] pt-[15px] min-[1440px]:gap-[20px] min-[1280px]:gap-[16px] gap-[10px]">
                <FormField
                  control={form.control}
                  name="collateral"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a Collateral" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Collateral</SelectLabel>
                            <SelectItem value="eth">ETH</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="collateralAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          min={0.02}
                          step={0.01}
                          placeholder="Collateral Amount"
                          {...field}
                          value={Boolean(field.value) ? field.value : ""}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="px-[6px] flex gap-[10px] items-center">
                  <InfoCircledIcon width={18} height={18} />
                  <p className=" min-[1440px]:text-base text-sm font-normal text-textGrey text-center">
                    Minimum Collateral Amount is{" "}
                    <span className="font-medium text-textHighlight">
                      0.02 ETH
                    </span>
                  </p>
                </div>
                <div className="pt-[4px] px-[6px]">
                  <FormField
                    control={form.control}
                    name="strikePrice"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel className="min-[1440px]:mb-[10px] mb-1">
                          <p className="min-[1440px]:text-base text-sm font-normal text-textGrey min-[1440px]:mb-4 mb-3">
                            Select Strike Price for call options.
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[value]}
                            onValueChange={(vals) => {
                              onChange(vals[0]);
                            }}
                            min={5}
                            step={5}
                            max={25}
                            className="mb-[10px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex justify-between min-[1440px]:mt-[10px] mt-2">
                    <p className="text-sm min-[1440px]:text-base">05</p>
                    <p className="text-sm min-[1440px]:text-base">10</p>
                    <p className="text-sm min-[1440px]:text-base">15</p>
                    <p className="text-sm min-[1440px]:text-base">20</p>
                    <p className="text-sm min-[1440px]:text-base">25</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                    <p className=" min-[1440px]:text-base text-sm text-textSecondary">
                      Amount of Amint that will be minted
                    </p>
                    <p className="text-textHighlight font-medium  min-[1440px]:text-base text-sm">
                      {amintToBeMinted}
                    </p>
                  </div>
                  <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                    <p className=" min-[1440px]:text-base text-sm text-textSecondary">
                      Options Fees
                    </p>
                    <p className="text-textHighlight font-medium  min-[1440px]:text-base text-sm">
                      3%
                    </p>
                  </div>
                  <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                    <p className=" min-[1440px]:text-base text-sm text-textSecondary">
                      APY
                    </p>
                    <p className="text-textHighlight font-medium  min-[1440px]:text-base text-sm">
                      5% ~ 0.00023 Amint
                    </p>
                  </div>
                  <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                    <p className=" min-[1440px]:text-base text-sm text-textSecondary">
                      Downside Protection Amount
                    </p>
                    <p className="text-textHighlight font-medium  min-[1440px]:text-base text-sm">
                      {downsideProtectionAmnt}
                    </p>
                  </div>
                </div>
                <Note
                  note="Note: Only 50% of the amount is retrievable on initial
                  withdrawal. For 2nd 50% of amount, you will be getting
                  Protocol tokens and your collateral can be withdrawn after a
                  month by returning Protocol tokens."
                />
                <Button
                  type="submit"
                  variant={"primary"}
                  className="text-white"
                  disabled={!write}
                >
                  Confirm Deposit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewDeposit;
