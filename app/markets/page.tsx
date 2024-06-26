import { Table } from '@/components/ui/table'
import React from 'react'
import Markets from './Markets'

export default function page() {
  return (
    <div className='w-full px-2 sm:px-5 '>
      <div className='w-full bg-white border relative border-[#9E9E9E] dark:bg-[#242424] dark:shadow-darkcustom  shadow-custom min-h-[84vh]'>
        <div className='flex w-full gap-2 m-5 md:gap-10 '>
          {/* <div className='flex flex-col gap-2 basis-1/3 bg-[#E4EDFF] dark:bg-[#020B28] dark:text-[#4AFBD5] px-4 py-4 lg:px-5 lg:py-4 shadow-sm text-[#00679F]'> */}
          <div className='flex flex-col gap-2 px-4 py-4 border shadow-sm basis-1/4 lg:px-5 lg:py-4 border-[#9E9E9E]'>
            <div className='text-sm lg:text-normal' >Total points</div>
            <div className='text-xl font-semibold lg:text-3xl'> 150</div>
          </div>
          {/* <div className='flex flex-col gap-2 basis-1/3 bg-[#E4EDFF] dark:bg-[#020B28] dark:text-[#4AFBD5] px-4 py-4 lg:px-5 lg:py-4 shadow-sm text-[#00679F]'> */}
          <div className='flex flex-col gap-2 px-4 py-4 border shadow-sm basis-1/4 lg:px-5 lg:py-4 border-[#9E9E9E]'>

            <div className='text-sm lg:text-normal'>Total TVL</div>
            <div className='text-xl font-semibold lg:text-3xl'>30k</div>
          </div>
          <div className='flex flex-col gap-2 px-4 py-4 border shadow-sm basis-1/4 lg:px-5 lg:py-4 border-[#9E9E9E]'>

            <div className='text-sm lg:text-normal'>Total TVL</div>
            <div className='text-xl font-semibold lg:text-3xl'>30k</div>
          </div>
        </div>
        <div className='m-5 mt-10 '>
          <div className='my-2 text-2xl font-medium uppercase'>
            Liquidity Markets
          </div>
          <div>
            <Markets />

          </div>

        </div>
      </div>
    </div>
  )
}
