import React from 'react'
import bgBtc from "@/app/assets/btc.png";
import Image from "next/image";

export default function RightSideInfo() {
  return (
    <div className='flex flex-col h-fit items-center justify-center w-[500px] bg-white dark:bg-[#141414] px-4 gap-4 py-4 mt-20 rounded-md shadow-lg '>
      <h1 className='text-xl font-bold dark:text-[#DEDEDE]'>Experience seamless Amint minting/borrowing</h1>
      <div className='flex flex-col gap-2 '>
        <div className='flex '>
        1. Borrow & Mint
        </div>
        <div className='basis-5/6 text-[0.8rem] dark:text-[#DEDEDE]'>
        Mint stablecoins at 80% LTV by depositing crypto collateral (currently ETH). Enhance to 100% synthetic LTV by opting for 20% downside protection on your crypto price. Surrender a percentage of your upside and pay option fees to achieve this synthetic LTV.
        </div>
      </div>
      <div className='flex flex-col gap-2'>
      <div className='flex flex-col '>
      2. dCDS
        </div>
        <div className='basis-5/6 text-[0.8rem] dark:text-[#DEDEDE]'>
        Want to be on the earning side of those sweet derivative fees? Deposit USDa or TUSDT and ride the wave with potential gains of up to 200% APY. Keep in mind, it's high risk, high reward territory so risks of losing your capital are directly correlated with amount of fall in crypto collateral price.
        </div>
      </div>
      <div className='flex flex-col gap-2'>
      <div className='flex flex-col '>
      3. Loan Repayment
        </div>
        <div className='basis-5/6 text-[0.8rem] dark:text-[#DEDEDE]'>
        Once you've settled your stablecoin loan, get back half of your crypto collateral upfront, and the rest after a month. Plus, snag some ABOND—redeemable at $4 and backed by half of your crypto stash. Your collateral doesn't just sit idle; it's out there, earning you yields. Ready to cash in? Head over to the "Redeem" page after one month.
        </div>
      </div>

    </div>
  )
}
