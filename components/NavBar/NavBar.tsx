"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import dropdown from "@/app/assets/arrow_circle_down.svg";
import dropup from "@/app/assets/arrow_circle_up.svg";
import HeaderItems from "../Header/HeaderItems";
import logo from "@/app/assets/logo.svg";
import {
  useBorrowingContractGetLtv,
  useBorrowingContractGetUsdValue,
  useAmintTotalSupply,
  useCdsTotalCdsDepositedAmount,
  useTreasuryTotalVolumeOfBorrowersAmountinWei,
  useTreasuryTotalVolumeOfBorrowersAmountinUsd,
} from "@/abiAndHooks";
import { formatEther } from "viem";
import displayNumberWithPrecision from "@/app/utils/precision";
import { useAccount, useChainId } from "wagmi";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import Link from "next/link";
import JSBI from 'jsbi'
import { TickMath, FullMath } from '@uniswap/v3-sdk'
import { useContractRead } from "wagmi";import { Pool_Abi } from "@/constants/Pool";

const headerItems = [
  {
    headline: "AMINT Price",
    value: "-",
    tooltip: false,
    tooltipText: "",
  },
  {
    headline: "ABOND Price",
    value: "$4.000",
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
  {
    headline: "Collateral TVL",
    value: "-",
    tooltip: true,
    tooltipText: "Borrowing TVL",
  },
  {
    headline: "dCDS TVL",
    value: "-",
  },
  {
    headline: "Downside Protection",
    value: "-",
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
    headline: "Downside Protection",
    value: "-",
  },
];

function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'k';
  } else {
    return num.toFixed(2);
  }
}


