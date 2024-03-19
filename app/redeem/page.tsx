'use client';
import ConnectWallet from '@/components/ConnectWallet/ConnectWallet';
import exp from 'constants'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi';
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
import dynamic from 'next/dynamic'
import eth from "@/app/assets/eth.svg";
import usdt from "@/app/assets/tether-usdt.svg";
import Image from 'next/image';

const RatioPieChart = dynamic(() => import('./RatioPieChart'), {
  ssr: false,
})
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

const poolValues = [
  {
    type: "usdt",
    value: 0,
    limit:0
  },
  {
    type: "eth",
    value: 0,
    limit:0
  },
]
const setLimit= (value:number)=>{
  const limitArray = [1000,10000,100000, 1000000, 10000000, 100000000]
  let limit = limitArray[0];
  for(let i=0;i<limitArray.length;i++){
    if(value < limitArray[i]*0.95){
      limit = limitArray[i];
      break;
    }
  }
  return limit;
}
function formatNumber(num: number) {
  if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'k';
  } else {
      return num.toFixed(2);
  }
}
const page = () => {

  // get the account details
  const { isConnected, address, connector: activeConnector } = useAccount();

  // fetch data from the blockchain
  const { data: ethLocked } = useTreasuryTotalVolumeOfBorrowersAmountinUsd({ watch: true });
  const { data: usdtLocked } = useCdsUsdtAmountDepositedTillNow({ watch: true });
  useEffect(() => {
    if(ethLocked && usdtLocked){
      poolValues[0].value = Number(usdtLocked) / (10 ** 6);
      poolValues[0].limit = setLimit(Number(usdtLocked) / (10 ** 6))
      poolValues[1].value = Number(formatEther(ethLocked ?? 0n)) / 100;
      poolValues[1].limit = setLimit(Number(formatEther(ethLocked )) / 100)

    }
  }, [ethLocked, usdtLocked]);

  return (
    <>
      {isConnected ? (
        <div className="relative p-6  rounded-[10px] bg-white dark:bg-[#0F0F0F] dark:shadow-none shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden min-h-[90vh] md:min-h-[82vh]">

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
          <div>
            <div className='text-2xl text-[#041A50] font-medium dark:text-[#90AFFF] '>Collateral Pool</div>
            <div className='text-sm text-[#5B5B5B] dark:text-[#EEEEEE] '>A list of all locked assests int the Asset Pool</div>
          </div>
          <div className='flex gap-4 mt-4'>
            <div className='flex flex-col items-center justify-center gap-4 basis-2/3'>
              {
                poolValues.map((item, index) => {
                  return (
                    <div key={index} className='flex w-full h-full border  border-lineGrey bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)] dark:border-[#5B5B5B] rounded-lg shadow-lg overflow-hidden'>
                    <div className='basis-[60%] p-4 '>
                        <div className='flex gap-2 text-2xl'>
                            <Image src={item.type === 'usdt' ? usdt : eth} alt="usdt" width={35} height={35} /> {item.type === 'usdt' ? 'USDT' : 'ETH'}
                        </div>
                        <div className='grid grid-cols-3 gap-5 p-2 mt-2 '>
                            <div >
                                <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>APY</p>
                                <p className='text-xl font-medium'>0.00%</p>
                            </div>
                            <div>
                                <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>Withdraw Fee</p>
                                <p className='text-xl font-medium'>0.00%</p>
                            </div>
                            <div>
                                <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>Withdraw Fee</p>
                                <p className='text-xl font-medium'>0.00%</p>
                            </div>
                            <div>
                                <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>Limit</p>
                                <p className='text-xl font-medium'>0.00%</p>
                            </div>
                            <div>
                                <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>Collateral</p>
                                <p className='text-xl font-medium'>0.00%</p>
                            </div>
                            <div>
                                <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>APY</p>
                                <p className='text-xl font-medium'>0.00%</p>
                            </div>
                        </div>
        
        
                    </div>
                    <div className="basis-[40%] ">
                          <div className="flex pt-4 w-full h-full flex-col bg-[linear-gradient(270deg,#CDF3FF_0%,#D8FFEA_100%)]      dark:bg-[linear-gradient(270deg,#16603B_0%,#0D4A5C_100%)]   rounded-br-none">
                            <div className="px-[20px]  flex justify-between">
                              <div className="flex flex-col gap-2">
                                <h5 className="text-[#47D58C] text-sm font-normal">
                                  Current TVL
                                </h5>
                                <p className="font-medium text-2xl text-[#47D58C]">${formatNumber(item.value)}</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <h5 className="text-[#C4C4C4] text-sm font-normal dark:text-[#EEEEEE]">
                                  Target TVL
                                </h5>
                                <p className="font-medium text-2xl text-[#EEEEEE] dark:text-[#EEEEEE]">${formatNumber(item.limit)}</p>
                              </div>
                            </div>
                            <div className="h-full ">

                              <RatioPieChart key={index} value1={(item.value/item.limit *100).toFixed(2)} value2={((item.limit-item.value)/item.limit *100).toFixed(2)} />
                            </div>
                          </div>
                        </div>
                </div>
                  )
                })
              }
              
            </div>
            <Divider className='w-[1px] h-auto m-0' />
            <div className='border rounded-lg shadow-lg basis-1/3 border-lineGrey dark:border-[#5B5B5B]'>
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


