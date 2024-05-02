'use client';
import React, { use, useEffect, useState } from "react";
import WalletOrContent from "@/components/WalletOrContent/WalletOrContent";
import currencyExchange from "@/app/assets/currency_exchange.svg";
import derivatives from "@/app/assets/toll.svg";
import mintmark from "@/app/assets/mintmark.svg";
import bgEth from "@/app/assets/eth.png";
import bgBtc from "@/app/assets/btc.png";
import Image from "next/image";
import Dcds from "@/components/dcds/Dcds";
import RedeemPage from "@/components/redeem/RedeemPage";
import twitter from "@/app/assets/twitter.svg";
import discord from "@/app/assets/discord.svg";
import github from "@/app/assets/github.svg";
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
import WaitlistBanner from "@/components/Banner/WaitlistBanner";
import RightSideInfo from "@/components/Slider/RightSideInfo";
import BorrowSlider from "@/components/Slider/BorrowSlider";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("mint");
  const [open2, setOpen2] = React.useState(false);
  const [openGetstart, setOpenGetstart] = React.useState(false);
  useEffect(() => {
    const checkIsStarted = localStorage.getItem("firstStart");
    if (!checkIsStarted) {
      setOpenGetstart(true);
      localStorage.setItem("firstStart", "true");
    }
  }, []);



  return (
    <>
      {/* Main area */}
      {/* <WalletOrContent/> */}
      <div className="static h-auto pb-10 mt-5 ">
        <div className="flex w-[95%]  justify-center mx-auto gap-5">
          
          <div className="w-[95%] border sm:w-[500px] md:w-[600px] 2xl:w-[600px] 3xl:w-[800px] dark:border-none  bg-[#ffff] mission-shadow dark:bg-none dark:bg-[#141414] shadow-lg  pb-4   mt-5 rounded-lg px-4">
            <div className="flex justify-center">
              <div className="">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="me-2">
                      <a href="#" onClick={() => setSelectedTab("mint")} className={`inline-flex items-center justify-center p-4 text-lg rounded-t-lg ${selectedTab == "mint" ? "text-[#90AFFF] border-b-2 border-[#90AFFF] rounded-t-lg active dark:text-[#90AFFF] dark:border-[#90AFFF]" : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                        Mint & Borrow
                      </a>
                    </li>
                    <li className="me-2">
                      <a href="#" onClick={() => setSelectedTab("dcds")} className={`inline-flex items-center justify-center p-4 text-lg  ${selectedTab == "dcds" ? "text-[#90AFFF] border-b-2 border-[#90AFFF] rounded-t-lg active dark:text-[#90AFFF] dark:border-[#90AFFF] " : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `} aria-current="page">
                        dCDS
                      </a>
                    </li>
                    <li className="me-2">
                      <a href="#" onClick={() => setSelectedTab("redeem")} className={`inline-flex items-center justify-center p-4 text-lg  ${selectedTab == "redeem" ? "text-[#90AFFF] border-b-2 border-[#90AFFF] rounded-t-lg active dark:text-[#90AFFF] dark:border-[#90AFFF] " : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                        Redeem
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-4">
              {
                selectedTab == "mint" ?
                  <WalletOrContent /> : selectedTab == "dcds" ? <Dcds /> : selectedTab == "redeem" ? <RedeemPage /> : ""
              }
            </div>
          </div>
          <BorrowSlider />
          {/* <RightSideInfo/> */}
        </div>
        <div className="relative flex gap-5 mt-4 lg:ml-5 lg:fixed lg:bottom-10">
          <div onClick={() => setOpen2(!open2)} className="px-8 py-4 font-semibold text-gray-600 bg-[#fffdd7] dark:bg-[#FC9550] dark:text-white  border-2 border-orange-400 rounded-md cursor-pointer">
            ? FAQs
          </div>
          <div onClick={() => setOpenGetstart(!open2)} className="px-8 py-4 font-semibold text-gray-600 bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] dark:bg-none  dark:bg-[#143968] dark:text-white border-2 border-gray-400 rounded-md cursor-pointer">
            Get Started
          </div>
          {/* <div onClick={()=>setOpen2(!open2)} className="px-8 py-4 font-semibold text-gray-600 bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] border-2 border-gray-400 rounded-md cursor-pointer">
          Key Highlights
          </div> */}
        </div>

        <div className="flex items-center justify-center mt-4 right-10 lg:fixed lg:bottom-10 ">

          <div className="flex justify-center p-3 text-sm border border-gray-500 rounded-md bg-white dark:bg-[#020202]">
            <div className="flex justify-between w-40 ">
              <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[2.5rem]"><Image src={github} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
              <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[2.5rem]"><Image src={twitter} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} /></div></a>
              <a href="https://t.co/Ck6x2jhVOj" target="_blank" ><div className="w-[2.5rem]"><Image src={discord} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
            </div>
          </div>
        </div>


        <Dialog open={open2} onOpenChange={setOpen2} >
          <DialogContent className="max-w-[800px]  pb-5">
            <div className="flex justify-end w-full ">
              <DialogClose asChild>
                <Button
                  variant={"ghostOutline"}
                  size={"primary"}
                  className="flex gap-[10px] border border-borderGrey "
                >
                  <Cross2Icon className="w-4 h-4" />
                  <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                    Close
                  </p>
                </Button>
              </DialogClose>
            </div>
            <Faq type={selectedTab} />
          </DialogContent>
        </Dialog>

        <Dialog open={openGetstart} onOpenChange={setOpenGetstart} >
          <DialogContent className="max-w-[800px]  pb-5">
            <div className="flex justify-end w-full ">
              <DialogClose asChild>
                <Button
                  variant={"ghostOutline"}
                  size={"primary"}
                  className="flex gap-[10px] border border-borderGrey "
                >
                  <Cross2Icon className="w-4 h-4" />
                  <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                    Close
                  </p>
                </Button>
              </DialogClose>
            </div>
            <DialogHeader className="flex items-start">
              <DialogTitle className="text-textPrimary  font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-2xl text-xl ">
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
              <Button className="p-2 mt-4 text-white">Start Trade Now</Button>
            </div>

          </DialogContent>
        </Dialog>


        {/* <div className="absolute invisible lg:visible xl:w-44 2xl:w-60 md:left-0 top-60 left-14">
          <Image src={bgEth} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="absolute invisible lg:visible xl:w-44 2xl:w-60 md:right-0 top-60 right-14">
          <Image src={bgBtc} alt="autonomint-dapp" className="z-0" style={{ width: "100%", height: "100%" }} />
        </div> */}
      </div>
    </>
  );
}
