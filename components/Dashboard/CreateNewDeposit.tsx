"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ArrowTopRightIcon, Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
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
import { Controller, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Options } from '@layerzerolabs/lz-v2-utilities'
import { useAccount, useBalance, useChainId, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { parseEther, parseUnits } from "viem";
import arrowout from "@/app/assets/arrow_outward.svg";
import {
  useWriteBorrowingContractDepositTokens,
  useReadBorrowingContractGetLtv,
  useReadBorrowingContractGetUsdValue,
  useReadCdsTotalCdsDepositedAmount,
  useReadTreasuryTotalVolumeOfBorrowersAmountinUsd,
  useReadCdsQuote,
  useReadTreasuryQuote,
  useReadBorrowingContractQuote,
} from "@/abiAndHooks";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import displayNumberWithPrecision from "@/app/utils/precision";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import decodeEventLogsFromAbi from "@/app/utils/decodeEventLogsFromAbi";
import Spinner from "../ui/spinner";
import { blue } from "colorette";


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

const CreateNewDeposit = ({ handleRefetch, openPositions }: { handleRefetch: () => void, openPositions: Function }) => {
  const [amintToBeMinted, setAmintToBeMinted] = useState('0');
  const [downsideProtectionAmnt, setDownsideProtectionAmnt] = useState("0");
  const [open, setOpen] = useState(false);
  const [optionFees, setOptionFees] = useState(0);
  // disabling the button if we don't have enough funds in CDS
  const [disabled, setDisabled] = useState(false);
  const { address } = useAccount();
  const chainId = useChainId();

  const Eid = chainId === 11155111 ? 40245 : 40161;

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

  // Create the options for the contract
  const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString() as `0x${string}`;

  // watch for the strikePrice in the form
  const strikePrice = form.watch("strikePrice");
  // watch for the ltv from the borrowing Contract
  const { data: ltv } = useReadBorrowingContractGetLtv({ query: { enabled: !!address } });
  // watch for the totalVolumeOfBorrowersAmountinUsd from the  treasury
  const { data: totalVolumeOfBorrowersAmountinUsd } =
    useReadTreasuryTotalVolumeOfBorrowersAmountinUsd({
      query: { staleTime: 10 * 1000 }
    });

  // total cds deposited amount
  const { data: totalCdsDepositedAmount } = useReadCdsTotalCdsDepositedAmount({
    query: { staleTime: 10 * 1000 }
  });

  // Use the useQuery hook to quote the Treasury nativefee
  const { data: nativeFee } = useReadTreasuryQuote({
    query: { enabled: !!address }, args: [Eid, 1,
      { recipient: "0x0000000000000000000000000000000000000000", tokensToSend: 0n },
      { recipient: "0x0000000000000000000000000000000000000000", nativeTokensToSend: 0n }, options, false],
  });

  // Use the useQuery hook to quote the CDS nativefee
  const { data: nativeFee1, error } = useReadCdsQuote({
    query: { enabled: !!address }, args: [Eid, 1, 123n, 123n, 123n,
      { liquidationAmount: 0n, profits: 0n, ethAmount: 0n, availableLiquidationAmount: 0n }, 0n, options, false]
  });

  // Use the useQuery hook to quote the Borrow nativefee
  const { data: nativeFee2 } = useReadBorrowingContractQuote({
    query: { enabled: !!address }, args: [Eid, {
      normalizedAmount: 5n,
      ethVaultValue: 10n,
      cdsPoolValue: 15n,
      totalCDSPool: 20n,
      noOfLiquidations: 25n,
      ethRemainingInWithdraw: 30n,
      ethValueRemainingInWithdraw: 35n,
      nonce: 40n
    }, options, false]
  })






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


  // get  ethPrice using useContractRead hook
  const { data: ethPrice } = useReadBorrowingContractGetUsdValue({});


  const {
    isPending: isDepositsLoading,
    data: depositDatahash, // Data received from the `useBorrowingContractDepositTokens` hook
    writeContract, // Function to initiate a write operation
    reset, // Function to reset the state of the hook
  } = useWriteBorrowingContractDepositTokens({

    mutation: {
      onSuccess: (data) => {
        // Show custom toast
        toast.custom(
          () => (
            <CustomToast
              props={{
                t: toastId.current,
                toastMainColor: "#268730",
                headline: "Transaction Completed. A new Deposit has been created",
                transactionHash: data,
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
      onError: (error: any) => {
        // Log the error to the console
        console.log(error.name, error.message, error.cause);
        // Show custom toast
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
          { duration: 5000 } // Toast duration: 5000 milliseconds
        );
      },
    }

  });

  // Use the useWaitForTransactionReceipt hook to wait for the transaction receipt
  const { data: Depositdata, isError: depositError, isLoading: isDepositdataLoading, isSuccess: isDepositSuccess } = useWaitForTransactionReceipt({
    hash: depositDatahash,
    confirmations: 2
  })

  useEffect(() => {
    if (isDepositSuccess) {
      handleRefetch();
      console.log("transaction completed", Depositdata);

      form.reset({
        ...form.getValues(), // preserve other field values
        collateral: 'default', // replace 'default' with your default collateral value
      });
      reset()

      setOpen(false);
      toast.custom(
        () => (
          <CustomToast
            props={{
              t: toastId.current,
              toastMainColor: "#268730",
              headline: "Transaction Completed. A new Deposit has been created",
              transactionHash: Depositdata.blockHash,
              linkLabel: "View Transaction",
              toastClosebuttonHoverColor: "#90e398",
              toastClosebuttonColor: "#57C262",
            }}
          />
        ),
        { duration: 5000 } // Toast duration: 5000 milliseconds
      );

      setTimeout(() => {
        toast.dismiss(toastId.current);
      }, 3000);
    } else if (depositError) {
      toast.custom(
        (t) => (
          <div>
            <CustomToast
              key={2}
              props={{
                t,
                toastMainColor: "#B43939",
                headline: `Uhh Ohh! Unknow error occured`,
                toastClosebuttonHoverColor: "#e66d6d",
                toastClosebuttonColor: "#C25757",
              }}
            />
          </div>
        ),
        { duration: 5000 } // Toast duration: 5000 milliseconds
      );
    }


  }, [Depositdata])


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
    if (!writeContract) {
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
    console.log("clicked", values)
    let colateralamount = parseUnits(form.getValues("collateralAmount").toString(), 18);
    let strikePercent = strikePrice == 5 ? 0 : strikePrice == 10 ? 1 : strikePrice == 15 ? 2 : strikePrice == 20 ? 3 : 4;
    const data = await fetch(`${BACKEND_API_URL}/borrows/optionFees/${chainId}/${colateralamount}/${ethPrice}/${strikePercent}`).then(
      (res) => res.json()
    )
    console.log("nativeFee1", nativeFee1, nativeFee2, nativeFee)
    console.log(data[0])
    if (data[0] != undefined && nativeFee1 != undefined && nativeFee2 != undefined && nativeFee != undefined) {
      writeContract?.({
        args: [
          strikePercent,
          BigInt(Math.floor((1 + form.getValues("strikePrice") / 100) * Number(ethPrice ? ethPrice : 0))),
          BigInt(data[0]),
          parseEther((form.getValues("collateralAmount")).toString()),
        ],
        value: parseEther(form.getValues("collateralAmount").toString()) + nativeFee1.nativeFee + nativeFee2.nativeFee + nativeFee.nativeFee,
      });
    } // mutate(address);
  }

  /**
   * Handles the Fee Calculation.
   **/

  /**
   * Handles the calculation and setting of the amint to be minted and downside protection amounts.
  */

  const handleAmintToBeMinted = async () => {
    // Calculate the amint to be minted
    const optionf = await getOptionFees();
    setOptionFees(optionf);
    const amintToMint = (form.watch("collateralAmount") * Number(ethPrice) * 80) / 10000;
    const amint2Decimal = displayNumberWithPrecision(amintToMint.toString());
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
    if (form.getValues("collateral") == undefined) {
      form.setError("collateralAmount", { message: "select collateral type" });
    }
    else if (form.getValues("collateralAmount") == 0) {
      setAmintToBeMinted('0');
      setDownsideProtectionAmnt('0');
      setOptionFees(0);
    }
    else if (form.getValues("collateralAmount") != 0) {
      form.clearErrors("collateralAmount");
      handleAmintToBeMinted();
    }
    else {
      form.clearErrors("collateralAmount");
      form.setError("collateralAmount", { message: "value should be greater than 0.02 ETH" });
    }

  }, [form.watch("collateralAmount"), form.watch("strikePrice")]);




  return (
    <div className="flex items-center justify-between ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} action="#">
          <div className="flex justify-between">

            {/* <div className="flex items-center justify-end gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" height={15} width={15}><path d="M.003 4.54c-.008-.37.092-1.233 1.216-1.533L12.507.747c.828 0 1.5.673 1.5 1.5V4.26l.5-.001a1.502 1.502 0 0 1 1.495 1.5v7.996c0 .827-.672 1.5-1.5 1.5H1.495c-.827 0-1.5-.673-1.5-1.5L.003 4.54Zm13.004-2.293a.5.5 0 0 0-.457-.498L1.52 3.982c-.004.002.082.28.482.275h11.006v-2.01ZM.993 13.754a.5.5 0 0 0 .5.5h13.008a.5.5 0 0 0 .5-.5V5.756a.5.5 0 0 0-.5-.5H2c-.491 0-1.006-.167-1.006-.498v8.996ZM13 8.758a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" fill="currentColor"></path></svg>
              <a type="button" onClick={onWatchAssetAmintClick} className="m-0 text-[12px] underline rounded-md ">Add USDa</a>
            </div> */}
          </div>
          <div className="flex flex-col ">
            <div className="flex  flex-col basis-1/2 min-[1440px]:pt-[30px] pt-[10px] min-[1440px]:gap-[20px] min-[1280px]:gap-[16px] 2dppx:gap-[10px] gap-[10px]">
              <div className='relative flex w-full gap-2 '>
                <FormField
                  control={form.control}
                  name="collateralAmount"
                  render={({ field }) => (
                    <FormItem className="relative basis-4/6">
                      <FormControl>
                        <div >

                          <Input
                            type="number"
                            step="any"
                            {...field}
                            value={Boolean(field.value) ? field.value : ""}
                            placeholder=""
                            className="px-2 py-5 rounded-none text-sm disabled:opacity-100  text-gray-900 bg-[#ffffff] dark:bg-[#3A3A3A] dark:border-[#9E9E9E] border-[#020202] border-[1px] lock dark:text-white focus:outline-none focus:ring-0 peer"
                            style={{
                              appearance: 'textfield',
                              MozAppearance: 'textfield',
                              WebkitAppearance: 'none',
                              margin: 0
                            }}
                            disabled={form.getValues("collateral") == undefined}
                          ></Input>
                          <label
                            htmlFor="amount_of_usdt"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 bg-[#ffffff] top-2 z-10 origin-[0]  dark:bg-[#3A3A3A]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                          >
                            Input Amount
                          </label>
                        </div>
                      </FormControl>
                      {/* <FormMessage className="dark:text-[#ff6d6d] absolute -bottom-5 left-2" /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="collateral"

                  render={() => (
                    <FormItem className=' basis-2/6  right-2  bg-[#020202] text-white '>
                      <Controller
                        control={form.control}
                        name="collateral"
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              form.setValue("collateralAmount", 0);
                              if (value === 'amint') {
                                form.setValue('collateral', 'usdt');
                              } else if (value === 'abond') {
                                form.setValue('collateral', 'eth');
                              }
                              field.onChange(value)
                            }}

                            value={field.value}

                          >
                            {/* <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400 '>{!form.getValues("collateral") ? "" : "Input Type"}</label> */}

                            <FormControl className="py-5 rounded-none" >
                              <SelectTrigger>
                                <SelectValue placeholder="Collateral" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="text-white bg-[#020202] dark:bg-black rounded-none">
                              <SelectGroup >
                                <SelectItem className="text-white bg-[#020202] dark:bg-black  rounded-none" value="eth">ETH</SelectItem>
                              </SelectGroup>
                            </SelectContent>

                          </Select>
                        )}
                      />

                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />

                {/* <span className="top-7  text-gray-400 font-semibold relative md:absolute  right-32 block text-right text-[0.7rem]"> <span className="text-xl">(</span> <span className="text-sm">={(Number(ethPrice) / 100 * Number(form.getValues("collateralAmount"))).toFixed(2)} </span> usdt <span className="text-xl">)</span></span> */}
                <span className=" text-textHighlight  relative md:absolute md:right-1 -bottom-5 block text-right text-[0.7rem] dark:text-[#d4d4d4]">Balance:  {(Number(ethBalance.data?.formatted)).toFixed(4)} ETH</span>
              </div>
              <div className="px-[1px] -mt-2 flex gap-[10px] items-center">
                {/* <InfoCircledIcon width={18} height={18} /> */}
                <p className=" min-[1440px]:text-base 2dppx:text-sm text-xs font-normal text-textGrey dark:text-[#DEDEDE] ">
                  Minimum Collateral Amount is{" "}
                  <span className="font-medium text-textHighlight dark:text-[#ffff]">
                    0.02 ETH
                  </span>
                </p>
              </div>


              <div className="flex items-center gap-2 mt-2 ">
                <div className="text-sm  text-textHighlight dark:text-[#DEDEDE] ">
                  Surrender Upside Price
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <InfoCircledIcon className="w-4 h-4 ml-1 mr-2" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Give up %age of collateral price upside in return for high LTV</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  :
                </div>
                <div className="flex gap-4">
                  <div onClick={() => form.setValue("strikePrice", 5)} className={`p-[1px] ${form.getValues("strikePrice") == 5 ? " border-2   font-medium dark:border-[#ABFFDE]  dark:text-[#ABFFDE] border-black text-black" : "dark:border-[#DEDEDE] border-gray-500 text-gray-500 dark:text-[#DEDEDE]"}  text-sm border  w-[2.5rem] text-center cursor-pointer `}>5%</div>
                  <div onClick={() => form.setValue("strikePrice", 10)} className={`p-[1px] ${form.getValues("strikePrice") == 10 ? "border-2 dark:border-[#ABFFDE] dark:text-[#ABFFDE] font-medium border-black text-black" : "dark:border-[#DEDEDE] border-gray-500 text-gray-500 dark:text-[#DEDEDE]"} text-sm border w-[2.5rem] text-center  cursor-pointer `}>10%</div>
                </div>
              </div>
              <div className='relative  dark:bg-[#3A3A3A] dark:border-[#9E9E9E] border-[#020202] border-[1px]    rounded-none py-1 px-2'>
                <div>
                  <div className='text-sm text-textGrey font-medium dark:text-[#FFFF] flex justify-between'>
                    <div className='p-1 mt-1 basis-3/5'>{amintToBeMinted}</div>
                    <div className='w-24 p-2 px-3 mr-1 text-center'>USDa</div>
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-5 ">
                <Button
                  type="button"
                  onClick={() => openPositions(true)}
                  variant={"outline"}
                  className="basis-1/2"
                >
                  {'View Positions'} <ArrowTopRightIcon className="ml-2 sm:ml-0 sm:absolute sm:right-5" width={20} height={20} />
                </Button>
                <Button
                  type="submit"
                  variant={"primary"}
                  className=" basis-1/2"
                  disabled={isDepositsLoading || isDepositdataLoading || disabled}
                >
                  {isDepositsLoading || isDepositdataLoading ? <Spinner /> : 'Confirm Deposit'}
                </Button>
              </div>

              <Note
                note="Note: Only 50% of the amount is retrievable on initial
                  withdrawal. For 2nd 50% of amount, you will be getting
                  Abond and your collateral can be withdrawn by returning Abond."
              />

              <div className="relative container flex px-0  mx-auto border-[1px] border-[#020202]   dark:border-[#9E9E9E]  ">
                <div className="absolute flex w-full h-8 ">
                  <div className="w-[78%] h-8 bg-[linear-gradient(to_bottom,#0029AC_1%,#6185F8_2%,white_80%)] dark:bg-[linear-gradient(to_bottom,#0029AC_1%,#6185F8_2%,#242424_80%)]"></div>
                  <div className="w-[2%] h-8 bg-[linear-gradient(to_bottom,#AA0001_1%,#F69596_2%,white_80%)] dark:bg-[linear-gradient(to_bottom,#AA0001_1%,#F69596_2%,#242424_80%)]"></div>
                  <div className="w-[21%] h-8 bg-[linear-gradient(to_bottom,#006733_1%,#A1F9CD_2%,white_80%)] dark:bg-[linear-gradient(to_bottom,#006733_1%,#A1F9CD_2%,#242424_80%)] "></div>
                </div>
                <div className="w-full p-4 mt-3 border-r dark:border-gray-700 dark:bg-none">
                  <h2 className="mb-2  text-black font-medium text-md dark:text-[#DEDEDE]">100% Synthetic LTV</h2>
                  <div className="flex items-center justify-between w-full">
                    <div className="w-full ">
                      <p className="text-sm text-gray-600 flex justify-between dark:text-[#DEDEDE] py-1 border-b border-[#9E9E9E] "><div>Deposit:</div> <div className="text-black dark:text-white">{(Number(ethPrice) / 100 * Number(form.getValues("collateralAmount"))).toFixed(2)}</div></p>
                      <p className="w-full text-gray-600 text-sm flex justify-between  py-1 border-b border-[#9E9E9E] dark:text-[#DEDEDE] "><div>Option Fee :</div> <div className="text-[#ff6d6d]">{optionFees.toFixed(2)}</div></p>
                      <p className="text-sm text-gray-600  flex justify-between py-1 border-b border-[#9E9E9E] dark:text-[#DEDEDE]"><div>USDa borrowed :</div> <div className="text-[#007AFF]">{Number(amintToBeMinted).toFixed(2)}</div></p>
                      <p className="flex justify-between py-1 text-sm text-gray-600 dark:text-[#DEDEDE]"><div>Downside Protection <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger type="button">
                            <InfoCircledIcon className="w-4 h-4 ml-0 mr-1 text-black dark:text-white" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Hedge your collateral price drop to maintain high LTV</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>:</div> <div className="text-[#00b564] ">{Number(downsideProtectionAmnt).toFixed(2)}</div></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewDeposit;
/* Line 10 */

