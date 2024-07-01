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
import { useWriteCdsRedeemUsdt,useReadGlobalQuote, useWriteBorrowingContractRedeemYields, useWriteUsDaApprove, useWriteAbondApprove, cdsAddress, borrowingContractAddress, useReadBorrowingContractGetAbondYields, abondAddress, usDaAddress } from '@/abiAndHooks';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import Note from '@/components/CustomUI/Note';
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import CustomToast from "@/components/CustomUI/CustomToast";
import { useAccount, useWaitForTransactionReceipt, useBalance, useChainId } from 'wagmi';
import Spinner from '@/components/ui/spinner';
import { formatEther } from 'viem';
import arrowout from "@/app/assets/arrow_outward.svg";
import Image from 'next/image';
import GetBalance from '../ConnectWallet/GetBalance';
import { Options } from '@layerzerolabs/lz-v2-utilities';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
const formSchema = z.object({
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

const Redeem = ({
  openRedeemableAssets
}: {
  openRedeemableAssets: Function
}) => {


  const { address: accountAddress } = useAccount();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputCollateral: undefined,
      collateralAmount: 0,
      outputCollateral: undefined,
      outputCollateralAmount: 0
    },
  });
  const chainId = useChainId();
  const { data: abondbalance } = useBalance({
    address: abondAddress ? accountAddress : undefined,
    token: abondAddress
      ? abondAddress[chainId as keyof typeof abondAddress]
      : undefined,
  });
  const { data: amintbalance } = useBalance({
    address: usDaAddress ? accountAddress : undefined,
    token: usDaAddress
      ? usDaAddress[chainId as keyof typeof usDaAddress]
      : undefined,
  });
  const toastId = useRef<string | number>("");
  const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString() as `0x${string}`;
  const Eid = chainId === 11155111 ? 40245 : 40161;

  const { data: nativeFee1, error } = useReadGlobalQuote({
    args: [1, options, false]
  });


  const {
    isPending: amintApproveLoading,
    data: amintApproveData,
    writeContract: amintApproveWrite,
    isSuccess: amintApproved,
  } = useWriteUsDaApprove(
    {
      mutation:{
      onError(error:any) {
        toast.custom(
          (t) => {
          
            return (
              <div>
                <CustomToast
                  key={2}
                  props={{
                    t: toastId.current,
                    toastMainColor: "#B43939",
                    headline: `Uhh Ohh! ${error.details}`,
                    toastClosebuttonHoverColor: "#e66d6d",
                    toastClosebuttonColor: "#C25757",
                    type:"error",
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
                    type:"success",
                  }}
                />
              </div>
            );
          },
          { duration: 5000 }
        );
      },
    }
  });


  const { data: amintTransactionAllowed, isLoading: isAmintTransactionLoading ,isError:usdaErrorApprove,isSuccess:usdaApproveSuccess} = useWaitForTransactionReceipt({
    hash: amintApproveData
  });

  useEffect(() => {
    if(usdaApproveSuccess && nativeFee1) {
      redeemUsdt?.({
        args: [
          BigInt(Number(form.getValues("collateralAmount")) * 10 ** 6),
          BigInt(1000000),
          BigInt(1000000),
        ],
        value:nativeFee1.nativeFee
      });
    }
    else if(usdaErrorApprove) {
      toast.custom(
        (t) => {
          
          return (
            <div>
              <CustomToast
                key={2}
                props={{
                  t: toastId.current,
                  toastMainColor: "#B43939",
                  headline: `Uhh Ohh! Unable to approve USDa`,
                  toastClosebuttonHoverColor: "#e66d6d",
                  toastClosebuttonColor: "#C25757",
                  type:"error",
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
    writeContract: redeemUsdt,
    data: redeemUsdtData,
    reset: resetUsdt,
    isPending: isRedeemUsdt
  } = useWriteCdsRedeemUsdt({
    // Handle errors during the process
    mutation:{
    onError: (error:any) => {
      // console.log(error.message);
      console.log("MESSAGE", error.cause);
      // Show a custom toast notification for the error
      toast.custom(
        (t) => (
          <div>
            <CustomToast
              key={2}
              props={{
                t: toastId.current,
                toastMainColor: "#B43939",
                headline: `Uhh Ohh! ${error.details}`,
                toastClosebuttonHoverColor: "#e66d6d",
                toastClosebuttonColor: "#C25757",
                type:"error",
              }}
            />
          </div>
        ),
        { duration: 5000, id: toastId.current }
      );

      setTimeout(() => {
        toast.dismiss(toastId.current);
      }, 5000);
    },
    onSuccess: (data) => {
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
                  type:"success",
                }}
              />
            </div>
          );
        },
        // Set the duration of the toast notification to be infinite
        { duration: 5000, id: toastId.current }
      );
    },
  }
  });



  const { data: redeemdataUsdt, isLoading: isRedeemUsdtTransactionLoading,isError:redeemUsdtError,isSuccess:redeemUsdtSuccess,error:redeemError } = useWaitForTransactionReceipt({
    hash: redeemUsdtData,

  });


  useEffect(()=>{
    if(redeemUsdtSuccess) {
      toast.custom(
        (t) => {
          return (
            <div>
              <CustomToast
                props={{
                  t: toastId.current,
                  toastMainColor: "#268730",
                  headline: "Transaction Completed",
                  transactionHash: redeemUsdtData,
                  linkLabel: "View Transaction",
                  toastClosebuttonHoverColor: "#90e398",
                  toastClosebuttonColor: "#57C262",
                  type:"success",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    }
    else if(redeemUsdtError) {
      toast.custom(
        (t) => {
          
          return (
            <div>
              <CustomToast
                key={2}
                props={{
                  t: toastId.current,
                  toastMainColor: "#B43939",
                  headline: `Uhh Ohh! ${redeemError.name}`,
                  toastClosebuttonHoverColor: "#e66d6d",
                  toastClosebuttonColor: "#C25757",
                  type:"error",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    }

  },[redeemdataUsdt])

  const { data: outputData, refetch } = useReadBorrowingContractGetAbondYields({ args: [accountAddress as `0x${string}`, BigInt(Number(form.getValues("collateralAmount")) * 10 ** 18)] });

  useEffect(() => {
    if (form.getValues("inputCollateral") === 'abond' && form.getValues("collateralAmount") > 0) {
      console.log(abondbalance?.formatted)

      if (form.getValues("collateralAmount") > Number(abondbalance?.formatted.slice(0, 8))) {
        form.setError("collateralAmount", { message: "Insufficient Balance" });
      }
      else {
        form.clearErrors("collateralAmount");
        refetch();
        if (outputData) form.setValue("outputCollateralAmount", Number(formatEther(outputData[0])));
      }
    }
    else if (form.getValues("inputCollateral") === 'amint' && form.getValues("collateralAmount") > 0) {
      console.log(amintbalance?.formatted)
      if (form.getValues("collateralAmount") > Number(amintbalance?.formatted.slice(0, 9))) {
        form.setError("collateralAmount", { message: "Insufficient Balance" });
      }
      else {
        form.clearErrors("collateralAmount");
        form.setValue("outputCollateralAmount", Number(form.getValues("collateralAmount")));
      }
    }
    else {
      form.setValue("outputCollateralAmount", 0);
    }
  }, [form.watch("collateralAmount")]);



  const {
    isPending: abondApproveLoading,
    data: abondApproveData,
    writeContract: abondApproveWrite,
    isSuccess: abondApproved,
  } = useWriteAbondApprove(
    {
      // Handle error and show a custom toast notification
      mutation:{
      onError(error:any) {
        toast.custom(
          (t) => {
            
            return (
              <div>
                <CustomToast
                  key={2}
                  props={{
                    t: toastId.current,
                    toastMainColor: "#B43939",
                    headline: `Uhh Ohh! ${error.details}`,
                    toastClosebuttonHoverColor: "#e66d6d",
                    toastClosebuttonColor: "#C25757",
                    type:"error",
                  }}
                />
              </div>
            );
          },
          { duration: 5000 }
        );

        // setOpen(false);
      },

      // Handle success and show a custom toast notification
      onSuccess: (data) => {
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
                    type:"success",
                  }}
                />
              </div>
            );
          },
          { duration: 5000 }
        );
        //closing sheet so that user can click on the links from the toast
        // setOpen(false);
      },
    }
    }
  );

  const { data: abondTransactionAllowed, isLoading: isAbondTransactionLoading ,isError:abondApproveError,isSuccess:abondApproveSuccess,error:AbondError } = useWaitForTransactionReceipt({

    // look for approval transaction hash
    hash: abondApproveData,
    // Display a custom toast notification

  });

  useEffect(() => {
    if(abondApproveSuccess) {
      redeemEth?.({
        args: [
          accountAddress as `0x${string}`,
          BigInt(Number(form.getValues("collateralAmount")) * 10 ** 18),
        ]
      });
    }
    if(abondApproveError) {
      toast.custom(
        (t) => {
          return (
            <div>
              <CustomToast
                key={2}
                props={{
                  t: toastId.current,
                  toastMainColor: "#B43939",
                  headline: `Uhh Ohh! ${AbondError.name}`,
                  toastClosebuttonHoverColor: "#e66d6d",
                  toastClosebuttonColor: "#C25757",
                  type:"error",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    }
  },[abondTransactionAllowed])


  const {
    writeContract: redeemEth,
    data: redeemEthData,
    reset: resetEth,
    isPending: isRedeemEthLoading,

  } = useWriteBorrowingContractRedeemYields({
    // Handle errors during the CDS deposit process
    mutation:{

    onError: (error:any) => {
      // console.log(error.message);
      console.log("MESSAGE", error.cause);
      // Show a custom toast notification for the error
      toast.custom(
        (t) => (
          <div>
            <CustomToast
              key={2}
              props={{
                t: toastId.current,
                toastMainColor: "#B43939",
                headline: `Uhh Ohh! ${error.details}`,
                toastClosebuttonHoverColor: "#e66d6d",
                toastClosebuttonColor: "#C25757",
                type:"error",
              }}
            />
          </div>
        ),
        { duration: Infinity, id: toastId.current }
      );

      // Dismiss the toast notification after 5 seconds
      setTimeout(() => {
        toast.dismiss(toastId.current);
      }, 5000);
    },
    // Handle the successful completion of the CDS deposit process
    onSuccess: (data) => {
      console.log(data);
      // Show a custom toast notification for the successful transaction
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
                  type:"success",
                }}
              />
            </div>
          );
        },
        // Set the duration of the toast notification to be infinite
        { duration: 5000, id: toastId.current }
      );
    },
  }
  });

  const { data: redeemdataEth, isLoading: isRedeemEthTransactionLoading,isError:redeemEthError,isSuccess:redeemEthSuccess,error:redeemEthErorrdata } = useWaitForTransactionReceipt({
    hash: redeemEthData
  });

  useEffect(()=>{

    if(redeemEthSuccess) {
      toast.custom(
        (t) => {
          return (
            <div>
              <CustomToast
                props={{
                  t: toastId.current,
                  toastMainColor: "#268730",
                  headline: "Transaction Completed",
                  transactionHash: redeemEthData,
                  linkLabel: "View Transaction",
                  toastClosebuttonHoverColor: "#90e398",
                  toastClosebuttonColor: "#57C262",
                  type:"success",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    }
    else if(redeemEthError) {
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
                  headline: `Uhh Ohh! ${redeemEthErorrdata.name}`,
                  toastClosebuttonHoverColor: "#e66d6d",
                  toastClosebuttonColor: "#C25757",
                  type:"success",
                }}
              />
            </div>
          );
        },
        { duration: 5000 }
      );
    }
  },[redeemdataEth])

  async function onSubmit(values: z.infer<typeof formSchema>) {

    if (values.inputCollateral === 'amint') {
      console.log('redeem usdt');
      amintApproveWrite({
        args: [

          (cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`),
          BigInt(values.collateralAmount * 10 ** 6),
        ],
      })

    } else if (values.inputCollateral === 'abond') {
      console.log('redeem eth');
      abondApproveWrite({
        args: [

          (borrowingContractAddress[chainId as keyof typeof borrowingContractAddress] as `0x${string}`),
          BigInt(values.collateralAmount * 10 ** 18),
        ],
      })
    }
  }

  return (
    <div className="justify-center  align-middle ] ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full gap-4 ' action="#">
          <div className='relative flex gap-2 overflow-visible '>
            <FormField
              control={form.control}
              name="collateralAmount"
              render={({ field }) => (
                <FormItem className="relative basis-4/6">
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
                        className="w-full px-2 py-5 rounded-none text-sm disabled:opacity-100 text-gray-900 bg-[#ffffff] dark:bg-[#3A3A3A] dark:border-[#9E9E9E] border-[#020202]  border lock dark:text-white focus:outline-none focus:ring-0 peer"
                        style={{
                          appearance: 'textfield',
                          MozAppearance: 'textfield',
                          WebkitAppearance: 'none',
                          margin: 0
                        }}
                        disabled={form.getValues("inputCollateral")==undefined}
                      ></Input>
                      <label
                        htmlFor="amount_of_usdt"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 bg-[#ffffff] top-2 z-10 origin-[0]  dark:bg-[#3A3A3A]   px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                      >
                        Input Amount
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="dark:text-[#B43939]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inputCollateral"

              render={() => (
                <FormItem className=' basis-2/6 dark:bg-[#020202]'>
                  <Controller
                    control={form.control}
                    name="inputCollateral"
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          form.setValue("collateralAmount", 0);
                          if (value === 'amint') {
                            form.setValue('outputCollateral', 'usdt');
                          } else if (value === 'abond') {
                            form.setValue('outputCollateral', 'eth');
                          }
                          field.onChange(value)

                        }}

                        value={field.value}
                      >
                        {/* <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400 '>{!form.getValues("inputCollateral") ? "" : "Input Type"}</label> */}

                        <FormControl className='bg-[#020202] text-white py-5 rounded-none' >
                          <SelectTrigger >
                            <SelectValue placeholder="Collateral" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-[#020202] rounded-none text-white'>
                          <SelectGroup>
                            <SelectItem value="amint">USDa</SelectItem>
                            <SelectItem value="abond">ABOND</SelectItem>
                          </SelectGroup>
                        </SelectContent>

                      </Select>
                    )}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='absolute right-0 text-xs -bottom-5'>

             {form.getValues("inputCollateral") && <GetBalance token={form.getValues("inputCollateral")==='amint'?"USDa":"ABOND"} />} 
            </div>
          </div>


          <div className='relative bg-[#ffffff] border-[#004795] dark:bg-[#3A3A3A] dark:border-[#9E9E9E] border mt-4   py-2 px-2'>
            <div className='text-sm text-[#004795] dark:text-white '>
              Redeemable Amount
            </div>
            <div>
              {
                form.getValues("inputCollateral") === 'amint' ? (
                  <div className='text-sm text-[#004795] font-medium dark:text-[#FFFF] mt-2 flex justify-between'>
                    <div className='p-1 text-2xl basis-3/5 text-bold'>{form.getValues("collateralAmount")}</div>
                    <div className='w-28 p-2  text-center px-3 mr-1 border border-[#004795] dark:border-[#9E9E9E]'>USDT</div>
                  </div>
                ) : form.getValues("inputCollateral") === 'abond' ? (
                  <div className='text-sm text-[#041A50] mt-2 font-medium dark:text-[#FFFF] flex justify-between'>
                    <div className='flex justify-between mr-1 basis-2/5'>

                      <div className='flex items-center p-1 text-2xl basis-3/5 text-bold'>{outputData ? Number(formatEther(outputData[0])).toFixed(5) : 0}</div>
                      <div className='w-28 p-2  text-center h-fit px-3 mr-1 border border-[#004795] dark:border-[#9E9E9E]'>ETH</div>
                    </div>
                    <div className='text-xl 1/5'>+</div>
                    <div className='flex justify-between basis-2/5 text-bold'>

                      <div className='flex items-center p-1 text-2xl basis-3/5 text-bold'>{outputData ? Number(formatEther(outputData[2])).toFixed(2) : 0}</div>
                      <div className='w-28 p-2  text-center px-3 mr-1 border border-[#004795] dark:border-[#9E9E9E]'>USDa</div>
                    </div>
                  </div>
                ) : <div className='flex items-center pt-1 basis-3/5 text-[#00679F] dark:text-white text-2xl font-semibold'>Output Amount</div>
              }

            </div>

          </div>

          <Note
            note="Note: A withdrawal Fee of 2% will be applied."
          />
          <div className="flex w-full gap-5 ">
            <Button
              type="button"
              onClick={() => openRedeemableAssets(true)}
              variant={"outline"}
              className="py-2 "

            >
              {'Redeemable Assets'} <ArrowTopRightIcon className="ml-2 sm:ml-0 sm:absolute sm:right-5" width={20} height={20}/>
            </Button>
            <Button
              type="submit"
              variant={"primary"}
              className="py-2 basis-1/2"
              disabled={isRedeemUsdt || isRedeemEthLoading || amintApproveLoading || abondApproveLoading || isAbondTransactionLoading || isAmintTransactionLoading || isRedeemUsdtTransactionLoading || isRedeemEthTransactionLoading}
            >
              {isRedeemUsdt || isRedeemEthLoading || amintApproveLoading || abondApproveLoading || isAbondTransactionLoading || isAmintTransactionLoading || isRedeemUsdtTransactionLoading || isRedeemEthTransactionLoading ? <Spinner /> : "Redeem"}
            </Button>
          </div>
        </form>
      </Form>

    </div>

  )
}

export default Redeem;