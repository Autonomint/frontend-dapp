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
import { useCdsRedeemUsdt,useBorrowingContractRedeemYields,useAmintApprove,useAbondApprove,cdsAddress,borrowingContractAddress,useBorrowingContractGetAbondYields, abondAddress, amintAddress} from '@/abiAndHooks';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import Note from '@/components/CustomUI/Note';
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import CustomToast from "@/components/CustomUI/CustomToast";
import { useAccount,useWaitForTransaction,useBalance, useChainId } from 'wagmi';
import Spinner from '@/components/ui/spinner';
import { formatEther } from 'viem';
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
                .min(0.02)
        ),
    outputCollateral: z.string(),
});




export default function Redeem() {


    const {address:accountAddress} = useAccount();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            inputCollateral: undefined,
            collateralAmount: 0,
            outputCollateral: undefined,
            outputCollateralAmount:0
        },
    });
    const chainId = useChainId();
    const { data:abondbalance } = useBalance({
      address: abondAddress ? accountAddress : undefined,
      token: abondAddress
          ? abondAddress[chainId as keyof typeof abondAddress]
          : undefined,
      watch: true,
  });
  const { data:amintbalance } = useBalance({
    address: amintAddress ? accountAddress : undefined,
    token: amintAddress
        ? amintAddress[chainId as keyof typeof amintAddress]
        : undefined,
    watch: true,
});
  const toastId = useRef<string | number>("");

  const {
    isLoading: amintApproveLoading,
    data: amintApproveData,
    write: amintApproveWrite,
    isSuccess: amintApproved,
  } = useAmintApprove(
    {
      // Handle error and show a custom toast notification
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

        // setOpen(false);
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
        //closing sheet so that user can click on the links from the toast
        // setOpen(false);
      },
    }
  );


  const { data: amintTransactionAllowed, isLoading: isAmintTransactionLoading } = useWaitForTransaction({
    // TODO: Add OnError Custom Toast
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

      // setOpen(false);
    },
    // look for approval transaction hash
    hash: amintApproveData?.hash,
    // Display a custom toast notification
    onSuccess() {
      redeemUsdt?.({
        args: [
        BigInt(Number(form.getValues("collateralAmount")) * 10**6),
        BigInt(1000000),
        BigInt(1000000),
        ]
    });

      toast.custom(
        (t) => {
          return (
            <div>
              <CustomToast
                props={{
                  t,
                  toastMainColor: "#268730",
                  headline: "Amint Approved,Plz confirm the transaction to redeem USDT",
                  transactionHash: amintApproveData?.hash,
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
    },
  });

  
  
    const {
        write: redeemUsdt,
        data: redeemUsdtData,
        reset: resetUsdt,
        isLoading: isRedeemUsdt
      } = useCdsRedeemUsdt({
        // Handle errors during the process
        onError: (error) => {
          // console.log(error.message);
          console.log("MESSAGE",error.cause);
          // Show a custom toast notification for the error
          toast.custom(
            (t) => (
              <div>
                <CustomToast
                  key={2}
                  props={{
                    t: toastId.current,
                    toastMainColor: "#B43939",
                    headline: `Uhh Ohh! ${error.cause}`,
                    toastClosebuttonHoverColor: "#e66d6d",
                    toastClosebuttonColor: "#C25757",
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
        // Handle the successful completion of the process
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
                      transactionHash: data?.hash,
                      linkLabel: "View Transaction",
                      toastClosebuttonHoverColor: "#90e398",
                      toastClosebuttonColor: "#57C262",
                    }}
                  />
                </div>
              );
            },
            // Set the duration of the toast notification to be infinite
            { duration: 10000, id: toastId.current }
          );
        },
      });

      const { data: redeemdataUsdt , isLoading: isRedeemUsdtTransactionLoading } = useWaitForTransaction({
        // TODO: Add OnError Custom Toast
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
        // look for approval transaction hash
        hash: redeemUsdtData?.hash,
        // Display a custom toast notification
        onSuccess() {
          toast.custom(
            (t) => {
              return (
                <div>
                  <CustomToast
                    props={{
                      t,
                      toastMainColor: "#268730",
                      headline: "Transaction Completed",
                      transactionHash: redeemUsdtData?.hash,
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
        },
      });
      const {data:outputData,refetch } = useBorrowingContractGetAbondYields({ args: [ accountAddress as `0x${string}` ,BigInt(Number(form.getValues("collateralAmount")) * 10**18)] }); 
      
      useEffect(() => {
        if(form.getValues("inputCollateral") === 'abond' && form.getValues("collateralAmount") > 0){
          console.log(abondbalance?.formatted)

          if(form.getValues("collateralAmount")> Number(abondbalance?.formatted.slice(0, 8))){
            form.setError("collateralAmount",{message:"Insufficient Balance"});
          }
          else{

            form.clearErrors("collateralAmount");
            refetch();
            if(outputData) form.setValue("outputCollateralAmount",Number(formatEther(outputData[0])));
          }
        }
        else if( form.getValues("inputCollateral") === 'amint' && form.getValues("collateralAmount") > 0){
          console.log(amintbalance?.formatted)
          if(form.getValues("collateralAmount")> Number(amintbalance?.formatted.slice(0, 9))){
            form.setError("collateralAmount",{message:"Insufficient Balance"});
          }
          else{
            form.clearErrors("collateralAmount");
            form.setValue("outputCollateralAmount",Number(form.getValues("collateralAmount")));
          }
        }
        else{
          form.setValue("outputCollateralAmount",0);
        }
      }, [form.watch("collateralAmount")]);



      const {
        isLoading: abondApproveLoading,
        data: abondApproveData,
        write: abondApproveWrite,
        isSuccess: abondApproved,
      } = useAbondApprove(
        {
          // Handle error and show a custom toast notification
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
    
            // setOpen(false);
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
            //closing sheet so that user can click on the links from the toast
            // setOpen(false);
          },
        }
      );
    
      const { data: abondTransactionAllowed, isLoading: isAbondTransactionLoading } = useWaitForTransaction({
        // TODO: Add OnError Custom Toast
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
    
          // setOpen(false);
        },
        // look for approval transaction hash
        hash: abondApproveData?.hash,
        // Display a custom toast notification
        onSuccess() {
          redeemEth?.({
            args: [
            accountAddress as `0x${string}`,
            BigInt(Number(form.getValues("collateralAmount")) * 10**18),
            ]
        });
    
          toast.custom(
            (t) => {
              return (
                <div>
                  <CustomToast
                    props={{
                      t,
                      toastMainColor: "#268730",
                      headline: "Abond Approved,Plz confirm the transaction to redeem ETH",
                      transactionHash: amintApproveData?.hash,
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
        },
      });


    
      const {
        write: redeemEth,
        data: redeemEthData,
        reset: resetEth,
        isLoading: isRedeemEthLoading,

      } = useBorrowingContractRedeemYields({
        // Handle errors during the CDS deposit process
        onError: (error) => {
          // console.log(error.message);
          console.log("MESSAGE",error.cause);
          // Show a custom toast notification for the error
          toast.custom(
            (t) => (
              <div>
                <CustomToast
                  key={2}
                  props={{
                    t: toastId.current,
                    toastMainColor: "#B43939",
                    headline: `Uhh Ohh! ${error.cause}`,
                    toastClosebuttonHoverColor: "#e66d6d",
                    toastClosebuttonColor: "#C25757",
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
                      transactionHash: data?.hash,
                      linkLabel: "View Transaction",
                      toastClosebuttonHoverColor: "#90e398",
                      toastClosebuttonColor: "#57C262",
                    }}
                  />
                </div>
              );
            },
            // Set the duration of the toast notification to be infinite
            { duration: 10000, id: toastId.current }
          );
        },
      });


      const { data: redeemdataEth, isLoading: isRedeemEthTransactionLoading } = useWaitForTransaction({
        // TODO: Add OnError Custom Toast
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
        // look for approval transaction hash
        hash: redeemEthData?.hash,
        // Display a custom toast notification
        onSuccess() {
          toast.custom(
            (t) => {
              return (
                <div>
                  <CustomToast
                    props={{
                      t,
                      toastMainColor: "#268730",
                      headline: "Transaction Completed",
                      transactionHash: redeemEthData?.hash,
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
        },
      });
    

    async function onSubmit(values: z.infer<typeof formSchema>) {

        if (values.inputCollateral === 'amint') {
            console.log('redeem usdt');
            amintApproveWrite({
              args: [

                (cdsAddress[11155111] as `0x${string}`),
                BigInt(values.collateralAmount * 10**6),
              ],
            })

        } else if (values.inputCollateral === 'abond') {
            console.log('redeem eth');
            abondApproveWrite({
              args: [

                (borrowingContractAddress[11155111] as `0x${string}`),
                BigInt(values.collateralAmount * 10**18),
              ],
            })
        }
    }

    return (
        <div className="justify-center px-5 py-5 align-middle ">

            <div className='text-3xl text-[#041A50] font-medium dark:text-[#90AFFF] mb-4'>
                Redeem
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full gap-4 ' action="#">
                    <FormField
                        control={form.control}
                        name="inputCollateral"
                        
                        render={() => (
                            <FormItem className='relative'>
                                <Controller
                                    control={form.control}
                                    name="inputCollateral"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => {
                                                if (value === 'amint') {
                                                    form.setValue('outputCollateral', 'usdt');
                                                } else if (value === 'abond') {
                                                    form.setValue('outputCollateral', 'eth');
                                                }
                                                field.onChange(value)

                                            }}
                                            value={field.value}
                                            
                                        >
                                          <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400 '>{!form.getValues("inputCollateral")?"":"Input Type"}</label>
                                          
                                            <FormControl >
                                                <SelectTrigger >
                                                    <SelectValue  placeholder="Choose a Collateral" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Collateral</SelectLabel>
                                                    <SelectItem value="amint">AMINT</SelectItem>
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

                    <FormField
                        control={form.control}
                        name="collateralAmount"
                        render={({ field }) => (
                            <FormItem className="relative">
<label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400 '>{!form.getValues("collateralAmount")?"":"Input Amount"}</label>

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
                                <FormMessage className="dark:text-[#B43939]" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="outputCollateral"
                        render={() => (
                            <FormItem className="relative">
                                <Controller
                                    control={form.control}
                                    name="outputCollateral"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => {
                                              console.log("change value",value )
                                                if (value === 'usdt') {
                                                    form.setValue('inputCollateral', 'amint');
                                                } else if (value === 'eth') {
                                                    form.setValue('inputCollateral', 'abond');
                                                }
                                                field.onChange(value)
                                            }}
                                            value={field.value}
                                        >
                                          <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400'>{!form.getValues("outputCollateral")?"":"Output Type"}</label>

                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a Collateral" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Collateral</SelectLabel>
                                                    <SelectItem value="usdt">USDT</SelectItem>
                                                    <SelectItem value="eth">ETH</SelectItem>
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
                            <FormItem className="relative">
                                          <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400'>{!form.getValues("outputCollateralAmount")?"":"Output Amount"}</label>

                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0.02}
                                        step={0.01}
                                        placeholder="Output Amount"
                                        {...field}
                                        value={Boolean(field.value) ? field.value : ""}
                                        disabled = {true}

                                    ></Input>
                                </FormControl>
                                <FormMessage className="dark:text-[#B43939]" />
                            </FormItem>
                        )}
                    />


                    <Note
                        note="Note: A withdrawal Fee of 2% will be applied."
                    />
                    <Button
                        type="submit"
                        variant={"primary"}
                        className="text-white"
                        disabled={isRedeemUsdt || isRedeemEthLoading || amintApproveLoading  ||abondApproveLoading||isAbondTransactionLoading||  isAmintTransactionLoading ||  isRedeemUsdtTransactionLoading || isRedeemEthTransactionLoading}
                    >
                        { isRedeemUsdt || isRedeemEthLoading ||amintApproveLoading ||abondApproveLoading||isAbondTransactionLoading|| isAmintTransactionLoading ||  isRedeemUsdtTransactionLoading ||isRedeemEthTransactionLoading ? <Spinner/> : "Redeem" }
                    </Button>
                </form>
            </Form>

        </div>

    )
}
