"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import { formatEther } from "viem";
import displayNumberWithPrecision from "@/app/utils/precision";
import { useAccount, useChainId,useDisconnect, } from "wagmi";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import Link from "next/link";
import JSBI from 'jsbi'
import { TickMath, FullMath } from '@uniswap/v3-sdk'
import { useContractRead } from "wagmi"; import { Pool_Abi } from "@/constants/Pool";
import { useSelectedLayoutSegment } from "next/navigation";
import darkmoon from "@/app/assets/darkmoon.svg";
import sunlight from "@/app/assets/sunlight.svg";
import dashboard from "@/app/assets/dashboard.svg";
import twitter from "@/app/assets/twitter.svg";
import discord from "@/app/assets/discord.svg";
import github from "@/app/assets/github.svg";
import currencyExchange from "@/app/assets/currency_exchange.svg";
import derivatives from "@/app/assets/toll.svg";
import mintmark from "@/app/assets/mintmark.svg";
import profile from "@/app/assets/profile.svg";
import notification from "@/app/assets/notifications.svg";
import NavItems from "./NavItems";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";


function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'k';
  } else {
    return num.toFixed(2);
  }
}

const navItemsList = [
  {
    image: currencyExchange,
    label: "Home Page",
    href: "/",
    targetSegment: null,
  },
  {
    image: dashboard,
    label: "Dashboard",
    href: "dashboard",
    targetSegment: "dashboard",
  },
  {
    image: mintmark,
    label: "Leaderboard",
    href: "leaderboard",
    targetSegment: "leaderboard",
  },
];

const NavBar = () => {
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [showMore, setShowMore] = useState(false);
  const { address,isConnected } = useAccount();
  const segment = useSelectedLayoutSegment();
  const [openMenu, setOpenMenu] = React.useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [open2, setOpen2] = React.useState(false);
  const [showNotification, setShowNotification] = useState(false);
  return (
    <div className="flex w-full h-16  bg-[linear-gradient(180deg,_#00679F_0%,#041A50_100%)] dark:bg-none dark:bg-[#1a1a1a] shadow-[0px_2px_4px 0px_rgba(0,0,0,0.25)] z-10">
      <div className="flex items-center gap-2 ml-4 ">
        <div className="w-[3rem] h-[3rem]">
          <Image src={logo} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="text-xl font-bold text-white">Autonomint</div>
      </div>
      <div className="flex items-center justify-between w-full ">
        <div className="flex gap-5 ml-20">

          {navItemsList.map((item) => {
            const isActive = segment;
            return (
              <Link
                className={
                  isActive === item.targetSegment
                    ? " text-[14px] 2xl:text-normal font-semibold border-b-2 border-[#ffff]  dark:text-white"
                    : ""
                }
                href={item.href}
                key={item.href}
                onClick={() => setOpenMenu(false)
                }
              >
                <NavItems
                  props={{
                    label: item.label,
                  }}
                />
              </Link>
            );
          })}

        </div>
        <div className="flex gap-4 mr-5">

          <div className="flex ">
            <label className="relative inline-flex items-center cursor-pointer ">
              <input type="checkbox" value="" className="sr-only peer" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} checked={resolvedTheme === "dark" ? true : false} />
              <div className="relative w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3e61baa2]"></div>

              <div className="absolute  dark:right-[1px] ">
                {resolvedTheme === "light" ? <Image src={sunlight} width={25} alt="" /> : <Image src={darkmoon} width={15} alt="" />}
              </div>
            </label>
          </div>
          <div className="w-[2rem] h-[3rem]">
            <Image src={notification} className="rounded-sm cursor-pointer " onClick={() => setShowNotification(!showNotification)} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
          </div>
          {isConnected ? (
            <div className="w-[2.5rem] h-[3rem]">
            <Image src={profile} alt="autonomint-dapp" className="rounded-sm cursor-pointer " onClick={() => setOpen2(!open2)} style={{ width: "100%", height: "100%" }} />
          </div>
          ):(
            ""
          )}
          
        </div>
      </div>
      {
        showNotification ? (
          <div className="absolute flex flex-col gap-4 w-[300px] dark:bg-[#141414] right-10 top-14 border z-50 bg-white px-2 py-4 rounded-lg shadow-xl">
            <div className="flex justify-between text-sm font-semibold rounded-md">
              Notifications
              <div className="cursor-pointer" onClick={() => setShowNotification(!showNotification)}>close</div>
            </div>
            <div className="border-t">
              <div className="p-2 text-xs">Check out the new leaderboard</div>
            </div>
          </div>

        ) : ("")
      }

      

      <Dialog open={isConnected && open2} onOpenChange={setOpen2}  >
        <DialogContent className="max-w-[400px] pb-5 backdrop:bg-none ">
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
            <DialogTitle className="text-textPrimary  font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-3xl text-2xl tracking-[-1.8px]">
              Profile
            </DialogTitle>
          </DialogHeader> */}
          <div className="flex flex-col gap-3">
            <div className="p-3 text-sm border border-gray-500 rounded-md">
              {address}
            </div>
            <div className="flex gap-2 text-sm rounded-md">
              <Button className="w-full text-white bg-blue-500 rounded-sm cursor-pointer " >Change</Button>
              <Button className="w-full text-white bg-red-500 rounded-sm cursor-pointer" onClick={()=>disconnect()}>Disconnect</Button>
            </div>
            <div  className="p-3 text-sm underline border border-gray-500 rounded-md">
              <a href={`https://sepolia.etherscan.io/address/${address}`} >View All Wallets Transactions </a>
            </div>
            <div className="flex justify-between p-3 text-sm border border-gray-500 rounded-md"><div>Verify Joseon ID</div><div>Learn More</div></div>
            <div className="flex justify-center p-3 text-sm border border-gray-500 rounded-md ">
              <div className="flex justify-between w-1/2 ">

                <a href="https://twitter.com/autonomint"  target="_blank" ><div className="w-[2.5rem]"><Image src={github} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
                <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[2.5rem]"><Image src={twitter} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} /></div></a>
              <a href="https://t.co/Ck6x2jhVOj" target="_blank" ><div className="w-[2.5rem]"><Image src={discord} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
          </div>
        </div>
        <div className="p-3 text-sm border border-gray-500 rounded-md">
          Terms & privacy policy <a href="" className="text-blue-500 underline">click to view</a>
        </div>
    </div>
        </DialogContent >
      </Dialog >

    </div >

  );
};

export default NavBar;
