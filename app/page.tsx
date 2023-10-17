import HeaderItems from "@/components/Header/HeaderItems";
import SideBar from "@/components/Sidebar/SideBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import showMore from "@/app/assets/arrow_circle_down.svg";
import heroPattern from "@/app/assets/gridBg.svg"
import DashboardStatsItem from "@/components/Dashboard/DashboardStatsItem";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import ProductList from "@/components/Markets/ProductList";
import Divider from "@/components/Divider/Divider";

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
const dasboardStatsItem = [
  {
    heading: "Total amount of AMINT Deposited",
    value: "1324.32",
  },
  {
    heading: "Total Number of Deposits",
    value: "6",
    
  },
  {
    heading: "Total accumulated Fees",
    value: "12.0123",
  },
  {
    heading: "Total Fees withdrawn",
    value: "5.34",
  },
];

const tableDetails = [
  {
    ethDeposited: "10.23",
    amintMinted: "12.0123",
    abondMinted: "12.0123",
    index: "index",
    liquidated: "Yes",
    interestRate: "3%",
  },
  {
    ethDeposited: "10.23",
    amintMinted: "12.0123",
    abondMinted: "12.0123",
    index: "index",
    liquidated: "No",
    interestRate: "4%",
  },
];

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-[140px_1fr]">
      <SideBar />
      <div className="h-full bg-bgGrey flex flex-col pb-6 pr-6">
        <div className="flex px-4 py-5">
          {headerItems.map((item, index) => (
            <HeaderItems
              key={index}
              props={{ textHeadline: item.headline, textValue: item.value }}
            />
          ))}
          <Button
            variant={"showMore"}
            className="px-4 pb-4 py-0 flex flex-col gap-[10px] items-center h-full"
          >
            <Image src={showMore} alt="show more" width={35} height={35} />
            <p className="text-borderGrey text-base font-medium whitespace-nowrap">Show More</p>
          </Button>
        </div>
        {/* <div className="flex px-4 py-5">
          {headerItems2nd.map((item, index) => (
            <HeaderItems
              key={index}
              props={{ textHeadline: item.headline, textValue: item.value }}
            />
          ))}
        </div> */}
        {/* Main area */}
        {/* <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] h-full flex flex-col gap-[30px] flex-1 items-center justify-center self-stretch overflow-hidden">
          <div className={`absolute w-[1740px] rotate-[14deg] h-[1200px] z-0`}>
            <Image
              src={heroPattern}
              alt="grid bg"
              className="w-full h-full"
              style={{ objectFit: "cover", opacity: 0.4 }}
            ></Image>
          </div>
          <div className="flex flex-col gap-[30px] items-center justify-center z-10">
            <Image
              src={wallets}
              alt="wallets"
              width={266.044}
              height={82}
            ></Image>
            <div className="flex flex-col gap-[10px]">
              <p className="text-center font-medium text-5xl tracking-[-2.4px] text-textPrimary">
                Connect your wallet to get started
              </p>
              <p className="text-center font-medium text-base text-textSecondary">
                Connect with your wallet of choice to start get started with the
                Dapp.
              </p>
            </div>
            <Button
              variant={"primary"}
              className="flex items-center justify-center gap-[5px]"
            >
              <p className="text-white bg-clip-text bg-[linear-gradient(180deg,_#FFF_-0.23%,_#EEE 100%)] text-transparent font-semibold text-base">
                Connect Wallet
              </p>
              <Image
                src={linkIcon}
                alt="link icon"
                width={24}
                height={24}
              ></Image>
            </Button>
          </div>
        </div> */}
        <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden h-full">
          {/* <div className={`absolute w-[1740px] rotate-[14deg] h-[1200px] z-0`}>
            <Image
              src={heroPattern}
              alt="grid bg"
              className="w-full h-full"
              style={{ objectFit: "cover", opacity: 0.4 }}
            ></Image>
          </div> */}

          <ProductList></ProductList>
          <Divider/>
          <div className="flex gap-[30px]">
            {dasboardStatsItem.map((item, index) => (
              <div className="flex border border-lineGrey min-w-[150px] w-full">
                <DashboardStatsItem
                  key={index}
                  props={{
                    heading: item.heading,
                    value: item.value,
                  }}
                />
              </div>
            ))}
          </div>
          <Divider/>
          <CreateNewDeposit />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-textGrey">ETH Deposited</TableHead>
                <TableHead className="text-textGrey">AMint minted</TableHead>
                <TableHead className="text-textGrey">Index</TableHead>
                <TableHead className="text-textGrey">Interest rate</TableHead>
                <TableHead className="text-textGrey">Abond minted</TableHead>
                <TableHead className="text-textGrey">Liquidated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableDetails.map((details, index) => (
                <TableRow key={index}>
                  <TableCell className="text-textGrey">
                    {details.ethDeposited}
                  </TableCell>
                  <TableCell className="text-textGrey">
                    {details.amintMinted}
                  </TableCell>
                  <TableCell className="text-textGrey">
                    {details.index}
                  </TableCell>
                  <TableCell className="text-textGrey">
                    {details.interestRate}
                  </TableCell>
                  <TableCell className="text-textGrey">
                    {details.abondMinted}
                  </TableCell>
                  <TableCell className="text-textGrey">
                    {details.liquidated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
