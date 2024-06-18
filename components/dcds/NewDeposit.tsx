import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import addIcon from "@/app/assets/add_circle.svg";
import Note from "@/components/CustomUI/Note";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import {
  InfoCircledIcon,
  PlusIcon,
  ArrowRightIcon,
  ArrowTopRightIcon
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import payments from "@/app/assets/payments.svg";
import trending from "@/app/assets/trending_up.svg";
import calendar from "@/app/assets/date_range.svg";
import {
  cdsAbi,
  cdsAddress,
  useWriteUsDaApprove,
  useReadBorrowingContractGetUsdValue,
  useWriteCdsDeposit,
  useReadCdsGetCdsDepositDetails,
  useWriteTestusdtAbiApprove,
  useReadCdsUsdtAmountDepositedTillNow,
  useReadCdsUsdtLimit,
  useReadCdsUsdaLimit,
  useReadCdsQuote
} from "@/abiAndHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount, useBalance, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { toast } from 'sonner';
import CustomToast from "@/components/CustomUI/CustomToast";
import { parseEther, parseUnits } from "viem";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import decodeEventLogsFromAbi from "@/app/utils/decodeEventLogsFromAbi";
import Spinner from "@/components/ui/spinner";
import arrowout from "@/app/assets/arrow_outward.svg";
import { Options } from '@layerzerolabs/lz-v2-utilities'
import GetBalance from "../ConnectWallet/GetBalance";

type Checked = DropdownMenuCheckboxItemProps["checked"];
interface TokensState {
  USDT: Checked;
  COMP: Checked;
  USDC: Checked;
}




const InitialformSchema = z.object({
  AmintDepositAmount: z
    .number()
    .gte(0, { message: "Value must be greater than 0" })
    .or(z.string())
    .pipe(z.coerce.number().gte(0, { message: "Value must be greater than 0" }))
    .optional(),
  USDTDepositAmount: z
    .number()
    .gte(0, { message: "Value must be greater than 0" })
    .or(z.string())
    .pipe(z.coerce.number().gte(0, { message: "Value must be greater than 0" }))
    .optional(),
  COMPDepositAmount: z
    .number()
    .gte(0, { message: "Value must be greater than 0" })
    .or(z.string())
    .pipe(z.coerce.number().gte(0, { message: "Value must be greater than 0" }))
    .optional(),
  USDCDepositAmount: z
    .number()
    .gte(0, { message: "Value must be greater than 0" })
    .or(z.string())
    .pipe(z.coerce.number().gte(0, { message: "Value must be greater than 0" }))
    .optional(),
  lockInPeriod: z.string(),
  liquidationGains: z.boolean(),
});






const NewDeposit = ({

  handleRefetch,
  openDeposits
}: {
  handleRefetch: Function;
  openDeposits: Function;
}) => {
  // Define the initial state for the open variable for sheet opening and closing
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(0);
  const maxValue = 100; // Adjust based on your value range
  const [openmarket, setOpenmarket] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value)); // Convert input value to a number
  };
  // Define the initial state for the options variable
  const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString() as `0x${string}`;


  // Define the initial state for the tokensEnabled variable
  const [tokensEnabled, setTokensEnabled] = useState<TokensState>({
    USDT: true, // USDT token is initially enabled
    COMP: false, // COMP token is initially disabled
    USDC: false, // USDC token is initially disabled
  });
  // state for depositVal variable which we will get from events while depositing
  const depositVal = useRef<bigint>(0n);
  const { address } = useAccount();
  const chainId = useChainId();
  const Eid = chainId === 11155111 ? 40245 : 40161;

  // managing toastId for custom toast
  const toastId = useRef<number | string>("");
  // Define the initial state for the form schema
  const formSchema = useRef(InitialformSchema);
  const form = useForm<z.infer<typeof formSchema.current>>({
    resolver: zodResolver(formSchema.current),
    defaultValues: {
      AmintDepositAmount: undefined,
      USDTDepositAmount: undefined,
      COMPDepositAmount: undefined,
      USDCDepositAmount: undefined,
      lockInPeriod: undefined,
      liquidationGains: false,
    },
  });





  const queryClient = useQueryClient();
  // watch the form values
  const [amintAmnt, lockIn, liquidationGains, usdtAmnt] = form.watch(
    [
      "AmintDepositAmount",
      "lockInPeriod",
      "liquidationGains",
      "USDTDepositAmount",
    ],
    {
      AmintDepositAmount: undefined,
      lockInPeriod: undefined,
      liquidationGains: false,
      USDTDepositAmount: undefined,
    }
  );

  // get eth price from Borrowing contract and store it in ethPrice and setting default value to 0n
  const { data: ethPrice = 0n } = useReadBorrowingContractGetUsdValue({
    query: {
      staleTime: 10 * 1000,
    }
  });


  // get usdt limit from CDS contract and store it in usdtLimit and setting default value to 0n
  const { data: usdtLimit = 0n } = useReadCdsUsdtLimit();
  

  // get usdt amount deposited till now from CDS contract and store it in usdtAmountDepositedTillNow and setting default value to 0n
  const { data: usdtAmountDepositedTillNow = 0n } = useReadCdsUsdtAmountDepositedTillNow();
  console.log(usdtAmountDepositedTillNow)

  // get ratio from CDS contract and store it in ratio
  const { data: ratio } = useReadCdsUsdaLimit({ query: { staleTime: 60 * 1000 } });

  const { data: nativeFee1, error } = useReadCdsQuote({
    query: { enabled: !!address }, args: [Eid, 1, 123n, 123n, 123n,
      { liquidationAmount: 0n, profits: 0n, ethAmount: 0n, availableLiquidationAmount: 0n }, 0n, options, false]
  });

  // usdt approval
  const {
    isPending: usdtApproveLoading,
    data: usdtApproveData,
    writeContract: usdtWrite,
    isSuccess: usdtApproved,
  } = useWriteTestusdtAbiApprove(
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
            { duration: 5000 }
          );
        },
      }
    }
  );
