'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import eth from "@/app/assets/eth.svg";
import down from "@/app/assets/down_arrow.svg";

export default function Redeem() {
    const [inputAmount, setInputAmount] = useState('0');
    const [outputAmount, setOutputAmount] = useState(0);

    const options = ['AMINT', 'ABOND'];
    const options2 = ['USDT', 'ETH']

    const [selectedInputOption, setselectedInputOption] = useState(options[0]);
    const [selectOutputOption, setSelectOutputOption] = useState(options2[0]);

    const handleSelectInputChange = (e: any) => {
        console.log(e.target.value)
        if (e.target.value === 'AMINT') {
            console.log(e.target.value)
            setselectedInputOption('AMINT');
            setSelectOutputOption('USDT');
        }
        else {
            setselectedInputOption('ABOND');
            setSelectOutputOption('ETH');
        }
    }
    const handleSelectOutputChange = (e: any) => {
        console.log(e.target.value)

        if (e.target.value === 'USDT') {
            setselectedInputOption('AMINT');
            setSelectOutputOption('USDT');

        }
        else {
            setselectedInputOption('ABOND');
            setSelectOutputOption('ETH');

        }
    }

    const handleInputChange = (e: any) => {
        const regex = /^\d*\.?\d*$/;
        const inputValue = e.target.value;

        if (regex.test(inputValue) || inputValue === '') {
            setInputAmount(e.target.value);
        }

    }
    return (


        <div className="justify-center px-5 py-5 align-middle">
            <div className='text-2xl text-[#041A50] font-medium mb-4 dark:text-[#90AFFF] '>Redeem Asset</div>
            <div className='flex flex-col w-full gap-4 rounded-md shadow-sm ' >
                <select
                    className='w-full p-3 border-2 rounded-md text-md dark:border dark:bg-[#0F0F0F] dark:border-[#808080] dark:text-[#9E9E9E]'
                    value={selectedInputOption}
                    onChange={handleSelectInputChange}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                
                    <div className="relative flex flex-row justify-between gap-0 ">
                        <input className='w-full p-2 text-xl border-2 rounded-md dark:border dark:bg-[#0F0F0F] dark:border-[#808080] dark:text-[#9E9E9E]' type="text" value={inputAmount} placeholder='Input Amount' onChange={handleInputChange} />
                        <span className='absolute bottom-0 p-2 font-semibold text-gray-600 cursor-pointer right-1'>Max</span>
                    </div>
                          <select
                    className='w-full p-3 border-2 rounded-md text-md dark:border dark:bg-[#0F0F0F] dark:border-[#808080] dark:text-[#9E9E9E]'
                    value={selectedInputOption}
                    onChange={handleSelectInputChange}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className='border border-[#9F9700] rounded-md p-2 bg-[#FFFDD7] dark:text-[#DFDC96] dark:bg-[#22210B]'>
                Note: A withdrawal Fee of 2% will be applied.
                </div>

            </div>
            <div className='flex justify-center w-full'>

                <button className='w-full p-3 mt-4 text-white border rounded-full ' style={{ backgroundImage: 'linear-gradient(180deg, #00679F 0%, #041A50 100%)' }} >
                    <p className='font-bold'>Redeem</p>
                </button>

            </div>
        </div>

    )
}
