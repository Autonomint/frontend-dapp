import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Divider from "@/components/CustomUI/Divider/Divider";

const ConfirmNoticeCds = ({
  handleWithdrawal,
  amintToMint,
}: {
  handleWithdrawal: VoidFunction;
  amintToMint?: bigint;
}) => {
  const [switchOn, setSwitchOn] = React.useState(false);
  return (
    <div className="p-4 rounded-[6px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] flex flex-col min-[1440px]:gap-[15px] gap-2">
      <div className="flex w-full gap-5 items-center justify-between">
        <p className="min-[1440px]:text-base text-xs text-textGrey font-normal ">
          Withdraw ETH accrued from Liquidation Gains Instead
        </p>
        <Switch onCheckedChange={() => setSwitchOn(!switchOn)} />
      </div>
      <Divider className="my-[5px]" />
      <div className="flex flex-col min-[1440px]:gap-5 gap-[10px]">
        <div className="flex flex-col gap-[15px] ">
          <p className="min-[1440px]:text-base text-sm text-textSecondary">
            Amount
          </p>
          <p className="text-[#020202] font-medium min-[1440px]:text-[32px] text-2xl leading-none">
            {/* {displayNumberWithPrecision(formatEther(amintToMint))}  */}
            {switchOn ? `0.002 ETH` : `3.42 AMINT or 0.002 ETH`}
          </p>
        </div>
      </div>
      <Button
        variant={"primary"}
        className="text-white"
        onClick={handleWithdrawal}
      >
        Confirm Withdrawal
      </Button>
    </div>
  );
};

export default ConfirmNoticeCds;