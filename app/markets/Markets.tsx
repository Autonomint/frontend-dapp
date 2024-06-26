'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from 'next/image';
import kim_exchange from '@/app/assets/kim-exchange.webp';
import curve from '@/app/assets/curve.webp';
import money_market from '@/app/assets/morpho.svg';
import Marketrow from './Marketrow';
const MarketsDetails = [
    {
        id: 1,
        platform: 'Liquidity Pools',
        icon: curve,
        position: '$0',
        apy: '$0',
        tvl: '$68M',
        limit: '500/600',
        points: '1500',
        subRows: [
            {
                id: 1,
                platform: 'USDa / USDT',
                icon: curve,
                position: '$0',
                apy: '$0',
                tvl: '$68M',
                limit: '500/600',
                points: '1500'
            },
            {
                id: 1,
                platform: 'USDa / USDC',
                icon: curve,
                position: '$0',
                apy: '$0',
                tvl: '$68M',
                limit: '500/600',
                points: '1500'
            },
            {
                id: 1,
                platform: 'USDa / DAI',
                icon: curve,
                position: '$0',
                apy: '$0',
                tvl: '$68M',
                limit: '500/600',
                points: '1500'
            },

        ]
    },
    {
        id: 2,
        platform: 'Money Markets',
        icon: money_market,
        position: '$0',
        apy: '$0',
        tvl: '$68M',
        limit: '500/600',
        points: '1500',
        subRows: [
            {
                id: 1,
                platform: 'USDa / USDT',
                icon: money_market,
                position: '$0',
                apy: '$0',
                tvl: '$68M',
                limit: '500/600',
                points: '1500'
            },
            {
                id: 1,
                platform: 'USDa / USDC',
                icon: money_market,
                position: '$0',
                apy: '$0',
                tvl: '$68M',
                limit: '500/600',
                points: '1500'
            },
            {
                id: 1,
                platform: 'USDa / DAI',
                icon: money_market,
                position: '$0',
                apy: '$0',
                tvl: '$68M',
                limit: '500/600',
                points: '1500'
            },

        ]
    },
    {
        id: 3,
        platform: 'Kim Exchange',
        icon: kim_exchange,
        position: '$0',
        apy: '$0',
        tvl: '$68M',
        limit: '500/600',
        points: '1500',
        subRows: [
            {
                id: 1,
                platform: 'USDa / USDT',
                icon: kim_exchange,
                position: '$0',
                apy: '$0',
                tvl: '$68M',
                limit: '500/600',
                points: '1500'
            },
            {
                id: 1,
                platform: 'USDa / USDC',
                icon: kim_exchange,
                position: '$0',
                apy: '$0',
                tvl: '$68M',
                limit: '500/600',
                points: '1500'
            },
            {
                id: 1,
                platform: 'USDa / DAI',
                icon: kim_exchange,
                position: '$0',
                apy: '$0',
                tvl: '$68M',
                limit: '500/600',
                points: '1500'
            },

        ]
    }
]

export default function Markets() {
    return (
        <div>
            <Table className='pb-5 border border-[#9E9E9E]'>
                <TableHeader>
                    <TableRow className="h-10 bg-transparent border-none text-md dark:bg-transparent hover:dark:bg-transparent hover:bg-transparent">
                        <TableHead className="text-textGrey dark:text-[#C4C4C4] text-lg    ">PLATEFORM</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4] text-lg ">POSITION</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4] text-lg ">APY</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4] text-lg ">TVL</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4] text-lg ">LIMIT</TableHead>
                        <TableHead className="text-textGrey dark:text-[#C4C4C4] text-lg ">POINTS</TableHead>
                    </TableRow>
                </TableHeader>
              
                {
                    MarketsDetails.map((details, index) => (
                        <Marketrow key={index} {...details} />
                    ))
                }
            </Table>

        </div>
    )
}


