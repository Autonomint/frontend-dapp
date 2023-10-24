"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import dropdown from "@/app/assets/arrow_circle_down.svg";
import dropup from "@/app/assets/arrow_circle_up.svg";
import HeaderItems from "../Header/HeaderItems";

const headerItems = [
  {
    headline: "AMINT Price",
    value: "$1.023",
  },
  {
    headline: "ABOND Price",
    value: "$1.012",
  },
  {
    headline: "AMINT Supply",
    value: "$1M",
  },
  {
    headline: "Current APY",
    value: "5%",
  },
  {
    headline: "Options Fees",
    value: "3%",
  },
];
const headerItems2nd = [
  {
    headline: "Total Value Locked",
    value: "$2.23M",
  },
  {
    headline: "dCDS Pooled Amount",
    value: "$2.23M",
  },
  {
    headline: "Downside Protection",
    value: "3%",
  },
];

const NavBar = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="bg-bgGrey flex flex-col pb-6 pr-6">
      <div className="flex px-4 py-5">
        {headerItems.map((item, index) => (
          <HeaderItems
            key={index}
            props={{
              textHeadline: item.headline,
              textValue: item.value,
              className: "w-full",
            }}
          />
        ))}
        <Button
          variant={"showMore"}
          className="px-4 pb-4 py-0 flex flex-col gap-[10px] items-center h-full min-w-"
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {!showMore ? (
            <div className="w-[35px] h-[35px]">
              <Image
                src={dropdown}
                alt="show more"
                width={0}
                height={0}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <div className="w-[35px] h-[35px]">
              <Image
                src={dropup}
                alt="show more"
                width={35}
                height={35}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
          <p className="text-borderGrey text-base font-medium whitespace-nowrap">
            {!showMore ? "Show More" : "Show Less"}
          </p>
        </Button>
      </div>
      {showMore && (
        <div className="flex px-4 py-5">
          {headerItems2nd.map((item, index) => (
            <HeaderItems
              key={index}
              props={{
                textHeadline: item.headline,
                textValue: item.value,
                className: "",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
