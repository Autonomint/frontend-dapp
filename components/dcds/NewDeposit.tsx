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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CaretDownIcon,
  Cross2Icon,
  FontRomanIcon,
  InfoCircledIcon,
  PlusIcon,
  ArrowRightIcon
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount, useBalance, useChainId, useWaitForTransaction } from "wagmi";
import { toast } from "sonner";
import CustomToast from "@/components/CustomUI/CustomToast";
import { parseEther, parseUnits } from "viem";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import decodeEventLogsFromAbi from "@/app/utils/decodeEventLogsFromAbi";
import Spinner from "@/components/ui/spinner";
import { DEV_PROXY_AMINT_ADDRESS, DEV_PROXY_TESTUSDT_ADDRESS } from "@/constants/Addresses";
import ProductList from "../Markets/ProductList";



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
  CollateralType: z.string(),
  lockInPeriod: z.string(),
  liquidationGains: z.boolean(),
});






const NewDeposit = () => {
  // Define the initial state for the open variable for sheet opening and closing
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(0);
  const maxValue = 100; // Adjust based on your value range
  const [openmarket, setOpenmarket] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value)); // Convert input value to a number
  };
  const [inputTypes, setInputTypes] = useState([1]);
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
      CollateralType: "usdt",
      lockInPeriod: undefined,
      liquidationGains: false,
    },
  });

  const onWatchAssetAmintClick = async () => {
    const result = await (window as any).ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: DEV_PROXY_AMINT_ADDRESS,
          decimals: 6,
          name: "AMINT",
          symbol: "AMINT"
        }
      }
    });
    console.log({ result });
  };
  const onWatchAssetUsdtClick = async () => {
    const result = await (window as any).ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: DEV_PROXY_TESTUSDT_ADDRESS,
          decimals: 6,
          name: "TUSDT",
          symbol: "TUSDT"
        }
      }
    });
    console.log({ result });
  };



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


  const { data: amintbal } = useBalance({
    address: DEV_PROXY_AMINT_ADDRESS ? address : undefined,
    token: DEV_PROXY_AMINT_ADDRESS ? DEV_PROXY_AMINT_ADDRESS : undefined,
    watch: true,
  });

  const { data: usdtbal } = useBalance({
    address: DEV_PROXY_TESTUSDT_ADDRESS ? address : undefined,
    token: DEV_PROXY_TESTUSDT_ADDRESS ? DEV_PROXY_TESTUSDT_ADDRESS : undefined,
    watch: true,
  });

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
    isLoading: usdtApproveLoading,
    data: usdtApproveData,
    write: usdtWrite,
    isSuccess: usdtApproved,
  } = useUsdtContractApprove(
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

  const { data: usdtTransactionAllowed, isLoading: usdtTransactionLoading } = useWaitForTransaction({
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
    hash: usdtApproveData?.hash,
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
        { duration: 5000 }
      );
    },
  });


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

  const { mutate, isPending } = useMutation({
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
      setOpen(false);
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
    console.log("storeToCDSBackend", address)
    // Calculate the liquidation amount based on amintAmnt and usdtAmnt for now i am just adding usdt and amint considering both as 18 decimals but as usdt is 6 decimals you will have to manage it yourself or ask abhishek sir
    const liqAmnt =
      (((amintAmnt ? amintAmnt : 0) + (usdtAmnt ? usdtAmnt : 0)) * 80) / 100;
    // Determine the collateral type based on amintAmnt and usdtAmnt
    console.log("storeToCDSBackend", address)
    const colType =
      (amintAmnt !== 0 && amintAmnt != undefined) && (usdtAmnt !== 0 && usdtAmnt != undefined)
        ? "AMINT&USDT"
        : amintAmnt !== 0 && amintAmnt != undefined
          ? "AMINT"
          : usdtAmnt !== 0 && usdtAmnt != undefined
            ? "USDT"
            : "NONE";

    // Create the body value for the API request
    let bodyValue = JSON.stringify({
      address: address,
      index: totalCDSIndex ? totalCDSIndex + 1 : 1,
      chainId: chainId,
      depositedAmint: `${amintAmnt == undefined ? 0 : amintAmnt}`,
      depositedUsdt: `${usdtAmnt == undefined ? 0 : usdtAmnt}`,
      collateralType: colType,
      depositedTime: `${Date.now()}`,
      ethPriceAtDeposit: Number(ethPrice ? ethPrice : 0) / 100,
      aprAtDeposit: 5,
      lockingPeriod: Number(lockIn),
      optedForLiquidation: liquidationGains,
      liquidationAmount: `${liquidationGains ? liqAmnt : '0'}`,
      depositVal: Number(depositVal.current),
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

    form.reset();
    // Return the result
    return result;
  }

  // Use the useCdsDeposit hook to handle the CDS deposit functionality

  const {
    write: ConfirmDeposit,
    data: CdsDepositData,
    reset,
    isLoading: isCdsDepositLoading
  } = useCdsDeposit({
    // Handle errors during the CDS deposit process
    onError: (error) => {
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


      console.log("data logs -------", data);

      // Retrieve the relevant data from the transaction logs
      const dataLogs =
        chainId === 5 ? data.logs[data.logs.length - 1].data : data.logs[data.logs.length - 1].data;
      // Decode event logs using the provided ABI and event name
      console.log("data logs -------", data.logs[data.logs.length - 1].topics);
      const { eventName, args } = decodeEventLogsFromAbi(
        cdsABI,
        //topic to decode event variables
        data.logs[data.logs.length - 1].topics ?? [],
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
    isLoading: isAmintApproveLoading,  // Flag to indicate if the approve request is loading
    write: amintApprove,  // Function to initiate the approve request
    data: amintApproveData,  // Data returned from the approve request
    reset: amintReset,  // Function to reset the approve request state
    isSuccess: amintApproved,  // Flag to indicate if the approve request is successful
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
        { duration: 5000 }
      );
      //closing sheet so that user can click on the links from the toast
      // setOpen(false);
    },
  });




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
        { duration: 5000 }
      );
    },
  });





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
    }
    const liqAmnt =
      ((Number(amintAmnt ? amintAmnt : 0) + Number(usdtAmnt ? usdtAmnt : 0)) * 80) / 100;
    // call the CdsDeposit function from blockchain with dynamic args
    try {
      ConfirmDeposit?.({
        args: [
          BigInt(usdtAmnt ? parseUnits(usdtAmnt.toString(), 6) : 0),
          BigInt(amintAmnt ? parseUnits(amintAmnt.toString(), 6) : 0),
          liquidationGains,
          liquidationGains ? parseUnits(liqAmnt.toString(), 6) : 0n,
        ],
      });
    } catch (e) {
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
      amintReset?.();
    }
  }, [cdsDepositSuccess]);

  useEffect(() => {
    console.log(usdtAmountDepositedTillNow, usdtLimit)
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
    <div className="flex items-center justify-between">

      <div className="flex gap-[10px]">


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} action="#">
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

            <div className="flex flex-col min-[1440px]:pt-[10px] 2dppx:pt-[15px] pt-[10px] min-[1440px]:gap-[20px] 2dppx:gap-[10px] min-[1280px]:gap-[16px] gap-[10px]">
              <div className="flex flex-col md:flex-row gap-[10px] items-center w-full justify-between ">
                <div className="flex w-full">
                  <div className="flex flex-wrap w-full gap-2">
                  {
                    inputTypes.map((inputType, index) => (
                      <div className={`relative min-w-40 max-w-full ${inputTypes.length==1?"w-full":""} dark:bg-[#020202]`}>
                      <FormField
                        control={form.control}
                        name="AmintDepositAmount"
                        render={({ field }) => (
                          <FormItem className="relative ">
                            {/* <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400 '>{!form.getValues("collateralAmount") ? "" : "Input Amount"}</label> */}
  
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                placeholder="Input Amount"
                                {...field}
                                value={Boolean(field.value) ? field.value : ""}
                                className='py-10 rounded-xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]'
                                style={{
                                  appearance: 'textfield',
                                  MozAppearance: 'textfield',
                                  WebkitAppearance: 'none',
                                  margin: 0
                                }}
                              ></Input>
  
                            </FormControl>
                            <FormMessage className="dark:text-[#B43939]" />
                          </FormItem>
                        )}
                      />
                      <FormField
  
                        control={form.control}
                        name="CollateralType"
                        render={() => (
                          <FormItem className='absolute top-[20%] right-2  basis-2/5 dark:bg-[#020202] w-24'>
                            <Controller
                              control={form.control}
                              name="CollateralType"
                              render={({ field }) => (
                                <Select
                                  onValueChange={(value) => {
                                    form.setValue("AmintDepositAmount", 0);
                                    if (value === 'amint') {
                                      form.setValue('CollateralType', 'usdt');
                                    } else if (value === 'abond') {
                                      form.setValue('CollateralType', 'eth');
                                    }
                                    field.onChange(value)
  
                                  }}
                                  value={field.value}
                                >
                                  <label className='absolute ml-3 p-1 bg-white -top-1 text-[11px] text-gray-500 dark:bg-[#0F0F0F] dark:text-gray-400 '>{!form.getValues("CollateralType") ? "" : "Input Type"}</label>
                                  <label onClick={() => {console.log(index,inputTypes); setInputTypes(inputTypes.filter(num => num !== inputType))}} className=" border border-gray-600 rounded-full bg-white dark:bg-[#141414] absolute -right-1 -top-[7px]"> <Cross2Icon/></label>
                                  <FormControl >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Collateral</SelectLabel>
                                      <SelectItem value="amint">USDa</SelectItem>
                                      <SelectItem value="usdt">USDT</SelectItem>
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
                    )) 
                  }
                 
                  </div>
                  
                  <div onClick={()=>setInputTypes([...inputTypes, inputTypes.length + 1])} className="relative right-0 h-full p-2 ml-1 border rounded-full cursor-pointer top-5">
                    <PlusIcon width={16} height={16} />
                  </div>
                </div>
                {/* <FormField
                  control={form.control}
                  disabled={
                    usdtAmountDepositedTillNow < usdtLimit ? true : false
                  }

                  name="AmintDepositAmount"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[48%]">
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
                              min={500}
                            ></Input>

                            <label
                              htmlFor="amount_of_amint"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#0F0F0F]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                            >
                              Deposit AMINT
                            </label>

                          </div>
                          <div className="absolute top-0 right-0 flex items-center h-full">
                            <Button
                              type="button"
                              variant={"outline"}
                              className="z-20 text-xs rounded-r-md"
                              disabled={
                                usdtAmountDepositedTillNow < usdtLimit
                                  ? true
                                  : false
                              }
                              onClick={() => {
                                amintAmnt !== undefined
                                  ? amintAmnt !== 0
                                    ? amintApprove({
                                      args: [
                                        (cdsAddress[11155111] as `0x${string}`),
                                        BigInt(amintAmnt ? parseUnits(amintAmnt.toString(), 6) : 0),
                                      ],
                                    })
                                    : null
                                  : null;
                              }}
                            >
                              {isAmintApproveLoading || isAmintTransactionLoading ? (
                                <Spinner className="w-5 h-5" />
                              ) : ("Approve")}

                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <span className=" block text-[10px] text-right mr-1">bal. {amintbal?.formatted.slice(0, 8)} AMINT</span>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <PlusIcon width={16} height={16} />
                <div className="flex flex-col  w-full  md:w-[48%] gap-[10px]">

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
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#0F0F0F]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                              >
                                Deposit USDT
                              </label>
                            </div>

                            <div className="absolute top-0 right-0 flex items-center justify-between h-full">

                              {usdtAmountDepositedTillNow >= usdtLimit && (
                                <div
                                  className="text-xs cursor-pointer"
                                  onClick={() => {
                                    form.setValue("USDTDepositAmount", (100 / 80 * (form.getValues("AmintDepositAmount") ?? 0) - (form.getValues("AmintDepositAmount") ?? 0)));
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
                                    className="z-20 bg-white dark:bg-[#0F0F0F]"
                                  >
                                    <CaretDownIcon width={24} height={24} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 dark:bg-[#0F0F0F]">
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

                                          (cdsAddress[11155111] as `0x${string}`),
                                          BigInt(usdtAmnt ? parseUnits(usdtAmnt.toString(), 6) : 0),
                                        ],
                                      })
                                      : null
                                    : null;
                                }}
                              >
                                {usdtApproveLoading || usdtTransactionLoading ? (
                                  <Spinner className="w-5 h-5" />
                                ) : ("Approve")}
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                        <span className=" block text-[10px] text-right mr-1">bal. {usdtbal?.formatted.slice(0, 8)} USDT</span>
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

                </div> */}
              </div>
              <div className="flex w-full">
                <div className="flex flex-col w-full gap-4 ">

                  <div className="flex gap-[10px] items-center">
                    <div className="flex items-center ml-[4px]">
                      <InfoCircledIcon width={18} height={18} />
                    </div>
                    <p className="min-[1440px]:text-base 2dppx:text-xs text-sm font-normal text-textGrey  dark:text-[#9E9E9E] text-center leading-none">
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
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a Lock-In Period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark:bg-[#0F0F0F]">
                            <SelectGroup className="dark:bg-[#0F0F0F]">
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
                            className="dark:bg-[#0F0F0F] dark:border-[#3A3A3A] dark:text-white"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-textGrey dark:text-white">
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
                <div className="min-[144px]:px-[15px] px-[10px] flex flex-col border border-lineGrey rounded bg-gradient-to-r from-white to-[#eee] dark:bg-none dark:bg-[#0F0F0F]">
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

              <Button
                type="submit"
                variant={"primary"}
                className="text-white"
                //   disabled if the amount deposited is less than the limit and the user has not approved usdt
                disabled={
                  (usdtAmountDepositedTillNow > usdtLimit && !amintApproved) || !usdtApproved || isCdsDepositLoading
                }
              >
                {isCdsDepositLoading || isPending || isLoading ? <Spinner /> : 'Confirm Deposit'}
              </Button>
            </div>
          </form>
        </Form>


        <Dialog open={openmarket} onOpenChange={setOpenmarket} >
          <DialogContent className="max-w-[340px] pb-5">
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
            {/* <DialogHeader className="flex items-start">
              <DialogTitle className="text-textPrimary  font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-3xl text-2xl ">
                <div className="flex flex-col gap-[10px] ">
                  <h2 className="text-textPrimary dark:text-[#90AFFF]  font-medium text-2xl min-[1280px]:text-3xl tracking-[-1.8px] min-[1440px]:text-4xl 2dppx:text-2xl">
                    Your Deposits
                  </h2>
                  <p className="text-textSecondary dark:text-[#EEEEEE]  text-sm min-[1440px]:text-base 2dppx:text-xs">
                    A list of all the deposits you have made.
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader> */}
            <ProductList />

          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};

export default NewDeposit;

