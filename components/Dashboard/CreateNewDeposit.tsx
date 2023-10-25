"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";

import addIcon from "@/app/assets/add_circle.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Cross1Icon, Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
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
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collateral: undefined,
      collateralAmount: 0.02,
      strikePrice: 5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
              // onSubmit={(e) => {
              //   setOpen(false);
              //   e.preventDefault();
              //   toast.custom((t) => (
              //     <CustomToast
              //       props={{
              //         t,
              //         toastMainColor: "#268730",
              //         headline: "Transaction Submitted",
              //         transactionHash: "09405049530945",
              //         transactionHashLink: "https:etherscan.io/",
              //         linkLabel: "View Transaction",
              //         toastClosebuttonHoverColor: "#90e398",
              //         toastClosebuttonColor: "#57C262",
              //       }}
              //     />
              //   ));
              // }}
              onSubmit={form.handleSubmit(onSubmit)}
              action="#"
            >
              <div className="flex w-full justify-end">
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
                      0.00123
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
