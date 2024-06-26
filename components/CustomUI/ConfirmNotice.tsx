import React from "react";
import { Button } from "../ui/button";
import { formatEther } from "viem";
import displayNumberWithPrecision from "@/app/utils/precision";
import calculateNext30Days from "@/app/utils/calculateNext30Days";
import Spinner from "../ui/spinner";

const ConfirmNotice = ({
  withdrawalTime,
  handleWithdrawal,
  amintToMint,
  isLoading,
}: {
  withdrawalTime: string;
  handleWithdrawal: VoidFunction;
  amintToMint: number;
  isLoading: boolean;
}) => {
  return (
    <div className="p-4 rounded-[6px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] dark:bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#192944_-0.22%,#000918_100%)] flex flex-col min-[1440px]:gap-[15px] gap-2 2dppx:gap-2">
      <div className="flex flex-col min-[1440px]:gap-5 2dppx:gap-[10px] gap-[10px]">
        <div className="flex flex-col gap-[15px] ">
          <p className="min-[1440px]:text-base 2dppx:text-sm text-sm text-textSecondary dark:text-[#ffff]">
            Amount to be returned back
          </p>
          <p className="text-[#020202] font-medium min-[1440px]:text-[32px] 2dppx:text-2xl text-2xl leading-none dark:text-[#ffff]">
          {withdrawalTime === "DEPOSITED"
            ? `${(parseFloat(amintToMint.toString())/10**6).toString()} AMINT`
            : `~${amintToMint.toString()} ETH`}
          
          </p>
        </div>
        <p className="min-[1440px]:text-base text-sm 2dppx:text-sm text-textHighlight dark:text-[#ffff]  leading-none">
          {withdrawalTime === "DEPOSITED"
            ? `Second time withdrawal date will be ${calculateNext30Days()}`
            : ""}
        </p>
      </div>
      <Button
        variant={"primary"}
        className="text-white dark:text-[#ffff]"
        onClick={handleWithdrawal}
      >
        {isLoading ? <Spinner/> : `Confirm Withdrawal for the
        ${withdrawalTime === "DEPOSITED" ? `First` : `Second`} time`}
        
      </Button>
    </div>
  );
};

export default ConfirmNotice;





