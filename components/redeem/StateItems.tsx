"use client";
import React from "react";
import { useAccount, useBalance, useChainId } from "wagmi";
interface Props {
    props: {
        heading: string;
        value: string;
        tokenAddress?: {
            11155111: `0x${string}`;
        };
    };
}

const StatItem = ({
    props: {
        heading,
        value,
        tokenAddress,
    },
}: Props) => {
    const { address } = useAccount();
    const chainId = useChainId();
    const { data, isError, isLoading } = useBalance({
        address: tokenAddress ? address : undefined,
        token: tokenAddress
            ? tokenAddress[chainId as keyof typeof tokenAddress]
            : undefined,
        watch: true,
    });



    return (
        <div className='w-full p-4 border rounded-md border-lineGrey dark:border-[#5B5B5B]'>
            <p className='text-sm'>{heading} Balance</p>
            <p className="text-xl font-medium">{tokenAddress ? data?.formatted.slice(0, 8) : '-'}</p>
        </div>
    );
};

export default StatItem;
