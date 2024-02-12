'use client';
import React, { useEffect, useState } from 'react'
import useSwap from './getSwap';
import Spinner from '../ui/spinner';

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
    const optionValue: OptionValueType = { 'WETH': '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 'USDC': '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' };

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
        setOutputAmount(parseFloat(quote));
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
        <div className="flex justify-center align-middle ">
            <div className='w-full' >
                
                <div className='p-5 m-2 bg-[#F4F8FF] rounded-md shadow-sm flex flex-col' >
                    <label className='text-[12px] text-gray-700'>you pay</label>
                    <div className="flex justify-between">
                        <input className='border-none focus:outline-none bg-[#F4F8FF] text-xl' type="text" value={inputAmount} placeholder='Input Amount' onChange={handleInputChange} />
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

                <div className='p-5 m-2 bg-[#F4F8FF] rounded-md shadow-sm flex flex-col'>
                    <label className='text-[12px] text-gray-700'>you get</label>
                    <div  className="flex justify-between">
                        {
                            loader ? <Spinner /> :(
                        <input className='border-none focus:outline-none bg-[#F4F8FF] text-xl' type="text" value={outputAmount} placeholder='Output Amount' readOnly />

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

                <div className='flex justify-center'>

                    <button className='w-[200px] m-3 p-3 border rounded-full text-white' style={{ backgroundImage: 'linear-gradient(180deg, #00679F 0%, #041A50 100%)' }} onClick={computeSwap}>
                        <p className='font-bold'>Swap</p>
                    </button>

                </div>
            </div>
        </div>
    )
}
export default Swap