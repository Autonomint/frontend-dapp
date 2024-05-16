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
    const { data: ethLocked } = useTreasuryTotalVolumeOfBorrowersAmountinUsd({ watch: true })
    const { data: totalStable } = useCdsTotalCdsDepositedAmount({ watch: true })
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
        <div className='w-full px-2 sm:px-5'>
        <div className='px-2 sm:px-8 py-5 w-full bg-white shadow-custom border-[1px] border-[#9E9E9E] mdb:h-[84vh] '>
            <div className='overflow-hidden border-1 dark:border-none'>
                <div className=' dark:bg-[#141414] flex mb-5 gap-2 md:gap-10 w-full '>
                        <div className='flex flex-col gap-2 basis-1/3 bg-[#E4EDFF] px-4 py-4 lg:px-5 lg:py-4 shadow-sm text-[#00679F]'>
                            <div className='text-sm lg:text-normal' >Total number of borrowers</div>
                            <div className='text-xl font-semibold lg:text-3xl'>{Number(totalBorrowers)}</div>
                        </div>
                        <div className='flex flex-col gap-2 basis-1/3 bg-[#E4EDFF] px-4 py-4 lg:px-5 lg:py-4 shadow-sm text-[#00679F]'>
                        <div  className='text-sm lg:text-normal'>Total number of dcds depositors</div>
                            <div className='text-xl font-semibold lg:text-3xl'>{Number(cdsdeposit)}</div>
                        </div>
                        <div className='flex flex-col gap-2 basis-1/3 bg-[#E4EDFF] px-4 py-4 lg:px-5 lg:py-4 shadow-sm text-[#00679F]'>
                        <div  className='text-sm lg:text-normal'>Total Value Locked (TVL) </div>
                            <div className='text-xl font-semibold lg:text-3xl'>${formatNumber((Number(totalStable) / 10 ** 6) + Number(formatEther((ethLocked ?? 0n) / BigInt(100))))}</div>
                        </div>
                </div>

                <div className='flex flex-col lg:flex-row w-full gap-10 dark:bg-[#141414] shadow-custom p-0 sm:p-1 '>
                    <div className='basis-1/2 dark:bg-none border border-[#020202] shadow-custom '>
                        <div className=' text-[1.5rem] py-5 px-5 font-medium  bg-[linear-gradient(88.13deg,#CCFFDE_0%,#ABFFFF_99.86%)]'>
                            Top Borrowers
                        </div>
                        <LeaderTable tableType='borrow' data={borrowdeposits ?? []}/>
                    </div>

                    <div className='basis-1/2 dark:bg-none border border-[#020202]  shadow-custom '>
                        <div className='text-[1.5rem] py-5 px-5 font-medium bg-[linear-gradient(88.13deg,#FFCCF4_0%,#FFD8AB_99.86%)]'>
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




