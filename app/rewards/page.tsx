'use client'
import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { Banknote, Clock, ListChecks, ListChecksIcon, PiggyBank, ReceiptIcon, TelescopeIcon, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import Notification from "@/components/pagePopover/Notification";
import PageSettings from "@/components/pagePopover/PageSettings";
import { BellIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Settings } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { BACKEND_API_URL } from '@/constants/BackendUrl';
import { useAccount, useChainId } from 'wagmi';
export default function page() {
    const [openSettings, setOpenSettings] = React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showReferral, setShowReferral] = useState(false);
    const chainId = useChainId()
    const {address} = useAccount()
    const generateReferral = () => {
        console.log('referral generated')
        setShowReferral(true)
    }
    // Fetch user points data using the useQuery hook
        const {data:points,error} = useQuery({
            queryKey: ['points'],
            queryFn:()=>fetch(`${BACKEND_API_URL}/points/userPoints/${chainId}/${address}`).then((res) => res.json()),
            staleTime:Infinity
        })

    return (
        <div>
            <div className='w-full px-2 sm:px-5 '>
                <div className='w-full bg-white border relative border-[#9E9E9E] dark:bg-[#242424] dark:shadow-darkcustom  shadow-custom min-h-[84vh]'>
                    <div className="hidden gap-5 sm:flex sm:flex-col sm:absolute mdb:flex right-5 top-5">
                        <div onClick={() => { setShowNotification(!showNotification); setOpenSettings(false) }} className="border-[#041A50] hover:bg-[#d9feef]  bg-[#ABFFDE] border-[1px] shadow-smallcustom h-fit p-[15px] cursor-pointer">
                            <BellIcon className="w-6 h-6 text-[#000000] " />
                        </div>
                        <div onClick={() => { setOpenSettings(!openSettings); setShowNotification(false) }} className="border-[#041A50] bg-[#ABFFDE] hover:bg-[#d9feef] border-[1px] shadow-smallcustom h-fit p-[15px] cursor-pointer">
                            <Settings className="w-6 h-6 text-[#000000] " />
                        </div>
                    </div>
                    <Notification showNotifications={showNotification} setShowNotifications={setShowNotification} />
                    <PageSettings showSettings={openSettings} setShowSettings={setOpenSettings} />
                    <div className='w-[95%] sm:w-[500px] md:w-[600px] 2xl:w-[600px] 3xl:w-[800px] mx-auto h-auto  p-1 sm:p-4'>
                        <div className="flex flex-col justify-center gap-4 py-4 mt-2 align-middle ">
                            <div className="w-full gap-5 text-xl text-center">
                                Refer <span className='font-semibold ] '>Autonomint</span>  to your friends and boost your earnings!
                            </div>
                            <div className=''>
                                {
                                    showReferral ?
                                    (
                                        <div>
                                        <div className='text-xl font-bold'>Refer and Earn</div>
                                        <div className='flex gap-4'>
                                            <input type='text' placeholder='Enter your friend email' className='border border-[#020202] p-2 w-full text-sm' />
                                            <button className=' px-4 font-medium border-[#041A50] bg-[#ABFFDE] text-sm border-[1px] shadow-smallcustom py-2 rounded-none'>Refer</button>
                                        </div>
                                        <div className='flex justify-between w-full mt-4'>
                                            <div>share to your network</div> <div className='flex items-center gap-2'><TwitterLogoIcon width={20} height={20} /></div>
                                        </div>
                                    </div>
                                    ):(
                                        <div className='flex flex-col gap-2'>
                                        Create a referral link and share it with your friends. When they sign up and start earning.
                                        <div className='flex justify-center w-full'>
                                            <button onClick={generateReferral} className=' w-fit px-4 font-medium border-[#041A50] bg-[#ABFFDE] dark:text-black text-sm border-[1px] shadow-smallcustom py-2 rounded-none'>Create Referral Link</button>
                                        </div>
                                    </div>

                                    )
                                }
                              
                               
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex w-full flex-col gap-2 bg-[#EEEEEE]  border-[#9E9E9E] shadow-custom dark:bg-[#020202] dark:shadow-darkcustom p-4 '>
                                    <div className='flex gap-2 text-sm font-semibold'><ReceiptIcon width={20} height={20} /> Collected</div>
                                    <div className='text-xl font-semibold text-center'>{points == undefined? 0 :points} LP</div>
                                </div>
                                {/* <div className='flex w-full flex-col gap-2 bg-[#EEEEEE] border-[#9E9E9E] shadow-custom dark:bg-[#020202] dark:shadow-darkcustom p-4 '>
                                    <div className='flex justify-between'>
                                        <p className='flex items-center gap-2 text-sm'><Wallet width={20} height={20} />Total referred :</p><p className='text-sm font-semibold'>500</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='flex items-center gap-2 text-sm'><ListChecks width={20} height={20} /> Total users :</p><p className='text-sm font-semibold'>10000</p>
                                    </div>
                                </div> */}
                            </div>

                            <div className='flex flex-col gap-2 bg-[#ffffff] border border-[#9E9E9E]  dark:border-none dark:bg-[#3a3a3a] dark:shadow-darkcustom shadow-custom p-4 '>
                                <div className='text-xl font-bold'>
                                    HOW TO EARN:
                                </div>
                                <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                    <p className='flex items-center justify-between w-full text-xs '><span>Mint & Borrow USDa </span> <span className='font-medium'>10 points/per day</span></p>
                                </div>
                                <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                    <p className='flex items-center justify-between w-full gap-2 text-xs'>Deposit 500 USDa in dCDS  <span className='font-medium'>10 points/per day</span></p>
                                </div>
                                <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                    <p className='flex items-center justify-between w-full gap-2 text-xs'>Deposit 500 TUSDT in dCDS <span className='font-medium'>5 points/per day</span></p>
                                </div>
                                <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                    <p className='flex items-center justify-between w-full gap-2 text-xs'>Bridge 500 USDa to Mode L2  <span className='font-medium'>10 points/per day</span></p>
                                </div>
                                <div className='flex justify-between border-b border-[#9E9E9E] pb-1'>
                                    <p className='flex items-center justify-between w-full gap-2 text-xs'>Tweet about Autonomint  <span className='font-medium'>3 points/per day</span></p>
                                </div>
                                <div className='flex '>
                                    <p className='flex justify-between w-full text-xs '>Invite people to Autonomint <span className='font-medium'>5 points</span></p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
