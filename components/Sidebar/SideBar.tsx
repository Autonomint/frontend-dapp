"use client";
import React from "react";
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

  return (
    <nav className="h-[100vh] min-w-[20vh] max px-[10px] py-2 sm:py-[10px] lg:py-[20px] xl:py-[30px]  bg-bgGrey flex flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-[45px] fixed">
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
      </div>
    </nav>
  );
};

export default SideBar;
