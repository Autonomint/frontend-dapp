'use client'
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";
import Image from 'next/image';
import baselogo from '@/app/assets/base-logo.png';
import sepolialogo from '@/app/assets/eth.svg';
interface TableData {
    rank: string;
    address: string;
    totalDepositedAmount?: string;
    totalAmint?: string;
    cdsdeposit?: number;
    points: string;
    totalLTV?: number;
    yield: number;
    chainId: number;
}




const LeaderTable = ({ tableType, data }: { tableType: string, data: TableData[] }) => {
    const [sortedData, setSortedData] = useState<TableData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState(null);
    const [pagecount, setPageCount] = useState(1);
    const itemsPerPage = 10;
    useEffect(() => {
        let sorted = [...data];

        if (sortField) {
            sorted.sort((a, b) => (a[sortField] > b[sortField]) ? 1 : -1);
        }
        setSortedData(sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [data, currentPage, sortField]);
    return (
        <div>

            <div className='border-t border-black shadow-sm dark:border-gray-700'>
                <div className=' dark:bg-[#141414]   min-h-[25rem] sm:overflow-auto  overflow-x-scroll  '>
                    <Table className='min-w-[400px]'>
                        <TableHeader>
                            <TableRow className='dark:bg-none  dark:bg-[#1a1a1a]'>
                                <TableHead className="w-3 opacity-1 text-[#5B5B5B] dark:text-[#C4C4C4]">Rank</TableHead>
                                <TableHead className="text-[#5B5B5B] dark:text-[#C4C4C4]">Address</TableHead>
                                {
                                    tableType === 'borrow' ? <TableHead className="text-[#5B5B5B] dark:text-[#C4C4C4]">USDa Borrowed</TableHead> :
                                        <TableHead className="text-[#5B5B5B] dark:text-[#C4C4C4]">dCDS deposits</TableHead>
                                }
                                {/* <TableHead className="text-white dark:text-[#C4C4C4]">Points</TableHead> */}
                                {
                                    tableType === 'cds' ? null : <TableHead className="text-[#5B5B5B] dark:text-[#C4C4C4]">LTV ratio</TableHead>
                                }
                                <TableHead className="text-[#5B5B5B] dark:text-[#C4C4C4]">Points</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody className=''>
                            {
                                sortedData.map((data, index) => (
                                    <TableRow key={index} className={` text-black
                                    hover:bg-[#E4EDFF] active:bg-[#E4EDFF] dark:active:bg-[#002A11] h-8   dark:border cursor-pointer `
                                    }>
                                        <TableCell>
                                            <div className={
                                                ` ${(currentPage - 1) * itemsPerPage + index + 1 === 1 ? 'bg-[#FFECC7] text-[#BC7C00] dark:text-[#BC7C00] ' :
                                                    (currentPage - 1) * itemsPerPage + index + 1 === 2 ? 'bg-[#CEE1E6] text-[#587676] dark:text-[#587676]' :
                                                        (currentPage - 1) * itemsPerPage + index + 1 === 3 ? 'bg-[#FFE4D5] text-[#8A4A00] dark:text-[#8A4A00]' : ' dark:text-white '}
                                        hover:bg-[#E4EDFF] active:bg-[#E4EDFF]  dark:active:bg-[#002A11] rounded-[40%] p-1 text-center cursor-pointer`
                                            }>
                                                #{(currentPage - 1) * itemsPerPage + index + 1}
                                            </div>
                                        </TableCell>
                                        <TableCell className="  dark:text-[#EEEEEE] flex gap-2">
                                            {truncateWeb3WalletAddress(`0x${data.address}`)} <Image src={data.chainId === 11155111 ?  sepolialogo:baselogo } alt='logo' width={20} height={20} />
                                        </TableCell>
                                        {
                                            tableType === 'borrow' ? <TableCell className=" dark:text-[#EEEEEE]">{Number(data.totalAmint).toFixed(4)} </TableCell> :
                                                <TableCell className=" dark:text-[#EEEEEE]">{Number(data.totalDepositedAmount).toFixed(2)}
                                                </TableCell>
                                        }

                                        {
                                            tableType === 'cds' ? null :
                                                <TableCell className=" dark:text-[#EEEEEE]">{0}
                                                </TableCell>
                                        }
                                        <TableCell className=" dark:text-[#EEEEEE]">{data.points==null?0:data.points}
                                        </TableCell>

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className='bg-[#020202] flex justify-between relative'>
                <button className='px-4 py-2 mr-2 text-sm text-white cursor-pointer dark:bg-none dark:border-gray-700' onClick={() => {
                    setCurrentPage(currentPage - 1);
                }} disabled={currentPage === 1}> &lt; Previous</button>

                {/* <button className='px-4 py-2 mr-2 text-sm border bg-[linear-gradient(to_top,#f6f6f6_0%,white_100%)] dark:bg-none border-gray-300 rounded-md dark:border-gray-700 cursor-pointer' >{currentPage}</button> */}

                <button className='px-4 py-2 mr-2 text-sm text-white cursor-pointer dark:bg-none dark:border-gray-700' onClick={() => {
                    setCurrentPage(currentPage + 1);
                }} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>Next &gt;</button>



            </div>
        </div>
    )
}
export default LeaderTable;
