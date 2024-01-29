import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CaretDownIcon,
  Cross2Icon,
  InfoCircledIcon,
  PlusIcon,
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import payments from "@/app/assets/payments.svg";
import trending from "@/app/assets/trending_up.svg";
import calendar from "@/app/assets/date_range.svg";
import {
  cdsABI,
  cdsAddress,
  useAmintApprove,
  useBorrowingContractGetUsdValue,
  useCdsAmintLimit,
  useCdsDeposit,
  useCdsUsdtAmountDepositedTillNow,
  useCdsUsdtLimit,
  usePrepareCdsDeposit,
  useUsdtContractApprove,
} from "@/abiAndHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount, useChainId, useWaitForTransaction } from "wagmi";
import { toast } from "sonner";
import CustomToast from "@/components/CustomUI/CustomToast";
import { parseEther, parseUnits } from "viem";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import { USDT_MATIC, USDT_SEPOLIA } from "@/constants/Addresses";
import decodeEventLogsFromAbi from "../utils/decodeEventLogsFromAbi";





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






const NewDeposit = () => {
  // Define the initial state for the open variable for sheet opening and closing
  const [open, setOpen] = useState(false);
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
  const { data: ethPrice = 0n } = useBorrowingContractGetUsdValue({
    staleTime: 10 * 1000,
  });


  // get usdt limit from CDS contract and store it in usdtLimit and setting default value to 0n
  const { data: usdtLimit = 0n } = useCdsUsdtLimit({ watch: true });


  // get usdt amount deposited till now from CDS contract and store it in usdtAmountDepositedTillNow and setting default value to 0n
  const { data: usdtAmountDepositedTillNow = 0n } =
    useCdsUsdtAmountDepositedTillNow({ watch: true });

    // get ratio from CDS contract and store it in ratio
    const { data: ratio } = useCdsAmintLimit({ staleTime: 60 * 1000 });
    

  // usdt approval
  const {
    data: usdtApproveData,
    write: usdtWrite,
    isSuccess: usdtApproved,
  } = useUsdtContractApprove();
console.log("usdtApproveData",usdtApproveData,usdtApproved);


  // get total index from CDS contract and store it in totalCDSIndex
  const { data: totalCDSIndex } = useQuery({
    queryKey: ["totalCDSIndex"],
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


  const { mutate } = useMutation({
    mutationFn: storeToCDSBackend,
    onError(error) {
      // Log any errors that occur during the mutation
      console.log(error);
    },
    onSettled() {
      // Invalidate queries to update related data after the mutation is completed
      queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
      queryClient.invalidateQueries({ queryKey: ["dCDSdeposits"] });

      // Reset form fields and state after the mutation is completed
      reset?.();
      amintReset?.();
      form.reset();
    },
  });


  /**
 * Stores the data to the CDS backend.
 *
 * @param address - The address to store.
 */
  async function storeToCDSBackend(address: `0x${string}` | undefined) {
    // Calculate the liquidation amount based on amintAmnt and usdtAmnt for now i am just adding usdt and amint considering both as 18 decimals but as usdt is 6 decimals you will have to manage it yourself or ask abhishek sir
    const liqAmnt =
      (((amintAmnt ? amintAmnt : 0) + (usdtAmnt ? usdtAmnt : 0)) * 80) / 100;


  
    // Determine the collateral type based on amintAmnt and usdtAmnt
    const colType =
      amintAmnt !== 0 && usdtAmnt !== 0
        ? "AMINT&USDT"
        : amintAmnt !== 0
          ? "AMINT"
          : usdtAmnt !== 0
            ? "USDT"
            : "NONE";

    // Create the body value for the API request
    let bodyValue = JSON.stringify({
      address: address,
      index: totalCDSIndex ? totalCDSIndex + 1 : 1,
      chainId: chainId,
      depositedAmint: `${amintAmnt}`,
      depositedUsdt: `${usdtAmnt}`,
      collateralType: colType,
      depositedTime: `${Date.now()}`,
      ethPriceAtDeposit: Number(ethPrice ? ethPrice : 0) / 100,
      aprAtDeposit: 5,
      lockingPeriod: Number(lockIn),
      optedForLiquidation: liquidationGains,
      liquidationAmount: `${liqAmnt}`,
      depositVal: depositVal.current,
    });

    // Log the body value for debugging purposes
    console.log(bodyValue);

    // Send the API request to the CDS backend
    const response = await fetch(`${BACKEND_API_URL}/cds/depositAmint`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: bodyValue,
    });

    // Parse the response as JSON
    const result = await response.json();

    // If the response is not successful, throw an error with the result message
    if (!response.ok) {
      throw new Error(result.message);
    }

    // Return the result
    return result;
  }

  // Use the useCdsDeposit hook to handle the CDS deposit functionality

  const {
    write:ConfirmDeposit,
    data: CdsDepositData,
    reset,
  } = useCdsDeposit({
    // Handle errors during the CDS deposit process
    onError: (error) => {
      console.log(error.name);

      // Show a custom toast notification for the error
      toast.custom(
        (t) => (
          <div>
            <CustomToast
              key={2}
              props={{
                t: toastId.current,
                toastMainColor: "#B43939",
                headline: `Uhh Ohh! ${error.name}`,
                toastClosebuttonHoverColor: "#e66d6d",
                toastClosebuttonColor: "#C25757",
              }}
            />
          </div>
        ),
        { id: toastId.current }
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
                  spinner: true,
                }}
              />
            </div>
          );
        },
        // Set the duration of the toast notification to be infinite
        { duration: Infinity, id: toastId.current }
      );
    },
  });




  const { isLoading, isSuccess: cdsDepositSuccess } = useWaitForTransaction({
    //transaction hash to watch to check for success or error in this case we are watching for cdsdeposit transaction hash
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

      setOpen(false);
    }, 
    hash: CdsDepositData?.hash,
    // Callback function called when the transaction is successful
    onSuccess(data) {
      // Show a custom toast notification
      toast.custom(
        (t) => (
          <div>
            {/* CustomToast component */}
            <CustomToast
              props={{
                t: toastId.current,
                toastMainColor: "#268730",
                headline: "Transaction Completed",
                transactionHash: CdsDepositData?.hash,
                linkLabel: "View Transaction",
                toastClosebuttonHoverColor: "#90e398",
                toastClosebuttonColor: "#57C262",
                completed: true,
                spinner: false,
              }}
            />
          </div>
        ),
        { id: toastId.current }
      );


      // Retrieve the relevant data from the transaction logs
      const dataLogs =
        chainId === 80001 ? data.logs[3].data : data.logs[2].data;
      // Decode event logs using the provided ABI and event name


      const { eventName, args } = decodeEventLogsFromAbi(
        cdsABI,
        //topic to decode event variables
        ["0x0a5985aa28fedd5d60e042a47ad0dcb83381febf41639cd599c154a7fee13ca6"],
        "Deposit",
        dataLogs
      ) as { eventName: string; args: { depositVal: bigint } };
      console.log(eventName, args?.depositVal);
      // Update the deposit value
      depositVal.current = args?.depositVal;
      //store data to backend
      mutate(address);
      // Dismiss the toast notification after 5 seconds
      setTimeout(() => {
        toast.dismiss(toastId.current);
      }, 5000);
    },
  });



  // Destructure the necessary values from the hook
  const {
    isLoading: isApproveLoading,  // Flag to indicate if the approve request is loading
    write: amintApprove,  // Function to initiate the approve request
    data: amintApproveData,  // Data returned from the approve request
    reset: amintReset,  // Function to reset the approve request state
  } = useAmintApprove({
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

      setOpen(false);
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
      setOpen(false);
    },
  });




  const { data: amintTransactionAllowed } = useWaitForTransaction({
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

      setOpen(false);
    },
    // look for approval transaction hash
    hash: amintApproveData?.hash,
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
                  headline: "Amint Approved,Plz Confirm Deposit Now",
                  transactionHash: amintApproveData?.hash,
                  linkLabel: "View Transaction",
                  toastClosebuttonHoverColor: "#90e398",
                  toastClosebuttonColor: "#57C262",
                }}
              />
            </div>
          );
        },
        { id: toastId.current }
      );
    },
  });





  /**
   * Handles the form submission.
   *
   * @param {typeof formSchema.current} values - The values submitted in the form.
   */
  function onSubmit(values: z.infer<typeof formSchema.current>) {

    const liqAmnt =
    (  ((amintAmnt ? amintAmnt : 0) + (usdtAmnt ? usdtAmnt : 0)) * 80) / 100;
    // call the CdsDeposit function from blockchain with dynamic args
    try{
      ConfirmDeposit?.({
        args: [
          BigInt(usdtAmnt ? parseUnits(usdtAmnt.toString(),6) : 0),
          BigInt(amintAmnt ? parseUnits(amintAmnt.toString(),6) : 0),
          liquidationGains,
          parseUnits(liqAmnt.toString(),6),
        ],
      });
    }catch(e){
      console.log(e);
    }

  }



  //change schema based on the usdtDepositTillNow and usdtLimit
  //This is not a good way to do it but it works and is used here because i lacked the knowledge to do this properly
  useEffect(() => {

    if (usdtAmountDepositedTillNow < usdtLimit) {
      const updatedSchema = z.object({
        AmintDepositAmount: z
          .number()
          .gte(0, { message: "Value must be greater than 0" })
          .or(z.string())
          .pipe(
            z.coerce
              .number()
              .gte(0, { message: "Value must be greater than 0" })
          )
          .optional(),
        USDTDepositAmount: z
          .number()
          .gte(0, { message: "Value must be greater than 0" })
          .or(z.string())
          .pipe(
            z.coerce
              .number()
              .gte(0, { message: "Value must be greater than 0" })
          ),
        COMPDepositAmount: z
          .number()
          .gte(0, { message: "Value must be greater than 0" })
          .or(z.string())
          .pipe(
            z.coerce
              .number()
              .gte(0, { message: "Value must be greater than 0" })
          )
          .optional(),
        USDCDepositAmount: z
          .number()
          .gte(0, { message: "Value must be greater than 0" })
          .or(z.string())
          .pipe(
            z.coerce
              .number()
              .gte(0, { message: "Value must be greater than 0" })
          )
          .optional(),
        lockInPeriod: z.string(),
        liquidationGains: z.boolean(),
      });
      // @ts-ignore
      formSchema.current = updatedSchema;
    } else if (usdtAmountDepositedTillNow < usdtLimit) {
      const updatedSchema = z.object({
        AmintDepositAmount: z
          .number()
          .gte(500, { message: "Value must be greater than 500" })
          .or(z.string())
          .pipe(
            z.coerce
              .number()
              .gte(500, { message: "Value must be greater than 500" })
          ),
        USDTDepositAmount: z
          .number()
          .gte(0, { message: "Value must be greater than 0" })
          .or(z.string())
          .pipe(
            z.coerce
              .number()
              .gte(0, { message: "Value must be greater than 0" })
          )
          .optional(),
        COMPDepositAmount: z
          .number()
          .gte(0, { message: "Value must be greater than 0" })
          .or(z.string())
          .pipe(
            z.coerce
              .number()
              .gte(0, { message: "Value must be greater than 0" })
          )
          .optional(),
        USDCDepositAmount: z
          .number()
          .gte(0, { message: "Value must be greater than 0" })
          .or(z.string())
          .pipe(
            z.coerce
              .number()
              .gte(0, { message: "Value must be greater than 0" })
          )
          .optional(),
        lockInPeriod: z.string(),
        liquidationGains: z.boolean(),
      });
      // @ts-ignore
      formSchema.current = updatedSchema;
    }
  }, [usdtLimit, usdtAmountDepositedTillNow]);



  useEffect(() => {
    // Check if cdsDepositSuccess is true
    if (cdsDepositSuccess) {
      // Call reset function if it exists
      reset?.();
      // Call amintReset function if it exists
      amintReset?.();
    }
  }, [cdsDepositSuccess]);


  
  return (
    <div className="flex justify-between items-center mb-[30px]">
      <div className="flex flex-col gap-[15px] ">
        <h2 className="text-textPrimary font-medium text-2xl min-[1280px]:text-3xl tracking-[-1.8px] min-[1440px]:text-4xl 2dppx:text-2xl">
          Your Deposits
        </h2>
        <p className="text-textSecondary text-sm min-[1440px]:text-base 2dppx:text-xs">
          A list of all the deposits you have made.
        </p>
      </div>
      <div className="flex gap-[10px]">


        {/* Currently we are not Using this button but later we might need this button so uncomment when needed */}
        {/* <Button variant={"outline"}>
          <p className="text-transparent font-semibold text-base text-center bg-clip-text bg-gradient-to-b from-[#808080] to-[#000] ">
            Withdraw Fees from All Deposits
          </p>
        </Button> */}


        <Dialog open={open} onOpenChange={setOpen}>



          <DialogTrigger asChild>
            <Button
              variant={"primary"}
              size={"full"}
              className="flex gap-[10px] items-center justify-center"
            >
              <Image
                src={addIcon}
                alt="add icon"
                width={24}
                height={24}
              ></Image>
              <p className="text-white bg-clip-text bg-[linear-gradient(180deg,_#FFF_-0.23%,_#EEE 100%)] text-transparent font-semibold text-base">
                New Deposit
              </p>
            </Button>
          </DialogTrigger>




          <DialogContent className="w-[672px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} action="#">
                <div className="flex justify-end w-full ">
                  <DialogClose asChild>
                    <Button
                      variant={"ghostOutline"}
                      size={"primary"}
                      className="flex gap-[10px] border border-borderGrey "
                    >
                      <Cross2Icon className="w-4 h-4" />
                      <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                        Close
                      </p>
                    </Button>
                  </DialogClose>
                </div>

                <DialogHeader className="flex items-start">
                  <DialogTitle className="text-textPrimary font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-3xl text-2xl tracking-[-1.8px]">
                    Make a New Deposit
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col min-[1440px]:pt-[30px] 2dppx:pt-[15px] pt-[15px] min-[1440px]:gap-[20px] 2dppx:gap-[10px] min-[1280px]:gap-[16px] gap-[10px]">
                  <div className="flex gap-[10px] items-center w-full justify-between ">
                    <FormField
                      control={form.control}
                      disabled={
                        usdtAmountDepositedTillNow < usdtLimit ? true : false
                      }
                      name="AmintDepositAmount"
                      render={({ field }) => (
                        <FormItem className="w-[48%]">
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
                                  htmlFor="amount_of_amint"
                                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                                >
                                  Deposit AMINT
                                </label>
                              </div>
                              <div className="absolute top-0 right-0 flex items-center h-full">
                                <Button
                                  variant={"outline"}
                                  className="z-20 text-xs rounded-r-md"
                                  disabled={
                                    usdtAmountDepositedTillNow < usdtLimit
                                      ? true
                                      : false
                                  }
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
                    <PlusIcon width={16} height={16} />
                    <div className="flex flex-col w-[48%] gap-[10px]">
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
                                    className="lock px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-0 peer"
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
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                                  >
                                    Deposit USDT
                                  </label>
                                </div>

                                <div className="absolute top-0 right-0 flex items-center justify-between h-full">
    
                                  {usdtAmountDepositedTillNow > usdtLimit && (
                                    <div
                                      className="text-xs cursor-pointer"
                                      onClick={() => {
                                        form.setValue("USDTDepositAmount", 400);
                                      }}
                                    >
                                      Max
                                    </div>
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="timeline"
                                        className="z-20 bg-white"
                                      >
                                        <CaretDownIcon width={24} height={24} />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                      <DropdownMenuLabel>
                                        Tokens
                                      </DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuCheckboxItem
                                        checked={tokensEnabled.USDT}
                                        onCheckedChange={() =>
                                          setTokensEnabled((prev) => ({
                                            ...prev,
                                            USDT: !prev.USDT,
                                          }))
                                        }
                                      >
                                        USDT
                                      </DropdownMenuCheckboxItem>
                                      <DropdownMenuCheckboxItem
                                        checked={tokensEnabled.COMP}
                                        onCheckedChange={() =>
                                          setTokensEnabled((prev) => ({
                                            ...prev,
                                            COMP: !prev.COMP,
                                          }))
                                        }
                                        disabled={
                                          usdtAmountDepositedTillNow < usdtLimit
                                            ? true
                                            : false
                                        }
                                      >
                                        COMP
                                      </DropdownMenuCheckboxItem>
                                      <DropdownMenuCheckboxItem
                                        checked={tokensEnabled.USDC}
                                        onCheckedChange={() =>
                                          setTokensEnabled((prev) => ({
                                            ...prev,
                                            USDC: !prev.USDC,
                                          }))
                                        }
                                        disabled={
                                          usdtAmountDepositedTillNow < usdtLimit
                                            ? true
                                            : false
                                        }
                                      >
                                        USDC
                                      </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button
                                  type="button"
                                    variant={"outline"}
                                    className="z-20 text-xs rounded-r-md"
                                    onClick={() => {
                                      usdtAmnt !== undefined
                                        ? usdtAmnt !== 0
                                          ? usdtWrite({
                                            args: [
                                              chainId === 80001
                                                ? (cdsAddress[80001] as `0x${string}`)
                                                : (cdsAddress[11155111] as `0x${string}`),
                                                BigInt(usdtAmnt ? parseUnits(usdtAmnt.toString(),6) : 0),
                                            ],
                                          })
                                          : null
                                        : null;
                                    }}
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
                  <div className="flex gap-[10px] items-center">
                    <div className="flex items-center ml-[4px]">
                      <InfoCircledIcon width={18} height={18} />
                    </div>
                    <p className="min-[1440px]:text-base 2dppx:text-xs text-sm font-normal text-textGrey text-center leading-none">
                      Minimum Amint Amount is{" "}
                      <span className="font-medium text-textHighlight">
                        500 AMINT
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
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a Lock-In Period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
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
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-2 min-[1440px]:p-4 2dppx:p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-textGrey">
                            Opt in for liquidation gains
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Note note="Note: Your amount will be used to offer protection to borrowers & protocol in return for fixed yields" />
                  {Boolean(amintAmnt) && Boolean(lockIn) ? (
                    <div className="min-[144px]:px-[15px] px-[10px] flex flex-col border border-lineGrey rounded bg-gradient-to-r from-white to-[#eee]">
                      <div className="min-[144px]:py-[15px] py-[10px] flex items-center justify-between border-b border-lineGrey">
                        <div className="flex gap-[10px] items-center">
                          <Image
                            src={payments}
                            alt="payment"
                            width={24}
                            height={24}
                          />
                          <p className="min-[1440px]:text-base text-sm text-textHighlight 2dppx:text-xs">
                            {amintAmnt} AMINT
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
                              <p className="min-[1440px]:text-base text-sm text-textHighlight">
                                30 Days (~1 Month)
                              </p>
                            ) : lockIn === "60" ? (
                              <p className="min-[1440px]:text-base 2dppx:text-xs text-sm text-textHighlight">
                                60 Days (~2 Months)
                              </p>
                            ) : lockIn === "120" ? (
                              <p className="min-[1440px]:text-base 2dppx:text-xs text-sm text-textHighlight">
                                120 Days (~4 Months)
                              </p>
                            ) : lockIn === "180" ? (
                              <p className="min-[1440px]:text-base 2dppx:text-xs text-sm text-textHighlight">
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
                          <p className="min-[1440px]:text-base text-sm text-[#242424] 2dppx:text-sm">
                            Expected APR can range from{" "}
                            <span className="text-textHighlight"> ~5%</span> to{" "}
                            <span className="text-textHighlight">~200%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  <Button
                    type="submit"
                    variant={"primary"}
                    className="text-white"
                    //   disabled if the amount deposited is less than the limit and the user has not approved usdt
                    disabled={
                      usdtAmountDepositedTillNow < usdtLimit && !usdtApproved
                    }
                  >
                    Confirm Deposit
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NewDeposit;

