import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from 'next/image';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { ArrowDownLeftSquareIcon, ArrowUpRight } from 'lucide-react';
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from '@radix-ui/react-icons';
const Marketrow = (
    MarketsDetails: { id: number; platform: string; icon: any; position: string; apy: string; tvl: string; limit: string; points: string; subRows: { id: number; platform: string; icon: any; position: string; apy: string; tvl: string; limit: string; points: string; }[] }
) => {
    const [expandedRows, setExpandedRows] = useState(false);

    return (
        <TableBody className='mb-4 '>
            <TableRow
                style={{ marginBottom: "20px !important" }}
                onClick={() => setExpandedRows(!expandedRows)}
                className={` p-4 bg-transparent uppercase dark:bg-transparent text-hover:dark:bg-transparent hover:bg-transparent dark:border cursor-pointer border-none`}
            >
                <TableCell className="text-borderGrey my-2 text-lg dark:text-[#FFFFFF] flex gap-2 items-center">
                    <Image src={MarketsDetails.icon} className='w-4 h-4' alt='' /> {MarketsDetails.platform}
                </TableCell>
                <TableCell className="text-textGrey text-lg dark:text-[#FFFFFF]">
                    {MarketsDetails.position}
                </TableCell>
                <TableCell className="text-textGrey text-lg dark:text-[#FFFFFF]">
                    {MarketsDetails.apy}
                </TableCell>
                <TableCell className="text-textGrey text-lg dark:text-[#FFFFFF]">
                    {MarketsDetails.tvl}
                </TableCell>
                <TableCell className="text-textGrey text-lg dark:text-[#FFFFFF]">
                    {MarketsDetails.limit}
                </TableCell>
                <TableCell className="text-textGrey text-lg dark:text-[#FFFFFF] flex justify-between items-center">
                    {MarketsDetails.points} <div> {!expandedRows ? <DoubleArrowDownIcon width={20} height={20} /> : <DoubleArrowUpIcon width={20} height={20} />}</div>
                </TableCell>
            </TableRow>
                    {
                        expandedRows && MarketsDetails.subRows.map((subRow, index) => (
                            <TableRow
                                key={index}

                                className={` 
                            bg-transparent uppercase dark:bg-transparent text- hover:dark:bg-transparent hover:bg-transparent dark:border cursor-pointer border-none`}
                            >

                                <TableCell className="text-borderGrey text-md dark:text-[#EEEEEE] pl-5  "><div className='flex gap-2'><Image src={subRow.icon} className='w-4 h-4' alt='' /> {subRow.platform} <ArrowUpRight width={20} height={20}/> </div></TableCell>
                                <TableCell className="text-textGrey text-md  dark:text-[#EEEEEE]">
                                    {subRow.position}
                                </TableCell>
                                <TableCell className="text-textGrey text-md  dark:text-[#EEEEEE]">
                                    {subRow.apy}
                                </TableCell>
                                <TableCell className="text-textGrey text-md  dark:text-[#EEEEEE]">{subRow.tvl}
                                </TableCell>
                                <TableCell className="text-textGrey text-md  dark:text-[#EEEEEE] ">{subRow.limit} </TableCell>
                                <TableCell className="text-textGrey text-md  dark:text-[#EEEEEE] ">{subRow.points} </TableCell>

                            </TableRow>
                        ))
                    }
             
        </TableBody>

    )
}
export default Marketrow
