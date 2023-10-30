"use client";
import React, { useEffect, useState } from "react";
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
import {
  Cross1Icon,
  Cross2Icon,
  ExternalLinkIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
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
import { useAccount, useWaitForTransaction } from "wagmi";
import { useContractRead } from "wagmi";
import { parseEther } from "viem";
import {
  borrowingContractABI,
  borrowingContractAddress,
  useBorrowingContractDepositTokens,
  useBorrowingContractRead,
} from "@/abiAndHooks";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";

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

const CreateNewDeposit = () => {
  const [amintToBeMinted, setAmintToBeMinted] = useState(0);
  const [open, setOpen] = useState(false);
  const { address } = useAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collateral: undefined,
      collateralAmount: undefined,
      strikePrice: 5,
    },
  });

  const {
    data: ethPrice,
    // isError,
    // isLoading,
  } = useBorrowingContractRead({
    functionName: "getUSDValue",
    watch: true,
  });

  const { data: depositData, write } = useBorrowingContractDepositTokens({
    functionName: "depositTokens",
    args: [BigInt(ethPrice ? ethPrice : BigInt(0)), BigInt(Date.now())],
    value: parseEther(form.watch("collateralAmount").toString()),
    onError(error) {
      setOpen(false);
      console.log(error);
      toast.custom((t) => (
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
      ));
    },
    onSuccess(data) {
      setOpen(false);
      console.log(data?.hash);
      toast.custom((t) => (
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
      ));
    },
  });
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess(data) {
      console.log("transaction completed", depositData?.hash, data);
      toast.custom((t) => (
        <CustomToast
          props={{
            t,
            toastMainColor: "#268730",
            headline: "Transaction Completed. A new Deposit has been created",
            transactionHash: depositData?.hash,
            linkLabel: "View Transaction",
            toastClosebuttonHoverColor: "#90e398",
            toastClosebuttonColor: "#57C262",
          }}
        />
        // <div className="flex rounded">
        //   <div
        //     className={`flex gap-[10px] bg-[#268730] text-white  items-center rounded`}
        //   >
        //     <div className="flex flex-col px-[10px] py-4 gap-[10px] ">
        //       <p>Transaction Completed</p>
        //       <p className=" whitespace-nowrap flex gap-1">
        //         {`Tx Hash: ${truncateWeb3WalletAddress(depositData?.hash)}`}
        //         <Link
        //           href={`https:mumbai.polygonscan.com/tx/${depositData?.hash}`}
        //           target="_blank"
        //           className="flex items-center gap-1"
        //         >
        //           <ExternalLinkIcon />
        //           View Transaction
        //         </Link>
        //       </p>
        //     </div>
        //     <div className={`bg-[#57C262] rounded-r h-full flex`}>
        //       <Button
        //         variant={"ghost"}
        //         size={"toastSize"}
        //         onClick={() => toast.dismiss(t)}
        //         className={`flex items-center justify-center hover:bg-[#90e398] rounded-none`}
        //       >
        //         <Cross1Icon />
        //       </Button>
        //     </div>
        //   </div>
        // </div>
      ));
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("depositData", depositData);
    write?.();
  }

  const handleAmintToBeMinted = () => {
    const amintToMint =
      (form.watch("collateralAmount") * Number(ethPrice) * 80) / 10000;
    setAmintToBeMinted(amintToMint);
  };

  useEffect(() => {
    handleAmintToBeMinted();
  }, [form.watch("collateralAmount")]);

  return (
    <div className="flex justify-between items-center mb-[30px]">
      <div className="flex flex-col gap-[15px] ">
        <h2 className="text-textPrimary font-medium text-4xl tracking-[-1.8px]">
          Your Deposits
        </h2>
        <p className="text-textSecondary">
          A list of all the deposits you have made.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
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

        <DialogContent className="w-[672px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              action="#"
            >
              <div className=" flex w-full justify-end">
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
                <DialogTitle className="text-textPrimary font-medium text-4xl tracking-[-1.8px]">
                  Make a New Deposit
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col pt-[30px] gap-[20px]">
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
                          value={field.value ?? ""}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-[10px] items-center">
                  <InfoCircledIcon width={18} height={18} />
                  <p className="text-base font-normal text-textGrey text-center">
                    Minimum Collateral Amount is{" "}
                    <span className="font-medium text-textHighlight">
                      0.02 ETH
                    </span>
                  </p>
                </div>
                <div className="p-[6px]">
                  <FormField
                    control={form.control}
                    name="strikePrice"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel className="mb-[10px]">
                          <p className="text-base font-normal text-textGrey mb-4">
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
                  <div className="w-full flex justify-between mt-[10px]">
                    <p>05</p>
                    <p>10</p>
                    <p>15</p>
                    <p>20</p>
                    <p>25</p>
                  </div>
                </div>
                <div className="py-[10px] flex flex-col">
                  <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                    <p className="text-base text-textSecondary">
                      Amount of Amint that will be minted
                    </p>
                    <p className="text-textHighlight font-medium text-base">
                      {amintToBeMinted}
                    </p>
                  </div>
                  <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                    <p className="text-base text-textSecondary">Options Fees</p>
                    <p className="text-textHighlight font-medium text-base">
                      3%
                    </p>
                  </div>
                  <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                    <p className="text-base text-textSecondary">APY</p>
                    <p className="text-textHighlight font-medium text-base">
                      5% - 0.00023 Amint
                    </p>
                  </div>
                  <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
                    <p className="text-base text-textSecondary">
                      Downside Protection Amount
                    </p>
                    <p className="text-textHighlight font-medium text-base">
                      1.234
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
