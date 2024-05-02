'use client';
import React, { useEffect } from 'react'
import LeaderTable from './LeaderTable';
import { BACKEND_API_URL } from '@/constants/BackendUrl';
import { useQuery } from "@tanstack/react-query";
import { useChainId } from 'wagmi';
interface TableData {
    rank: string;
    address: string;
    totalDepositedAmount?: string;
    cdsdeposit?: number;
    points: string;
    totalLTV?: number;
    yield: number;
}

export default function page() {
    const chainId = useChainId();

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

      const { data: cdsdeposits, error: cdsdepositsError } = useQuery<TableData[]>({
        // Set the query key to include chainId and address
        queryKey: ["Cdsdeposits", chainId],
        // Call the getDeposits function to fetch deposits
        queryFn: () => getCdsLeaderboard(),
      });
    return (
        <div className='px-10 mt-5'>
            <div className='overflow-hidden  border-1 dark:border-none'>
                <div className='bg-white dark:bg-[#141414] rounded-lg flex mb-5 gap-10 px-5 py-5 lg:px-10 lg:py-8 shadow-sm'>
                        <div className='flex flex-col gap-2 pr-2 border-r-2 lg:pr-5'>
                            <div className='text-sm lg:text-normal' >Total number of borrowers</div>
                            <div className='text-xl font-semibold lg:text-3xl'>1000</div>
                        </div>
                        <div className='flex flex-col gap-2 pr-2 border-r-2 lg:pr-5'>
                        <div  className='text-sm lg:text-normal'>Total number of dcds depositors</div>
                            <div className='text-xl font-semibold lg:text-3xl'>1000</div>
                        </div>
                        <div className='flex flex-col gap-2 '>
                        <div  className='text-sm lg:text-normal'>Total Value Locked (TVL) </div>
                            <div className='text-xl font-semibold lg:text-3xl'>1000</div>
                        </div>
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
                <div className='flex flex-col lg:flex-row w-full gap-5   p-4 bg-white rounded-lg  dark:bg-[#141414] shadow-sm'>
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
