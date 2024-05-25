import Note from "@/components/CustomUI/Note";
import SheetRow from "@/components/CustomUI/SheetRow";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import calculateTimeDifference from "@/app/utils/calculateTimeDifference";
import {
    cdsAbi,
    useReadBorrowingContractGetUsdValue,
    useWriteCdsWithdraw,
} from "@/abiAndHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "sonner";
import CustomToast from "@/components/CustomUI/CustomToast";
import { parseEther } from "viem";
import { formatDateFromUnixTimestamp } from "@/app/utils/calculateNext30Days";
import ConfirmNoticeCds from "./ConfirmNoticeCds";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import decodeEventLogsFromAbi from "@/app/utils/decodeEventLogsFromAbi";

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
    depositedUsdt: string;
    ethPriceAtDeposit: number;
    aprAtDeposit: number;
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
type calculateData = {
    address: `0x${string}` | undefined;
    index: number;
    chainId: number;
    ethPrice: string;
  };


//   usdt present in the pool
//  amint present in the pool
// eth price at deposit
// bucket design for the deposit
// 
// adress colateral ration usdt eth amount redeem time
// amint abound redeem 
// amint - usdt && abond - eth
const AmintDepositRow = ({ details, handleSheetOpenChange,
    sheetOpen,
    handleRefetch }: {
        details: DepositDetail, handleSheetOpenChange: (value: boolean) => void;
        sheetOpen: boolean;
        handleRefetch: Function;
    }) => {


    // kept this inside because every row is going to have different state
    const depositDetails = [
        {
            headline: "USDa Deposited",
            value: "1200",
        },
        {
            headline: "USDT Deposited",
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


    // manage the sheet opening and closing state
    const [amountView, setAmountView] = React.useState(false);
    // manage the deposit details array
    const [depositData, setDepositData] = useState(depositDetails);
    const [status, setStatus] = useState(details.status);
    // state for opening and closing confirmNotice
    const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
    // manage toastId for custom toast
    const toastId = useRef<string | number>("");
    const { address } = useAccount();
    // get current chainId from wagmi useChainID hook
    const chainId = useChainId();
    const eventsValue = useRef(events);
    const queryClient = useQueryClient();


    const { data: ethPrice } = useReadBorrowingContractGetUsdValue({
        query:{
            staleTime: 10 * 1000, //refresh eth price after 10 seconds
        }
    });

    console.log("cdscds", ethPrice)
    // get the current apy
    // const { data: currentApy } = useBorrowingContractGetApy({
    //   enabled: !!address,
    // });



    const { writeContract: cdsWithdraw, data: cdsWithdrawData, isPending:isLoading } = useWriteCdsWithdraw({
        // onError callback function
        mutation:{

        onError(error) {
            console.log(error);
            // Display custom toast with error message
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
                                    headline: `Uhh Ohh! ${error.message}`,
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
        // onSuccess callback function
        onSuccess(data) {
            console.log(data);
            // Close the sheet
            // setSheetOpen(false);
            // Display custom toast with success message and transaction hash
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
                                    spinner: true,
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

    // Use the `mutate` function from the `useMutation` hook
    const { mutate: backendCDSWithdraw } = useMutation({
        // Specify the mutation function
        mutationFn: withdrawCDSFromBackend,

        // Handle any errors that occur during the mutation
        onError(error) {
            console.log(error);
            queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
        },

        // Perform actions after the mutation is completed or rejected
        onSettled() {
            // Invalidate the query for `dCDSdepositorsData`
            queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });

            // Invalidate the queries for `dCDSdeposits`
            queryClient.invalidateQueries({ queryKey: ["dCDSdeposits"] });
        },
    });


    // useWaitForTransactionReceipt({
    //     hash: cdsWithdrawData?.hash, // The transaction hash to wait for
    //     confirmations: 1, // Number of confirmations required for success
    //     onSuccess(data) {

    //         const dataLogs =
    //             chainId === 5 ? data.logs[3].data : data.logs[3].data; // Get the transaction logs data

    //         // Decode event logs using the provided ABI and event name
    //         const { eventName, args } = decodeEventLogsFromAbi(
    //             cdsABI, // ABI of the contract
    //             ["0x02d30220fb33c212455a8cbb2cf068095e080a18a527044b34360e67a705addd"], // Topics to decode event variables
    //             "Withdraw", // Event name to filter
    //             dataLogs // Data to decode
    //         ) as {
    //             eventName: string;
    //             args: { withdrewAmint: bigint; withdrawETH: bigint };
    //         };

    //         // Update the current events value with the decoded values
    //         eventsValue.current = {
    //             withdrewAmint: args?.withdrewAmint.toString(),
    //             withdrawETH: args?.withdrawETH.toString(),
    //         };

    //         backendCDSWithdraw(address); // Perform the backend CDS withdraw operation
    //         // Show a custom toast notification
    //         toast.custom(
    //             (t) => (
    //                 <div>
    //                     {/* CustomToast component */}
    //                     <CustomToast
    //                         props={{
    //                             t: toastId.current,
    //                             toastMainColor: "#268730",
    //                             headline:
    //                                 "Transaction Completed.Withdrawal Completed Successfully",
    //                             transactionHash: cdsWithdrawData?.hash,
    //                             linkLabel: "View Transaction",
    //                             toastClosebuttonHoverColor: "#90e398",
    //                             toastClosebuttonColor: "#57C262",
    //                             completed: true,
    //                         }}
    //                     />
    //                 </div>
    //             ),
    //             { id: toastId.current }
    //         );

    //         // Dismiss the toast notification after 5 seconds
    //         setTimeout(() => {
    //             toast.dismiss(toastId.current);
    //         }, 5000);
    //     },
    // });

    /**
     * Asynchronously withdraws CDS from the backend.
     *
     * @param {`0x${string}` | undefined} address - The address to withdraw CDS from.
     * @return {Promise<any>} - A promise that resolves to the result of the withdrawal.
     */

    async function withdrawCDSFromBackend(
        address: `0x${string}` | undefined
    ): Promise<any> {
        // Prepare the body value for the request
        console.log("Deposit Started")
        let bodyValue = JSON.stringify({
            address: address,
            index: details.index,
            chainId: chainId,
            withdrawTime: `${Date.now()}`,
            withdrawAmount: eventsValue.current.withdrewAmint,
            withdrawEthAmount: eventsValue.current.withdrawETH,
            ethPriceAtWithdraw: Number(ethPrice || 0),
            fees: '4000000',
            feesWithdrawn: '2000000',
        });
        // Log the body value
        console.log("deposit", bodyValue);

        // Send the request to the backend API
        const response = await fetch(`${BACKEND_API_URL}/cds/withdraw`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: bodyValue,
        });
        // Parse the response JSON
        console.log("Deposit Response", response)
        const result = await response.json();
        console.log("Deposit Response", result)
        console.log("Deposit End")

        // Check if the response is not OK and throw an error if so
        if (!response.ok) {
            throw new Error(result.message);
        }

        // Return the result
        return result;
    }




    const { mutate: calculateBackendWithdraw,data:withdrawdata } = useMutation({
        // Specify the mutation function
        mutationFn: calculateWithdrawAmount,
        // Handle any errors that occur during the mutation
        onError(error) {
            console.log(error);
            queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });
        },
        // Perform actions after the mutation is completed or rejected
        onSettled() {
            // Invalidate the query for `dCDSdepositorsData`
            queryClient.invalidateQueries({ queryKey: ["dCDSdepositorsData"] });

            // Invalidate the queries for `dCDSdeposits`
            queryClient.invalidateQueries({ queryKey: ["dCDSdeposits"] });
        },
    });
    console.log(withdrawdata)

    async function calculateWithdrawAmount(
      data: calculateData
    ) {

        console.log("1step",data)
      let bodyValue = JSON.stringify({
        ...data,
      });
      console.log(bodyValue);
      const response = await fetch(
        `${BACKEND_API_URL}/cds/calculateWithdrawAmount`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          body: bodyValue,
        }
      );
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.message);
      }
      return result;
    }

    /**
     * Updates the deposit data based on the provided details.
     * If the details are available, it updates each value in the depositData array.
     * If the details are not available, it sets each value in the depositData array to '-'.
     */

    function handleDepositData() {
        if (details) {
            const updatedData = [...depositData];
            updatedData[0].value = details.depositedAmint == "undefined" || details.depositedAmint == "NaN" ? '0' : details.depositedAmint  // Update depositedAmint value
            updatedData[1].value = details.depositedUsdt == "undefined" || details.depositedUsdt == "NaN" ? '0' : details.depositedUsdt; // Update depositedAmint value
            console.log(updatedData[1].value, updatedData[0].value)
            updatedData[2].value = `${details.ethPriceAtDeposit}`; // Update ethPriceAtDeposit value
            updatedData[3].value = formatDateFromUnixTimestamp(details.depositedTime); // Update depositedTime value and format time in 'DD/MM/YYYY'
            updatedData[4].value = `${details.lockingPeriod} days`; // Update lockingPeriod value
            updatedData[5].value = calculateTimeDifference(details.depositedTime); // Update time difference value
            updatedData[6].value = `${details.aprAtDeposit}%`; // Update aprAtDeposit value
            updatedData[7].value = `${details.aprAtDeposit}%`; // Update aprAtDeposit value
            updatedData[8].value = details.optedForLiquidation ? "Yes" : "No"; // Update optedForLiquidation value
            setDepositData(updatedData); // Update the depositData state with updatedData
            
            calculateBackendWithdraw?.({
                address: address as `0x${string}`,
                index: details.index,
                chainId: chainId,
                ethPrice: (Number(ethPrice??0n)/100).toFixed(2)
            });
        } else {
            const updatedData = [...depositData];
            // If details are not available, set each value in depositData to '-'
            updatedData.forEach((data) => {
                data.value = "-";
            });
            setDepositData(updatedData); // Update the depositData state with updatedData
        }
    }

    const WithdrawalTime = () => {
        const storedDate = new Date(parseInt(details.depositedTime));
        return storedDate.getTime() + 30 * 24 * 60 * 60 * 1000;
      }
    /**
     * Handles the withdrawal.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */


    function handleWithdrawal() {
        cdsWithdraw?.({ args: [BigInt(details.index)] });
    }

    useEffect(() => {
        // Call the handleDepositData function
        handleDepositData();
        // Set the status to the value of details.status
        // we are setting the status any time details change meaning when deposit is withdraw we want to change the status of it to withdrew and that is what this code is doing
        setStatus(details.status);
    }, [details,sheetOpen]);

    return (
        <Sheet
            key={details.id}
            open={sheetOpen}
            onOpenChange={() => {
                // Toggle the sheetOpen state
                
                // Reset the open confirm notice state
                // setOpenConfirmNotice(false);
                // Reset the amount view
                setAmountView(false);
            }}
        >

            <SheetContent
                className={"w-full md:w-1/3 lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
            >
                <div className="flex flex-col min-[1440px]:gap-6 2dppx:gap-2 gap-2">
                    <div className="flex justify-end w-full">
                        <SheetClose asChild>
                            <Button
                                variant={"ghostOutline"}
                                size={"primary"}
                                className="flex gap-[10px] border border-borderGrey rounded-none"
                                onClick={()=>handleSheetOpenChange(!sheetOpen)}
                            >
                                <Cross2Icon className="w-4 h-4" />
                                <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] dark:text-[#EEEEEE] font-semibold text-base">
                                    Close
                                </p>
                            </Button>
                        </SheetClose>
                    </div>
                    <SheetHeader>
                        <SheetTitle className="text-black font-medium min-[1440px]:text-4xl px-4 2dppx:text-2xl text-2xl tracking-[-1.8px]">
                            Deposit {`#${details.index}`}
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col">
                        {depositData.map((detail, index) => (
                            // Iterate over the depositData array and create a SheetRow for each element
                            <SheetRow
                                key={index}
                                props={{
                                    // Pass the headline and value as props to the SheetRow component
                                    heading: detail.headline,
                                    value: detail.value,
                                }}
                            />
                        ))}
                        <div className="flex justify-between min-[1440px]:px-4 2dppx:px-2 px-4 min-[1440px]:py-[10px] 2dppx:py-[5px] py-[5px] border-b border-lineGrey">
                            <p className="min-[1440px]:text-base 2dppx:text-sm text-sm text-[#020202] dark:text-[#EEEEEE] ">
                                Total Amount accured
                            </p>
                            {!amountView ? (
                                <Button
                                    variant={"ghostOutline"}
                                    size={"row"}
                                    className="text-[#020202] relative text-xs rounded-none  border-0 border-b-2 border-[#020202] bg-[#DEDEDE] py-1"
                                    onClick={() => setAmountView(!amountView)}
                                >
                                    View
                                </Button>
                            ) : (
                                <p className=" min-[1440px]:text-base 2dppx:text-sm text-textHighlight font-medium text-sm leading-none dark:text-[#EEEEEE] ">{`3.42`}</p>
                            )}
                        </div>
                    </div>
                    <div className="px-4">

                    <Note note="Note: Your amount will be used to offer protection to borrowers & protocol in return for fixed yields" />
                    </div>

                    {openConfirmNotice ? (
                        // If openConfirmNotice is true, render the ConfirmNoticeCds component
                        <>
                            <ConfirmNoticeCds
                                handleWithdrawal={handleWithdrawal}
                                amintToMint={(Number(depositData[0].value) + Number(depositData[1].value)).toFixed(2)}
                                setLoding={isLoading}
                                withdrawdata={withdrawdata??[0]}
                                optedForLiquidation={details.optedForLiquidation}
                            />
                        </>
                    ) : (
                        // If openConfirmNotice is false, render the Button component
                        // || (WithdrawalTime() > Date.now())
                        <Button
                            variant={"primary"}
                            className="border-[#041A50] bg-[#ABFFDE] mx-4 text-sm border-[1px] shadow-smallcustom py-2 rounded-none basis-1/2 "
                            onClick={() => setOpenConfirmNotice(true)}
                            disabled={(status === "WITHDREW" ? true : false) || (WithdrawalTime() > Date.now())}
                        >
                            Withdraw
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AmintDepositRow;
