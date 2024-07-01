'use client'
import Image, { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import toll from "@/app/assets/toll.svg";
import dollar from "@/app/assets/local_atm.svg";
import donut from "@/app/assets/donut_small.svg";
import eth from "@/app/assets/eth.svg";
import mantle from "@/app/assets/mantle.svg";
import matic from "@/app/assets/matic.svg";
import money from "@/app/assets/send_money.svg";
import HeaderItems from "@/components/Header/HeaderItems";
import Charts from "./Charts";
import RatioPieChart from "./RatioPieChart";
import { useReadAbondTotalSupply, useReadUsDaTotalSupply, useReadGlobalGetOmniChainData, useReadBorrowingContractGetUsdValue } from "@/abiAndHooks";
import { ethers, formatEther } from "ethers";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import { useChainId,useAccount } from "wagmi";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import { useQueries,useQuery } from "@tanstack/react-query";

const amintValues = [
  {
    headline: "Price",
    value: "$1",
  },
  {
    headline: "Total Supply",
    value: "-",
  },
  {
    headline: "Total Market Cap",
    value: "-",
    lastElement: true,
  },
];
const lockedValues = [
  {
    value: "$2.03M",
  },
  {
    value: "200K USDa",
  },
  {
    value: "1.2M",
  }
];
const RatioValues = [
  {

    value: "0.25",
  },
  {
    value: "2M USDa",
  },
  {
    value: "2.5M USDa",
  },
  {
    value: "+25%",
  },
  {
    value: "+25%",
  },
  {
    value: "+25%",
  },
];

const abondValues = [
  {
    headline: "Price",
    value: "$4",
  },
  {
    headline: "Total Supply",
    value: "-",
  },
  {
    headline: "Total Market Cap",
    value: "-",
    lastElement: true,
  },
];

const FeesValues = [
  {

    value: "0.25",
  },
  {
    value: "2M USDa",
  },
  {
    value: "2.5M USDa",
  },
]

const chartData = [
     '0.95',
   ' 0.95',
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


const page = () => {
  // connected wallet
  const { isConnected} = useAccount();
  const chainId = useChainId();
  const [loading, setLoading] = React.useState(true);
  const [feeOption, setFeeOption] = React.useState("option");
  const { data: ethPrice} = useReadBorrowingContractGetUsdValue()
  const { data: amintsupply } = useReadUsDaTotalSupply()
  const { data: abondSupply} = useReadAbondTotalSupply();
  const {data:globalData} = useReadGlobalGetOmniChainData();

  const {data:resRatioData} = useQuery({
    queryKey: ["ratioData"],
    queryFn:()=>fetch(`${BACKEND_API_URL}/borrows/ratio/${chainId}/${ethPrice ?? 0}`).then((res) => res.json()),
  })
  const ratioData = resRatioData || 0;
  console.log(ratioData,ethPrice)
  
  const {data:feeOptions,refetch} = useQuery({
    queryKey: ['optionFees'],
    queryFn:()=>fetch(`${BACKEND_API_URL}/borrows/optionFees/${chainId}/1000000000000000000/${ethPrice ?? 0}/0`).then((res) => res.json()),
  })
  console.log(feeOptions)

  useEffect(() => {
    handleStatsItem()
    refetch()
  }, [ globalData, ethPrice, amintsupply, ratioData, feeOptions, abondSupply,feeOptions,ratioData])
  
  const handleStatsItem = async () => {
    console.log( ethPrice, amintsupply,abondSupply, ratioData, feeOptions)
    // check if all data is available
    setLoading(true)
    if ( ethPrice  && amintsupply !=undefined && globalData  !=undefined && ratioData  !=undefined && feeOptions  !=undefined && abondSupply  !=undefined) {
      amintValues[1].value = amintsupply ? formatNumber(Number(amintsupply) / 10 ** 6) : "0";
      amintValues[2].value = amintsupply ? formatNumber(Number(amintsupply) / 10 ** 6) : "0";

      
      // locked values
      lockedValues[0].value = globalData.totalCdsDepositedAmount  ? formatNumber((Number(globalData.totalCdsDepositedAmount) / 10 ** 6) + (Number(formatEther(globalData.totalVolumeOfBorrowersAmountinUSD  / BigInt(100))))) : "0";
      lockedValues[1].value = globalData.totalCdsDepositedAmount ? formatNumber(Number(globalData.totalCdsDepositedAmount) / 10 ** 6) : "0";
      lockedValues[2].value = globalData.totalCdsDepositedAmount ? formatNumber(Number(formatEther((globalData.totalVolumeOfBorrowersAmountinUSD  ) / BigInt(100)))) : "0";

      // ratio values
      RatioValues[0].value = ratioData == undefined ? "-" : (ratioData).toFixed(2);
      RatioValues[1].value = globalData.totalCdsDepositedAmount ? formatNumber(Number(globalData.totalCdsDepositedAmount) / 10 ** 6) : "0";
      RatioValues[2].value = globalData.totalCDSPool ? formatNumber(Number(globalData.totalCDSPool/BigInt(10**6))) : "0";
      RatioValues[3].value = (Number(globalData.totalCDSPool/BigInt(10**6)) - (Number(globalData.totalCdsDepositedAmount) / 10 ** 6)).toFixed(2);
      const total = (Number(formatEther(globalData.totalVolumeOfBorrowersAmountinUSD  / BigInt(100)))) + (Number(globalData.totalCdsDepositedAmount) / 10 ** 6);
      RatioValues[4].value = (((Number(formatEther(globalData.totalVolumeOfBorrowersAmountinUSD / BigInt(100)))) / total) * 100).toFixed(1);
      RatioValues[5].value = (((Number(globalData.totalCdsDepositedAmount) / 10 ** 6) / total) * 100).toFixed(1);

      // fees values
      FeesValues[0].value = `${feeOptions[1] == undefined ? 0 : (parseFloat(feeOptions[1]) / 10 ** 6).toFixed(2)}`;
      FeesValues[1].value = `${feeOptions[1] == undefined ? 0 : (parseFloat(feeOptions[1]) / 10 ** 6).toFixed(2)}`;
      FeesValues[2].value = formatNumber(Number(formatEther((globalData.totalVolumeOfBorrowersAmountinUSD ) / BigInt(100))) * 0.20);

      abondValues[1].value = abondSupply ? formatNumber(Number(abondSupply) / 10 ** 18) : "0";
      console.log("step-1-----------------------------------------------------")
      setLoading(false)
    }
  };


  return (
    <div className="z-40 static h-[84vh] overflow-y-scroll p-5 mx-2 sm:mx-5 bg-white shadow-custom dark:bg-[#242424] dark:shadow-darkcustom border-[1px] border-[#9E9E9E]">
      {!isConnected ?<ConnectWallet/>:
         
        loading ? (<div className="w-full h-[80vh] flex justify-center items-center">
          <div role="status">
            <svg aria-hidden="true" className="inline text-gray-200 w-14 h-14 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>

        </div>) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-between flex-1 w-full gap-6 md:flex-row">
              <DashboardCard headline="USDa" data={amintValues} />
              <DashboardCard headline="ABOND" data={abondValues} />
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
              <ValueLocked />
              <div className="flex flex-col w-full md:w-[60%] lg:w-[70%]">
                <CollateralRatio />
                <div className="flex flex-col w-full h-full border border-t-0 border-[#9E9E9E] lg:flex-row">
                  <div className="flex h-full min-w-[300px] flex-col bg-[#EEEEEE] border-r   dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)] border-[#9E9E9E]">
                    <div className="px-[50px] py-[25px] flex justify-between">
                      <div className="flex flex-col">
                        <h5 className="text-[#00773F] dark:text-[#2cc873] text-base font-normal">
                          Collateral
                        </h5>
                        <p className="font-medium text-3xl text-[#00773F] dark:text-[#2cc873]">{RatioValues[4].value}%</p>
                      </div>
                      <div className="flex flex-col">
                        <h5 className="text-[#0F46E9] text-base font-normal dark:text-[#2688ff]">
                          dCDS
                        </h5>
                        <p className="font-medium text-3xl text-[#0F46E9] dark:text-[#2688ff]">{RatioValues[5].value}%</p>
                      </div>
                    </div>
                    <div className="w-full h-40 lg:h-full">
                      <RatioPieChart collaterals={RatioValues[4].value} dcds={RatioValues[5].value} />
                    </div>
                  </div>
                  <div className="w-full">

                  <Charts height={230} title={"ratio"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full  border  bg-[#EEEEEE] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)] border-[#9E9E9E]">
              <FeesComp />
              <div className="p-4 pl-0 w-full md:w-[70%] border-l border-[#9E9E9E] bg-white dark:bg-[#020202]">
                  <div className="flex flex-col w-full md:max-w-sm ">
                    <div className="relative flex items-center h-12 w-full p-1 mx-0 lg:mx-8 mt-4 bg-[#EEEEEE] dark:bg-[#0f0f0f] border border-[#9E9E9E] ">
                      <div className="flex justify-center w-full">
                        <button onClick={()=>setFeeOption("option")}>Option Fees</button>
                      </div>
                      <div className="flex justify-center w-full">
                        <button onClick={()=>setFeeOption("borrow")}>Borrowing Fees</button>
                      </div>
                      <span
                        className={` bg-[#ffffff] border-[1px] dark:bg-[#141414] dark:text-[#EEEEEE] border-[#9E9E9E] shadow text-gray-800 flex items-center justify-center w-1/2  h-10 transition-all top-[4px] absolute  ${feeOption=="borrow"?"right-1":"right-none"} `}>
                        {feeOption === "option" ? "Option Fees" : "Borrowing Fees"}
                      </span>
                    </div>
                  </div>
                {
                  feeOption === "option" ? (
                    <Charts height={230} title={"optionFees"} />
                  ) : (
                    <Charts height={230} title={"borrowingFees"} />
                  )
                }

              </div>
            </div>
          </div>
        )
      
      }

    </div>
  );


  // 
  function FeesComp() {
    return (
      <div className="flex flex-col gap-[10px] p-5 mr-2 w-full md:w-[40%] ">
        <div className="flex gap-[10px] flex-start w-full">
          <Image src={money} alt="money" width={35} height={35}></Image>
          <h2 className="text-textPrimary dark:text-[#90AFFF] font-normal mt-1 md:mt-0 text-[24px] md:text-[32px] leading-none">
            Fees
          </h2>
        </div>
        <div className="flex py-[15px] md:flex-wrap lg:flex-nowrap">
          <HeaderItems
            props={{
              textHeadline: "Borrowing Fees",
              textValue: "5%",
              className: "",
              lastElement: false,
            }}
          />
          <HeaderItems
            props={{
              textHeadline: "Option Fee",
              textValue: `${FeesValues[0].value} USDa`,
              className: "",
              lastElement: true,
            }}
          />
        </div>
        <div className="flex lg:py-[15px] py-[5px]  gap-2 md:flex-wrap lg:flex-nowrap md:gap-0">
          <HeaderItems
            props={{
              textHeadline: "Total Collateral Protected",
              textValue: `${FeesValues[2].value} USDa`,
              className: "",
              lastElement: false,
            }}
          />
          <HeaderItems
            props={{
              textHeadline: "Total Upside Gained",
              textValue: "15%",
              className: "",
              lastElement: true,
            }}
          />
        </div>
        <div className="flex flex-start lg:py-[15px] py-[5px]">
          <HeaderItems
            props={{
              textHeadline: "Total ABOND Yield",
              textValue: "-",
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
      <div className="flex w-full flex-col  border bg-[#EEEEEE] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)] border-[#9E9E9E]">
        <div className="flex flex-col gap-[10px] p-5">
          <div className="flex gap-[10px] flex-start w-full">
            <Image src={donut} alt="atm local" width={35} height={35}></Image>
            <h2 className="text-textPrimary dark:text-[#90AFFF] font-normal mt-1 md:mt-0 text-[24px] md:text-[32px] leading-none">
              Ratio of Collaterals
            </h2>
          </div>
          <div className="flex py-[15px]">
            <HeaderItems
              props={{
                textHeadline: "Current Ratio",
                textValue: `${RatioValues[0].value}`,
                className: "",
                lastElement: false,
              }}
            />
            <HeaderItems
              props={{
                textHeadline: "Total dCDS Pool value",
                textValue: `${RatioValues[1].value} USDa`,
                className: "",
                lastElement: true,
              }}
            />
          </div>
          <div className="flex py-[15px]">
            <HeaderItems
              props={{
                textHeadline: "Net dCDS Pool Value",
                textValue: `${RatioValues[2].value} USDa`,
                className: "",
                lastElement: false,
              }}
            />
            <HeaderItems
              props={{
                textHeadline: "dCDS Profit/Loss",
                textValue: `${RatioValues[3].value} USDa`,
                className: "",
                lastElement: true,
                textColor: `${Number(RatioValues[3].value) > 0 ? "#2cc873" : "#FF0000"}`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  function ValueLocked() {
    return (
      <div className="flex md:w-[40%] lg:max-w-[30%] w-full flex-col justify-between  border  bg-[#EEEEEE] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)] border-[#9E9E9E]">
        <div className="flex flex-col gap-[10px] p-5 border-b border-[#9E9E9E]">
          <div className="flex gap-[10px] flex-start w-full">
            <Image src={dollar} alt="atm local" width={35} height={35}></Image>
            <h2 className="text-textPrimary dark:text-[#90AFFF] font-normal mt-1 md:mt-0 text-[24px] md:text-[32px] leading-none">
              Value Locked
            </h2>
          </div>
          <div className="py-[15px]">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-normal leading-none text-textGrey dark:text-[#EEEEEE]">
                Total Value Locked
              </p>
              <h3 className="font-medium text-[24px] md:text-[2rem] leading-none">{lockedValues[0].value}</h3>
            </div>
          </div>
          <div className="py-[15px]">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-normal leading-none text-textGrey dark:text-[#EEEEEE]">
                Total Stablecoins Locked
              </p>
              <h3 className="font-medium text-[24px] md:text-[2rem] leading-none">
                {lockedValues[1].value} USDa
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-5 gap-[15px] bg-white   dark:bg-[#141414] ">
          <div className="py-[0px]">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-normal leading-none text-textGrey dark:text-[#EEEEEE]">
                Total Assets Locked
              </p>
              <h3 className="font-medium text-[24px] md:text-[2rem] leading-none">
                {lockedValues[2].value}
              </h3>
            </div>
          </div>
          <AssetValueLocked
            img={eth}
            asset="ETH-$"
            value={`${lockedValues[2].value}`}
            progress={100}
          />
          <AssetValueLocked
            img={mantle}
            asset="MTL-"
            value="coming soon"
            progress={0}
          />
          <AssetValueLocked
            img={matic}
            asset="MATIC-"
            value="coming soon"
            progress={0}
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
        <div className="relative w-full border border-[#9E9E9E] overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className={`bg-[#90AFFF] absolute h-full z-0`}
          ></div>
          <div className="flex bg-[#efecec] dark:bg-[#0F0F0F]  px-[15px] py-[10px]">
            <p className="font-normal text-base text-[#242424] dark:text-[#EEEEEE] z-10">
              <span className="font-medium">{asset}</span>{value}
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
      <div className="flex flex-col w-full md:w-[50%] border border-[#9E9E9E] ">
        <div className="flex flex-col p-3 md:p-5 gap-[10px]   border-b bg-[#EEEEEE] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)] border-[#9E9E9E]">
          <div className="flex flex-start w-full gap-[10px]">
            <Image src={toll} alt="toll" width={35} height={35}></Image>
            <h2 className="text-textPrimary font-normal dark:text-[#90AFFF] mt-1 md:mt-0 text-[24px] md:text-[32px] leading-none">
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
                  className: " ",
                  lastElement: item.lastElement,
                }}
              />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <Charts  height={180} title={headline} />
        </div>
      </div>
    );
  }
};
export default page;
