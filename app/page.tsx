'use client';
import React,{use, useEffect, useState} from "react";
import WalletOrContent from "@/components/WalletOrContent/WalletOrContent";
import currencyExchange from "@/app/assets/currency_exchange.svg";
import derivatives from "@/app/assets/toll.svg";
import mintmark from "@/app/assets/mintmark.svg";
import bgEth from "@/app/assets/eth.png";
import bgBtc from "@/app/assets/btc.png";
import Image from "next/image";
import Dcds from "@/components/dcds/Dcds";
import RedeemPage from "@/components/redeem/RedeemPage";
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
      <div className="h-[90vh] ">
        <div className="w-[550px]  bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] dark:bg-none dark:bg-[#141414] shadow-lg border pb-4  mx-auto mt-10 rounded-lg px-4">
          <div className="flex justify-center">
          <div className="">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="me-2">
                  <a href="#" onClick={()=>setSelectedTab("mint")} className={`inline-flex items-center justify-center p-4  rounded-t-lg ${selectedTab=="mint"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 ":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                    Mint & Borrow
                  </a>
                </li>
                <li className="me-2">
                  <a href="#" onClick={()=>setSelectedTab("dcds")} className={`inline-flex items-center justify-center p-4 ${selectedTab=="dcds"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 ":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `} aria-current="page">
                   dCDS
                  </a>
                </li>
                <li className="me-2">
                  <a href="#" onClick={()=>setSelectedTab("redeem")} className={`inline-flex items-center justify-center p-4 ${selectedTab=="redeem"?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 ":"border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                    Redeem
                  </a>
                </li>
              </ul>
            </div>
          </div>
          </div>
          <div>
            {
              selectedTab=="mint"?
              <WalletOrContent/>:selectedTab=="dcds"? <Dcds/>:selectedTab=="redeem"?<RedeemPage/>:""
                
            }
           
          </div>
        </div>
        <div className="absolute flex gap-5 bottom-5 left-10">
          {/* <div onClick={()=>setOpen2(!open2)} className="px-8 py-4 font-semibold text-gray-600 bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] border-2 border-gray-400 rounded-md cursor-pointer">
          Key Highlights
          </div> */}
          <div onClick={()=>setOpen2(!open2)} className="px-8 py-4 font-semibold text-gray-600 bg-yellow-200 border-2 border-orange-400 rounded-md cursor-pointer">
              ? FAQs
          </div>
        </div>
        <div className="absolute flex gap-5 bottom-5 right-10">
          <div onClick={()=>setOpenGetstart(!open2)} className="px-8 py-4 font-semibold text-gray-600 bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] border-2 border-gray-400 rounded-md cursor-pointer">
          Get Started
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
              {/* <DialogHeader className="flex items-start">
                <DialogTitle className="text-textPrimary  font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-2xl text-xl ">

                <h1>Key Highlights</h1>
                </DialogTitle>
              </DialogHeader> */}
              <Faq/>

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
                    <li>Make sure you have some Sepolia ETH in your account to pay for gas. if not,grab some the Sepolia Faucet.</li>
                    <li>Grap some TUSDT and Eth to trade with from the USDa faucet.</li>
                    <li>Click the button below to go deposit collateral and mint some panotions!</li>
                  </ol>
                </div>
                <Button className="p-2 mt-4 text-white">Start Trade Now</Button>
              </div>

            </DialogContent>
          </Dialog>


          <div className="absolute top-60 left-14">
            <Image src={bgEth} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="absolute top-60 right-14">
            <Image src={bgBtc} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
          </div>
      </div>
    </>
  );
}
