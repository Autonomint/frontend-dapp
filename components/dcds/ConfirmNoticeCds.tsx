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
    <div className="flex flex-col w-full gap-4 px-4">

    <div className="p-4 border border-[#00679F] bg-[#ffffff] dark:bg-transparent dark:border-white  flex flex-col min-[1440px]:gap-[15px] gap-2 2dppx:gap-2">
        {optedForLiquidation ?(
          <div className="flex items-center justify-between w-full gap-5">
        <p className="min-[1440px]:text-base text-xs 2dppx:text-xs text-[#00679F] font-normal ">
          Withdraw Amount + ETH accrued from Liquidation Gains
        </p>
        {/* <Switch onCheckedChange={() => setSwitchOn(!switchOn)} />  */}
      </div>
        ) :(
          <p className="min-[1440px]:text-base text-xs 2dppx:text-xs text-[#00679F] dark:text-white font-normal ">
          Withdraw Deposits
        </p>
        )}

      <Divider className="my-[5px] bg-[#00679F] dark:bg-white" />

      
      <div className="flex flex-col min-[1440px]:gap-5 2dppx:gap-[10px] gap-[10px]">
        <div className="flex flex-col gap-[15px] ">
          <p className="min-[1440px]:text-base 2dppx:text-sm text-sm text-[#00679F] dark:text-[#EEEEEE] ">
            Amount
          </p>
          <p className="text-[#00679F] dark:text-white   font-medium min-[1440px]:text-[32px] 2dppx:text-2xl text-2xl leading-none">
            {optedForLiquidation ? `${withdrawdata[0]/10**6} USDa + ${withdrawdata.length==2?withdrawdata[2]:"0" } ETH`: `${withdrawdata[0]/10**6} USDa` }
          </p>
        </div>
      </div>
      </div>
      <Button
        variant={"primary"}
        className="border-[#041A50] bg-[#ABFFDE] text-sm border-[1px] shadow-smallcustom py-2 rounded-none w-full "
        onClick={handleWithdrawal}
        disabled={setLoding}
        >
        Confirm Withdrawal
      </Button>
        </div>
  );
};

export default ConfirmNoticeCds;