const NavBar = () => {
  const chainId = useChainId();
  //managing state for showMore button
  const [showMore, setShowMore] = useState(false);
  //getting address of user from useAccount() wagmi hook
  const { address } = useAccount();
  //getting totalAmintSupply from Borrowing Contract
  const { data: totalAmintSupply } = useAmintTotalSupply({
   watch: true, 
  });
  //getting currentApy from Borrowing Contract
  // const { data: currentApy } = useBorrowingContractGetApy({
  //   enabled: !!address,
  // });
  //getting ltv from Borrowing Contract
 
  const { data: ethLocked } = useTreasuryTotalVolumeOfBorrowersAmountinUsd({ watch: true })
  const { data: ltv } = useBorrowingContractGetLtv({
    enabled: !!address,
  });
  //getting totalCdsAmount from CDS Contract
  const { data: totalCdsAmount } = useCdsTotalCdsDepositedAmount({
    enabled: !!address,
  });
  //getting totalValueLocked from Treasury
  const { data: totalValueLocked } =
  useTreasuryTotalVolumeOfBorrowersAmountinUsd({
      enabled: !!address,
    });
  //getting ethPrice from Borrowing Contract
  const { data: ethPrice } = useBorrowingContractGetUsdValue({
    enabled: !!address,
  });
  const { data, isError, isLoading } =  useContractRead({
    address: '0x09732eef05D41773c3fFF7385E30D35605111f8F',
    abi: Pool_Abi,
    functionName: 'slot0',
    chainId: 11155111,
  })

  function getAmintPrice() {
    if(!isLoading && data != undefined ){
      const Decimal0 = 6;
      const Decimal1 = 18;
      const sqrtPriceX96 = Number(data[0]);
      const buyOneOfToken0 = ((sqrtPriceX96 / 2**96)**2) / (Number((10**Decimal1 / 10**Decimal0).toFixed(Decimal1)));
      const buyOneOfToken1 = Number((1 / Number(buyOneOfToken0))).toFixed(Decimal0);
      return formatNumber(Number(buyOneOfToken0) * Number(buyOneOfToken1));
    }
  }


  //managing state for headerItems and headerItems2nd
  const [updatedHeaderItems, setUpdatedHeaderItems] = useState(headerItems);
  const [updatedHeaderItems2nd, setUpdatedHeaderItems2nd] =
    useState(headerItems2nd);

  /**
   * Updates the header items based on the values of `totalAmintSupply`, `currentApy`, `ltv`, `totalCdsAmount`, `ethPrice`, and `totalValueLocked`.
   */
  const handleNavItems = async () => {
    const data= await fetch(`${BACKEND_API_URL}/borrows/optionFees/${chainId}/1000000000000000000/${ethPrice}/0`).then(
      (res) => res.json()
    )
    console.log(totalAmintSupply)
    console.log("find" ,!isLoading)
   
    if (totalAmintSupply && !isLoading) {
      console.log("find" ,isLoading)
      const updatedData = [...updatedHeaderItems];
      updatedData[0].value = `$${getAmintPrice()}`;
      updatedData[2].value = `${formatNumber(Number(totalAmintSupply) / 10 ** 6)}`;
      updatedData[4].value = `${5}%`;
      updatedData[5].value = `${data[1] == undefined ? 0 : (parseFloat(data[1]) / 10 ** 6).toFixed(2)}`;
      setUpdatedHeaderItems(updatedData);
    }
    console.log(ethLocked)
    if (ltv && totalCdsAmount && ethPrice && totalValueLocked && ethLocked) {
      const updatedData = [...updatedHeaderItems];
      updatedData[6].value = `$${formatNumber(Number(formatEther((totalValueLocked) / BigInt(100))))}`;
      console.log(totalValueLocked , ethPrice)
      updatedData[7].value = `$${formatNumber(
        (Number(totalCdsAmount) / 10 ** 6)
        )}`;
        updatedData[8].value = `${100 - ltv}%`;
        setUpdatedHeaderItems(updatedData);
    }
  };

  //calling handleNavItems() every time the values of `totalAmintSupply`, `currentApy`, `ltv`, `totalCdsAmount`, `ethPrice`, and `totalValueLocked` changes
  useEffect(() => {
    handleNavItems();
  }, [ltv, totalAmintSupply, totalValueLocked, ethPrice]);

  return (
    <div className="flex w-[100%] h-[7vh] md:h-auto">
      <div className="flex w-full scrollb md:hidden md:w-0 bg-bgGrey dark:bg-[#020202]">
      <Link href={"/"}>
          <div className="w-[3rem] h-[3rem]">
            <Image src={logo} alt="autonomint-dapp" style={{ width: "100%", height: "100%" }} />
          </div>
        </Link>
      </div>


      <div className="hidden bg-bgGrey   dark:bg-[#020202] md:flex flex-col min-[1440px]:pb-6 2dppx:pb-1">
        <div className={`flex  px-1 py-3 ${showMore?"h-[200px]":"h-[100px]"} w-full sm:px-2 xl:px-5 xl:py-5 lg:px-4 lg:py-4 flex-wrap`}>
          {headerItems.map((item, index) => (
            <div className="flex w-auto min-w-[80px] lg:min-w-[120px] xl:min-w-[180px] h-[10vh] md:h-[90px] mx-2 pb-4">
            <HeaderItems
              key={index}
              props={{
                textHeadline: item.headline,
                textValue: item.value,
                showTooltip: item.tooltip,
                tooltipText: item.tooltipText,
                className: "invisible",
              }}
              />
              <span className="w-[2px] h-full bg-gray-300"></span>
              </div>
          ))}
        </div>
      </div>
      <Button
        variant={"showMore"}
        className=" hidden 3xl:hidden my-1 px-1 xl:px-4 sm:px-2 pb-1 xl:pb-4  py-0 md:flex flex-col gap-[10px] items-center h-full"
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        {!showMore ? (
          <div className="w-[35px] h-[35px] mt-4">
            <Image
              src={dropdown}
              alt="show more"
              width={0}
              height={0}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <div className=" w-[35px] h-[35px] mt-4">
            <Image
              src={dropup}
              alt="show more"
              width={35}
              height={35}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        <p className=" text-borderGrey text-base font-medium whitespace-nowrap min-w-[82.7px]">
          {!showMore ? "Show More" : "Show Less"}
        </p>
      </Button>

    </div>
  );
};

export default NavBar;
