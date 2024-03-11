'use client';
import ConnectWallet from '@/components/ConnectWallet/ConnectWallet';
import exp from 'constants'
import React from 'react'
import { useAccount } from 'wagmi';
import CylinderChart from './CylinderChart';
import Redeem from './Redeem';
import Divider from '@/components/CustomUI/Divider/Divider';
import { useCdsUsdtAmountDepositedTillNow, useTreasuryTotalVolumeOfBorrowersAmountinUsd } from '@/abiAndHooks';
import { formatEther } from 'ethers';
import {
  abondAddress,
  amintAddress,
  usdtContractAddress
} from "@/abiAndHooks";
import StatItem from './StateItems';

const dasboardStatsItem = [
  {
    heading: "USDT",
    value: "0",
    tokenAddress: usdtContractAddress,
  },
  {
    heading: "ETH",
    value: "0",
  },
  {
    heading: "AMINT ",
    value: "0",
    tokenAddress: amintAddress,
  },
  {
    heading: "ABOND",
    value: "0",
    tokenAddress: abondAddress,
  },
];

const page = () => {
  const { isConnected, address,connector:activeConnector} = useAccount();
  const [Option, setOption] = React.useState("eth");
  const {data:ethLocked} = useTreasuryTotalVolumeOfBorrowersAmountinUsd({watch:true});
  const {data:usdtLoked} = useCdsUsdtAmountDepositedTillNow({watch:true});
  return (
    <>
      {isConnected ? (
        <div className="relative p-6  rounded-[10px] bg-white dark:bg-slate-950 dark:border shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden min-h-[90vh] md:min-h-[82vh]">

          <div className='flex gap-6'>
              {
                dasboardStatsItem.map((item, index) => {
                  return (
                    <StatItem key={index} props={item} />
                  )
                })
              }
          </div>
          <Divider />
          <div className='flex gap-4'>


            <div className='border rounded-lg basis-1/2 border-lineGrey'>
           
              <div className="flex flex-col w-[250px] bg-white md:max-w-sm ">
                <div className="relative flex items-center h-12 w-full p-1 mx-0 lg:mx-8 mt-4 bg-slate-50 border rounded-[10px] shadow">
                  <div className="flex justify-center w-full">
                    <button onClick={() => setOption("eth")}>ETH</button>
                  </div>
                  <div className="flex justify-center w-full">
                    <button onClick={() => setOption("usdt")}>USDT</button>
                  </div>
                  <span
                    className={` bg-[#ffffff] border-[1px] border-[#C4C4C4] shadow text-gray-800 flex items-center justify-center w-1/2 rounded-[10px] h-10 transition-all top-[4px] absolute  ${Option == "usdt" ? "right-1" : "right-none"} `}>
                    {Option === "eth" ? "ETH" : "USDT"}
                  </span>
                  
                </div>
              </div>

              <div className='flex items-center justify-center pt-4'>
                {
                  Option === "eth" ? <CylinderChart type={Option} value={Number(formatEther(ethLocked?? 0n))/100} /> : <CylinderChart type={Option} value={Number(usdtLoked)/(10**6)} />
                }
              </div>
            </div>

            <div className='border rounded-lg basis-1/2 border-lineGrey'>
              <Redeem />
            </div>
          </div>
        </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  )
}
export default page;