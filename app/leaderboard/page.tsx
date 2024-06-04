'use client';
import React, { useEffect } from 'react'
import LeaderTable from './LeaderTable';
import { BACKEND_API_URL } from '@/constants/BackendUrl';
import { useQuery } from "@tanstack/react-query";
import { useChainId ,useReadContract} from 'wagmi';
import {treasuryAbi,treasuryAddress,cdsAbi,cdsAddress, useReadCdsCdsCount, useReadCdsTotalCdsDepositedAmount, useReadTestusdtAbi, useReadTreasuryNoOfBorrowers, useReadTreasuryTotalVolumeOfBorrowersAmountinUsd } from '@/abiAndHooks';
import { formatEther } from 'viem';
interface TableData {
    rank: string;
    address: string;
    totalDepositedAmount?: string;
    cdsdeposit?: number;
    totalAmint?: string;
    points: string;
    totalLTV?: number;
    yield: number;
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
  

export default function page() {
    const chainId = useChainId();
    const {data:ethlockedSepolia} = useReadContract({
        abi:treasuryAbi,
        address:treasuryAddress[11155111],
        functionName:'totalVolumeOfBorrowersAmountinUSD',
        args:[],
        chainId:11155111
    })
    const {data:ethlockedbase} = useReadContract({
        abi:treasuryAbi,
        address:treasuryAddress[84532],
        functionName:'totalVolumeOfBorrowersAmountinUSD',
        args:[],
        chainId:84532
    })

    const {data:stableLockedSepolia} = useReadContract({
        abi:cdsAbi,
        address:cdsAddress[11155111],
        functionName:'totalCdsDepositedAmount',
        args:[],
        chainId:11155111
    })
    const {data:stableLockedBase} = useReadContract({
        abi:cdsAbi,
        address:cdsAddress[84532],
        functionName:'totalCdsDepositedAmount',
        args:[],
        chainId:84532
    })


    const { data: totalStable } = useReadCdsTotalCdsDepositedAmount()
    async function getBorrowLeaderboard(): Promise<TableData[]> {
        const response = await fetch(`${BACKEND_API_URL}/borrows/leaderboard`);
        return await response.json();
    }
    async function getCdsLeaderboard(): Promise<TableData[]> {
        const response = await fetch(`${BACKEND_API_URL}/cds/cds/leaderboard`);
        return await response.json();
    }
    //   Fetch and store deposits using react-query
    const { data: borrowdeposits, error: borrowdepositsError } = useQuery<TableData[]>({
        queryKey: ["borrowDeposits", chainId],
        queryFn: () => getBorrowLeaderboard(),
      });
      
      const { data: cdsdeposits, error: cdsdepositsError } = useQuery<TableData[]>({
          queryKey: ["Cdsdeposits", chainId],
          queryFn: () => getCdsLeaderboard(),
        });
    return (
        <div className='w-full px-2 sm:px-5'>
        <div className='px-2 sm:px-8 py-5 w-full bg-white shadow-custom border-[1px] dark:bg-[#242424] dark:shadow-darkcustom border-[#9E9E9E] mdb:min-h-[84vh] '>
            <div className='overflow-hidden border-1 dark:border-none'>
                <div className='flex w-full gap-2 mb-5 md:gap-10'>
                        <div className='flex flex-col gap-2 basis-1/3 bg-[#E4EDFF] dark:bg-[#020B28] dark:text-[#4AFBD5] px-4 py-4 lg:px-5 lg:py-4 shadow-sm text-[#00679F]'>
                            <div className='text-sm lg:text-normal' >Total number of borrowers</div>
                            <div className='text-xl font-semibold lg:text-3xl'>{borrowdeposits?.length}</div>
                        </div>
                        <div className='flex flex-col gap-2 basis-1/3 bg-[#E4EDFF] dark:bg-[#020B28] dark:text-[#4AFBD5] px-4 py-4 lg:px-5 lg:py-4 shadow-sm text-[#00679F]'>
                        <div  className='text-sm lg:text-normal'>Total number of dcds depositors</div>
                            <div className='text-xl font-semibold lg:text-3xl'>{cdsdeposits?.length}</div>
                        </div>
                        <div className='flex flex-col gap-2 basis-1/3 bg-[#E4EDFF] dark:bg-[#020B28] dark:text-[#4AFBD5] px-4 py-4 lg:px-5 lg:py-4 shadow-sm text-[#00679F]'>
                        <div  className='text-sm lg:text-normal'>Total Value Locked (TVL) </div>
                            <div className='text-xl font-semibold lg:text-3xl'>${formatNumber((Number((stableLockedBase ?? 0n ) +(stableLockedSepolia ?? 0n)) / 10 ** 6) + Number(formatEther(((ethlockedbase ?? 0n) + (ethlockedSepolia ?? 0n)) / BigInt(100))))}</div>
                        </div>
                </div>

                <div className='flex flex-col w-full gap-10 p-0 lg:flex-row shadow-custom sm:p-1 '>
                    <div className='basis-1/2 dark:bg-none border border-[#020202] dark:border-[#9E9E9E] shadow-custom dark:shadow-darkcustom  '>
                        <div className=' text-[1.5rem] py-5 px-5 font-medium  bg-[linear-gradient(88.13deg,#CCFFDE_0%,#ABFFFF_99.86%)] dark:bg-[linear-gradient(88.13deg,#004D1A_0%,#005050_99.86%)]'>
                            Top Borrowers
                        </div>
                        <LeaderTable tableType='borrow' data={borrowdeposits ?? []}/>
                    </div>

                    <div className='basis-1/2 dark:bg-none border border-[#020202] dark:border-[#9E9E9E]  shadow-custom dark:shadow-darkcustom '>
                        <div className='text-[1.5rem] py-5 px-5 font-medium bg-[linear-gradient(88.13deg,#FFCCF4_0%,#FFD8AB_99.86%)] dark:bg-[linear-gradient(88.13deg,#5E004A_0%,#4C2900_99.86%)]'>
                            Top dCDS Depositors
                        </div>
                        <LeaderTable tableType='cds' data={cdsdeposits ?? []}/>
                    </div>
                </div>

            </div>

            </div>

        </div>
    )
}



