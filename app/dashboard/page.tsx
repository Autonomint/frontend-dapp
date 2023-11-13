import Image, { StaticImageData } from "next/image";
import React from "react";
import toll from "@/app/assets/toll.svg";
import dollar from "@/app/assets/local_atm.svg";
import donut from "@/app/assets/donut_small.svg";
import eth from "@/app/assets/eth.svg";
import avax from "@/app/assets/avax.png";
import mantle from "@/app/assets/mantle.svg";
import matic from "@/app/assets/matic.png";
import money from "@/app/assets/send_money.svg";
import HeaderItems from "@/components/Header/HeaderItems";

const amintValues = [
  {
    headline: "Price",
    value: "$1",
  },
  {
    headline: "Total Supply",
    value: "1M",
  },
  {
    headline: "Total Market Cap",
    value: "$1M",
    lastElement: true,
  },
];
const abondValues = [
  {
    headline: "Price",
    value: "$4",
  },
  {
    headline: "Total Supply",
    value: "1K",
  },
  {
    headline: "Total Market Cap",
    value: "$40K",
    lastElement: true,
  },
];

const page = () => {
  return (
    <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden h-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between flex-1 gap-6">
          <DashboardCard headline="AMINT" data={amintValues} />
          <DashboardCard headline="ABOND" data={abondValues} />
        </div>
        <div className="flex gap-6">
          <ValueLocked />
          <CollateralRatio />
        </div>
        <div className="flex w-full rounded-lg border border-lineGrey bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)]">
          <FeesComp />
          <div className="p-[15px] bg-white w-full rounded-lg">

          </div>
        </div>
      </div>
    </div>
  );

  function FeesComp() {
    return (
      <div className="flex flex-col gap-[10px] p-5 mr-2">
        <div className="flex gap-[10px] flex-start w-full">
          <Image src={money} alt="money" width={35} height={35}></Image>
          <h2 className="text-textPrimary font-normal text-[32px] leading-none">
            Fees
          </h2>
        </div>
        <div className="flex py-[15px]">
          <HeaderItems
            props={{
              textHeadline: "Borrowing Fees",
              textValue: "4%",
              className: "",
              lastElement: false,
            }}
          />
          <HeaderItems
            props={{
              textHeadline: "Option Fee",
              textValue: "4%",
              className: "",
              lastElement: true,
            }}
          />
        </div>
        <div className="flex py-[15px]">
          <HeaderItems
            props={{
              textHeadline: "Total Collateral Protected",
              textValue: "$30K",
              className: "",
              lastElement: false,
            }}
          />
          <HeaderItems
            props={{
              textHeadline: "Total Upside Gained per ETH",
              textValue: "15%",
              className: "",
              lastElement: true,
            }}
          />
        </div>
        <div className="flex flex-start py-[15px]">
          <HeaderItems
            props={{
              textHeadline: "Total ABOND Yield",
              textValue: "$10K",
              className: "",
              lastElement: true,
            }}
          />
        </div>
      </div>
    );
  }

  function CollateralRatio() {
    return (
      <div className="flex w-full flex-col rounded-lg border border-lineGrey bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)]">
        <div className="flex flex-col gap-[10px] p-5">
          <div className="flex gap-[10px] flex-start w-full">
            <Image src={donut} alt="atm local" width={35} height={35}></Image>
            <h2 className="text-textPrimary font-normal text-[32px] leading-none">
              Ratio of Collaterals
            </h2>
          </div>
          <div className="flex py-[15px]">
            <HeaderItems
              props={{
                textHeadline: "Current Ratio",
                textValue: "0.25",
                className: "",
                lastElement: false,
              }}
            />
            <HeaderItems
              props={{
                textHeadline: "Total dCDS Pool value",
                textValue: "2M AMINT",
                className: "",
                lastElement: true,
              }}
            />
          </div>
          <div className="flex py-[15px]">
            <HeaderItems
              props={{
                textHeadline: "Net Value of dCDS Pool",
                textValue: "2.5M AMINT",
                className: "",
                lastElement: false,
              }}
            />
            <HeaderItems
              props={{
                textHeadline: "dCDS Profit/Loss",
                textValue: "+25%",
                className: "",
                lastElement: true,
                textColor: "#00773F",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  function ValueLocked() {
    return (
      <div className="flex max-w-[366px] w-full flex-col rounded-lg border border-lineGrey bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)]">
        <div className="flex flex-col gap-[10px] p-5">
          <div className="flex gap-[10px] flex-start w-full">
            <Image src={dollar} alt="atm local" width={35} height={35}></Image>
            <h2 className="text-textPrimary font-normal text-[32px] leading-none">
              Value Locked
            </h2>
          </div>
          <div className="py-[15px]">
            <div className="flex flex-col gap-5">
              <p className="text-textGrey text-base font-normal leading-none">
                Total Value Locked
              </p>
              <h3 className="font-medium text-[2rem] leading-none">2.03M</h3>
            </div>
          </div>
          <div className="py-[15px]">
            <div className="flex flex-col gap-5">
              <p className="text-textGrey text-base font-normal leading-none">
                Total Stablecoins Locked
              </p>
              <h3 className="font-medium text-[2rem] leading-none">
                200K AMINT
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-5 gap-[15px] bg-white rounded-lg">
          <AssetValueLocked
            img={eth}
            asset="Ethereum"
            value="1.2M"
            progress={55}
          />
          <AssetValueLocked
            img={avax}
            asset="Avalaunche"
            value="500K"
            progress={25}
          />
          <AssetValueLocked
            img={mantle}
            asset="Mantle"
            value="200K"
            progress={15}
          />
          <AssetValueLocked
            img={matic}
            asset="Polygon"
            value="150K"
            progress={5}
          />
        </div>
      </div>
    );
  }

  function AssetValueLocked({
    img,
    asset,
    value,
    progress,
  }: {
    img: StaticImageData;
    asset: string;
    value: string;
    progress: number;
  }) {
    return (
      <div className="flex gap-[10px] ">
        <Image src={img} alt="eth icon" width={45} height={45}></Image>
        <div className="relative w-full rounded-md border border-[#EEE] overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className={`bg-[#D8E5FF] absolute h-full z-0`}
          ></div>
          <div className="flex bg-[#F5F5F5]  px-[15px] py-[10px]">
            <p className="font-normal text-base text-[#242424] z-10">
              <span className="font-medium">{asset}</span>-${value}
            </p>
          </div>
        </div>
      </div>
    );
  }

  function DashboardCard({
    headline,
    data,
  }: {
    headline: string;
    data: { headline: string; value: string; lastElement?: boolean }[];
  }) {
    return (
      <div className="flex flex-col w-[50%] border border-lineGrey rounded-lg">
        <div className="flex flex-col p-5 gap-[10px] bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)] rounded-lg border border-lineGrey shadow-[0_4px_8px_0px_rgba(0,0,0,0.1)]">
          <div className="flex flex-start w-full gap-[10px]">
            <Image src={toll} alt="toll" width={35} height={35}></Image>
            <h2 className="text-textPrimary font-normal text-[32px] leading-none">
              {headline}
            </h2>
          </div>
          <div className="flex px-4 py-5">
            {data.map((item, index) => (
              <HeaderItems
                key={index}
                props={{
                  textHeadline: item.headline,
                  textValue: item.value,
                  className: "",
                  lastElement: item.lastElement,
                }}
              />
            ))}
          </div>
        </div>
        <div className="p-4">Chart</div>
      </div>
    );
  }
};

export default page;
