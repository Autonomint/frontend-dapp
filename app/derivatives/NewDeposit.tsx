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
import React, { useState } from "react";
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
import { Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
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
import { Checkbox } from "@/components/ui/checkbox";
import payments from "@/app/assets/payments.svg";
import trending from "@/app/assets/trending_up.svg";
import calendar from "@/app/assets/date_range.svg";

const formSchema = z.object({
  AmintDepositAmount: z
    .number()
    .positive({ message: "Value must be positive" })
    .min(500, { message: "Value must be above 500" })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .positive({ message: "Value must be positive" })
        .min(500, { message: "Value must be above 500" })
    ),
  lockInPeriod: z.string(),
  liquidationGains: z.boolean(),
});

const NewDeposit = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      AmintDepositAmount: undefined,
      lockInPeriod: undefined,
      liquidationGains: false,
    },
  });
  const [amintAmnt, lockIn] = form.watch(
    ["AmintDepositAmount", "lockInPeriod"],
    { AmintDepositAmount: undefined, lockInPeriod: undefined }
  );
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
      <div className="flex gap-[10px]">
        <Button variant={"outline"}>
          <p className="text-transparent font-semibold text-base text-center bg-clip-text bg-gradient-to-b from-[#808080] to-[#000] ">
            Withdraw Fees from All Deposits
          </p>
        </Button>
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
                    name="AmintDepositAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            step={1}
                            placeholder="Enter Amint Amount to Deposit"
                            {...field}
                            value={field.value ?? ""}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-[10px] items-center">
                    <div className="flex items-center">
                      <InfoCircledIcon width={18} height={18} />
                    </div>
                    <p className="text-base font-normal text-textGrey text-center leading-none">
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
                              <SelectItem value="30 days">30 Days</SelectItem>
                              <SelectItem value="60 days">
                                60 Days (~2 Months)
                              </SelectItem>
                              <SelectItem value="120 days">
                                120 Days (~4 Months)
                              </SelectItem>
                              <SelectItem value="180 days">
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
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
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
                    <div className="px-[15px] flex flex-col border border-lineGrey rounded bg-gradient-to-r from-white to-[#eee]">
                      <div className="py-[15px] flex items-center justify-between border-b border-lineGrey">
                        <div className="flex gap-[10px] items-center">
                          <Image
                            src={payments}
                            alt="payment"
                            width={24}
                            height={24}
                          />
                          <p className="text-base text-textHighlight">
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
                            {lockIn === "30 days" ? (
                              <>30 Days (~1 Month)</>
                            ) : lockIn === "60 days" ? (
                              <>60 Days (~2 Months)</>
                            ) : lockIn === "120 days" ? (
                              <>120 Days (~4 Months)</>
                            ) : lockIn === "180 days" ? (
                              <>180 Days (~6 Months)</>
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
                          <p className="text-base text-[#242424]">
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
                    //   disabled={!write}
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
