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
interface TableData {
    sno: string;
    address: string;
    cdsdeposit: number;
    borrowdeposit: string;
    points: string;
    ltvratio: number;
    yield: number;
}
const tableData: TableData[] = [
    {
        sno: '1',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    },
    {
        sno: '2',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    },
    {
        sno: '3',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    },
    {
        sno: '4',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    },
    {
        sno: '5',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    },
    {
        sno: '6',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    }
    ,
    {
        sno: '7',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    }
    ,
    {
        sno: '8',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    }
    ,
    {
        sno: '9',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    },
    {
        sno: '10',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    }
    ,
    {
        sno: '11',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    }
    ,
    {
        sno: '12',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    }
    ,
    {
        sno: '13',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    },
    {
        sno: '14',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    },
    {
        sno: '15',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    },
    {
        sno: '16',
        address: '0',
        cdsdeposit: 0,
        borrowdeposit: '0',
        points: '0',
        ltvratio: 0,
        yield: 0
    }
    
]
export default function LeaderTable() {
    const [sortedData, setSortedData] = useState<TableData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState(null);
    const [pagecount, setPageCount] = useState(1);
    const itemsPerPage = 10;
    useEffect(() => {
        let sorted = [...tableData];
      
        if (sortField) {
          sorted.sort((a, b) => (a[sortField] > b[sortField]) ? 1 : -1);
        }
      
        setSortedData(sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      }, [tableData, currentPage, sortField]);
    return (
        <div>
            <div>
                <div className='p-1 bg-white border'>
                    <Table>
                        <TableHeader>
                            <TableRow className='bg-[linear-gradient(180deg,_#00679F_0%,#041A50_100%)] dark:bg-none dark:bg-[#1a1a1a]'>
                                <TableHead className="w-3 opacity-1 text-white dark:text-[#C4C4C4]">S.no</TableHead>
                                <TableHead className="text-white dark:text-[#C4C4C4]">Address</TableHead>
                                <TableHead className="text-white dark:text-[#C4C4C4]">CDS Deposit</TableHead>
                                <TableHead className="text-white dark:text-[#C4C4C4]">Borrow</TableHead>
                                <TableHead className="text-white dark:text-[#C4C4C4]">Points</TableHead>
                                <TableHead className="text-white dark:text-[#C4C4C4]">LTV ratio</TableHead>
                                <TableHead className="text-white dark:text-[#C4C4C4]">Yield %</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {
                                sortedData.map((data, index) => (
                                    <TableRow key={index} className="hover:bg-[#E4EDFF] active:bg-[#E4EDFF] dark:active:bg-[#002A11]  dark:border cursor-pointer">
                                        <TableCell className="w-3 text-borderGrey dark:text-[#EEEEEE]">
                                            {data.sno}
                                        </TableCell>
                                        <TableCell className="text-textGrey  dark:text-[#EEEEEE]">
                                            {data.address}
                                        </TableCell>
                                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">{data.cdsdeposit}
                                        </TableCell>
                                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">{data.borrowdeposit}
                                        </TableCell>
                                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">{data.points}
                                        </TableCell>
                                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">{data.ltvratio}
                                        </TableCell>
                                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">{data.yield}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <button className='px-2 py-1 mr-2 text-sm border rounded-md' onClick={() =>{
                         setCurrentPage(currentPage - 1);

                         }} disabled={currentPage === 1}> &lt; Previous</button>
                    <button className='px-2 py-1 mr-2 text-sm border rounded-md' >{currentPage}</button>
<button className='px-2 py-1 mr-2 text-sm border rounded-md'  onClick={() => {
    setCurrentPage(currentPage + 1); 

    }} disabled={currentPage === Math.ceil(tableData.length / itemsPerPage)}>Next &gt;</button>

{/* // Add buttons to sort by each field
<button onClick={() => setSortField('sno')}>Sort by S.no</button>
<button onClick={() => setSortField('address')}>Sort by Address</button> */}
                </div>
            </div>
        </div>
    )
}
