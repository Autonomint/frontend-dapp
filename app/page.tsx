'use client';
import React, { use, useEffect, useState } from "react";
import WalletOrContent from "@/components/WalletOrContent/WalletOrContent";
import Dcds from "@/components/dcds/Dcds";
import RedeemPage from "@/components/redeem/RedeemPage";

import { Button } from "@/components/ui/button";
import WaitlistBanner from "@/components/Banner/WaitlistBanner";
import BorrowSlider from "@/components/pagePopover/BorrowSlider";
import {  BellIcon,  InfoCircledIcon } from "@radix-ui/react-icons";
import { Settings } from "lucide-react";
import { useAccount } from "wagmi";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import Notification from "@/components/pagePopover/Notification";
import PageSettings from "@/components/pagePopover/PageSettings";

export default function Home() {
  const [openSettings, setOpenSettings] = React.useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedTab, setSelectedTab] = useState("mint");
  const [openInfo, setOpenInfo] = React.useState(false);
  // useEffect(() => {
  //   const checkIsStarted = localStorage.getItem("firstStart");
  //   if (!checkIsStarted) {
  //     setOpenGetstart(true);
  //     localStorage.setItem("firstStart", "true");
  //   }
  // }, []);


  const { isConnected } = useAccount()



  return (
    <>
      {/* Main area */}
      <div className="z-40 static min-h-[84vh] pb-5 mx-2 sm:mx-5 bg-white dark:bg-[#242424] dark:shadow-darkcustom shadow-custom border-[1px] border-[#9E9E9E]">
        <div className="relative flex flex-wrap justify-center mx-auto lg:flex-row lg:gap-5">

        <Button onClick={() => {setOpenInfo(!openInfo)}}  variant={'primary'}  className=" hidden sm:flex  mr-5 sm:mr-0 absolute  sm:left-5 sm:-bottom-10 sm:top-5 border-[#041A50] h-fit p-[15px]">
            <InfoCircledIcon className="w-6 h-6 text-[#000000] " />
          </Button>
          
          <div className="w-[98%]   sm:w-[500px] md:w-[600px] 2xl:w-[600px] 3xl:w-[900px] dark:border-none  ]  pb-4  mt-5 p-1 sm:p-4">
            {isConnected ? (
              <>
                <div className="flex justify-center">
                  <div className="w-full px-2 ">
                    <div className="border-b border-gray-200 ">
                      <ul className="flex justify-between w-full -mb-px text-sm font-light text-center text-gray-800 dark:text-[#FFFFFF]">
                        <li className=" basis-1/3">
                          <a href="#" onClick={() => setSelectedTab("mint")} className={`inline-flex items-center justify-center w-full py-4 pb-1 px-0 text-md ${selectedTab == "mint" ? "text-[#000000] border-b-[3px] font-semibold border-[#000000] rounded-t-lg active dark:text-[#FFFFFF] dark:border-[#FFFFFF]" : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                            Mint & Borrow
                          </a>
                        </li>
                        <li className="basis-1/3">
                          <a href="#" onClick={() => setSelectedTab("dcds")} className={`inline-flex items-center justify-center w-full py-4 pb-1 px-0  text-md  ${selectedTab == "dcds" ? "text-[#000000] border-b-[3px] font-semibold border-[#000000]  rounded-t-lg active dark:text-[#FFFFFF] dark:border-[#FFFFFF] " : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `} aria-current="page">
                            dCDS
                          </a>
                        </li>
                        <li className=" basis-1/3">
                          <a href="#" onClick={() => setSelectedTab("redeem")} className={`inline-flex items-center justify-center w-full py-4 pb-1 px-0  text-md  ${selectedTab == "redeem" ? "text-[#000000] border-b-[3px] font-semibold border-[#000000]  rounded-t-lg active dark:text-[#FFFFFF] dark:border-[#FFFFFF] " : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
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
                      <WalletOrContent /> : selectedTab == "dcds" ? <Dcds />  : selectedTab == "redeem" ? <RedeemPage />:""
                      
                  }
                </div>
              </>
            ) : (
              <ConnectWallet />
            )}
          </div>
          
          <div className="hidden gap-5 sm:flex sm:flex-col sm:absolute mdb:flex right-5 top-5">
            <Button onClick={() => {setShowNotification(!showNotification);setOpenSettings(false)}} variant={'primary'} className="border-[#041A50] h-fit p-[15px]">
              <BellIcon className="w-6 h-6 text-[#000000] " />
            </Button>
            <Button onClick={() => {setOpenSettings(!openSettings);setShowNotification(false)}} variant={'primary'} className="border-[#041A50] h-fit p-[15px]">
              <Settings  className="w-6 h-6 text-[#000000] " />
            </Button>
          </div>


          <BorrowSlider open={openInfo} opentoggler={setOpenInfo} />
          <Notification showNotifications={showNotification} setShowNotifications={setShowNotification} />
          <PageSettings showSettings={openSettings} setShowSettings={setOpenSettings} />
        </div>
      </div>
    </>
  );
}
