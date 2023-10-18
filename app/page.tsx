import heroPattern from "@/app/assets/gridBg.svg";
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
import Divider from "@/components/Divider/Divider";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import Image from "next/image";

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-textGrey">ETH Deposited</TableHead>
              <TableHead className="text-textGrey">AMint minted</TableHead>
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
    </>
  );
}
