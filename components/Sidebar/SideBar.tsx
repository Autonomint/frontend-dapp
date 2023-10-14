import React from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import currencyExchange from "@/app/assets/currency_exchange.svg";
import dashboard from "@/app/assets/dashboard.svg";
import derivatives from "@/app/assets/toll.svg";
import NavItems from "./NavItems";
import Profile from "./Profile";
import metamask from "@/app/assets/metamask.svg";

const navItemsList = [
  {
    image: currencyExchange,
    text: "Deposit & Withdraw",
  },
  {
    image: derivatives,
    text: "Derivatives",
  },
  {
    image: dashboard,
    text: "Dashboard",
  },
];

const SideBar = () => {
  return (
    <nav className="h-full px-[10px] py-[30px] bg-bgGrey flex flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-[45px]">
        <Image src={logo} alt="autonomint-dapp" width={50} height={46} />
        <div className="flex flex-col items-center gap-4">
          {navItemsList.map((item, index) => (
            <NavItems key={index} props={item} />
          ))}
        </div>
      </div>
      <Profile
        props={{
          image: metamask,
          address: "0xe7775680518A9A371231300DBAf2313dB6FeA7DC",
          buttonText: "Logout",
        }}
      />
    </nav>
  );
};

export default SideBar;
