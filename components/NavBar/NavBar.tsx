"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import dropdown from "@/app/assets/arrow_circle_down.svg";
import dropup from "@/app/assets/arrow_circle_up.svg";
import HeaderItems from "../Header/HeaderItems";
import {
  useBorrowingContractGetLtv,
  useBorrowingContractGetUsdValue,
  useBorrowingContractTotalAmintSupply,
  useCdsTotalCdsDepositedAmount,
  useTreasuryTotalVolumeOfBorrowersAmountinWei,
} from "@/abiAndHooks";
import { formatEther } from "viem";
import displayNumberWithPrecision from "@/app/utils/precision";
import { useAccount } from "wagmi";
import { BACKEND_API_URL } from "@/constants/BackendUrl";

const headerItems = [
  {
    headline: "AMINT Price",
    value: "$1.023",
    tooltip: false,
      tooltipText: "",
  },
  {
    headline: "ABOND Price",
    value: "$1.012",
    tooltip: false,
    tooltipText: "",
  },
  {
    headline: "AMINT Supply",
    value: "-",
    tooltip: false,
    tooltipText: "",
  },
  {
    headline: "Current APY",
    value: "-",
    tooltip: false,
    tooltipText: "",
  },
  {
    headline: "Current APR",
    value: "-",
    tooltip: false,
    tooltipText: "",
  },
  {
    headline: "Options Fees",
    value: "-",
    tooltip: true,
    tooltipText: "Option fees per eth",
  },
];
const headerItems2nd = [
  {
    headline: "TVL",
    value: "-",
  },
  {
    headline: "dCDS TVL",
    value: "-",
  },
  {
    //downside protection
    headline: "Secured",
    value: "-",
  },
];

const NavBar = () => {
  //managing state for showMore button
  const [showMore, setShowMore] = useState(false);
  //getting address of user from useAccount() wagmi hook
  const { address } = useAccount();
  //getting totalAmintSupply from Borrowing Contract
  const { data: totalAmintSupply } = useBorrowingContractTotalAmintSupply({
    enabled: !!address,
  });
  //getting currentApy from Borrowing Contract
  // const { data: currentApy } = useBorrowingContractGetApy({
  //   enabled: !!address,
  // });
  //getting ltv from Borrowing Contract
  const { data: ltv } = useBorrowingContractGetLtv({
    enabled: !!address,
  });
  //getting totalCdsAmount from CDS Contract
  const { data: totalCdsAmount } = useCdsTotalCdsDepositedAmount({
    enabled: !!address,
  });
  //getting totalValueLocked from Treasury
  const { data: totalValueLocked } =
    useTreasuryTotalVolumeOfBorrowersAmountinWei({
      enabled: !!address,
    });
  //getting ethPrice from Borrowing Contract
  const { data: ethPrice } = useBorrowingContractGetUsdValue({
    enabled: !!address,
  });
  //managing state for headerItems and headerItems2nd
  const [updatedHeaderItems, setUpdatedHeaderItems] = useState(headerItems);
  const [updatedHeaderItems2nd, setUpdatedHeaderItems2nd] =
  useState(headerItems2nd);

  /**
   * Updates the header items based on the values of `totalAmintSupply`, `currentApy`, `ltv`, `totalCdsAmount`, `ethPrice`, and `totalValueLocked`.
   */
  const handleNavItems = async() => {
    const data = await fetch(`${BACKEND_API_URL}/borrows/optionFees/5/1000000000000000000/${ethPrice}/0`).then(
      (res) => res.json()
    )

    if (totalAmintSupply) {
      const updatedData = [...updatedHeaderItems];
      updatedData[2].value = `${(parseFloat(totalAmintSupply.toString()) / 10 ** 6).toFixed(4)}`;
      updatedData[3].value = `${0}%`;
      updatedData[5].value = `${data[1]==undefined?0:(parseFloat(data[1])/10**6).toFixed(2)}`;
      setUpdatedHeaderItems(updatedData);
    }
    if (ltv && totalCdsAmount && ethPrice && totalValueLocked) {
      const updatedData2nd = [...updatedHeaderItems2nd];
      updatedData2nd[0].value = `$${displayNumberWithPrecision(
        formatEther((totalValueLocked * ethPrice) / BigInt(100))
      )}`;
      updatedData2nd[1].value = `$${displayNumberWithPrecision(
        formatEther(totalCdsAmount)
      )}`;
      updatedData2nd[2].value = `${100 - ltv}%`;
      setUpdatedHeaderItems2nd(updatedData2nd);
    }
  };

  //calling handleNavItems() every time the values of `totalAmintSupply`, `currentApy`, `ltv`, `totalCdsAmount`, `ethPrice`, and `totalValueLocked` changes
  useEffect(() => {
    handleNavItems();
  }, [0, ltv, totalAmintSupply, totalValueLocked, ethPrice]);

  return (
    <div className="bg-bgGrey flex flex-col min-[1440px]:pb-6 2dppx:pb-1">
      <div className="flex px-1 py-3 sm:px-2 xl:px-5 xl:py-5 lg:px-4 lg:py-4">
        {headerItems.map((item, index) => (
          <HeaderItems
            key={index}
            props={{
              textHeadline: item.headline,
              textValue: item.value,
              showTooltip: item.tooltip,
              tooltipText: item.tooltipText,
              className: "",
            }}
          />
        ))}
        <Button
          variant={"showMore"}
          className="px-1 xl:px-4 sm:px-2 pb-1 xl:pb-4 py-0 flex flex-col gap-[10px] items-center h-full"
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
        <div className="flex px-1 py-1 sm:px-2 sm:py-2 md:py-3 md:px-3 xl:px-5 xl:py-5 lg:px-4 lg:py-4">
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
          {headerItems.slice(0, 2).map((item, index) => (
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
            className="px-1 xl:px-4 sm:px-2 pb-1 xl:pb-4 py-0 flex flex-col gap-[10px] items-center h-full opacity-0 cursor-default"
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
