'use client';
import React, { useEffect, useState } from "react";
import hourglass from "@/app/assets/hourglass.svg";
import checkcircle from "@/app/assets/checkcircle.svg";
import Image from "next/image";
import Spinner from "../ui/spinner";
import { Cross1Icon } from "@radix-ui/react-icons";
enum TransactionType {
    Pending = "Pending",
    Completed = "Completed",
    Loading = "Loading",
    InProgress = "Progress",
    Failed = "Failed",
}
interface TransactionProps {
    heading: string;
    subheadingBefore?: string;
    value: string;
    status?: string;
    className?: string;
}

const TransactionLoader: React.FC<TransactionProps> = ({ heading, subheadingBefore, value, status, className }) => {
    const [progress, setProgress] = useState(0);
    const [taskDone, setTaskDone] = useState(false);
    useEffect(() => {
        if (status === TransactionType.InProgress) {

        const interval = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 100) {
                        clearInterval(interval);
                        setTaskDone(true);
                          
                         
                        return 100;
                      }
                    return Math.min(oldProgress + 10, 100);
                });
            }, 3000); 

        return () => {
            clearInterval(interval);
        };
    }
    }, [status]);

    return (
        <div
            className={`border-2 shadow-md rounded-xl min-w-[80%] flex py-2 px-3 ${className} `}
        >
            <div className="flex items-center justify-center mx-2">
                {
                    status === TransactionType.Pending ? (
                        <Image src={hourglass} width={24} height={24} alt="uniswap" />
                    ) : status === TransactionType.Completed ? (
                        <Image src={checkcircle} width={24} height={24} alt="uniswap" />
                    ) : status === TransactionType.Loading || status === TransactionType.InProgress ? (
                        <Spinner className="" />
                    ) : status === TransactionType.Failed ? (
                        <Cross1Icon />
                    ) : null
                }
            </div>
            <div className="ml-4">
                <h1 className="text-base font-medium ">{heading}</h1>
                <h2 className="ml-1 text-[14px] text-gray-500"> {status}
                {
                (status === TransactionType.InProgress) && !taskDone ?
                    <span className="text-[14px] text-gray-500"> {progress}%</span>
                    :(status === TransactionType.InProgress)?
                    <span className="text-[14px] text-gray-500"> taking longer than usual.</span>
                    :""
                }
                </h2>
            </div>



        </div>
    );
};

export default TransactionLoader;