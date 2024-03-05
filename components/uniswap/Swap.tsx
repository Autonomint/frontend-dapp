'use client';
import React, { useEffect, useState } from 'react'
import useSwap from './getSwap';
import Spinner from '../ui/spinner';
import swap_horiz from '@/app/assets/swap_horiz.svg'
import Image from 'next/image';
type OptionValueType = { [key: string]: string };

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeout: NodeJS.Timeout;
    return function (this: any, ...args: Parameters<T>) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}



const Swap = () => {

    const [inputAmount, setInputAmount] = useState('0');
    const [outputAmount, setOutputAmount] = useState(0);
    const [loader, setLoader] = useState(false);
    const options = ['WETH', 'USDC'];
    const optionValue: OptionValueType = { 'WETH': '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', 'USDC': '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' };

    const [selectedInputOption, setselectedInputOption] = useState(options[0]);
    const [selectOutputOption, setSelectOutputOption] = useState(options[1]);


    const handleSelectInputChange = (e: any) => {
        if (e.target.value === selectOutputOption) {
            setSelectOutputOption(selectedInputOption);
        }
        setselectedInputOption(e.target.value);
    }
    const handleSelectOutputChange = (e: any) => {
        setSelectOutputOption(e.target.value);
    }

    const { swap, quotecall } = useSwap(optionValue[selectedInputOption], optionValue[selectOutputOption]);

    useEffect(() => {
        setLoader(true);
        computeQuote();
    }, [inputAmount])


    const computeQuote = debounce(async () => {

        const quote = await quotecall(parseFloat(inputAmount));
        // setOutputAmount(parseFloat(quote));
        setLoader(false);
    }, 1000)


    const computeSwap = async () => {
        const txn = await swap(parseFloat(inputAmount));
    }

    const handleInputChange = (e: any) => {
        const regex = /^\d*\.?\d*$/;
        const inputValue = e.target.value;

        if (regex.test(inputValue) || inputValue === '') {
            setInputAmount(e.target.value);
        }
        computeQuote()

    }

    return (
        <div className="justify-center align-middle ">
            <div className='flex w-full ' >

                <div className='flex flex-col w-full gap-2 p-5 rounded-md shadow-sm' >
                    <label className='text-[12px] text-gray-700'>From :</label>
                    <div className="flex flex-col justify-between gap-5">
                        <input className='p-2 text-xl border-2 rounded-md' type="text" value={inputAmount} placeholder='Input Amount' onChange={handleInputChange} />
                        <select
                            className=' bg-[#F4F8FF] text-md p-3 border border-blue-500 rounded-md'
                            value={selectedInputOption}
                            onChange={handleSelectInputChange}
                        >
                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center justify-center w-12 h-12 '>
                        <Image src={swap_horiz} alt='swap' />
                    </div>
                </div>

                <div className='flex flex-col w-full gap-2 p-5 rounded-md shadow-sm'>
                    <label className='text-[12px] text-gray-700'>To :</label>
                    <div className="flex flex-col justify-between gap-5">
                        {
                            loader ? <Spinner /> : (
                                <input className='p-2 text-xl border-2 rounded-md ' type="text" value={outputAmount} placeholder='Output Amount' readOnly />

                            )
                        }
                        <select
                            className='  bg-[#F4F8FF] text-md p-3 border border-blue-500 rounded-md'
                            value={selectOutputOption}
                            onChange={handleSelectOutputChange}
                        >
                            {options.filter(option => option !== selectedInputOption).map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>
            <div className='flex justify-center w-full'>

                <button className='w-full p-3 m-3 text-white border rounded-full ' style={{ backgroundImage: 'linear-gradient(180deg, #00679F 0%, #041A50 100%)' }} onClick={computeSwap}>
                    <p className='font-bold'>Swap</p>
                </button>

            </div>
        </div>
    )
}
export default Swap