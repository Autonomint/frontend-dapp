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
import { Cross2Icon } from "@radix-ui/react-icons";
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

const formSchema = z.object({
  AmintDepositAmount: z
    .number()
    .positive({ message: "Value must be positive" })
    .or(z.string())
    .pipe(
      z.coerce.number().positive({ message: "Value must be positive" }).min(1)
    ),
  lockInPeriod: z.string(),
  liquidationGains: z.boolean(),
});

const NewDeposit = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lockInPeriod: undefined,
      liquidationGains: false,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // console.log("depositData", depositData);
    // write?.();
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
                            min={1}
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
