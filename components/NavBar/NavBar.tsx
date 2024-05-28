"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import { useAccount, useBalance, useChainId, useDisconnect, useSwitchChain} from "wagmi";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import dashboard from "@/app/assets/dashboard.svg";
import walleticon from "@/app/assets/link.svg";
import currencyExchange from "@/app/assets/currency_exchange.svg";
import mintmark from "@/app/assets/mintmark.svg";
import NavItems from "./NavItems";
import { useTheme } from "next-themes";
import { usDaAddress } from "@/abiAndHooks";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";
import { useWeb3Modal, createWeb3Modal } from '@web3modal/wagmi/react'
import { config, projectId } from "@/providers/WalletProvider";
import {
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


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
  {
    image: mintmark,
    label: "Rewards",
    href: "rewards",
    targetSegment: "rewards",
  },
];



const NavBar = () => {
  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
  })
  const { open, close } = useWeb3Modal()
  const onConnect = () => {
    open()
  }
  const { switchChain } = useSwitchChain();


  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [showMore, setShowMore] = useState(false);
  const { address, isConnected } = useAccount();

  const { data, isError, isLoading } = useBalance({
    address: usDaAddress ? address : undefined,
    token: usDaAddress
      ? usDaAddress[chainId as keyof typeof usDaAddress]
      : undefined,
  });


  const segment = useSelectedLayoutSegment();
  const [openMenu, setOpenMenu] = React.useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [open2, setOpen2] = React.useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [selectedNetwork,setSelectedNetwork] = React.useState<string>(chainId===11155111 ? "Sepolia" :chainId===84532 ? "Base Sepolia"  :  "unsupported network")

  useEffect(()=>{
    setSelectedNetwork(chainId===11155111 ? "Sepolia" :chainId===84532 ? "Base Sepolia"  :  "unsupported network")
  },[chainId])
  return (
    <div className="z-50 w-full ">
      <div className="flex w-full justify-between  mx-auto h-[8vh] bg-[#EEEEEE] dark:bg-[#0F0F0F]  z-10">
        <div className="flex items-center gap-2 ml-4">
          <div className="w-[3rem] h-[3rem]">
            <Image src={logo} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="text-2xl font-plex-grotesk  tracking-tighter text-[#041A50] dark:text-[#FFFFFF]">Autonomint</div>
        </div>
        <div className="items-center justify-between invisible hidden w-0 mr-0 md:flex md:w-fit mdb:visible">
          <div className="flex justify-center ">
            <div className="flex md:gap-2 md:ml-10 lg:gap-5">

              {navItemsList.map((item) => {
                const isActive = segment;
                return (
                  <Link
                    className={
                      isActive === item.targetSegment
                        ? " text-[14px] 2xl:text-normal font-semibold  dark:border-white  dark:text-white"
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
              </div>
            </div>

          </div>
        </div>
        <div className="flex gap-4 mr-5">



          {/* <div className="w-[2rem] h-[3rem]">
              <Image src={notification} className="rounded-sm cursor-pointer " onClick={() => setShowNotification(!showNotification)} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
            </div> */}
          <div className="flex items-center justify-end border-black w-28">

        <Select
          onValueChange={(value) => {
            console.log("value",value)
            switchChain({ chainId: value === "Sepolia" ? 11155111 : 84532});
          }}
          value={selectedNetwork}
        >
                <SelectTrigger className='border border-black rounded-none bg-[#020202] dark:bg-[#3A3A3A] dark:border-[#9E9E9E] text-white' >
                  <SelectValue placeholder={selectedNetwork} />
                </SelectTrigger>
                <SelectContent className='text-white  bg-[#020202] dark:bg-[#3A3A3A] dark:border-[#9E9E9E] rounded-none '>
                  <SelectGroup>
                    <SelectItem value="Sepolia">Ethereum</SelectItem>
                    <SelectItem value="Base Sepolia">Base</SelectItem>
                  </SelectGroup>
                </SelectContent>

              </Select>


    
          </div>

          <div className="flex items-center justify-center top-2">

          {isConnected ? (
            <Button onClick={() => setOpen2(!open2)} variant={'secondary'} className="flex gap-2 text-[0.85rem]" >
              <div className="w-[1.5rem] -mt-[2px] "><Image src={walleticon} alt="autonomint-dapp" className="rounded-sm cursor-pointer " style={{ width: "100%", height: "100%" }} /> </div>{truncateWeb3WalletAddress(`0x${address}`)}
            </Button>
          ) : (
            <Button onClick={onConnect} variant={'secondary'} >
              Connect Wallet
            </Button>
          )}
          </div>
          <div className="right-0 flex items-center justify-center top-2 mdb:hidden">

            <button onClick={() => setShowMore(!showMore)} data-collapse-toggle="navbar-hamburger" type="button" className="flex  shadow-custom items-center justify-center w-10 h-10 text-sm text-[#020202] bg-white border border-[#9E9E9E] dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

        </div>


        {
          showMore ? (
            <div className="absolute w-[220px] right-0 p-2 h-screen bg-[#EEEEEE]  border-black" id="navbar-hamburger">
              <button onClick={() => setShowMore(!showMore)} data-collapse-toggle="navbar-hamburger" type="button" className="flex  shadow-custom items-center justify-center w-10 h-10 text-sm text-[#c7c2c2] bg-white border border-[#9E9E9E] dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                <Cross2Icon className="w-5 h-5 text-black" />
              </button>
              <ul className="flex flex-col font-medium rounded-lg dark:border-gray-700">
                {navItemsList.map((item) => {
                  const isActive = segment;
                  return (
                    <Link
                      className={
                        isActive === item.targetSegment
                          ? " text-[14px] 2xl:text-normal font-semibold  dark:border-white  dark:text-white"
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

              </ul>
              <div className="h-[2px] bg-gray-300 my-5"></div>
              <ul className="flex flex-col gap-3 font-medium rounded-lg dark:border-gray-700">


                <li>
                  {isConnected ? (
                    <div onClick={() => setOpen2(!open2)} className="px-5 flex gap-2 py-1 pt-2 h-fit text-sm font-semibold text-black bg-[#DEDEDE] dark:bg-[#FC9550] dark:text-white  border-b-2 border-black  cursor-pointer">
                      <div className="w-[1.5rem] -mt-[2px] "><Image src={walleticon} alt="autonomint-dapp" className="rounded-sm cursor-pointer " style={{ width: "100%", height: "100%" }} /> </div>{truncateWeb3WalletAddress(`0x${address}`)}
                    </div>
                  ) : (
                    <div className="hidden mdb:flex px-8 py-2 mt-2 h-fit font-semibold text-black bg-[#DEDEDE] dark:bg-[#FC9550] dark:text-white  border-b-2 border-black  cursor-pointer">
                      Connect Wallet
                    </div>
                  )}
                </li>
                <li className="flex gap-2">
                  <h2 className="ml-2 font-semibold text-black text-md">
                    {resolvedTheme === "light" ? "Light" : "Dark"}
                  </h2>
                  <div className="flex">
                    <label className="relative items-center cursor-pointer mdb:inline-flex ">
                      <input type="checkbox" value="" className="sr-only peer" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} checked={resolvedTheme === "dark" ? true : false} />
                      <div className="relative w-10 h-5 border border-black bg-white peer-focus:outline-none    peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[0px] after:bg-[#ABFFDE]  after:border after:h-full after:border-black after:w-5 after:transition-all dark:border-gray-600 "></div>

                      <div className="absolute  dark:right-[1px] ">
                        {resolvedTheme === "light" ? (<div className="bg-[#ABFFDE]"></div>) : (<div className="bg-[#ABFFDE]"></div>)}
                      </div>
                    </label>
                  </div>
                </li>

              </ul>
            </div>
          ) : ("")
        }


        {
          open2 ? (
            <div className=" fixed w-[100%] border-black  sm:w-auto dark:bg-[#141414] sm:right-5 sm:top-[4rem] right-0 top-0 border dark:border-gray-600 bg-white px-4 py-4 pt-2 shadow-xl">
              <div className="flex items-center justify-end w-full mb-2 ">
                <button onClick={() => setOpen2(!open2)} className="p-1 border border-black dark:border-white dark:white hover:bg-gray-200"><Cross2Icon className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-3">
                  <div className="p-3 text-sm border  bg-[#EEEEEE] dark:bg-[#3A3A3A]">
                    {address}
                  </div>
                  <div className="p-3 relative text-sm border  bg-[#EEEEEE] dark:bg-[#3A3A3A]">
                    <div className="text-[0.8rem]"> USDa Balance</div>
                    <div className="absolute flex items-center gap-2 text-xs top-3 right-2">
                      <div className="h-4 w-4 bg-[#93F3BA] rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-[#009350] rounded-full"></div>
                      </div>
                      {chainId === 11155111 ? "Ethereum Sepolia " : chainId === 84532 ? "Base Sepolia" : "unsupported network"}

                    </div>
                    <div className="text-xl font-bold">${data?.formatted.slice(0, 8)}</div>
                  </div>

                  <div className="flex gap-2 text-sm ">
                    <Button className="text-[white] dark:border-white  w-full relative text-sm rounded-none basis-1/2 border-0 border-b-2 border-[#020202] bg-[#020202] py-2" >Change Network</Button>
                    <Button className="border-[#041A50] bg-[#ABFFDE] dark:text-black text-sm border-[1px] shadow-smallcustom py-2 rounded-none basis-1/2 " onClick={() => { disconnect(); setOpen2(!open2) }}>Disconnect</Button>
                  </div>
                  <div className="p-3 text-sm underline border  bg-[#EEEEEE]">
                    <a href={`https://sepolia.etherscan.io/address/${address}`} >View All Wallets Transactions </a>
                  </div>
                  <div className="flex justify-between p-3 text-sm border  bg-[#EEEEEE] dark:bg-[#3A3A3A]"><div>Verify Joseon ID</div><a className="underline" href="https://www.joseon.com/l/en-US/" target="_blank">Learn More</a></div>
                  <div className="p-3 text-sm border  bg-[#EEEEEE] dark:bg-[#3A3A3A]">
                    Terms & privacy policy <a href="https://www.autonomint.com/terms-and-privacy" target="_blank" className="text-black underline">click to view</a>
                  </div>
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