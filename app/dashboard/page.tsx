import Image, { StaticImageData } from "next/image";
import React from "react";
import toll from "@/app/assets/toll.svg";
import dollar from "@/app/assets/local_atm.svg";
import donut from "@/app/assets/donut_small.svg";
import eth from "@/app/assets/eth.svg";
import avax from "@/app/assets/avax.svg";
import mantle from "@/app/assets/mantle.svg";
import matic from "@/app/assets/matic.svg";
import money from "@/app/assets/send_money.svg";
import HeaderItems from "@/components/Header/HeaderItems";
import Charts from "./Charts";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import RatioPieChart from "./RatioPieChart";

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

const chartData = [
  {
    name: "26",
    price: 0.95,
  },
  {
    name: "27",
    price: 0.96,
  },
  {
    name: "28",
    price: 1.05,
  },
  {
    name: "29",
    price: 0.95,
  },
  {
    name: "30",
    price: 0.96,
  },
  {
    name: "31",
    price: 0.9,
  },
  {
    name: "Nov",
    price: 0.9,
  },
];

const page = () => {
  return (
    <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden h-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between flex-1 gap-6 w-full">
          <DashboardCard headline="AMINT" data={amintValues} />
          <DashboardCard headline="ABOND" data={abondValues} />
        </div>
        <div className="flex gap-6">
          <ValueLocked />
          <div className="flex flex-col w-[70%]">
            <CollateralRatio />
            <div className="flex w-full h-full">
              <div className="flex h-full w-[350px] flex-col bg-[linear-gradient(270deg,#CDF3FF_0%,#D8FFEA_100%)] border-r border-solid border-lineGrey rounded-[10px] rounded-t-none rounded-br-none">
                <div className="px-[50px] py-[25px] flex justify-between">
                  <div className="flex flex-col">
                    <h5 className="text-[#00773F] text-base font-normal">
                      Collateral
                    </h5>
                    <p className="font-medium text-4xl text-[#00773F]">75%</p>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[#0F46E9] text-base font-normal">
                      dCDS
                    </h5>
                    <p className="font-medium text-4xl text-[#0F46E9]">25%</p>
                  </div>
                </div>
                <div className="h-full w-full">
                  <RatioPieChart />
                </div>
              </div>
              <div className="p-4 w-[70%]">
                <div className="flex justify-end items-center">
                  <div className="flex gap-[10px] mr-5">
                    <Button
                      variant={"showMore"}
                      size={"timeline"}
                      className="text-borderGrey"
                    >
                      All Time
                    </Button>
                    <Button
                      variant={"showMore"}
                      size={"timeline"}
                      className="text-borderGrey"
                    >
                      1Y
                    </Button>
                    <Button
                      variant={"showMore"}
                      size={"timeline"}
                      className="text-borderGrey"
                    >
                      6M
                    </Button>
                    <Button
                      variant={"showMore"}
                      size={"timeline"}
                      className="text-borderGrey"
                    >
                      1M
                    </Button>
                    <Button
                      variant={"showMore"}
                      size={"timeline"}
                      className="text-[#020202]  rounded-[4px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)]"
                    >
                      10D
                    </Button>
                    <Button
                      variant={"showMore"}
                      size={"timeline"}
                      className="text-borderGrey"
                    >
                      1D
                    </Button>
                  </div>
                </div>
                <Charts chartData={chartData} height={180} />
                <div className="flex justify-between items-center px-10 ">
                  <Button
                    variant={"secondary"}
                    size={"arrow"}
                    className="flex items-center bg-[#EEE] "
                  >
                    <ArrowLeftIcon width={12} height={9} />
                  </Button>
                  <p>Time</p>
                  <Button
                    variant={"secondary"}
                    size={"arrow"}
                    className="flex items-center bg-[#EEE]"
                  >
                    <ArrowRightIcon width={12} height={9} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full rounded-lg border border-lineGrey bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)]">
          <FeesComp />
          <div className="p-4 w-[70%] bg-white">
            <div className="flex justify-end items-center">
              <div className="flex gap-[10px] mr-5">
                <Button
                  variant={"showMore"}
                  size={"timeline"}
                  className="text-borderGrey"
                >
                  All Time
                </Button>
                <Button
                  variant={"showMore"}
                  size={"timeline"}
                  className="text-borderGrey"
                >
                  1Y
                </Button>
                <Button
                  variant={"showMore"}
                  size={"timeline"}
                  className="text-borderGrey"
                >
                  6M
                </Button>
                <Button
                  variant={"showMore"}
                  size={"timeline"}
                  className="text-borderGrey"
                >
                  1M
                </Button>
                <Button
                  variant={"showMore"}
                  size={"timeline"}
                  className="text-[#020202]  rounded-[4px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)]"
                >
                  10D
                </Button>
                <Button
                  variant={"showMore"}
                  size={"timeline"}
                  className="text-borderGrey"
                >
                  1D
                </Button>
              </div>
            </div>
            <Charts chartData={chartData} height={230} />
            <div className="flex justify-between items-center px-10 ">
              <Button
                variant={"secondary"}
                size={"arrow"}
                className="flex items-center bg-[#EEE] "
              >
                <ArrowLeftIcon width={12} height={9} />
              </Button>
              <p>Time</p>
              <Button
                variant={"secondary"}
                size={"arrow"}
                className="flex items-center bg-[#EEE]"
              >
                <ArrowRightIcon width={12} height={9} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function FeesComp() {
    return (
      <div className="flex flex-col gap-[10px] p-5 mr-2 w-[40%]">
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
      <div className="flex w-full flex-col rounded-lg rounded-b-none border border-lineGrey bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)]">
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
      <div className="flex max-w-[30%] w-full flex-col justify-between rounded-lg border border-lineGrey bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)]">
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
        <Image src={img} alt="currency icon" width={45} height={45}></Image>
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
        <div className="p-4 ">
          <div className="flex justify-end items-center">
            <div className="flex gap-[10px] mr-5">
              <Button
                variant={"showMore"}
                size={"timeline"}
                className="text-borderGrey"
              >
                All Time
              </Button>
              <Button
                variant={"showMore"}
                size={"timeline"}
                className="text-borderGrey"
              >
                1Y
              </Button>
              <Button
                variant={"showMore"}
                size={"timeline"}
                className="text-borderGrey"
              >
                6M
              </Button>
              <Button
                variant={"showMore"}
                size={"timeline"}
                className="text-borderGrey"
              >
                1M
              </Button>
              <Button
                variant={"showMore"}
                size={"timeline"}
                className="text-[#020202]  rounded-[4px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)]"
              >
                10D
              </Button>
              <Button
                variant={"showMore"}
                size={"timeline"}
                className="text-borderGrey"
              >
                1D
              </Button>
            </div>
          </div>
          <Charts chartData={chartData} height={180} />
          <div className="flex justify-between items-center px-10 ">
            <Button
              variant={"secondary"}
              size={"arrow"}
              className="flex items-center bg-[#EEE] "
            >
              <ArrowLeftIcon width={12} height={9} />
            </Button>
            <p>Time</p>
            <Button
              variant={"secondary"}
              size={"arrow"}
              className="flex items-center bg-[#EEE]"
            >
              <ArrowRightIcon width={12} height={9} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
export default page;
