"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import { formatEther } from "viem";
import displayNumberWithPrecision from "@/app/utils/precision";
import { useAccount, useChainId, useDisconnect, } from "wagmi";
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
  {
    image: mintmark,
    label: "Bridge",
    href: "bridge",
    targetSegment: "bridge",
  },
];



const NavBar = () => {
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [showMore, setShowMore] = useState(false);
  const { address, isConnected } = useAccount();
  const segment = useSelectedLayoutSegment();
  const [openMenu, setOpenMenu] = React.useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [open2, setOpen2] = React.useState(false);
  const [showNotification, setShowNotification] = useState(false);
  return (
    <div className="z-50 w-full ">
    <div className="flex w-full    mx-auto h-16  bg-[linear-gradient(145deg,#f3f5f7_20%,#ecf2f8_100%)]   dark:bg-none dark:bg-[#1a1a1a] shadow-[0px_2px_4px 0px_rgba(0,0,0,0.25)] shadow-lg z-10">
      <div className="flex items-center gap-2 ml-4">
        <div className="w-[3rem] h-[3rem]">
          <Image src={logo} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="text-xl font-bold text-[#041A50] dark:text-[#007AFF]">Autonomint</div>
      </div>
      <div className="items-center justify-between invisible hidden w-0 md:flex md:w-full md:visible">
        <div className="flex ml-20 md:gap-2 md:ml-10 lg:gap-5">

          {navItemsList.map((item) => {
            const isActive = segment;
            return (
              <Link
                className={
                  isActive === item.targetSegment
                    ? " text-[14px] 2xl:text-normal font-semibold border-b-2 border-black dark:border-white  dark:text-white"
                    : "  "
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
          <div className="flex items-center justify-center">

          <button onClick={() => window.open("https://app.uniswap.org/swap", "_blank")} className="flex items-center h-10 px-4 py-1 text-sm font-bold text-center text-black border border-black rounded-lg dark:text-white dark:border-white">
            BUY USDa
          </button>
          </div>

        </div>
        <div className="flex gap-4 mr-5">
          {/* <div className="flex items-center gap-2 text-sm text-white">
            USDa APY <span className="font-semibold dark:text-[#00C2FF}">100%</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white">
            TVL <span className="font-semibold dark:text-[#00C2FF}">$100M</span>
          </div> */}

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
            <Image src={notification} className="rounded-sm cursor-pointer "  onClick={() => setShowNotification(!showNotification)} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
          </div>
          {isConnected ? (
            <div className="w-[2.5rem] h-[3rem] relative top-1">
              <Image src={profile} alt="autonomint-dapp" className="rounded-sm cursor-pointer "  onClick={() => setOpen2(!open2)} style={{ width: "100%", height: "100%" }} />
            </div>
          ) : (
            ""
          )}

        </div>
      </div>

      <div className="absolute right-0 flex items-center justify-center mr-3 top-2 md:hidden">

        <button onClick={()=>setShowMore(!showMore)} data-collapse-toggle="navbar-hamburger" type="button" className="flex items-center justify-center w-10 h-10 text-sm text-white border rounded-lg dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      {
        showMore ? (
          <div className="absolute w-[250px] right-0 top-16 h-screen bg-[linear-gradient(180deg,_#00679F_0%,#041A50_100%)]  border-black" id="navbar-hamburger">
            <ul className="flex flex-col font-medium rounded-lg dark:border-gray-700">
              <li>
                <a href="#" className="block px-3 py-2 font-semibold text-white text-md" aria-current="page">Home Page</a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 font-semibold text-white rounded text-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 font-semibold text-white rounded text-md 0 hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Leaderboard</a>
              </li>

            </ul>
            <div className="h-[2px] bg-gray-300 my-10"></div>
            <ul className="flex flex-col gap-3 font-medium rounded-lg dark:border-gray-700">

              <li className="w-[2rem] text-md ml-2 text-white font-semibold flex  items-center"> Notifications
                <Image src={notification} fill={false} className="rounded-sm cursor-pointer " onClick={() => setShowNotification(!showNotification)} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
              </li>
              <li>
                {isConnected ? (
                  <div className="w-[2rem] text-md ml-2 gap-2 text-white font-semibold flex  items-center">
                    Profile <Image src={profile} alt="autonomint-dapp" className="rounded-sm cursor-pointer " onClick={() => setOpen2(!open2)} style={{ width: "100%", height: "100%" }} />
                  </div>
                ) : (
                  ""
                )}
              </li>
              <li className="flex gap-2">
                <h2 className="ml-2 font-semibold text-white text-md">

                  {resolvedTheme === "light" ? "Light" : "Dark"}
                </h2>
                <label className="relative inline-flex items-center ml-2 cursor-pointer ">
                  <input type="checkbox" value="" className="sr-only peer" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} checked={resolvedTheme === "dark" ? true : false} />
                  <div className="relative w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3e61baa2]"></div>

                  <div className="absolute  dark:right-[1px] ">
                    {resolvedTheme === "light" ? <Image src={sunlight} width={25} alt="" /> : <Image src={darkmoon} width={15} alt="" />}
                  </div>
                </label>
              </li>

            </ul>
          </div>
        ) : ("")
      }

      {
        showNotification ? (
          <div className="absolute flex flex-col gap-4 w-[300px] dark:bg-[#141414] right-14 top-24 border z-50 bg-white px-2 py-4 rounded-lg shadow-xl">
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
{
        open2 ? (
          <div className=" fixed flex flex-col gap-4 w-auto dark:bg-[#141414] right-5 top-[6rem] border bg-white px-4 py-4 rounded-lg shadow-xl">
            <div className="flex items-center justify-end w-full">
              <button onClick={()=>setOpen2(!open2)} className="p-1 border border-black rounded-full dark:white"><Cross2Icon className="w-4 h-4"/></button>
            </div>
          <div className="flex flex-col gap-3">
          <div className="p-3 text-sm border border-gray-500 rounded-md">
            {address}
          </div>
          <div className="flex gap-2 text-sm rounded-md">
            <Button className="w-full text-white bg-blue-500 rounded-md cursor-pointer " >Change Network</Button>
            <Button className="w-full text-white bg-red-500 rounded-md cursor-pointer" onClick={() => {disconnect(); setOpen2(!open2)}}>Disconnect</Button>
          </div>
          <div className="p-3 text-sm underline border border-gray-500 rounded-md">
            <a href={`https://sepolia.etherscan.io/address/${address}`} >View All Wallets Transactions </a>
          </div>
          <div className="flex justify-between p-3 text-sm border border-gray-500 rounded-md"><div>Verify Joseon ID</div><div className="underline">Learn More</div></div>
          {/* <div className="flex justify-center p-3 text-sm border border-gray-500 rounded-md ">
            <div className="flex justify-between w-1/2 ">

              <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[2.5rem]"><Image src={github} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
              <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[2.5rem]"><Image src={twitter} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} /></div></a>
              <a href="https://t.co/Ck6x2jhVOj" target="_blank" ><div className="w-[2.5rem]"><Image src={discord} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
            </div>
          </div> */}
          <div className="p-3 text-sm border border-gray-500 rounded-md">
            Terms & privacy policy <a href="" className="text-blue-500 underline">click to view</a>
          </div>
        </div>
        </div>

        ) : ("")
      }



  

    </div >
    </div>

  );
};

export default NavBar;
{/* <Dialog open={isConnected && open2} onOpenChange={setOpen2}  >
<DialogContent className="max-w-[400px] pb-5 backdrop:bg-none absolute right-2">
  <div className="flex justify-end w-full ">
    <DialogClose asChild>
      <Button
        variant={"ghostOutline"}
        size={"primary"}
        className="flex gap-[10px] border rounded-full border-borderGrey "
      >
        <Cross2Icon className="w-4 h-4"  />
     
      </Button>
    </DialogClose>
  </div>

  <div className="flex flex-col gap-3">
    <div className="p-3 text-sm border border-gray-500 rounded-md">
      {address}
    </div>
    <div className="flex gap-2 text-sm rounded-md">
      <Button className="w-full text-white bg-blue-500 rounded-sm cursor-pointer " >Change</Button>
      <Button className="w-full text-white bg-red-500 rounded-sm cursor-pointer" onClick={() => disconnect()}>Disconnect</Button>
    </div>
    <div className="p-3 text-sm underline border border-gray-500 rounded-md">
      <a href={`https://sepolia.etherscan.io/address/${address}`} >View All Wallets Transactions </a>
    </div>
    <div className="flex justify-between p-3 text-sm border border-gray-500 rounded-md"><div>Verify Joseon ID</div><div>Learn More</div></div>
    <div className="flex justify-center p-3 text-sm border border-gray-500 rounded-md ">
      <div className="flex justify-between w-1/2 ">

        <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[2.5rem]"><Image src={github} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
        <a href="https://twitter.com/autonomint" target="_blank" ><div className="w-[2.5rem]"><Image src={twitter} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} /></div></a>
        <a href="https://t.co/Ck6x2jhVOj" target="_blank" ><div className="w-[2.5rem]"><Image src={discord} alt="autonomint-dapp" className="rounded-md dark:border-2 dark:border-white" style={{ width: "100%", height: "100%" }} /></div></a>
      </div>
    </div>
    <div className="p-3 text-sm border border-gray-500 rounded-md">
      Terms & privacy policy <a href="" className="text-blue-500 underline">click to view</a>
    </div>
  </div>
</DialogContent >
</Dialog > */}