// get the status of the usdt approval transaction
  const { isLoading: UsdtApprovalLoading, isSuccess: UsdtApprovalSuccess, isError: UsdtApprovalError, data: UsdtApprovalReceipt } = useWaitForTransactionReceipt({
    hash: usdtApproveData,
  });
// useEffect to check the status of the usdt approval transaction
  useEffect(() => {
    console.log(usdtApproveData, UsdtApprovalReceipt?.logs);
    if (UsdtApprovalSuccess) {
      const liqAmnt =
        ((Number(amintAmnt ? amintAmnt : 0) + Number(usdtAmnt ? usdtAmnt : 0)) * 80) / 100;
      if (nativeFee1) {
        ConfirmDeposit?.({
          args: [
            BigInt(usdtAmnt ? parseUnits(usdtAmnt.toString(), 6) : 0),
            BigInt(amintAmnt ? parseUnits(amintAmnt.toString(), 6) : 0),
            liquidationGains,
            liquidationGains ? parseUnits(liqAmnt.toString(), 6) : 0n,
            BigInt(Number(lockIn)*86400000),
          ],
          value: nativeFee1.nativeFee,
        });
      }
    }

  }, [UsdtApprovalReceipt])


  console.log("usdtApproveData", usdtApproveData, usdtApproved);


  // get total index from CDS contract and store it in totalCDSIndex
  const { data: totalCDSIndex } = useQuery({
    queryKey: ["totalCDSIndex", open],
    queryFn: () => getCDSTotalIndex(address ? address : undefined),
    enabled: !!address,
    staleTime: 10 * 1000,
  });


  /**
   * Retrieves the total index from the CDS API for a given address.
   *
   * @param {`0x${string}` | undefined} address - The address to retrieve the total index for.
   * @return {Promise} A promise that resolves to the JSON response from the API.
   */


  async function getCDSTotalIndex(address: `0x${string}` | undefined): Promise<any> {
    return fetch(`${BACKEND_API_URL}/cds/index/${chainId}/${address}`).then(
      (response) => response.json()
    );
  }




  // Use the useCdsDeposit hook to handle the CDS deposit functionality

  const {
    writeContract: ConfirmDeposit,
    data: CdsDepositData,
    reset,
    isPending: isCdsDepositLoading
  } = useWriteCdsDeposit({
    // Handle errors during the CDS deposit process
    mutation: {

      onError: (error) => {
        // console.log(error.message);
        console.log("MESSAGE", error.cause );
        console.log("MESSAGE", error.name );
        console.log("MESSAGE", error.message );
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
          { duration: 5000 }
        );

        // Dismiss the toast notification after 5 seconds

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
                    spinner: false,
                  }}
                />
              </div>
            );
          },
          // Set the duration of the toast notification to be infinite
          { duration: 5000 }
        );
      },
    }
  }
  );



