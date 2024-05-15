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
        <div className='p-2 '>
            <div className="relative flex justify-between gap-5 mx-auto lg:ml-5 ">
                <div className="flex justify-center p-3 text-sm   rounded-md dark:bg-[#020202]">
                    <div className="flex justify-between w-40 ">
                        <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[1.8rem]"><Image src={github} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
                        <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[1.7rem] "><Image src={twitter} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} /></div></a>
                        <a href="https://t.co/Ck6x2jhVOj" target="_blank" ><div className="w-[1.9rem]"><Image src={discord} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
                    </div>
                </div>
                <div className="flex items-center gap-5 mr-2">
                    <div onClick={() => setOpen2(!open2)} className="px-8 py-2 h-fit text-sm font-semibold text-black bg-[#DEDEDE] dark:bg-[#FC9550] dark:text-white  border-b-2 border-black  cursor-pointer">
                        ? FAQs
                    </div>
                    <div onClick={() => setOpenGetstart(!open2)} className="px-8 py-2 h-fit text-sm font-semibold text-black bg-[#DEDEDE] dark:bg-none  dark:bg-[#143968] dark:text-white border-b-2 border-black cursor-pointer">
                        Get Started
                    </div>
                </div>

                {/* <div onClick={()=>setOpen2(!open2)} className="px-8 py-4 font-semibold text-gray-600 bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] border-2 border-gray-400 rounded-md cursor-pointer">
          Key Highlights
          </div> */}
            </div>



            <Dialog open={open2} onOpenChange={setOpen2} >
                <DialogContent className="max-w-[800px]  pb-5">
                    <div className="flex justify-end right-5 top-2">
                        <DialogClose asChild>
                            <Button
                                variant={"ghostOutline"}
                                size={"primary"}
                                className="flex gap-[10px] border border-borderGrey rounded-none "
                            >
                                <Cross2Icon className="w-4 h-4" />
                                <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                                    Close
                                </p>
                            </Button>
                        </DialogClose>
                    </div>
                    <div className='-mt-5'>

                        <Faq type={selectedTab} />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openGetstart} onOpenChange={setOpenGetstart} >
                <DialogContent className="max-w-[800px] pb-5">
                    <div className="flex justify-end w-full ">
                        <DialogClose asChild>
                            <Button
                                variant={"ghostOutline"}
                                size={"primary"}
                                className="flex gap-[10px] border border-borderGrey rounded-none"
                            >
                                <Cross2Icon className="w-4 h-4" />
                                <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                                    Close
                                </p>
                            </Button>
                        </DialogClose>
                    </div>
                    <div className='-mt-5'>

                        <DialogHeader className="flex items-start">
                            <DialogTitle className="text-black  font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-2xl text-xl ">
                                <h1>Acuire ETH and Collateral</h1>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="pl-4">
                            <div>
                                <ol className="text-sm list-disc ">
                                    <li>Make sure you have some Sepolia ETH in your account to pay for gas. if not,grab some the <a href="">Sepolia Faucet.</a></li>
                                    <li>Grab some TUSDT and Eth to trade with from the USDa faucet.</li>
                                    <li>Click the button below to go deposit collateral and mint some stable coins!</li>
                                </ol>
                            </div>
                            <Button className="border-[#041A50] mt-4 bg-[#ABFFDE] text-sm border-[1px] shadow-smallcustom py-2 rounded-none basis-1/2 ">Start Trade Now</Button>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>

        </div>
    )
}