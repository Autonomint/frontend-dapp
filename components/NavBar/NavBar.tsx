"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import dashboard from "@/app/assets/dashboard.svg";
import walleticon from "@/app/assets/link.svg";
import currencyExchange from "@/app/assets/currency_exchange.svg";
import mintmark from "@/app/assets/mintmark.svg";
import autonomint from "@/app/assets/autonomint.svg";
import NavItems from "./NavItems";
import { useTheme } from "next-themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";
import { useWeb3Modal, createWeb3Modal } from '@web3modal/wagmi/react'
import { config, projectId } from "@/providers/WalletProvider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link2, WalletIcon } from "lucide-react";
import Profile from "./Profile";


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

  const chainId = useChainId();
  const [showMore, setShowMore] = useState(false);
  const { address, isConnected, connector } = useAccount();




  const segment = useSelectedLayoutSegment();
  const [openMenu, setOpenMenu] = React.useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [open2, setOpen2] = React.useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [selectedNetwork, setSelectedNetwork] = React.useState<string>(chainId === 11155111 ? "Sepolia" : chainId === 84532 ? "Base Sepolia" : "unsupported network")

  useEffect(() => {
    setSelectedNetwork(chainId === 11155111 ? "Sepolia" : chainId === 84532 ? "Base Sepolia" : "unsupported network")
  }, [chainId])
  return (
    <div className="z-50 w-full ">
      <div className="flex w-full justify-between  mx-auto h-[8vh] bg-[#EEEEEE] dark:bg-[#0F0F0F]  z-10">
        <div className="flex items-center ml-4">
          <div className="w-[3rem] h-[3rem]">
            <Image src={logo} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
          </div>

          <div className="text-xl font-plex-grotesk   tracking-tighter text-[#020202] dark:text-[#EEEEEE]">
            <svg width="190" height="20" viewBox="0 0 190 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_60_52)">
                <path d="M20.8115 15.1176V0.340149H24.0612V15.1176C24.0612 18.7289 25.2305 20.0435 29.7152 20.0435C34.2 20.0435 35.3693 18.7289 35.3693 15.1176V0.340149H38.619V15.1176C38.619 20.9309 35.4655 23 29.7152 23C23.965 23 20.8115 20.9309 20.8115 15.1176Z" />
                <path d="M50.2892 3.29667V22.6726H47.0395V3.29667H40.2466V0.340149H57.0796V3.29667H50.2867H50.2892Z" />
                <path d="M56.105 11.5064C56.105 4.93862 60.1367 0.0127869 66.8942 0.0127869C73.6517 0.0127869 77.6835 4.93862 77.6835 11.5064C77.6835 18.0742 73.6543 23 66.8942 23C60.1342 23 56.105 18.0742 56.105 11.5064ZM74.4338 11.5064C74.4338 5.23274 71.217 2.96931 66.8942 2.96931C62.5714 2.96931 59.3547 5.23529 59.3547 11.5064C59.3547 17.7775 62.5385 20.0435 66.8942 20.0435C71.2499 20.0435 74.4338 17.7775 74.4338 11.5064Z" />
                <path d="M82.5607 6.71099V22.6701H79.311V0.340149H82.5607L93.0893 16.2992H93.6081V0.340149H96.8578V22.6701H93.6081L83.0796 6.71099H82.5607Z" />
                <path d="M98.4849 11.5064C98.4849 4.93862 102.514 0.0127869 109.274 0.0127869C116.034 0.0127869 120.063 4.93862 120.063 11.5064C120.063 18.0742 116.034 23 109.274 23C102.514 23 98.4849 18.0742 98.4849 11.5064ZM116.814 11.5064C116.814 5.23274 113.597 2.96931 109.274 2.96931C104.951 2.96931 101.735 5.23529 101.735 11.5064C101.735 17.7775 104.918 20.0435 109.274 20.0435C113.63 20.0435 116.814 17.7775 116.814 11.5064Z" />
                <path d="M124.938 8.48337V22.6701H121.688V0.340149H124.938L133.356 17.9412H133.875L142.293 0.340149H145.542V22.6701H142.293V8.48337H141.774L135.958 20.8312H131.278L125.462 8.48337H124.943H124.938Z" />
                <path d="M151.394 0.340149V22.6701H148.144V0.340149H151.394Z" />
                <path d="M157.242 6.71099V22.6701H153.993V0.340149H157.242L167.771 16.2992H168.29V0.340149H171.539V22.6701H168.29L157.761 6.71099H157.242Z" />
                <path d="M183.207 3.29667V22.6726H179.957V3.29667H173.165V0.340149H189.998V3.29667H183.205H183.207Z" />
                <path d="M0 22.3171L6.94986 0H12.08L19.0299 22.3171H15.6207L9.77688 3.05115H9.25805L3.40913 22.3171H0Z" />
                <path d="M19.0145 7.49361H0.0175781V9.93606H19.0145V7.49361Z" />
                <path d="M19.0145 11.4501H0.0175781V13.8926H9.51606H19.0145V11.4501Z" />
              </g>
              <defs>
                <clipPath id="clip0_60_52">
                  <rect width="190" height="23" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
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
          <div className="flex items-center justify-end border-black w-34">
            <Select
              onValueChange={(value) => {
                console.log("value", value)
                switchChain({ chainId: value === "Sepolia" ? 11155111 : 84532 });
              }}
              value={selectedNetwork}
            >
              <SelectTrigger className='border  border-black rounded-none bg-[#020202] dark:bg-[#3A3A3A] dark:border-[#9E9E9E] text-white' >
                <SelectValue placeholder={selectedNetwork} />
              </SelectTrigger>
              <SelectContent className='text-white  bg-[#020202] dark:bg-[#3A3A3A] dark:border-[#9E9E9E] rounded-none '>
                <SelectGroup>
                  <SelectItem value="Sepolia">Ethereum Sepolia</SelectItem>
                  <SelectItem value="Base Sepolia">Base Sepolia</SelectItem>
                </SelectGroup>
              </SelectContent>

            </Select>
          </div>

          <div className="flex items-center justify-center top-2">

            {isConnected ? (
              <Button onClick={() => setOpen2(!open2)} variant={'secondary'} className="flex  text-[0.85rem] font-[500]" >
                <div className="w-[1.5rem] -mt-[2px] "><WalletIcon className="w-5" /> </div>{truncateWeb3WalletAddress(`0x${address}`)}
              </Button>
            ) : (
              <Button onClick={onConnect} className="font-[500] gap-2" variant={'secondary'} >
                <Link2 className="w-5" /> Connect Wallet
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
                      <div className="w-[1.5rem] -mt-[2px] "><WalletIcon /> </div>{truncateWeb3WalletAddress(`0x${address}`)}
                    </div>
                  ) : (
                    <div className="hidden mdb:flex px-8 py-2 mt-2 gap-2 h-fit font-semibold text-black bg-[#DEDEDE] dark:bg-[#FC9550] dark:text-white  border-b-2 border-black  cursor-pointer">
                      <Link2 />   Connect Wallet
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


        <Profile setOpen={setOpen2} open={open2} />
      </div >
    </div>

  );
};

export default NavBar;