'use client';
import React, { useEffect } from 'react'
import LeaderTable from './LeaderTable';
import { BACKEND_API_URL } from '@/constants/BackendUrl';
import { useQuery } from "@tanstack/react-query";
import { useChainId } from 'wagmi';
import { useCdsCdsCount, useCdsTotalCdsDepositedAmount, useTreasuryNoOfBorrowers, useTreasuryTotalVolumeOfBorrowersAmountinUsd } from '@/abiAndHooks';
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
    // const { data: ethLocked } = useTreasuryTotalVolumeOfBorrowersAmountinUsd({ watch: true })
    // const { data: totalStable } = useCdsTotalCdsDepositedAmount({ watch: true })
    const {data :cdsdeposit} = useCdsCdsCount({watch:true})
    const {data:totalBorrowers} = useTreasuryNoOfBorrowers({watch:true})
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
        // Set the query key to include chainId and address
        queryKey: ["borrowDeposits", chainId],
        // Call the getDeposits function to fetch deposits
        queryFn: () => getBorrowLeaderboard(),
      });
        console.log(borrowdeposits)

      const { data: cdsdeposits, error: cdsdepositsError } = useQuery<TableData[]>({
        // Set the query key to include chainId and address
        queryKey: ["Cdsdeposits", chainId],
        // Call the getDeposits function to fetch deposits
        queryFn: () => getCdsLeaderboard(),
      });
    return (

        <div className="relative p-2 md:p-6  rounded-[10px] bg-white dark:bg-[#0F0F0F] dark:shadow-none shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden min-h-[90vh] md:min-h-[82vh]">
            <div className='overflow-hidden border-1 dark:border-none'>
                <div className='bg-white dark:bg-[#141414]  rounded-lg flex mb-2 gap-10 '>
                        <div className='flex flex-col gap-2 px-2 py-2 pr-2 border rounded-md shadow-sm border-lineGrey md:px-5 md:py-4 lg:px-10 lg:py-5'>
                            <div className='text-[0.8rem] md:text-sm lg:text-normal' >Total number of borrowers</div>
                            <div className='text-[1rem] md:text-xl font-semibold lg:text-3xl'>{Number(totalBorrowers)}</div>
                        </div>
                        <div className='flex flex-col gap-2 px-2 py-2 pr-2 border rounded-md shadow-sm border-lineGrey md:px-5 md:py-4 lg:px-10 lg:py-5'>
                        <div  className='text-[0.8rem] md:text-sm lg:text-normal'>Total number of dcds depositors</div>
                            <div className='text-[1rem] md:text-xl font-semibold lg:text-3xl'>{Number(cdsdeposit)}</div>
                        </div>
                        {/* <div className='flex flex-col gap-2 '>
                        <div  className='text-[0.8rem] md:text-sm lg:text-normal'>Total Value Locked (TVL) </div>
                            <div className='text-[1rem] md:text-xl font-semibold lg:text-3xl'>${formatNumber((Number(totalStable) / 10 ** 6) + Number(formatEther((ethLocked ?? 0n) / BigInt(100))))}</div>
                        </div> */}
                </div>
                {/* <h1 className='mb-2 text-3xl font-bold text-textPrimary dark:text-white'>Leaderboard</h1> */}
                {/* <div className='w-[350px] mb-2'>
                    <ul className="overflow-hidden text-sm font-medium text-center text-gray-500 shadow rounded-xl sm:flex dark:divide-gray-700 dark:text-gray-400">
                        <li onClick={()=>setSelectedTab("borrow")} className="w-full focus-within:z-10">
                            <a href="#" className="inline-block w-full p-2 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg dark:bg-gray-700 dark:text-white" aria-current="page">Borrow</a>
                        </li>
                        <li onClick={()=>setSelectedTab("dcds")} className="w-full focus-within:z-10">
                            <a href="#" className="inline-block w-full p-2 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">dCDS</a>
                        </li>
                    </ul>
                </div> */}
                <div className='flex flex-col xl:flex-row w-full gap-5   md:p-4 bg-white rounded-lg  dark:bg-[#141414] shadow-sm'>
                    <div className='w-full dark:bg-none'>
                        <div className='my-2 text-xl font-bold text-center'>
                            Borrow
                        </div>
                        <LeaderTable tableType='borrow' data={borrowdeposits ?? []}/>
                    </div>
                    <div className='w-full dark:bg-none '>
                        <div className='my-2 text-xl font-bold text-center'>
                            dCDS
                        </div>
                        <LeaderTable tableType='cds' data={cdsdeposits ?? []}/>
                    </div>
                </div>

            </div>
        </div>
    )
}