// get the confirmed txn receipt
  const { isLoading, isSuccess: cdsDepositSuccess, isError: cdsDepositError, data: DepositdataReceipt } = useWaitForTransactionReceipt({
    hash: CdsDepositData,
    confirmations:2
  });

// useEffect to check the status of the cds deposit transaction
  useEffect(() => {
    if (cdsDepositError) {
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
                  headline: `Uhh Ohh! `,
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
    if (cdsDepositSuccess) {
      handleRefetch()
      form.reset();
      toast.custom(
        (t) => {
          return (
            <div>
              <CustomToast
                props={{
                  t: toastId.current,
                  toastMainColor: "#268730",
                  headline: "Transaction Submitted",
                  transactionHash: CdsDepositData,
                  linkLabel: "View Transaction",
                  toastClosebuttonHoverColor: "#90e398",
                  toastClosebuttonColor: "#57C262",
                  spinner: false,
                }}
              />
            </div>
          );
        },
        // Set the duration of the toast notification to be infinite
        { duration: 5000, id: toastId.current }
      );
 
    }

  }, [DepositdataReceipt])





  // Destructure the necessary values from the hook
  const {
    writeContract: amintApprove,  // Function to initiate the approve request
    data: amintApproveData,  // Data returned from the approve request
    reset: amintReset,  // Function to reset the approve request state
    isSuccess: amintApproved,  // Flag to indicate if the approve request is successful
    isPending: amintApproveLoading,  // Flag to indicate if the approve request is pending
  } = useWriteUsDaApprove({
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
          { duration: 5000 }
        );

      },
    }
  });

  // get the confirmed txn receipt
  const { isLoading: AmintApprovalLoading, isSuccess: AmintApprovalSuccess, isError: AmintApprovalError, data: AmintApprovalReceipt } = useWaitForTransactionReceipt({
    hash: amintApproveData,
  });

