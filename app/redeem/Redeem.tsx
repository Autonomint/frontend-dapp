'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import eth from "@/app/assets/eth.svg"; 
import down from "@/app/assets/down_arrow.svg"; 

export default function Redeem() {
    const [inputAmount, setInputAmount] = useState('0');
    const [outputAmount, setOutputAmount] = useState(0);

    const options = ['AMINT', 'ABOND'];
    const options2 = ['USDT','ETH']

    const [selectedInputOption, setselectedInputOption] = useState(options[0]);
    const [selectOutputOption, setSelectOutputOption] = useState(options2[0]);

    const handleSelectInputChange = (e: any) => {
        console.log(e.target.value)
        if (e.target.value === 'AMINT') {
        console.log(e.target.value)
            setselectedInputOption('AMINT');
            setSelectOutputOption('USDT');
        }
        else{
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
        else{
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
        <div>

            <div className="justify-center align-middle">
            <div className="text-3xl font-medium text-textPrimary">
                </div>
                <div className='flex flex-col w-full rounded-lg shadow-sm bg-slate-50' >

                    <div className='relative flex flex-col w-full p-5' >
                        <div className='flex justify-between p-2 border-2 border-b-0 rounded-t-xl'>
                            <span className='flex gap-2 text-sm '><Image src={eth} width={25} alt={''} /> Sepolia Testnet</span>
                            <span className='text-sm text-gray-500'>Available to Redeem: 0.00</span>
                        </div>
                        <div className="flex flex-row justify-between gap-0">
                            <select
                                className=' text-md p-3 border-2 border-r-0 w-[200px] rounded-es-xl'
                                value={selectedInputOption}
                                onChange={handleSelectInputChange}
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <input className='w-full p-2 h-[80px] text-xl border-2 rounded-ee-xl' type="text" value={inputAmount} placeholder='Input Amount' onChange={handleInputChange} />
                                    <span className='absolute p-2 font-semibold text-gray-600 cursor-pointer right-10 bottom-10'>Max</span>
                        </div>
                    </div>
                    <div className='flex justify-center'>

                                        <span><Image src={down} alt={''} /></span>
                    </div>

                    <div className='flex flex-col w-full gap-2 p-5 rounded-md shadow-sm'>
                        <div className="flex flex-row justify-between gap-0">
                            <select
                                className='  border-r-0 text-md p-3 border-2 rounded-s-xl w-[200px]'
                                value={selectOutputOption}
                                onChange={handleSelectOutputChange}
                            >
                                {options2.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                                <input className='w-full p-2 text-xl border-2 rounded-e-xl ' disabled={true} type="text" value={outputAmount} placeholder='Output Amount' readOnly />
                                    
                        </div>
                    </div>

                </div>
                <div className='flex justify-center w-full'>

                    <button className='w-[150px] p-3 m-3 text-white border rounded-full ' style={{ backgroundImage: 'linear-gradient(180deg, #00679F 0%, #041A50 100%)' }} >
                        <p className='font-bold'>Redeem</p>
                    </button>

                </div>
            </div>

        </div>
    )
}
