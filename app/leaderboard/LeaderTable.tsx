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
interface TableData {
    rank: string;
    address: string;
    totalDepositedAmount?: string;
    cdsdeposit?: number;
    points: string;
    totalLTV?: number;
    yield: number;
}



const LeaderTable = ({ tableType,data }: { tableType: string ,data:TableData[]}) => {
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
             
            <div className='border dark:border-gray-500 min-h-[50vh]  rounded-md shadow-sm '>
                <div className=' dark:bg-[#141414]  rounded-lg overflow-hidden'>
                    <Table>
                        <TableHeader>
                            <TableRow className='bg-[linear-gradient(to_right,#23e988,#13d1b6)] dark:bg-none hover:bg-[#5981ff] dark:bg-[#1a1a1a]'>
                                <TableHead className="w-3 opacity-1 text-white dark:text-[#C4C4C4]">Rank</TableHead>
                                <TableHead className="text-white dark:text-[#C4C4C4]">Address</TableHead>
                                {
                                    tableType === 'borrow' ? <TableHead className="text-white dark:text-[#C4C4C4]">Borrow / Mint deposits</TableHead> :
                                        <TableHead className="text-white dark:text-[#C4C4C4]">dCDS deposits</TableHead>
                                }
                                {/* <TableHead className="text-white dark:text-[#C4C4C4]">Points</TableHead> */}
                                {
                                    tableType === 'cds' ? null : <TableHead className="text-white dark:text-[#C4C4C4]">LTV ratio</TableHead>
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody className=''>
                            {
                                sortedData.map((data, index) => (
                                    <TableRow key={index} className={` hover:bg-[#E4EDFF] active:bg-[#E4EDFF] dark:active:bg-[#002A11]   dark:border cursor-pointer`
                                    }>
                                        <TableCell className={
                                        ` ${index === 0 ? 'text-[#40e862] dark:text-[#71e889] text-[1.25rem] font-bold ' :
                                            index === 1 ? 'text-[#54f374] dark:text-[#71e889] text-[1.15rem] font-bold' :
                                                index === 2 ? 'text-[#5fe079] dark:text-[#71e889] text-[1.05rem] font-bold' :
                                                    index === 3 ? 'text-[#66e180] dark:text-[#71e889] text-[1rem] font-bold' :
                                                        index === 4 ? 'text-[#72e68b] dark:text-[#71e889] text-[0.95rem] font-bold' :
                                                            ' dark:bg-[#1a1a1a]'}
                                        hover:bg-[#E4EDFF] active:bg-[#E4EDFF] dark:active:bg-[#002A11]  cursor-pointer`
                                    }>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-textGrey  dark:text-[#EEEEEE]">
                                            {truncateWeb3WalletAddress(`0x${data.address}`)}
                                        </TableCell>
                                        {
                                            tableType === 'borrow' ? <TableCell className="text-textGrey dark:text-[#EEEEEE]">{Number(data.totalDepositedAmount).toFixed(4)} </TableCell> :
                                                <TableCell className="text-textGrey dark:text-[#EEEEEE]">{Number(data.totalDepositedAmount).toFixed(2)} 
                                                </TableCell>
                                        }

                                        {/* <TableCell className="text-textGrey dark:text-[#EEEEEE]">{data.points}
                                        </TableCell> */}
                                        {
                                            tableType === 'cds' ? null :
                                                <TableCell className="text-textGrey dark:text-[#EEEEEE]">{0}
                                                </TableCell>
                                        }

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                   
                </div>
            </div>
            <div className='mt-4'>
                   
                             
                   <button className='px-4 py-2 mr-2 text-sm border border-gray-300 rounded-sm dark:border-gray-500' onClick={() => {
           setCurrentPage(currentPage - 1);
       }} disabled={currentPage === 1}> &lt; Previous</button>

       <button className='px-4 py-2 mr-2 text-sm border border-gray-300 rounded-sm dark:border-gray-500' >{currentPage}</button>

       <button className='px-4 py-2 mr-2 text-sm border border-gray-300 rounded-sm dark:border-gray-500' onClick={() => {
           setCurrentPage(currentPage + 1);
       }} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>Next &gt;</button>
       
              
       
       </div>
        </div>
    )
}
export default LeaderTable;
