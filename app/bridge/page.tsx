'use client';
import React, { useEffect, useRef, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReadTestusdtAbiQuoteSend, useReadUsDaQuoteSend, useWriteTestusdtAbiSend, useWriteUsDaSend,useWriteUsDaApprove, testusdtAbiAddress, usDaAddress } from '@/abiAndHooks';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import CustomToast from "@/components/CustomUI/CustomToast";
import { useAccount, useWaitForTransactionReceipt, useBalance, useChainId, useSwitchChain } from 'wagmi';
import Spinner from '@/components/ui/spinner';
import { formatEther } from 'viem';
import Image from 'next/image';
import swapArrow from "@/app/assets/swap_vert.svg";
import Notification from "@/components/pagePopover/Notification";
import PageSettings from "@/components/pagePopover/PageSettings";
import { BellIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Settings } from "lucide-react";
import { Options } from '@layerzerolabs/lz-v2-utilities';
import { ethers, BigNumberish } from 'ethers';
import GetBalance from '@/components/ConnectWallet/GetBalance';

interface TransactionParams {
  dstEid: number; // Assuming Eid is a string, adjust the type if it's different
  to: `0x${string}`; // Account address padded to 32 characters
  amountLD: bigint; // Amount in Ether, parsed from a string
  minAmountLD: bigint; // Minimum amount in Ether, parsed from a string
  extraOptions: any; // Assuming options is of a generic type, adjust as necessary
  composeMsg: `0x${string}`; // A hexadecimal string
  oftCmd: `0x${string}`; // Another hexadecimal string
}

const formSchema = z.object({
  sourceChain: z.string(),
  destinationChain: z.string(),
  inputCollateral: z.string(),
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
  outputCollateralAmount: z
    .number()
    .positive({ message: "Value must be positive" })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .positive({ message: "Value must be positive" })
    ),
  outputCollateral: z.string(),
});




