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

const CreateNewDeposit = () => {
  const [open, setOpen] = useState(false);
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
          <form
            onSubmit={(e) => {
              setOpen(false);
              e.preventDefault();
              toast.custom((t) => (
                <CustomToast
                  props={{
                    t,
                    toastMainColor: "#268730",
                    headline: "Transaction Submitted",
                    transactionHash: "09405049530945",
                    transactionHashLink: "https:etherscan.io/",
                    linkLabel: "View Transaction",
                    toastClosebuttonHoverColor: "#90e398",
                    toastClosebuttonColor: "#57C262",
                  }}
                />
              ));
            }}
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
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a Collateral" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Collateral</SelectLabel>
                    <SelectItem value="apple">Derivatives</SelectItem>
                    <SelectItem value="banana">dCds</SelectItem>
                    <SelectItem value="blueberry">Options</SelectItem>
                    <SelectItem value="grapes">ETH</SelectItem>
                    <SelectItem value="pineapple">USDC</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Collateral Amount"></Input>
              <div className="flex gap-[10px] items-center">
                <InfoCircledIcon width={18} height={18} />
                <p className="text-base font-normal text-textGrey text-center">
                  Minimum Collateral Amount is{" "}
                  <span className="font-medium text-textHighlight">
                    0.02 ETH
                  </span>
                </p>
              </div>
              <div className="p-[10px]">
                <p className="text-base text-textGrey mb-4">
                  Select Strike Price for call options
                </p>
                <Slider step={3} max={50} />
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
                  <p className="text-textHighlight font-medium text-base">3%</p>
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
              <Button type="submit" variant={"primary"} className="text-white">
                Confirm Deposit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewDeposit;
