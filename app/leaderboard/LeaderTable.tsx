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
    totalAmint?: string;
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
             
            <div className='border rounded-md shadow-sm dark:border-gray-700 '>
                <div className=' dark:bg-[#141414]  rounded-lg min-h-[50vh] overflow-hidden overflow-x-scroll  '>
                    <Table className='min-w-[400px]'>
                        <TableHeader>
                            <TableRow className='bg-[linear-gradient(to_right,#23e988,#13d1b6)] dark:bg-none hover:bg-[#5981ff] dark:bg-[#1a1a1a]'>
                                <TableHead className="w-3 opacity-1 text-white dark:text-[#C4C4C4]">Rank</TableHead>
                                <TableHead className="text-white dark:text-[#C4C4C4]">Address</TableHead>
                                {
                                    tableType === 'borrow' ? <TableHead className="text-white dark:text-[#C4C4C4]">USDa Borrowed</TableHead> :
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
                                    <TableRow key={index} className={`
                                    ${(currentPage - 1) * itemsPerPage + index + 1  === 1 ? 'bg-[#EEFFF5] dark:bg-[#002A11]  font-bold ' :
                                    (currentPage - 1) * itemsPerPage + index + 1  === 2 ? 'bg-[#EEFFF5] dark:bg-[#002A11]  font-bold' :
                                    (currentPage - 1) * itemsPerPage + index + 1  === 3 ? 'bg-[#EEFFF5] dark:bg-[#002A11] font-bold':""}

                                    hover:bg-[#E4EDFF] active:bg-[#E4EDFF] dark:active:bg-[#002A11]   dark:border cursor-pointer`
                                    }>
                                        <TableCell className={
                                        ` ${(currentPage - 1) * itemsPerPage + index + 1  === 1 ? 'text-[#40e862] dark:text-[#71e889] text-[1.25rem] font-bold ' :
                                        (currentPage - 1) * itemsPerPage + index + 1  === 2 ? 'text-[#54f374] dark:text-[#71e889] text-[1.15rem] font-bold' :
                                        (currentPage - 1) * itemsPerPage + index + 1  === 3 ? 'text-[#5fe079] dark:text-[#71e889] text-[1.05rem] font-bold' :
                                                
                                                            ' dark:bg-[#1a1a1a]'}
                                        hover:bg-[#E4EDFF] active:bg-[#E4EDFF] dark:active:bg-[#002A11]  cursor-pointer`
                                    }>
                                            (currentPage - 1) * itemsPerPage + index + 1 
                                        </TableCell>
                                        <TableCell className="text-textGrey  dark:text-[#EEEEEE]">
                                            {truncateWeb3WalletAddress(`0x${data.address}`)}
                                        </TableCell>
                                        {
                                            tableType === 'borrow' ? <TableCell className="text-textGrey dark:text-[#EEEEEE]">{Number(data.totalAmint).toFixed(4)} </TableCell> :
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
                   
                             
                   <button className='px-4 py-2 mr-2 text-sm border bg-[linear-gradient(to_top,#f6f6f6_0%,white_100%)] dark:bg-none border-gray-300 rounded-md dark:border-gray-700 cursor-pointer' onClick={() => {
           setCurrentPage(currentPage - 1);
       }} disabled={currentPage === 1}> &lt; Previous</button>

       <button className='px-4 py-2 mr-2 text-sm border bg-[linear-gradient(to_top,#f6f6f6_0%,white_100%)] dark:bg-none border-gray-300 rounded-md dark:border-gray-700 cursor-pointer' >{currentPage}</button>

       <button className='px-4 py-2 mr-2 text-sm border bg-[linear-gradient(to_top,#f6f6f6_0%,white_100%)] dark:bg-none border-gray-300 rounded-md dark:border-gray-700 cursor-pointer' onClick={() => {
           setCurrentPage(currentPage + 1);
       }} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>Next &gt;</button>
       
              
       
       </div>
        </div>
    )
}
export default LeaderTable;
