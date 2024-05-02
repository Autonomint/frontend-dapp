import React from 'react'

export default function WaitlistBanner() {
    return (
        <div className='h-auto w-full px-20  py-1 mx-auto shadow-[#00000040]  shadow-sm border-white bg-gradient-to-r from-[#ABFEDE] to-[#C0D5FE] dark:from-[#22054F] dark:to-[#105993] flex items-center justify-center'>
            <div className='flex items-center gap-2 '>
                <h1 className='text-md font-bold text-[#041A50] dark:text-[#eeeeee]'>Join the waitlist ! </h1>
                <div className='flex items-center gap-5'>
                    <p className='text-[#041A50] dark:text-[#eeeeee] text-sm'>Be the first to know when we launch <a className='underline'>Learn more</a></p>
                    <button className='px-2 py-1  font-bold border-2 border-[#3f3f3f] dark:border-[#ffffff]  text-[#041A50]   dark:text-white text-sm rounded-md white'>Join </button>
                </div>
            </div>
        </div>
    )
}
