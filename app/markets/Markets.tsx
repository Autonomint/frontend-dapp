import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from 'next/image';
import kim_exchange from '@/app/assets/kim-exchange.webp';
import curve from '@/app/assets/curve.webp';
import money_market from '@/app/assets/morpho.svg';

export default function Markets() {
    return (
        <div>
            <Table className='pb-5 border border-[#9E9E9E] '>
                <TableHeader>
                    <TableRow className="h-10 bg-transparent border-none dark:bg-transparent hover:dark:bg-transparent hover:bg-transparent">
                        <TableHead className="text-textGrey dark:text-[#C4C4C4]">Plateform</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4]">Position</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4]">APY</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4]">TVL</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4]">Limit</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4]">Points</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody className='mb-4'>
                    <TableRow
                        className={`  bg-transparent dark:bg-transparent hover:dark:bg-transparent hover:bg-transparent dark:border cursor-pointer border-none`}
                    >
                        <TableCell className="text-borderGrey dark:text-[#EEEEEE] flex gap-2"><Image src={curve} className='w-4 h-4' alt='' />Liquidity Pools </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
                            $0
                        </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
                            $0
                        </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">$68M
                        </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE] ">500/600 </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE] ">1500 </TableCell>
                    </TableRow>
                    <TableRow
                        className={`  bg-transparent dark:bg-transparent hover:dark:bg-transparent hover:bg-transparent dark:border cursor-pointer border-none`}
                    >
                        <TableCell className="text-borderGrey dark:text-[#EEEEEE] flex gap-2"><Image src={money_market} className='w-4 h-4' alt='' />Money Markets </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
                            $0
                        </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
                            $0
                        </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">$68M
                        </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE] ">500/600 </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE] ">1500 </TableCell>
                    </TableRow>
                    <TableRow
                        className={`  bg-transparent dark:bg-transparent hover:dark:bg-transparent hover:bg-transparent dark:border cursor-pointer border-none`}
                    >
                        <TableCell className="text-borderGrey dark:text-[#EEEEEE] flex gap-2"><Image src={kim_exchange} className='w-5 h-5' alt='' /> Kim Excahnge </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
                            $0
                        </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">
                            $0
                        </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE]">$68M
                        </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE] ">500/600 </TableCell>
                        <TableCell className="text-textGrey dark:text-[#EEEEEE] ">1500 </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </div>
    )
}