export default function page() {

  const { switchChain } = useSwitchChain();

  const { address: accountAddress } = useAccount();

  const [openSettings, setOpenSettings] = React.useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const toastId = useRef<string | number>("");

  const chainId = useChainId();

  const [Eid, setEid] = useState(chainId);

  const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString() as `0x${string}`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceChain: "11155111",
      destinationChain: "84532",
      inputCollateral: undefined,
      collateralAmount: 0,
      outputCollateral: undefined,
      outputCollateralAmount: 0
    },
  });
  const [collateralAmountString, setCollateralAmountString] = useState<string>("0");
  useEffect(() => {
    console.log(form.getValues("collateralAmount"))
    let letamount = form.getValues("collateralAmount").toString();
    if(!form.getValues("collateralAmount")){
      setCollateralAmountString('0')
      letamount = "0"
    }
    else{
      setCollateralAmountString(form.getValues("collateralAmount").toString())
    }
    if(nativeFee1){
    const amount = ethers.parseEther(letamount) - nativeFee1.nativeFee;
    form.setValue("outputCollateralAmount", Number((Number(amount)/10**18).toFixed(4)));
  }

  }, [form.watch("collateralAmount")]);
  

  const transactionParams: TransactionParams = {
    dstEid: Eid,
    to: ethers.zeroPadValue(accountAddress ?? '0', 32) as `0x${string}`,
    amountLD: BigInt(collateralAmountString),
    minAmountLD:  BigInt(collateralAmountString),
    extraOptions: options,
    composeMsg: `0x${''.padEnd(64, '0')}`,
    oftCmd: `0x${''.padEnd(64, '0')}`,
  };

  const { data: nativeFee1, error: UsdaQuoteError, refetch: refetchnativeFee1 } = useReadUsDaQuoteSend({
    args: [transactionParams as any, false]
  });

  const { data: nativeFee2, error: TUSDTQuoteError, refetch: refetchnativeFee2 } = useReadTestusdtAbiQuoteSend({
    args: [transactionParams as any, false]
  });


  const {
    isPending: amintApproveLoading,
    data: amintApproveData,
    writeContract: amintApproveWrite,
    isSuccess: amintApproved,
  } = useWriteUsDaApprove(
    {
      mutation:{
      onError(error) {
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

      // Handle success and show a custom toast notification
      onSuccess: (data) => {
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
                    transactionHash: data,
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
    }
  });

  const { data: amintTransactionAllowed, isLoading: isAmintTransactionLoading ,isError:usdaErrorApprove,isSuccess:usdaApproveSuccess} = useWaitForTransactionReceipt({
    hash: amintApproveData
  });

  useEffect(() => {
    if(usdaApproveSuccess && nativeFee1 && accountAddress) {
      usdaApproveWrite({
        args: [
          transactionParams,
          { nativeFee: nativeFee1.nativeFee, lzTokenFee: 0n },
          accountAddress,
        ],
        value: nativeFee1.nativeFee,
      })
    }
    else if(usdaErrorApprove) {
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
                  headline: `Uhh Ohh! Unable to approve USDa`,
                  toastClosebuttonHoverColor: "#e66d6d",
                  toastClosebuttonColor: "#C25757",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    }

  },[amintTransactionAllowed])


  const {
    isPending: usdaApproveLoading,
    data: usdaApproveData,
    writeContract: usdaApproveWrite,
    isSuccess: usdaApproved,
  } = useWriteUsDaSend(
    {
      mutation: {
        onError(error) {
          console.log(error.cause)
          console.log(error.message)
          console.log(error.name)
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
        onSuccess: (data) => {
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
                      transactionHash: data,
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
      }
    }
  );


  const { data: usdaTransactionConfirmed, isLoading: isUsdaTransactionLoading, isError: usdaIsError, isSuccess: usdaIsSuccess, error: usdaError } = useWaitForTransactionReceipt({
    hash: usdaApproveData,
  });

  useEffect(() => {
    if (usdaIsSuccess) {


      toast.custom(
        (t) => {
          return (
            <div>
              <CustomToast
                props={{
                  t,
                  toastMainColor: "#268730",
                  headline: "Amint Approved,Plz confirm the transaction to redeem USDT",
                  transactionHash: usdaApproveData,
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
    else if (usdaIsError) {
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
                  headline: `Uhh Ohh! ${usdaError.name}`,
                  toastClosebuttonHoverColor: "#e66d6d",
                  toastClosebuttonColor: "#C25757",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    }
  }, [usdaTransactionConfirmed]);


  const {
    isPending: tusDTApproveLoading,
    data: tusDTApproveData,
    writeContract: tusDTApproveWrite,
    isSuccess: tusDTApproved,
  } = useWriteUsDaApprove(
    {
      mutation:{
      onError(error) {
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

      // Handle success and show a custom toast notification
      onSuccess: (data) => {
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
                    transactionHash: data,
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
    }
  });

  const { data: tusDTTransactionAllowed, isLoading: tusDTTransactionLoading ,isError:tusDTErrorApprove,isSuccess:tusDTApproveSuccess} = useWaitForTransactionReceipt({
    hash: tusDTApproveData
  });

  useEffect(() => {
    if(tusDTApproveSuccess && nativeFee2 && accountAddress) {
      tusdtApproveWrite({
        args: [
          transactionParams,
          { nativeFee: nativeFee2.nativeFee, lzTokenFee: 0n },
          accountAddress,
        ],
        value: nativeFee2.nativeFee,
      })
    }
    else if(usdaErrorApprove) {
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
                  headline: `Uhh Ohh! Unable to approve USDa`,
                  toastClosebuttonHoverColor: "#e66d6d",
                  toastClosebuttonColor: "#C25757",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    }

  },[tusDTTransactionAllowed])

  const {
    isPending: tusdtApproveLoading,
    data: tusdtApproveData,
    writeContract: tusdtApproveWrite,
    isSuccess: tusdtApproved,
  } = useWriteTestusdtAbiSend(
    {
      mutation: {
        onError(error) {
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
        onSuccess: (data) => {
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
                      transactionHash: data,
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
      }
    }
  );


  const { data: tusdtTransactionConfirmed, isLoading: istusdtTransactionLoading, isError: tusdtIsError, isSuccess: tusdtIsSuccess, error: tusdtError } = useWaitForTransactionReceipt({
    hash: tusdtApproveData,
  });

  useEffect(() => {
    if (tusdtIsSuccess) {
      toast.custom(
        (t) => {
          return (
            <div>
              <CustomToast
                props={{
                  t,
                  toastMainColor: "#268730",
                  headline: "Amint Approved,Plz confirm the transaction to redeem USDT",
                  transactionHash: tusdtApproveData,
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
    else if (tusdtIsError) {
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
                  headline: `Uhh Ohh! ${tusdtError.name}`,
                  toastClosebuttonHoverColor: "#e66d6d",
                  toastClosebuttonColor: "#C25757",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    }
  }, [usdaTransactionConfirmed]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    if (accountAddress) {



      if (values.inputCollateral === 'usda' && nativeFee1) {
        amintApproveWrite({
          args: [
  
            (usDaAddress[chainId as keyof typeof usDaAddress] as `0x${string}`),
            BigInt(values.collateralAmount * 10 ** 6),
          ],
        })
 

      } else if (values.inputCollateral === 'tusdt' && nativeFee2) {
        tusDTApproveWrite({
          args: [
  
            (testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress] as `0x${string}`),
            BigInt(values.collateralAmount * 10 ** 6),
          ],
        })
      }
    }

  }

  useEffect(() => {
    if (form.getValues("sourceChain") === '11155111') {
      setEid(40245);
    }
    else {
      setEid(40161);
    }
  }, [form.watch("sourceChain")]);

  useEffect(() => {
    if (form.getValues("inputCollateral") === 'usda') {
      refetchnativeFee1()
      form.setValue('outputCollateral', 'usda');
    } else if (form.getValues("inputCollateral") === 'tusdt') {
      refetchnativeFee2()
      form.setValue('outputCollateral', 'tusdt');
    }

  }, [form.watch("inputCollateral")]);

 
  return (
    <div className='w-full px-2 sm:px-5 '>
      <div className='w-full relative bg-white border border-[#9E9E9E] shadow-custom min-h-[84vh]'>
        <div className="hidden gap-5 sm:flex sm:flex-col sm:absolute mdb:flex right-5 top-5">
          <div onClick={() => { setShowNotification(!showNotification); setOpenSettings(false) }} className="border-[#041A50] bg-[#ABFFDE] border-[1px] shadow-smallcustom h-fit p-[15px] cursor-pointer">
            <BellIcon className="w-6 h-6 text-[#000000] dark:text-[#90AFFF]" />
          </div>
          <div className="border-[#041A50] bg-[#ABFFDE] border-[1px] shadow-smallcustom h-fit p-[15px] cursor-pointer">
            <Settings onClick={() => { setOpenSettings(!openSettings); setShowNotification(false) }} className="w-6 h-6 text-[#000000] dark:text-[#90AFFF]" />
          </div>
        </div>
        <Notification showNotifications={showNotification} setShowNotifications={setShowNotification} />
        <PageSettings showSettings={openSettings} setShowSettings={setOpenSettings} />
        <div className='w-[95%] sm:w-[500px] md:w-[600px] 2xl:w-[600px] 3xl:w-[800px] mx-auto h-auto  dark:bg-[#141414]  p-1 sm:p-4'>

          <div className="justify-center mt-6  align-middle dark:bg-[#141414] ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full gap-4 ' action="#">
                <div >
                  <div className='flex justify-between w-full mb-1 text-xs'>
                    <div className='flex items-center'>
                      <div className="h-4 w-4 bg-[#93F3BA] rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-[#009350] rounded-full"></div>
                      </div>
                      <FormField
                        control={form.control}
                        name="sourceChain"
                        render={() => (
                          <FormItem className=''>
                            <Controller
                              control={form.control}
                              name="sourceChain"
                              render={({ field }) => (
                                <Select
                                  onValueChange={(value) => {
                                    form.setValue("collateralAmount", 0);
                                    if (value === '11155111') {
                                      form.setValue('destinationChain', '84532');
                                    } else if (value === '84532') {
                                      form.setValue('destinationChain', '11155111');
                                    }
                                    switchChain && switchChain({ chainId: Number(value) });
                                    field.onChange(value)

                                  }}
                                  value={field.value}
                                >
                                  <FormControl className='flex gap-4 text-black border-none rounded-none ' >
                                    <SelectTrigger >
                                      <SelectValue placeholder="Source Chain" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className='text-black '>
                                    <SelectGroup>
                                      <SelectItem value="11155111">Sepolia</SelectItem>
                                      <SelectItem value="84532">Base Sepolia</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className='text-[#020202] px-3 py-1 relative rounded-none  border-0 border-b-2 border-[#020202] bg-[#DEDEDE]'>
                      max
                    </div>
                  </div>
                  <div className='  relative flex  dark:bg-[#020202]'>
                    <FormField
                      control={form.control}
                      name="inputCollateral"
                      render={() => (
                        <FormItem className='  basis-2/6 bg-[#020202] '>
                          <Controller
                            control={form.control}
                            name="inputCollateral"
                            render={({ field }) => (
                              <Select
                                onValueChange={(value) => {
                                  form.setValue("collateralAmount", 0);
                                  if (value === 'usda') {
                                    form.setValue('outputCollateral', 'usda');
                                  } else if (value === 'tusdt') {
                                    form.setValue('outputCollateral', 'tusdt');
                                  }
                                  field.onChange(value)
                                }}

                                value={field.value}
                              >

                                <FormControl className='bg-[#020202] text-white py-5 rounded-none' >
                                  <SelectTrigger >
                                    <SelectValue placeholder="Input Token" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className='bg-[#020202] rounded-none text-white'>
                                  <SelectGroup>
                                    <SelectItem value="usda">USDa</SelectItem>
                                    <SelectItem value="tusdt">TUSDT</SelectItem>
                                  </SelectGroup>
                                </SelectContent>

                              </Select>
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="collateralAmount"
                      render={({ field }) => (
                        <FormItem className="relative basis-4/6 ">
                          {/* <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400 '>{!form.getValues("collateralAmount") ? "" : "Input Amount"}</label> */}

                          <FormControl>
                            <div className="relative">
                              <Input
                                type="number"
                                step="any"
                                // placeholder="Input Amount"
                                placeholder=""

                                {...field}
                                value={Boolean(field.value) ? field.value : ""}
                                className="w-full px-2 py-5 rounded-none text-sm text-gray-900 bg-[#ffffff] dark:bg-[#0f0f0f] border-[#020202] dark:border-[#00B655] border lock dark:text-white focus:outline-none focus:ring-0 peer"
                                style={{
                                  appearance: 'textfield',
                                  MozAppearance: 'textfield',
                                  WebkitAppearance: 'none',
                                  margin: 0
                                }}
                                min={0.02}
                              ></Input>
                              <label
                                htmlFor="amount_of_usdt"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 bg-[#ffffff] top-2 z-10 origin-[0]  dark:bg-[#0F0F0F]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                              >
                                Input Amount
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage className="dark:text-[#B43939]" />
                        </FormItem>
                      )}
                    />

                  </div>
                  <div className='flex items-center justify-end text-xs text-end '>
                   <GetBalance token={form.getValues("inputCollateral")==="usda"?"USDa":"TUSDT"} />
                  </div>
                </div>
                <div className='flex items-center justify-center my-4'>

                  <div className='w-20 h-20 p-5 bg-[#EEEEEE] rounded-full'>
                    <Image src={swapArrow} alt="arrow" className="w-full h-full" />
                  </div>
                </div>


                <div className=''>

                  <div className='flex justify-between w-full mb-1 text-xs'>
                    <div className='flex items-center '>
                      <div className="h-4 w-4 bg-[#93F3BA] rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-[#009350] rounded-full"></div>
                      </div>
                      <FormField
                        control={form.control}
                        name="destinationChain"
                        render={() => (
                          <FormItem className=''>
                            <Controller
                              control={form.control}
                              name="destinationChain"
                              render={({ field }) => (
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value)
                                  }}
                                  value={field.value}
                                  disabled={true}
                                >
                                  <FormControl className='flex gap-4 text-black border-none rounded-none ' >
                                    <SelectTrigger >
                                      <SelectValue placeholder="Destination Chain" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className='bg-[#020202] rounded-none text-white'>
                                    <SelectGroup>
                                      <SelectItem value="11155111">Sepolia</SelectItem>
                                      <SelectItem value="84532">Base Sepolia</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                  </div>
                  <div className='  relative flex  dark:bg-[#020202]'>
                    <FormField
                      control={form.control}
                      name="outputCollateral"
                      render={() => (
                        <FormItem className='  basis-2/6 bg-[#020202] '>
                          <Controller
                            control={form.control}
                            name="outputCollateral"
                            render={({ field }) => (
                              <Select
                                onValueChange={(value) => {

                                  field.onChange(value)

                                }}
                                disabled={true}
                                value={field.value}
                              >
                                {/* <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400 '>{!form.getValues("inputCollateral") ? "" : "Input Type"}</label> */}

                                <FormControl className='bg-[#020202] text-white py-5 rounded-none' >
                                  <SelectTrigger >
                                    <SelectValue placeholder="Output Token" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className='bg-[#020202] rounded-none text-white'>
                                  <SelectGroup>
                                    <SelectItem value="usda">USDa</SelectItem>
                                    <SelectItem value="tusdt">TUSDT</SelectItem>
                                  </SelectGroup>
                                </SelectContent>

                              </Select>
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="outputCollateralAmount"
                      render={({ field }) => (
                        <FormItem className="relative basis-4/6 ">
                          {/* <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400 '>{!form.getValues("collateralAmount") ? "" : "Input Amount"}</label> */}

                          <FormControl>
                            <div className="relative">
                              <Input
                                type="number"
                                step="any"
                                // placeholder="Input Amount"
                                placeholder=""

                                {...field}
                                value={Boolean(field.value) ? field.value : ""}
                                className="w-full px-2 py-5 rounded-none text-sm text-gray-900 bg-[#ffffff] dark:bg-[#0f0f0f] border-[#020202] dark:border-[#00B655] border lock dark:text-white focus:outline-none focus:ring-0 peer"
                                style={{
                                  appearance: 'textfield',
                                  MozAppearance: 'textfield',
                                  WebkitAppearance: 'none',
                                  margin: 0
                                }}
                              ></Input>
                              <label
                                htmlFor="amount_of_usdt"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 bg-[#ffffff] top-2 z-10 origin-[0]  dark:bg-[#0F0F0F]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                              >
                                Output Amount
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage className="dark:text-[#B43939]" />
                        </FormItem>
                      )}
                    />

                  </div>
                </div>

                <div className='bg-[#DEDEDE] shadow-custom px-4'>

                  <div className="flex flex-col tracking-tighter">

                    <div className="flex justify-between px-4 py-[10px]  border-b border-[#020202]">
                      <p className=" min-[1440px]:text-base 2dppx:text-sm text-sm  dark:text-[#9E9E9E]">
                        Gas on destination chain
                      </p>
                      <p className="text-textHighlight font-medium  min-[1440px]:text-base 2dppx:text-sm text-sm dark:text-[#9E9E9E]">
                        --
                      </p>
                    </div>
                    <div className="px-4 py-[10px] border-b border-[#020202]">
                      <div className="flex justify-between ">
                        <p className=" min-[1440px]:text-base 2dppx:text-sm text-sm text-textHighlight dark:text-[#9E9E9E]">
                          Fee
                        </p>
                        <p className="text-textHighlight font-medium  min-[1440px]:text-base 2dppx:text-sm text-sm dark:text-[#9E9E9E]">
                          --
                        </p>
                      </div>

                    </div>

                    <div className="px-4 py-[10px] ">
                      <div className="flex justify-between ">
                        <p className=" min-[1440px]:text-base 2dppx:text-sm text-sm text-textHighlight dark:text-[#9E9E9E]">
                          Slipage tolerance
                        </p>
                        <p className="text-textHighlight font-medium  min-[1440px]:text-base 2dppx:text-sm text-sm dark:text-[#9E9E9E]">
                          --
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                <Button
                  type="submit"
                  variant={"primary"}
                  className="border-[#041A50] bg-[#ABFFDE] text-sm border-[1px] shadow-smallcustom py-2 rounded-none basis-1/2 "
                  disabled={ isUsdaTransactionLoading  || istusdtTransactionLoading }
                  onClick={() => { form.handleSubmit(onSubmit) }}
                >
                  { isUsdaTransactionLoading || istusdtTransactionLoading ? <Spinner /> : "Bridge"}
                </Button>

              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>

  )
}
