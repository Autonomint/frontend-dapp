import heroPattern from "@/app/assets/gridBg.svg";
import DashboardStatsItem from "@/components/Dashboard/DashboardStatsItem";

import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import Divider from "@/components/CustomUI/Divider/Divider";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import Image from "next/image";

import OurTable from "@/components/Table/OurTable";

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
const dasboardStatsItem = [
  {
    heading: "Total amount of AMINT Deposited",
    value: "1324.32",
    subheadingBefore: "Across a total of",
    subheadingHighlight: "3",
    subheadingAfter: "investments",
    showSubHeading: true,
  },
  {
    heading: "Total amount of AMINT received.",
    value: "12.0123",
    subheadingHighlight: "7.204",
    subheadingAfter: "AMINT is available in your wallet",
    showSubHeading: true,
  },
  {
    heading: "Total amount of ABOND received.",
    value: "12.0123",
    subheadingHighlight: "7.204",
    subheadingAfter: "ABOND is available in your wallet.",
    showSubHeading: true,
  },
];

export default function Home() {
  return (
    <>
      {/* <div className="flex px-4 py-5">
          {headerItems2nd.map((item, index) => (
            <HeaderItems
              key={index}
              props={{ textHeadline: item.headline, textValue: item.value }}
            />
          ))}
        </div> */}
      {/* Main area */}
      {/* <ConnectWallet/> */}
      <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden h-full">
        <div className={`absolute w-[1740px] rotate-[14deg] h-[1200px] -z-10`}>
          <Image
            src={heroPattern}
            alt="grid bg"
            className="w-full h-full"
            style={{ objectFit: "cover", opacity: 0.1 }}
          ></Image>
        </div>
        <div className="flex gap-[30px] z-10">
          {dasboardStatsItem.map((item, index) => (
            <div className="flex border border-lineGrey min-w-[150px] w-full">
              <DashboardStatsItem
                key={index}
                props={{
                  heading: item.heading,
                  value: item.value,
                  showSubHeading: true,
                  subheadingBefore: item.subheadingBefore,
                  subheadingHighlight: item.subheadingHighlight,
                  subheadingAfter: item.subheadingAfter,
                }}
              />
            </div>
          ))}
        </div>
        <Divider />
        <CreateNewDeposit />
        <OurTable />
      </div>
    </>
  );
}
