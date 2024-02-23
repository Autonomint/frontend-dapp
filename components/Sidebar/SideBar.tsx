"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import currencyExchange from "@/app/assets/currency_exchange.svg";
import dashboard from "@/app/assets/dashboard.svg";
import derivatives from "@/app/assets/toll.svg";
import NavItems from "./NavItems";
import Profile from "./Profile";
import metamask from "@/app/assets/metamask.svg";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { useChainId, useSwitchNetwork } from "wagmi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

const navItemsList = [
  {
    image: currencyExchange,
    label: "Deposit & Withdraw",
    href: "/",
    targetSegment: null,
  },
  {
    image: derivatives,
    label: "dCDS",
    href: "derivatives",
    targetSegment: "derivatives",
  },
  {
    image: dashboard,
    label: "Dashboard",
    href: "dashboard",
    targetSegment: "dashboard",
  },
];
const SideBar = () => {
  const segment = useSelectedLayoutSegment();
  const chainId = useChainId();
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  useEffect(() => {
    if (chainId != 5 && chainId != 11155111) {
      setOpen(true)
    }
  }, []);
  return (
    <nav className="h-[100vh] md:min-w-[120px] basis-0 md:basis-[15%] xl:basis-[10%] md:px-[10px] py-2 sm:py-[10px] lg:py-[20px] xl:py-[30px]  bg-bgGrey flex flex-col items-center justify-between">
      <button onClick={()=>setOpenMenu(true)} className=" absolute top-1 right-2 w-[2.5rem] h-[2.5rem] rounded-md border p-2 md:hidden">
        <svg width="auto" height="auto" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </button>
      <div className={`bg-white border  min-w-[120px] flex flex-col items-center gap-[45px] right-0 fixed md:relative lg:fixed h-[100vh] top-0 px-2 z-50 md:z-0 ${!openMenu ? "right-[-180px] ":""} md:right-auto md:bg-bgGrey md:border-none `}>
        <Link href={"/"}>
          <div className="w-[3rem] h-[3rem] mt-8 hidden md:block ">
            <Image src={logo} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
          </div>
        </Link>
        <button onClick={()=>setOpenMenu(false)} className={`absolute top-1 left-1 w-[2.5rem] h-[2.5rem] rounded-md border p-2 md:hidden `}>
          <svg width="auto" height="auto" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>

        <div className="flex flex-col items-center gap-4 mt-5">
          {navItemsList.map((item) => {
            const isActive = segment;
            return (
              <Link
                className={
                  isActive === item.targetSegment
                    ? "rounded-[6px] bg-[#E4EDFF]"
                    : ""
                }
                href={item.href}
                key={item.href}
                onClick={() => setOpenMenu(false)
                }
              >
                <NavItems
                  props={{
                    image: item.image,
                    label: item.label,
                  }}
                />
              </Link>
            );
          })}
        </div>
        <Profile
          props={{
            image: metamask,
            buttonText: "Logout",
          }}
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent style={{ width: "300px", textAlign: "center", padding: "5vh" }} >
            <DialogHeader className="flex items-start">
              <DialogTitle className="text-textPrimary text-center font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-3xl text-2xl tracking-[-1.8px]">
                Unsupported Network
              </DialogTitle>
            </DialogHeader>
            <div>
              <Button
                variant={"primary"}
                onClick={() => switchNetwork && switchNetwork(5)}
                className="px-5 py-3 text-white"
              >
                Switch to Goerli
              </Button>
            </div>
          </DialogContent>

        </Dialog>


      </div>
    </nav>
  );
};

export default SideBar;
