import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
interface GradientContainerProps {
    value: number; // Value to control the gradient transition
    maxValue: number; // Maximum possible value
}

const GradientContainer = () => {

    const [valueup, setValueUp] = useState(-10);
    const [valuetime, setValueTime] = useState(-10);

    const changeGradientUp = (value: number) => {
        const green = -10;
        const whitePercentage = 40 + (value / 2)
        return `linear-gradient(to top left, rgb(0, 255, 0) ${green}%, white ${whitePercentage}%)`;
    };
    const changeGradientDown = (value: number) => {
        const red = -10;
        const whitePercentage = 40 - (value / 10) // Adjust white percentage based on value
        return `linear-gradient(to bottom right,  rgb(255, 0, 0) ${red}%, white ${whitePercentage}%)`;
    };



    return (
        <div className="flex flex-col items-center justify-center ">
            <div className='flex flex-col w-full px-4 my-2 '>
                <label className="flex items-center my-1 text-center ">
                    <span className=" text-[11px] w-[140px] font-medium">Borrowing TVL</span>
                    <Slider
                        defaultValue={[valueup]}
                        onValueChange={(vals) => {
                            setValueUp(vals[0]);
                        }}
                        min={-50}
                        step={10}
                        max={20}
                        className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer range-sm dark:bg-gray-700 "
                    />


                </label>

                <label className="flex items-center my-1 text-center">
                    <span className=" text-[11px] font-medium w-[140px]">Time</span>
                    <div className='flex flex-col w-full'>
                        <Slider
                            defaultValue={[valuetime]}
                            onValueChange={(vals) => {
                                setValueTime(vals[0]);
                            }}
                            min={-10}
                            step={10}
                            max={20}
                            className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer range-sm dark:bg-gray-700 "
                        />
                        <div className="w-full flex justify-between min-[1440px]:mt-[10px] mt-2 2dppx:mt-2">
                            <p className="text-[10px] ">
                                30
                            </p>
                            <p className="text-[10px]">
                                60
                            </p>
                            <p className="text-[10px]">
                                120
                            </p>
                            <p className="text-[10px]">
                                180
                            </p>

                        </div>
                    </div>
                </label>
            </div>
            <div className='w-full  text-start ml-16 text-[12px]'>Yield %</div>
            <div className='flex w-full px-4'>
                
                <div className='relative text-[11px] mr-2 text-gray-800 '>
                    
                    <div className='right-0 mt-2 top-4'>
                        +200
                    </div>
                    <div className='absolute top-[50%] right-0'>
                        0
                    </div>
                    <div className='absolute right-0 bottom-5'>
                        -100
                    </div>
                </div>
                <div >
                    <div className='p-2 border-b-2 border-l-2 border-gray-400'>
                        <div
                            className="w-28 h-28 overflow-hidden mb-[0%] ml-0"
                            style={{ background: changeGradientUp(valueup + valuetime) }}
                        >
                        </div>
                        {/* <div className='w-full h-[1px] bg-gray-400'></div> */}
                        <div
                            className="w-16 h-16 overflow-hidden mb-[0%] ml-0 "
                            style={{ background: changeGradientDown(valueup + valuetime) }}
                        >
                        </div>
                    </div>
                    <div className='flex justify-between w-full text-gray-800 '>

                        <div className='text-start text-[12px]'> 0</div>
                        <div className='text-start text-[12px]'> current price</div>
                        <div className='text-end text-[18px]'> &infin;</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GradientContainer;
