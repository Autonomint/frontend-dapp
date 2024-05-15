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
import { ArrowRightIcon, BellIcon, Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import WaitlistBanner from "@/components/Banner/WaitlistBanner";
import BorrowSlider from "@/components/Slider/BorrowSlider";
import { Settings, Settings2Icon } from "lucide-react";
import { useAccount } from "wagmi";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);
  const [selectedTab, setSelectedTab] = useState("mint");
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openGetstart, setOpenGetstart] = React.useState(false);
  useEffect(() => {
    const checkIsStarted = localStorage.getItem("firstStart");
    if (!checkIsStarted) {
      setOpenGetstart(true);
      localStorage.setItem("firstStart", "true");
    }
  }, []);
  const { isConnected } = useAccount()



  return (
    <>
      {/* Main area */}
      {/* <WalletOrContent/> */}

      <div className="static min-h-[82vh] pb-5 mx-2 sm:mx-5 bg-white shadow-custom border-[1px] border-[#9E9E9E]">
        <div className="relative flex flex-wrap justify-center mx-auto lg:flex-row lg:gap-5">
          <div className="w-[98%]   sm:w-[500px] md:w-[600px] 2xl:w-[600px] 3xl:w-[900px] dark:border-none  bg-[#ffff]  dark:bg-none dark:bg-[#141414]  pb-4   mt-5 p-1 sm:p-4">
            {isConnected ? (
              <>
                <div className="flex justify-center">
                  <div className="w-full px-2 ">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                      <ul className="flex justify-between w-full -mb-px text-sm font-medium text-center text-gray-800 dark:text-gray-400">
                        <li className=" basis-1/3">
                          <a href="#" onClick={() => setSelectedTab("mint")} className={`inline-flex items-center justify-center w-full py-4 pb-1 px-0 text-md rounded-t-lg ${selectedTab == "mint" ? "text-[#000000] border-b-[3px] font-semibold border-[#000000] rounded-t-lg active dark:text-[#90AFFF] dark:border-[#90AFFF]" : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                            Mint & Borrow
                          </a>
                        </li>
                        <li className="me-2 basis-1/3">
                          <a href="#" onClick={() => setSelectedTab("dcds")} className={`inline-flex items-center justify-center w-full py-4 pb-1 px-0  text-md  ${selectedTab == "dcds" ? "text-[#000000] border-b-[3px] font-semibold border-[#000000]  rounded-t-lg active dark:text-[#90AFFF] dark:border-[#90AFFF] " : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `} aria-current="page">
                            dCDS
                          </a>
                        </li>
                        <li className="me-2 basis-1/3">
                          <a href="#" onClick={() => setSelectedTab("redeem")} className={`inline-flex items-center justify-center w-full py-4 pb-1 px-0  text-md  ${selectedTab == "redeem" ? "text-[#000000] border-b-[3px] font-semibold border-[#000000]  rounded-t-lg active dark:text-[#90AFFF] dark:border-[#90AFFF] " : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
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
              </>
            ) : (
              <ConnectWallet />
            )}
          </div>
          <div onClick={() => setOpenInfo(!openInfo)} className=" mr-5 sm:mr-0 sm:absolute  left-5 -bottom-10 sm:top-5 border-[#041A50] bg-[#ABFFDE] border-[1px] shadow-smallcustom h-fit p-[15px] cursor-pointer">
            <InfoCircledIcon className="w-6 h-6 text-[#000000] dark:text-[#90AFFF]" />
          </div>
          <div className="flex gap-5 sm:flex-col sm:absolute mdb:flex right-5 top-5">
            <div onClick={() => setShowNotification(!showNotification)} className="border-[#041A50] bg-[#ABFFDE] border-[1px] shadow-smallcustom h-fit p-[15px] cursor-pointer">
              <BellIcon className="w-6 h-6 text-[#000000] dark:text-[#90AFFF]" />
            </div>
            <div className="border-[#041A50] bg-[#ABFFDE] border-[1px] shadow-smallcustom h-fit p-[15px] cursor-pointer">
              <Settings className="w-6 h-6 text-[#000000] dark:text-[#90AFFF]" />
            </div>
          </div>
          <BorrowSlider open={openInfo} opentoggler={setOpenInfo} />
          {
            showNotification ? (
              <div className="absolute flex flex-col gap-4 w-[300px] dark:bg-[#141414] right-20  top-5 border border-black z-30 bg-white px-2 py-4 shadow-xl">
                <div className="flex justify-between text-sm font-semibold rounded-md">
                  Notifications
                  <div className="items-center -mt-2 border border-black cursor-pointer h-fit" onClick={() => setShowNotification(!showNotification)}><Cross2Icon/></div>
                </div>
                <div className="border-t">
                  <div className="p-2 text-xs">Check out the new leaderboard</div>
                </div>
              </div>
            ) : ("")
          }
        </div>
      </div>
    </>
  );
}
