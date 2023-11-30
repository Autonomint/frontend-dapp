"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import dropdown from "@/app/assets/arrow_circle_down.svg";
import dropup from "@/app/assets/arrow_circle_up.svg";
import HeaderItems from "../Header/HeaderItems";
import {
  useBorrowingContractGetApy,
  useBorrowingContractGetLtv,
  useBorrowingContractTotalAmintSupply,
  useCdsTotalCdsDepositedAmount,
} from "@/abiAndHooks";
import { formatEther } from "viem";
import displayNumberWithPrecision from "@/app/utils/precision";
import { useAccount } from "wagmi";

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
    value: "-",
  },
  {
    headline: "Current APY",
    value: "-",
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
    value: "-",
  },
  {
    headline: "Downside Protection",
    value: "-",
  },
];

const NavBar = () => {
  const [showMore, setShowMore] = useState(false);
  const { address } = useAccount();
  const { data: totalAmintSupply } = useBorrowingContractTotalAmintSupply({
    enabled: !!address,
  });
  const { data: currentApy } = useBorrowingContractGetApy({
    enabled: !!address,
  });
  const { data: ltv } = useBorrowingContractGetLtv({
    enabled: !!address,
  });
  const { data: totalCdsAmount } = useCdsTotalCdsDepositedAmount({
    enabled: !!address,
  });
  const [updatedHeaderItems, setUpdatedHeaderItems] = useState(headerItems);
  const [updatedHeaderItems2nd, setUpdatedHeaderItems2nd] =
    useState(headerItems2nd);
  const handleNavItems = () => {
    if (totalAmintSupply && currentApy) {
      const updatedData = [...updatedHeaderItems];
      updatedData[2].value = `${displayNumberWithPrecision(
        formatEther(totalAmintSupply)
      )}`;
      updatedData[3].value = `${currentApy}%`;
      setUpdatedHeaderItems(updatedData);
    }
    if (ltv && totalCdsAmount) {
      const updatedData2nd = [...updatedHeaderItems2nd];
      updatedData2nd[1].value = `${displayNumberWithPrecision(
        formatEther(totalCdsAmount)
      )}`;
      updatedData2nd[2].value = `${100 - ltv}%`;
      setUpdatedHeaderItems2nd(updatedData2nd);
    }
  };
  useEffect(() => {
    handleNavItems();
  }, [currentApy, ltv, totalAmintSupply]);

  return (
    <div className="bg-bgGrey flex flex-col min-[1440px]:pb-6">
      <div className="flex px-4 py-5">
        {headerItems.map((item, index) => (
          <HeaderItems
            key={index}
            props={{
              textHeadline: item.headline,
              textValue: item.value,
              className: "",
            }}
          />
        ))}
        <Button
          variant={"showMore"}
          className="px-4 pb-4 py-0 flex flex-col gap-[10px] items-center h-full"
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
          <p className="text-borderGrey text-base font-medium whitespace-nowrap min-w-[82.7px]">
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
          {headerItems2nd.slice(0, 2).map((item, index) => (
            <HeaderItems
              key={index}
              props={{
                textHeadline: item.headline,
                textValue: item.value,
                className: "opacity-0 cursor-default",
              }}
            />
          ))}
          <Button
            variant={"showMore"}
            className="px-4 pb-4 py-0 flex flex-col gap-[10px] items-center h-full opacity-0 cursor-default"
          >
            <div className="w-[35px] h-[35px]">
              <Image
                src={dropdown}
                alt="show more"
                width={0}
                height={0}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <p className="text-borderGrey text-base font-medium whitespace-nowrap opacity-0 min-w-[82.7px]">
              {!showMore ? "Show More" : "Show Less"}
            </p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
