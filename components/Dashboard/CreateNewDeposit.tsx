"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

import addIcon from "@/app/assets/add_circle.svg";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const CreateNewDeposit = () => {
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
      <Dialog>
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
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a New Deposit</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        </div>
        <DialogFooter>
          <Button type="submit">Confirm Deposit</Button>
        </DialogFooter>
      </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewDeposit;
