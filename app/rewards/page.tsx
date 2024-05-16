import { Banknote, Clock, ListChecks, ListChecksIcon, PiggyBank, ReceiptIcon, Wallet } from 'lucide-react'
import React from 'react'

export default function page() {
    return (
        <div>
            <div className='w-full px-2 sm:px-5 '>
                <div className='w-full bg-white border border-[#9E9E9E] shadow-custom min-h-[84vh]'>

                    <div className='w-[95%] sm:w-[500px] md:w-[600px] 2xl:w-[600px] 3xl:w-[800px] mx-auto h-auto  dark:bg-[#141414]  p-1 sm:p-4'>
                        <div className="justify-center flex flex-col gap-4 mt-2 p-4 align-middle dark:bg-[#141414] ">

                                <div className='flex flex-col gap-2 bg-[#EEEEEE] border-[#9E9E9E] shadow-custom p-4 '>
                                    <div className='flex gap-2 text-lg font-semibold'><ReceiptIcon width={25} height={25}/> Collected</div>
                                    <div className='text-2xl font-semibold text-center'>450 LP</div>
                                </div>

                                <div className='flex flex-col gap-2 bg-[#EEEEEE] border-[#9E9E9E] shadow-custom p-4 '>
                                    <div className='flex justify-between'>
                                        <p className='flex items-center gap-2 text-sm'><Clock width={20 } height={20}/> Count down :</p><p className='text-sm font-semibold'>3d 4h 33min</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='flex items-center gap-2 text-sm'><Wallet width={20 } height={20} /> Issued :</p><p className='text-sm font-semibold'>500</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='flex items-center gap-2 text-sm'><ListChecks width={20 } height={20} /> Total users :</p><p className='text-sm font-semibold'>10000</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='flex items-center gap-2 text-sm'><Banknote width={20 } height={20} /> Count down :</p><p className='text-sm font-semibold'>-- --</p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2 bg-[#EEEEEE] border-[#9E9E9E] shadow-custom p-4 '>
                                    <div className='text-xl font-bold'>
                                        HOW TO EARN:
                                    </div>
                                    <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                        <p className='flex items-center gap-2 text-sm'>Mint & Borrow USDa - <span className='font-medium'>10 points</span></p>
                                    </div>
                                    <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                        <p className='flex items-center gap-2 text-sm'>Deposit 500 USDa in dCDS - <span className='font-medium'>10 points</span>10 points</p>
                                    </div>
                                    <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                        <p className='flex items-center gap-2 text-sm'>Deposit 500 TUSDT in dCDS - <span className='font-medium'>5 points</span></p>
                                    </div>
                                    <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                        <p className='flex items-center gap-2 text-sm'>Bridge 500 USDa to Mode L2 - <span className='font-medium'>10 points</span></p>
                                    </div>
                                    <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                        <p className='flex items-center gap-2 text-sm'>Bridge 500 USDa to Mode L2 -<span className='font-medium'>10 points</span> </p>
                                    </div>
                                    <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                        <p className='flex items-center gap-2 text-sm'>Tweet about Autonomint - <span className='font-medium'>1 points</span></p>
                                    </div>
                                    <div className='flex '>
                                        <p className='w-full text-sm '>Invite people to Autonomint - <span className='font-medium'>5 points + 10% of invitee points</span></p>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
