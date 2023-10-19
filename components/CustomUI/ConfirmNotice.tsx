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
    <div className="p-4 rounded-[6px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] flex flex-col gap-[15px]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[15px] ">
          <p className="text-base text-textSecondary">Amount</p>
          <p className="text-[#020202] font-medium text-[32px] leading-none">
            3.42 AMINT
          </p>
        </div>
        <p className="text-textHighlight text-base leading-none">
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
