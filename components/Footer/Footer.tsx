'use client'
import React, { useState } from 'react'
import twitter from "@/app/assets/x_logo.svg.svg";
import discord from "@/app/assets/discord_symbol.svg.svg";
import github from "@/app/assets/github_symbol.svg.svg";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Faq from "@/components/Faqs/Faqs";
import Image from 'next/image';

export default function Footer() {
    const [selectedTab, setSelectedTab] = useState("mint");
    const [open2, setOpen2] = React.useState(false);
    const [openGetstart, setOpenGetstart] = React.useState(false);
    return (
        <div className='p-2 h-[8vh] '>
            <div className="relative flex flex-col-reverse justify-between gap-2 mx-auto sm:flex-row mdb-5 lg:ml-5 ">
                <div className="flex justify-center p-3 text-sm rounded-md">
                    <div className="flex justify-between w-40 ">
                        <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[1.8rem]"><Image src={github} alt="autonomint-dapp" className="rounded-md " style={{ width: "100%", height: "100%" }} /></div></a>
                        <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[1.7rem] "><Image src={twitter} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} /></div></a>
                        <a href="https://t.co/Ck6x2jhVOj" target="_blank" ><div className="w-[1.9rem]"><Image src={discord} alt="autonomint-dapp" className="rounded-md " style={{ width: "100%", height: "100%" }} /></div></a>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full gap-5 mr-2 sm:justify-normal sm:w-auto ">
                    <Button onClick={() => setOpen2(!open2)} variant={'secondary'} className='px-8 font-medium' >
                        ? FAQs
                    </Button>
                    <Button onClick={() => setOpenGetstart(!open2)} variant={'secondary'} className='px-8 font-medium' >
                        Get Started
                    </Button>
                </div>

                {/* <div onClick={()=>setOpen2(!open2)} className="px-8 py-4 font-semibold text-gray-600 bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] border-2 border-gray-400 rounded-md cursor-pointer">
          Key Highlights
          </div> */}
            </div>



            <Dialog open={open2} onOpenChange={setOpen2} >
                <DialogContent className="max-w-[800px]  p-5">
                    <div className="flex justify-end mb-4 right-5 top-2">
                        <DialogClose asChild>
                            <Button
                                variant={"ghostOutline"}
                                size={"primary"}
                                className="flex gap-[10px] border border-borderGrey rounded-none "
                            >
                                <Cross2Icon className="w-4 h-4" />
                               
                            </Button>
                        </DialogClose>
                    </div>
                    <div className='-mt-5'>

                        <Faq  />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openGetstart} onOpenChange={setOpenGetstart} >
                <DialogContent className="max-w-[800px] p-5">
                    <div className="flex justify-end w-full ">
                        <DialogClose asChild>
                            <Button
                                variant={"ghostOutline"}
                                size={"primary"}
                                className="flex gap-[10px] mb-4 border border-borderGrey rounded-none"
                            >
                                <Cross2Icon className="w-4 h-4" />
                                
                            </Button>
                        </DialogClose>
                    </div>
                    <div className='-mt-5'>

                        <DialogHeader className="flex items-start">
                            <DialogTitle className="text-black dark:text-white mb-2  font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-2xl text-xl ">
                                <h1>Aqcuire ETH and Collateral</h1>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="pl-4">
                            <div>
                                <ol className="text-sm list-disc ">
                                    <li>Make sure you have some Sepolia ETH in your account to pay for gas. if not, grab some the <a href='https://cloud.google.com/application/web3/faucet/ethereum/sepolia' className='underline' target='_black'>Sepolia Faucet</a> .</li>
                                    <li>Grab some <a href="https://sepolia.etherscan.io/address/0xC1fd34E478c147f0460dc013D636c63BC407D480#writeProxyContract" target='_blank' className='underline'>Sepolia TUSDT</a> / <a href="https://sepolia.basescan.org/address/0xfbae0d4337d936538995a26685f69644e6427213#writeProxyContract" target='_blank' className='underline'>Base TUSDT</a> and Eth to trade with from the USDa faucet.</li>
                                    <li>Click the button below to go deposit collateral and mint some stable coins!</li>
                                </ol>
                            </div>
                            <Button className="border-[#041A50] mt-4 bg-[#ABFFDE] text-sm border-[1px] dark:text-black shadow-smallcustom py-2 rounded-none basis-1/2 ">Start Trade Now</Button>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>

        </div>
    )
}
