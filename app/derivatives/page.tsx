"use client";
import CreateNewDeposit from "@/components/Dashboard/CreateNewDeposit";
import DashboardStatsItem from "@/components/Dashboard/DashboardStatsItem";
import Divider from "@/components/CustomUI/Divider/Divider";
import ProductList from "@/components/Markets/ProductList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import NewDeposit from "./NewDeposit";
import AmintDepositRow from "./AmintDepositRow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import displayNumberWithPrecision from "../utils/precision";
import { formatEther } from "viem";
import { BACKEND_API_URL } from "@/constants/BackendUrl";

interface DepositDetail {
  id: string;
  address: string;
  index: number;
  chainId: number;
  depositedAmint: string;
  depositedTime: string;
  ethPriceAtDeposit: number;
  aprAtDeposit: number;
  lockingPeriod: number;
  ethPriceAtWithdraw: number;
  liquidationAmount: string;
  optedForLiquidation: boolean;
  withdrawTime: number;
  withdrawAmount: string;
  withdrawEthAmount: string;
  fees: string;
  status: "DEPOSITED" | "WITHDREW";
}
const dasboardStatsItem = [
  {
    heading: "Total AMINT Deposited",
    value: "1324.32",
    showSubHeading: false,
  },
  {
    heading: "Total Number of Deposits",
    value: "-",
    showSubHeading: false,
  },
  {
    heading: "Total accumulated Fees",
    value: "-",
    showSubHeading: false,
  },
  {
    heading: "Total Fees withdrawn",
    value: "5.34",
    showSubHeading: false,
  },
];

const page = () => {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const [dashboardStats, setDashboardStats] = useState(dasboardStatsItem);
  function getCDSDepositorData(
    address: `0x${string}` | undefined
  ): Promise<any> {
    return fetch(`${BACKEND_API_URL}/cds/${address}`).then((response) =>
      response.json()
    );
  }
  const { data: dCDSdepositorData, error: dCDSdepositorDataError } = useQuery({
    queryKey: ["dCDSdepositorsData",chainId,address],
    queryFn: () => getCDSDepositorData(address ? address : undefined),
    enabled: !!address,
  });
  function getDeposits(
    address: `0x${string}` | undefined
  ): Promise<DepositDetail[]> {
    return fetch(`${BACKEND_API_URL}/cds/${chainId}/${address}`).then(
      (response) => response.json()
    );
  }
  const { data: deposits, error: depositsError } = useQuery<DepositDetail[]>({
    queryKey: ["dCDSdeposits",chainId,address],
    queryFn: () => getDeposits(address ? address : undefined),
    enabled: !!address,
  });

  function handleStatsItem() {
    if (dCDSdepositorDataError || dCDSdepositorData?.statusCode === 404) {
      const updatedStats = [...dashboardStats];
      updatedStats[0].value = "-";
      updatedStats[1].value = "-";
      updatedStats[2].value = "-";
      updatedStats[3].value = "-";
      setDashboardStats(updatedStats);
      return;
    }

    if (dCDSdepositorData) {
      const updatedStats = [...dashboardStats];

      if (chainId === 80001) {
        updatedStats[0].value =
          dCDSdepositorData.totalDepositedAmintInPolygon ?? "0";
        updatedStats[1].value = dCDSdepositorData.totalIndexInPolygon ?? "0";
        updatedStats[2].value = dCDSdepositorData.totalFeesInPolygon ?? "0";
        updatedStats[3].value =
          dCDSdepositorData.totalFeesWithdrawnInPolygon ?? "0";
      } else if (chainId === 11155111) {
        updatedStats[0].value =
          dCDSdepositorData.totalDepositedAmintInEthereum ?? "0";
        updatedStats[1].value = dCDSdepositorData.totalIndexInEthereum ?? "0";
        updatedStats[2].value = dCDSdepositorData.totalFeesInEthereum ?? "0";
        updatedStats[3].value =
          dCDSdepositorData.totalFeesWithdrawnInEthereum ?? "0";
      } else {
        updatedStats[0].value = "0";
        updatedStats[1].value = "0";
        updatedStats[2].value = "0";
        updatedStats[3].value = "0";
      }

      setDashboardStats(updatedStats);
    } else {
      const updatedStats = [...dashboardStats];
      updatedStats[0].value = "-";
      updatedStats[1].value = "-";
      updatedStats[2].value = "-";
      updatedStats[3].value = "-";
    }
    console.log("cds data", dCDSdepositorData);
  }
  useEffect(() => {
    console.log("cds deposits", deposits);
    console.log("cds total data", dCDSdepositorData);
    console.log("error1", dCDSdepositorDataError);
    handleStatsItem();
    console.log(dCDSdepositorData);
  }, [dCDSdepositorData, dCDSdepositorDataError]);
  

  return (
    <>
      {/* Main area */}
      {isConnected ? (
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
          <Divider />
          <div className="flex gap-[30px]">
            {dashboardStats.map((item, index) => (
              <div className="flex border border-lineGrey min-w-[150px] w-full">
                <DashboardStatsItem
                  key={item.heading + index}
                  props={{
                    heading: item.heading,
                    value: item.value,
                    showSubHeading: item.showSubHeading,
                  }}
                />
              </div>
            ))}
          </div>
          <Divider />
          <NewDeposit />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-textGrey/0">Id</TableHead>
                <TableHead className="text-textGrey">Amint Deposited</TableHead>
                <TableHead className="text-textGrey">Deposited Time</TableHead>
                <TableHead className="text-textGrey">Lock In period</TableHead>
                <TableHead className="text-textGrey">Abond minted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!depositsError
                ? deposits?.map((details: DepositDetail) => (
                    <AmintDepositRow key={details.id} details={details} />
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};

export default page;
