import React from "react";
import { Button } from "../ui/button";

const ConfirmNotice = ({
  withdrawalTime,
  handleWithdrawal,
}: {
  withdrawalTime: string;
  handleWithdrawal: VoidFunction;
}) => {
  return (
    <div className="p-4 rounded-[6px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] flex flex-col min-[1440px]:gap-[15px] gap-2">
      <div className="flex flex-col min-[1440px]:gap-5 gap-[10px]">
        <div className="flex flex-col gap-[15px] ">
          <p className="min-[1440px]:text-base text-sm text-textSecondary">Amount</p>
          <p className="text-[#020202] font-medium min-[1440px]:text-[32px] text-2xl leading-none">
            3.42 AMINT
          </p>
        </div>
        <p className="min-[1440px]:text-base text-sm text-textHighlight  leading-none">
          {withdrawalTime === "first"
            ? `Second time withdrawal date will be ${`##-##-####`}`
            : `After second time withdrawal, this asset will be fully liquidated.`}
        </p>
      </div>
      <Button
        variant={"primary"}
        className="text-white"
        onClick={handleWithdrawal}
      >
        Confirm Withdrawal for the{" "}
        {withdrawalTime === "first" ? `First` : `Second`} time
      </Button>
    </div>
  );
};

export default ConfirmNotice;