// useEffect to check the status of the amint approval transaction
  useEffect(() => {
    if(AmintApprovalSuccess){
      if (form.getValues("USDTDepositAmount") && (usdtAmnt ?? 0) > 0) {
        usdtWrite({
          args: [
            (cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`),
            BigInt(usdtAmnt ? parseUnits(usdtAmnt.toString(), 6) : 0),
          ],
        })
      }
      else {
        const liqAmnt =
          ((Number(amintAmnt ? amintAmnt : 0) + Number(usdtAmnt ? usdtAmnt : 0)) * 80) / 100;
        if (nativeFee1) {
          ConfirmDeposit?.({
            args: [
              BigInt(usdtAmnt ? parseUnits(usdtAmnt.toString(), 6) : 0),
              BigInt(amintAmnt ? parseUnits(amintAmnt.toString(), 6) : 0),
              liquidationGains,
              liquidationGains ? parseUnits(liqAmnt.toString(), 6) : 0n,
              BigInt(Number(lockIn)*86400000),
            ],
            value: nativeFee1.nativeFee,
          });
        }
      }

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
                  transactionHash: amintApproveData,
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

  }, [AmintApprovalReceipt])



  /**
   * Handles the form submission.
   *
   * @param {typeof formSchema.current} values - The values submitted in the form.
   */
  function onSubmit(values: z.infer<typeof formSchema.current>) {
    if (usdtAmountDepositedTillNow >= usdtLimit) {
      if (amintAmnt == undefined || amintAmnt == 0) {
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
                    headline: `Uhh Ohh! Amint Amount must be greater than 500`,
                    toastClosebuttonHoverColor: "#e66d6d",
                    toastClosebuttonColor: "#C25757",
                  }}
                />
              </div>
            );
          },
          { duration: 5000 }
        );
        return;
      }
      else {
        amintApprove({
          args: [
            (cdsAddress[chainId as keyof typeof cdsAddress] as `0x${string}`),
            BigInt(amintAmnt ? parseUnits(amintAmnt.toString(), 6) : 0),
          ],
        })
      }
    }
    else {
      usdtWrite({
        args: [
          (cdsAddress[chainId as keyof typeof cdsAddress ] as `0x${string}`),
          BigInt(usdtAmnt ? parseUnits(usdtAmnt.toString(), 6) : 0),
        ],
      })
    }

  }


  // useEffect to check if the cdsDepositSuccess is true
  useEffect(() => {
    // Check if cdsDepositSuccess is true
    if (cdsDepositSuccess) {
      amintReset?.();
    }
  }, [cdsDepositSuccess]);


  // useEffect to check if the amint amount and usdt amount is greater than 0 and the usdtAmountDepositedTillNow is greater than usdtLimit
  useEffect(() => {
    let amint = form.watch("AmintDepositAmount") ?? 0;
    let usdt = form.watch("USDTDepositAmount") ?? 0;
    if (usdtAmountDepositedTillNow >= usdtLimit) {
      if (form.getValues("AmintDepositAmount") != undefined && amint < 500) {
        form.setError("AmintDepositAmount", {
          type: "manual",
          message: "Amint Amount must be greater than 500",
        });
      }
      else {
        form.clearErrors("AmintDepositAmount");
      }
      if (usdt > (((100 / 80) * amint) - amint)) {
        form.setError("USDTDepositAmount", {
          type: "manual",
          message: "USDT Amount must be less than or equal to 80% of Amint Amount",
        });
      }
      else {
        form.clearErrors("USDTDepositAmount");
      }
    }
  }, [form.watch("USDTDepositAmount"), form.watch("AmintDepositAmount")])



  return (
    <div className="flex items-center justify-between ">
      <div className="flex w-full gap-[10px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full" action="#">
            {/* <div className="flex justify-between w-full mt-4 ">
              <div onClick={()=>setOpenmarket(!openmarket)} className="px-3 py-1 text-[13px] font-semibold text-white bg-yellow-600 border rounded-md cursor-pointer">
                Buy USDa &gt;
              </div>
              <div className="flex items-center justify-end gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" viewBox="0 0 16 16" fill="none" height={15} width={15}><path d="M.003 4.54c-.008-.37.092-1.233 1.216-1.533L12.507.747c.828 0 1.5.673 1.5 1.5V4.26l.5-.001a1.502 1.502 0 0 1 1.495 1.5v7.996c0 .827-.672 1.5-1.5 1.5H1.495c-.827 0-1.5-.673-1.5-1.5L.003 4.54Zm13.004-2.293a.5.5 0 0 0-.457-.498L1.52 3.982c-.004.002.082.28.482.275h11.006v-2.01ZM.993 13.754a.5.5 0 0 0 .5.5h13.008a.5.5 0 0 0 .5-.5V5.756a.5.5 0 0 0-.5-.5H2c-.491 0-1.006-.167-1.006-.498v8.996ZM13 8.758a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" fill="currentColor"></path></svg>

                <a type="button" onClick={onWatchAssetUsdtClick} className="m-0 text-[12px] underline cursor-pointer ">Add TUSDT</a>

                <a href={`https://sepolia.etherscan.io/address/${DEV_PROXY_TESTUSDT_ADDRESS}`} className="m-0 text-[12px] underline " target="_blank">
                  Mint TUSDT
                </a>
              </div>
            </div> */}

            <div className="flex w-full flex-col min-[1440px]:pt-[10px] 2dppx:pt-[15px] pt-[10px] min-[1440px]:gap-[20px] 2dppx:gap-[10px] min-[1280px]:gap-[16px] gap-[10px]">
              <div className="flex flex-col md:flex-row gap-[10px] items-center w-full justify-between ">
                {
                   usdtLimit <= usdtAmountDepositedTillNow ? (
                    <>
                      <div className="flex w-full ">
                        <FormField
                          control={form.control}
                          name="AmintDepositAmount"
                          render={({ field }) => (
                            <FormItem className="w-full" >
                              <FormControl>
                                <div className="relative ">
                                  <Input
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    type="text"
                                    className="w-full px-2 py-5 text-sm rounded-none text-gray-900 bg-[#ffffff] dark:bg-[#3A3A3A] dark:border-[#9E9E9E] border-[#020202]  border lock dark:text-white focus:outline-none focus:ring-0 peer"
                                    placeholder=""
                                    {...field}
                                    value={field.value ?? ""}
                                    min={500}
                                  ></Input>

                                  <label
                                    htmlFor="amount_of_amint"
                                    className="absolute text-sm text-gray-500 dark:text-[#FFFFFF] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#3A3A3A]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                                  >
                                    Deposit AMINT
                                  </label>

                                </div>

                              </FormControl>
                              <span className=" block text-[10px] text-right mr-1"><GetBalance token="USDa"/></span>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <PlusIcon className={` -mt-5`} width={35} height={50} />
                    </>
                  ):("")
                }

                {/* // USDT Deposit */}
                <div className="flex flex-col  w-full  gap-[10px]">
                  <FormField
                    control={form.control}
                    name="USDTDepositAmount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="relative">
                            <div className="relative">
                              <Input
                                inputMode="numeric"
                                pattern="[0-9]*"
                                type="text"
                                className="w-full px-2 py-5 text-sm rounded-none text-gray-900 bg-[#ffffff] dark:bg-[#3A3A3A] dark:border-[#9E9E9E] border-[#020202]   border lock dark:text-white focus:outline-none focus:ring-0 peer"
                                disabled={!tokensEnabled.USDT}
                                placeholder=""
                                {...field}
                                // {...form.register("USDTDepositAmount", {
                                //   required:
                                //     usdtAmountDepositedTillNow < usdtLimit
                                //       ? "USDT Amount is required"
                                //       : false,
                                // })}
                                value={field.value ?? ""}
                              ></Input>
                              <label
                                htmlFor="amount_of_usdt"
                                className="absolute text-sm text-gray-500 dark:text-[#FFFFFF] duration-300 transform -translate-y-4 scale-75 bg-[#ffffff]  top-2 z-10 origin-[0] dark:bg-[#3A3A3A]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                              >
                                Deposit USDT
                              </label>
                            </div>

                            <div className="absolute top-0 right-0 flex items-center justify-between h-full">

                              {usdtAmountDepositedTillNow >= usdtLimit && (
                                <div
                                  className="mr-2 text-xs cursor-pointer"
                                  onClick={() => {
                                    form.setValue("USDTDepositAmount", (100 / 80 * (form.getValues("AmintDepositAmount") ?? 0) - (form.getValues("AmintDepositAmount") ?? 0)));
                                  }}
                                >
                                  Max
                                </div>
                              )}


                            </div>
                          </div>
                        </FormControl>
                        <span className=" block text-[10px] text-right mr-1"><GetBalance token="TUSDT" /></span>
                        <FormMessage />

                      </FormItem>
                    )}
                  />
                  {tokensEnabled.COMP && (
                    <FormField
                      control={form.control}
                      name="COMPDepositAmount"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="relative">
                              <div className="realtive">
                                <Input
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  type="text"
                                  className="lock px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-0 peer"
                                  placeholder=""
                                  {...field}
                                  value={field.value ?? ""}
                                ></Input>
                                <label
                                  htmlFor="amount_of_comp"
                                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                                >
                                  Deposit COMP
                                </label>
                              </div>
                              <div className="absolute top-0 right-0 flex items-center h-full">
                                <Button
                                  variant={"outline"}
                                  className="z-20 text-xs rounded-r-md"
                                >
                                  Approve
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {tokensEnabled.USDC && (
                    <FormField
                      control={form.control}
                      name="USDCDepositAmount"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="relative">
                              <div className="relative">
                                <Input
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  type="text"
                                  className="lock px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-0 peer"
                                  placeholder=""
                                  {...field}
                                  value={field.value ?? ""}
                                ></Input>
                                <label
                                  htmlFor="amount_usdc"
                                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                                >
                                  Deposit USDC
                                </label>
                              </div>
                              <div className="absolute top-0 right-0 flex items-center h-full">
                                <Button
                                  variant={"outline"}
                                  className="z-20 text-xs rounded-r-md"
                                >
                                  Approve
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                </div>
              </div>
              <div className="flex w-full">
                <div className="flex flex-col w-full gap-4 ">

                  <div className="flex gap-[10px] items-center">
                    <div className="flex items-center ml-[4px]">
                      <InfoCircledIcon width={18} height={18} />
                    </div>
                    <p className="min-[1440px]:text-base 2dppx:text-xs text-sm font-normal text-textGrey  dark:text-[#FFFFFF] text-center leading-none">
                      Minimum {usdtAmountDepositedTillNow < usdtLimit ? "USDT" : "AMINT"} Amount is{" "}
                      <span className="font-medium text-textHighlight dark:text-[#ffff]">
                        500 {usdtAmountDepositedTillNow < usdtLimit ? "USDT" : "AMINT"}
                      </span>
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="lockInPeriod"

                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl
                            className="bg-white py-3 h-fit border-[#020202] rounded-none dark:bg-[#3A3A3A] dark:border-[#9E9E9E]  dark:text-white"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a Lock-In Period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className=" py-2 bg-white  dark:bg-[#3A3A3A] dark:border-[#9E9E9E] rounded-none">
                            <SelectGroup className="dark:bg-[#3A3A3A] dark:border-[#9E9E9E] dark:text-white">
                              <SelectLabel>Lock-In Period</SelectLabel>
                              <SelectItem value="30">30 Days</SelectItem>
                              <SelectItem value="60">
                                60 Days (~2 Months)
                              </SelectItem>
                              <SelectItem value="120">
                                120 Days (~4 Months)
                              </SelectItem>
                              <SelectItem value="180">
                                180 Days (~6 Months)
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="liquidationGains"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md my-2 min-[1440px]:p-4 2dppx:p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="dark:bg-[#3A3A3A] dark:border-[#9E9E9E] rounded-none dark:text-white"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-light text-textGrey dark:text-white">
                            Opt in for liquidation gains
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Note note="Note: Your amount will be used to offer protection to borrowers & protocol in return for fixed yields" />
                </div>


              </div>

              {(Boolean(amintAmnt) || Boolean(usdtAmnt)) && Boolean(lockIn) ? (
                <div className="min-[144px]:px-[15px] px-[10px] flex flex-col border border-lineGrey ">
                  <div className="min-[144px]:py-[15px] py-[10px] flex items-center justify-between border-b border-lineGrey">
                    <div className="flex gap-[10px] items-center">
                      <Image
                        src={payments}
                        alt="payment"
                        width={24}
                        height={24}
                      />
                      <p className="min-[1440px]:text-base text-sm text-textHighlight 2dppx:text-xs dark:text-[#EEEEEE]">
                        {amintAmnt == undefined ? 0 : amintAmnt} AMINT + {usdtAmnt == undefined ? 0 : usdtAmnt} USDT
                      </p>
                    </div>
                    <div className="flex gap-[10px]">
                      <Image
                        src={calendar}
                        alt="date range"
                        width={24}
                        height={24}
                      ></Image>
                      <p>
                        {lockIn === "30" ? (
                          <p className="min-[1440px]:text-base text-sm text-textHighlight dark:text-[#EEEEEE]">
                            30 Days (~1 Month)
                          </p>
                        ) : lockIn === "60" ? (
                          <p className="min-[1440px]:text-base 2dppx:text-xs text-sm text-textHighlight dark:text-[#EEEEEE] ">
                            60 Days (~2 Months)
                          </p>
                        ) : lockIn === "120" ? (
                          <p className="min-[1440px]:text-base 2dppx:text-xs text-sm text-textHighlight dark:text-[#EEEEEE]">
                            120 Days (~4 Months)
                          </p>
                        ) : lockIn === "180" ? (
                          <p className="min-[1440px]:text-base 2dppx:text-xs text-sm text-textHighlight dark:text-[#EEEEEE]">
                            180 Days (~6 Months)
                          </p>
                        ) : (
                          <></>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="py-[15px] flex items-center justify-between">
                    <div className="flex gap-[10px] items-center">
                      <Image
                        src={trending}
                        alt="apr"
                        width={24}
                        height={24}
                      />
                      <p className="min-[1440px]:text-base text-sm text-[#242424] 2dppx:text-sm dark:text-[#EEEEEE]">
                        Expected APR can range from{" "}
                        <span className="text-textHighlight dark:text-white"> ~5%</span> to{" "}
                        <span className="text-textHighlight dark:text-white">~200%</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="flex w-full gap-5 py-1 border-black ">
                <Button
                  type="button"
                  onClick={() => openDeposits(true)}
                  variant={"outline"}
                  className="py-2"
                >
                  {'View Positions'} <ArrowTopRightIcon className="ml-2 sm:ml-0 sm:absolute sm:right-5" width={20} height={20}/>
                </Button>


                <Button
                  type="submit"
                  variant={"primary"}
                  className="py-2 basis-1/2"
                  //   disabled if the amount deposited is less than the limit and the user has not approved usdt
                  disabled={
                     isCdsDepositLoading || AmintApprovalLoading || usdtApproveLoading || UsdtApprovalLoading 
                  }
                >
                  {usdtApproveLoading || UsdtApprovalLoading || amintApproveLoading || isCdsDepositLoading || AmintApprovalLoading ? <Spinner /> : 'Confirm Deposit'}
                </Button>
              </div>
            </div>
          </form>
        </Form>


      </div>
    </div>
  );
};

export default NewDeposit;

