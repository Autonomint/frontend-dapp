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
import { useChainId,useSwitchNetwork } from "wagmi";
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
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  useEffect(() => {
    if(chainId != 5){
      setOpen(true)
    }
  }, []);
  return (
    <nav className="h-[100vh] basis-[10%] px-[10px] py-2 sm:py-[10px] lg:py-[20px] xl:py-[30px]  bg-bgGrey flex flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-[45px] fixed h-[100vh]">
        <Link href={"/"}>
          <div className="w-[3rem] h-[3rem]">
            <Image src={logo} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
          </div>
        </Link>
        <div className="flex flex-col items-center gap-4">
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
          <DialogContent style={{width:"300px", textAlign:"center",padding:"5vh"}} >
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
