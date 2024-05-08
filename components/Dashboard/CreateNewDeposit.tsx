"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
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
import { useAccount, useBalance, useChainId, useWaitForTransaction } from "wagmi";
import { parseEther, parseUnits } from "viem";

import {
  borrowingContractABI,
  useBorrowingContractDepositTokens,
  useBorrowingContractGetLtv,
  useBorrowingContractRead,
  useCdsTotalCdsDepositedAmount,
  useTreasuryTotalVolumeOfBorrowersAmountinUsd,
} from "@/abiAndHooks";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import displayNumberWithPrecision from "@/app/utils/precision";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import decodeEventLogsFromAbi from "@/app/utils/decodeEventLogsFromAbi";
import { watch } from "fs";
import Spinner from "../ui/spinner";
import { PROXY_AMINT_ADDRESS } from "@/constants/Addresses";
import PnlChart from "./PnlChart";
import Divider from "../CustomUI/Divider/Divider";

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
  const [amintToBeMinted, setAmintToBeMinted] = useState('0');
  const [downsideProtectionAmnt, setDownsideProtectionAmnt] = useState("0");
  const [open, setOpen] = useState(false);
  const [optionFees, setOptionFees] = useState(0);
  // disabling the button if we don't have enough funds in CDS
  const [disabled, setDisabled] = useState(false);
  const { address } = useAccount();
  const chainId = useChainId();
  // const timer = useRef<number>();
  const queryClient = useQueryClient();
  //we will get this normalizedAmount from events while depositing
  const normalizedAmount = useRef("");
  const noOfAmintMinted = useRef("");
  // to manage the toastId
  const toastId = useRef<string | number>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collateral: undefined,
      collateralAmount: 0,
      strikePrice: 5,
    },
  });
  const ethBalance = useBalance({ address: address })

  // watch for the strikePrice in the form
  const strikePrice = form.watch("strikePrice");
  // watch for the ltv from the borrowing Contract
  const { data: ltv } = useBorrowingContractGetLtv({ enabled: !!address });
  // watch for the totalVolumeOfBorrowersAmountinUsd from the  treasury
  const { data: totalVolumeOfBorrowersAmountinUsd } =
    useTreasuryTotalVolumeOfBorrowersAmountinUsd({ watch: true });
  const { data: totalCdsDepositedAmount } = useCdsTotalCdsDepositedAmount({
    watch: true,
  });


  // Perform a mutation and get the mutate and depositReset functions
  const { mutate, reset: depositReset } = useMutation({
    // Specify the mutation function to be called
    mutationFn: storeToBackend,
    // Handle any errors that occur during the mutation
    onError(error, variables, context) {
      console.log(error);
    },
    // Perform actions after the mutation is completed or failed
    onSettled() {
      // Invalidate the "depositorsData" and "deposits" queries in the query cache
      queryClient.invalidateQueries({ queryKey: ["depositorsData"] });
      queryClient.invalidateQueries({ queryKey: ["deposits"] });

      // Call the handleRefetch function to rerender the data in the table
      handleRefetch();

      // Reset the form
      form.reset();
    },
    // Retry the mutation up to 4 times if it fails
    retry: 4,
  });

  const onWatchAssetAmintClick = async () => {
    const result = await (window as any).ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: PROXY_AMINT_ADDRESS,
          decimals: 6,
          name: "AMINT",
          symbol: "AMINT"
        }
      }
    });
    console.log({ result });
  };



  /**
   * Retrieves the total index for a given address.
   *
   * @param {`0x${string}` | undefined} address - The address to retrieve the total index for.
   * @return {Promise<any>} A promise that resolves to the total index.
   */
  function getTotalIndex(address: `0x${string}` | undefined) {
    return fetch(`${BACKEND_API_URL}/borrows/index/${chainId}/${address}`).then(
      (response) => response.json()
    )
  }


  // Use the useQuery hook to fetch the total index
  const { data: totalIndex, refetch } = useQuery({
    queryKey: ["totalIndex", "deposits"],
    queryFn: () => getTotalIndex(address ? address : undefined),
    enabled: !!address,
    staleTime: 10 * 1000,
  });
  /**
   * Retrieves the option fees for a given address.
   *
   * @param {`0x${string}` | undefined} address - The address to retrieve the option fees for.
   * @return {Promise<any>} A promise that resolves to the option fees.
   */
  async function getOptionFees() {
    const response = await fetch(`${BACKEND_API_URL}/borrows/optionFees/${chainId}/${parseUnits(form.getValues("collateralAmount").toString(), 18)}/${ethPrice}/${(strikePrice == 5 ? 0 : strikePrice == 10 ? 1 : strikePrice == 15 ? 2 : strikePrice == 20 ? 3 : 4)}`);
    const data = await response.json();
    console.log(data)
    return data[1] ? (data[1] / 10 ** 6) : 0;
  }



  /**
   * Stores data to the backend.
   *
   * @param address - The address to store.
   * @returns The result from the backend.
   */
  async function storeToBackend(address: `0x${string}` | undefined) {
    // Log the total index
    let colateralamount = parseUnits(form.getValues("collateralAmount").toString(), 18);
    let strikePercent = strikePrice == 5 ? 0 : strikePrice == 10 ? 1 : strikePrice == 15 ? 2 : strikePrice == 20 ? 3 : 4;
    const data = await fetch(`${BACKEND_API_URL}/borrows/optionFees/${chainId}/${colateralamount}/${ethPrice}/${strikePercent}`).then(
      (res) => res.json()
    )



    // Create the body value
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
      noOfAmintMinted: `${noOfAmintMinted.current}`,
      strikePrice: strikePrice,
      strikePricePercent: strikePrice == 5 ? 'FIVE' : strikePrice == 10 ? 'TEN' : strikePrice == 15 ? 'FIFTEEN' : strikePrice == 20 ? 'TWENTY' : 'TWENTY_FIVE',
      normalizedAmount: normalizedAmount.current,
      optionFees: data[1].toString(),
    });

    // Log the body value
    console.log(bodyValue);
    // Send a POST request to the backend API
    const response = await fetch(`${BACKEND_API_URL}/borrows/borrowAmint`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: bodyValue,
    });

    // Parse the response as JSON
    const result = await response.json();

    // If the response is not ok, throw an error with the result's message
    if (!response.ok) {
      throw new Error(result.message);
    }
    // Return the result
    return result;
  }


  // get  ethPrice using useContractRead hook
  const { data: ethPrice } = useBorrowingContractRead({
    functionName: "getUSDValue",
    staleTime: 10 * 1000,
  });


  const {
    isLoading: isDepositsLoading,
    data: depositData, // Data received from the `useBorrowingContractDepositTokens` hook
    write, // Function to initiate a write operation
    reset, // Function to reset the state of the hook
  } = useBorrowingContractDepositTokens({
    // Value to be sent along with the transaction
    onError(error) {
      setOpen(false); // Close the modal
      console.log(error); // Log the error to the console
      toast.custom(
        (t) => (
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
        ),
        { duration: 10000 } // Toast duration: 5000 milliseconds
      );
    },
    onSuccess(data) {
      // form.reset(); // Reset the form
      console.log(data?.hash); // Log the transaction hash to the console
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
        { duration: Infinity } // Toast duration: Infinity (will remain visible until manually closed)
      );
    },
  });


  const { isLoading: isDepositHashsLoading, isSuccess: transactionSuccess } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess(data) {
      // Log transaction completion
      console.log("transaction completed", depositData?.hash, data);
      // Get the data logs based on the chainId
      const dataLogs = data.logs[data.logs.length - 1]

      // Decode event logs from ABI
      const { eventName, args } = decodeEventLogsFromAbi(
        borrowingContractABI,
        dataLogs.topics,
        "Deposit",
        dataLogs.data
      ) as { eventName: string; args: { normalizedAmount: bigint, borrowAmount: bigint } };

      // Log event name and normalized amount
      console.log(eventName, args?.normalizedAmount.toString(), args?.borrowAmount.toString())
      // Set the normalizedAmount value
      normalizedAmount.current = args?.normalizedAmount.toString();
      noOfAmintMinted.current = args?.borrowAmount.toString();

      // Call mutate function with the address to store things to backend
      mutate(address);
      setOpen(false);
      // Show custom toast
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

      // Dismiss toast after 3 seconds
      setTimeout(() => {
        toast.dismiss(toastId.current);
      }, 3000);
    },
  });


  /**
   * useEffect hook that disables a deposit button based on certain conditions.
   * It checks if `write` is false, and if so, sets `disabled` to true.
   * Otherwise, it checks if both `totalCdsDepositedAmount` and `totalVolumeOfBorrowersAmountinUsd` have values.
   * If so, it compares `totalCdsDepositedAmount` to a calculated percentage of `totalVolumeOfBorrowersAmountinUsd`.
   * If `totalCdsDepositedAmount` is less than the calculated percentage, it sets `disabled` to true.
   * @param {number} totalCdsDepositedAmount - The total amount of CDs deposited.
   * @param {number} totalVolumeOfBorrowersAmountinUsd - The total volume of borrowers' amount in USD.
   * @param {boolean} write - Flag indicating if the feature is enabled or disabled.
   */
  useEffect(() => {
    if (!write) {
      setDisabled(true);
    } else {
      //check if we have both values or not
      if (totalCdsDepositedAmount && totalVolumeOfBorrowersAmountinUsd) {
        if (
          totalCdsDepositedAmount <
          (20n / 100n) * totalVolumeOfBorrowersAmountinUsd
        ) {
          setDisabled(true);
        }
      }
    }
  }, [totalCdsDepositedAmount, totalVolumeOfBorrowersAmountinUsd]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    refetch();
    let colateralamount = parseUnits(form.getValues("collateralAmount").toString(), 18);
    let strikePercent = strikePrice == 5 ? 0 : strikePrice == 10 ? 1 : strikePrice == 15 ? 2 : strikePrice == 20 ? 3 : 4;
    const data = await fetch(`${BACKEND_API_URL}/borrows/optionFees/${chainId}/${colateralamount}/${ethPrice}/${strikePercent}`).then(
      (res) => res.json()
    )

    if (data[0] != undefined && ethPrice != undefined) {
      write?.({
        args: [
          ethPrice,
          BigInt(Date.now()),
          strikePercent,
          BigInt(Math.floor((1 + form.getValues("strikePrice") / 100) * Number(ethPrice ? ethPrice : 0))),
          BigInt(data[0]),
        ],
        value: parseEther(form.getValues("collateralAmount").toString()),
      });
      
    } // mutate(address);
  }

  /**
   * Handles the calculation and setting of the amint to be minted and downside protection amounts.
  */

  const handleAmintToBeMinted = async () => {
    // Calculate the amint to be minted
    const optionf = await getOptionFees();
    setOptionFees(optionf);
    const amintToMint =
      (form.watch("collateralAmount") * Number(ethPrice) * 80) / 10000;
    const amint2Decimal = displayNumberWithPrecision(amintToMint.toString());
    console.log(amint2Decimal, optionf)
    setAmintToBeMinted((Number(amint2Decimal) - optionf).toFixed(2));

    // Calculate the downside protection amount
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

  /**
   * Handles the calculation and setting of the eth volatility.
   */

  useEffect(() => {
    if (form.getValues("collateralAmount") != 0) {
      form.clearErrors("collateralAmount");
      handleAmintToBeMinted();
    }
    else {
      form.setError("collateralAmount", { message: "value should be greater than 0.02 ETH" });
    }

  }, [form.watch("collateralAmount"), form.watch("strikePrice")]);

  const [chartstikePrice, setChartStrikePrice] = useState(1);

  useEffect(() => {
    if (transactionSuccess) {
      //reseting contract values after it is successfull
      reset();
    }
    // return () => {
    //   window.clearTimeout(timer.current);
    // };
  }, [transactionSuccess]);

  return (
    <div className="flex justify-between items-center mb-[30px]">
      <div className="flex flex-col gap-[8px] min-[1440px]:gap-[15px] 2dppx:gap-[8px]">
        <h2 className="text-textPrimary dark:text-[#90AFFF] leading-none font-medium text-3xl tracking-[-1.8px] min-[1440px]:text-4xl 2dppx:text-3xl">
          Your Deposits
        </h2>
        <p className="text-textSecondary dark:text-[#EEEEEE] leading-none 2dppx:text-sm text-sm min-[1440px]:text-base">
          A list of all the deposits you have made.
        </p>
      </div>

      <Dialog
        open={open}
        onOpenChange={() => {
        }}
        modal={true}
      >
        <DialogTrigger asChild>
          <Button
            type="button"
            variant={"primary"}
            size={"full"}
            className="flex gap-[10px] items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            <Image src={addIcon} alt="add icon" width={24} height={24}></Image>
            <p className="text-white bg-clip-text bg-[linear-gradient(180deg,_#FFF_-0.23%,_#EEE 100%)] text-transparent font-semibold text-[11px] md:text-base">
              New Deposit
            </p>
          </Button>
        </DialogTrigger>

        <DialogContent className={"max-w-[672px]"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} action="#">
              <div className="flex justify-end w-full">
                <DialogClose asChild>
                  <Button
                    variant={"ghostOutline"}
                    size={"primary"}
                    className="flex gap-[10px] border border-borderGrey "
                    onClick={() => setOpen(!open)}
                  >
                    <Cross2Icon className="w-4 h-4" />
                    <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] dark:text-[#EEEEEE] font-semibold text-base">
                      Close
                    </p>
                  </Button>
                </DialogClose>
              </div>

              <DialogHeader className="flex items-start">
                <DialogTitle className="text-textPrimary font-medium min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-3xl text-2xl tracking-[-1.8px] leading-none ">
                  Make a New Deposit
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center justify-end gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" height={15} width={15}><path d="M.003 4.54c-.008-.37.092-1.233 1.216-1.533L12.507.747c.828 0 1.5.673 1.5 1.5V4.26l.5-.001a1.502 1.502 0 0 1 1.495 1.5v7.996c0 .827-.672 1.5-1.5 1.5H1.495c-.827 0-1.5-.673-1.5-1.5L.003 4.54Zm13.004-2.293a.5.5 0 0 0-.457-.498L1.52 3.982c-.004.002.082.28.482.275h11.006v-2.01ZM.993 13.754a.5.5 0 0 0 .5.5h13.008a.5.5 0 0 0 .5-.5V5.756a.5.5 0 0 0-.5-.5H2c-.491 0-1.006-.167-1.006-.498v8.996ZM13 8.758a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" fill="currentColor"></path></svg>
                <a type="button" onClick={onWatchAssetAmintClick} className="m-0 text-[12px] underline rounded-md ">Add AMINT</a>
              </div>
              <div className="flex ">


                <div className="flex flex-col basis-1/2 min-[1440px]:pt-[30px] pt-[15px] min-[1440px]:gap-[20px] min-[1280px]:gap-[16px] 2dppx:gap-[10px] gap-[10px]">
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
                      <FormItem className="relative">
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
                        <span className="relative md:absolute md:right-1 block text-right text-[10px]">Balance:  {(Number(ethBalance.data?.formatted)).toFixed(4)} ETH</span>
                        <FormMessage className="dark:text-[#B43939] text-[10px]" />
                      </FormItem>
                    )}
                  />


                  <div className="px-[6px] pt-2 mt-4 flex gap-[10px] items-center">
                    <InfoCircledIcon width={18} height={18} />
                    <p className=" min-[1440px]:text-base 2dppx:text-sm text-sm font-normal text-textGrey dark:text-[#DEDEDE] ">
                      Minimum Collateral Amount is{" "}
                      <span className="font-medium text-textHighlight dark:text-[#ffff]">
                        0.02 ETH
                      </span>
                    </p>


                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                      <p className=" min-[1440px]:text-base text-sm 2dppx:text-sm text-textSecondary dark:text-[#9E9E9E]">
                        Amount of Amint that will be minted
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger type="button">
                              <InfoCircledIcon className="w-4 h-4 ml-2" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Option fees is excluded</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </p>
                      <p className="text-textHighlight font-medium  min-[1440px]:text-base 2dppx:text-sm text-sm dark:text-[#9E9E9E]">
                        {amintToBeMinted}
                      </p>
                    </div>
                    <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                      <p className=" min-[1440px]:text-base 2dppx:text-sm text-sm text-textSecondary dark:text-[#9E9E9E]">
                        Options Fees
                      </p>
                      <p className="text-textHighlight font-medium  min-[1440px]:text-base 2dppx:text-sm text-sm dark:text-[#9E9E9E]">
                        {optionFees}
                      </p>
                    </div>
                    <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                      <p className=" min-[1440px]:text-base 2dppx:text-sm text-sm text-textSecondary dark:text-[#9E9E9E]">
                        Downside Protection Amount
                      </p>
                      <p className="text-textHighlight font-medium  min-[1440px]:text-base 2dppx:text-sm text-sm dark:text-[#9E9E9E]">
                        {downsideProtectionAmnt}
                      </p>
                    </div>
                  </div>
                  <Note
                    note="Note: Only 50% of the amount is retrievable on initial
                  withdrawal. For 2nd 50% of amount, you will be getting
                  Amint and your collateral can be withdrawn after a
                  month by returning Amint."
                  />
                  <Button
                    type="submit"
                    variant={"primary"}
                    className="text-white"
                    disabled={isDepositsLoading || isDepositHashsLoading || disabled}
                  >
                    {isDepositsLoading || isDepositHashsLoading ? <Spinner /> : 'Confirm Deposit'}
                  </Button>
                </div>
                {/* <Divider className='w-[1px] h-auto mx-4' /> */}

                <div className="flex flex-col h-full py-4 mt-4 ml-4 border rounded-lg shadow-md basis-1/2">
                  <div className="px-2 ">
                    <FormField
                      control={form.control}
                      name="strikePrice"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel className="min-[1440px]:mb-[10px] 2dppx:mb-1 mb-1">
                            <p className=" min-[1440px]:text-sm 2dppx:text-sm text-sm font-medium text-textGrey min-[1440px]:mb-4 2dppx:mb-3 mb-3 dark:text-[#DEDEDE]">
                              Select Strike Price for call options.
                            </p>
                          </FormLabel>
                          <FormControl>
                            <Slider
                              defaultValue={[value]}
                              onValueChange={(vals) => {
                                setChartStrikePrice(vals[0]==5?1:vals[0]==10?2:vals[0]==15?3:vals[0]==20?4:5);
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
                    <div className="w-full flex justify-between min-[1440px]:mt-[10px] mt-2 2dppx:mt-2">
                      <p className=" text-[12px]">
                        05
                      </p>
                      <p className="text-[12px]">
                        10
                      </p>
                      <p className="text-[12px]">
                        15
                      </p>
                      <p className="text-[12px]">
                        20
                      </p>
                      <p className="text-[12px]">
                        25
                      </p>
                    </div>
                  </div>
                  <div className="justify-end h-full py-4 pr-2 mt-5">
                    <PnlChart currentPrice={Number((ethPrice??0n)/100n)} collateralAmount ={form.getValues("collateralAmount")} strikePrice ={chartstikePrice} />
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewDeposit;
