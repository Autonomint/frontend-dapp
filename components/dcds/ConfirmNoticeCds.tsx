import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Divider from "@/components/CustomUI/Divider/Divider";

const ConfirmNoticeCds = ({
  handleWithdrawal,
  amintToMint,
  setLoding,
  withdrawdata,
  optedForLiquidation,
}: {
  handleWithdrawal: VoidFunction;
  amintToMint: string;
  setLoding: boolean;
  withdrawdata: number[];
  optedForLiquidation: boolean;
}) => {
  const [switchOn, setSwitchOn] = React.useState(false);
  return (
    <div className="p-4 rounded-[6px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] flex flex-col min-[1440px]:gap-[15px] gap-2 2dppx:gap-2">
        {optedForLiquidation ?(
          <div className="flex items-center justify-between w-full gap-5">
        <p className="min-[1440px]:text-base text-xs 2dppx:text-xs text-textGrey font-normal ">
          Withdraw Amount + ETH accrued from Liquidation Gains
        </p>
        {/* <Switch onCheckedChange={() => setSwitchOn(!switchOn)} />  */}
      </div>
        ) :(
          <p className="min-[1440px]:text-base text-xs 2dppx:text-xs text-textGrey font-normal ">
          Withdraw Deposits
        </p>
        )}

      <Divider className="my-[5px]" />

      
      <div className="flex flex-col min-[1440px]:gap-5 2dppx:gap-[10px] gap-[10px]">
        <div className="flex flex-col gap-[15px] ">
          <p className="min-[1440px]:text-base 2dppx:text-sm text-sm text-textSecondary dark:text-[#EEEEEE] ">
            Amount
          </p>
          <p className="text-[#020202] font-medium min-[1440px]:text-[32px] 2dppx:text-2xl text-2xl leading-none">
            {optedForLiquidation ? `${withdrawdata[0]/10**6} AMINT + ${withdrawdata.length==2?withdrawdata[2]:"0" } ETH`: `${withdrawdata[0]/10**6} AMINT` }
          </p>
        </div>
      </div>
      <Button
        variant={"primary"}
        className="text-white"
        onClick={handleWithdrawal}
        disabled={setLoding}
      >
        Confirm Withdrawal
      </Button>
    </div>
  );
};

export default ConfirmNoticeCds;
