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
}: {
  withdrawalTime: string;
  handleWithdrawal: VoidFunction;
  amintToMint: number;
}) => {
  return (
    <div className=" mx-4  flex flex-col min-[1440px]:gap-[15px] gap-2 2dppx:gap-2">
      <div className="p-4 flex flex-col min-[1440px]:gap-[15px] gap-2 2dppx:gap-2 border border-[#00679F] bg-[#FFFFFF] dark:bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#192944_-0.22%,#000918_100%)]">

      <div className="flex flex-col min-[1440px]:gap-5 2dppx:gap-[10px] gap-[10px]">
        <div className="flex flex-col gap-[15px] ">
          <p className="min-[1440px]:text-base 2dppx:text-sm text-sm text-[#00679F] dark:text-[#ffff]">
            Amount to be returned back
          </p>
          <p className="text-[#00679F] font-medium min-[1440px]:text-[32px] 2dppx:text-2xl text-2xl leading-none dark:text-[#ffff]">
          {withdrawalTime === "DEPOSITED"
            ? `${(parseFloat(amintToMint.toString())/10**6).toString()} USDa`
            : `~${amintToMint.toString()} ETH`}
          
          </p>
        </div>
      </div>
            </div>
      <Button
        variant={"primary"}
        className="border-[#041A50] bg-[#ABFFDE] text-sm border-[1px] shadow-smallcustom py-2 rounded-none basis-1/2 "
        onClick={handleWithdrawal}
      >
       {  `Confirm repay of ${withdrawalTime === "DEPOSITED" ? "USDa" : "ETH"}`}
       
        
      </Button>
    </div>
  );
};

export default ConfirmNotice;





