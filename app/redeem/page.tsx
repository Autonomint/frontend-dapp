'use client';
import ConnectWallet from '@/components/ConnectWallet/ConnectWallet';
import exp from 'constants'
import React from 'react'
import { useAccount } from 'wagmi';
import PoolInfo from './PoolInfo';
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

  // get the account details
  const { isConnected, address, connector: activeConnector } = useAccount();

  // fetch data from the blockchain
  const { data: ethLocked } = useTreasuryTotalVolumeOfBorrowersAmountinUsd({ watch: true });
  const { data: usdtLoked } = useCdsUsdtAmountDepositedTillNow({ watch: true });
  return (
    <>
      {/* 
      if the user is connected to the wallet, show the dashboard
      else show the connect wallet component
      */}
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
              <PoolInfo type={"eth"} value={Number(formatEther(ethLocked ?? 0n)) / 100} />
              <PoolInfo type={"usdt"} value={Number(usdtLoked) / (10 ** 6)} />
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


