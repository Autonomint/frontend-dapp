'use client';
import ConnectWallet from '@/components/ConnectWallet/ConnectWallet';
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi';
import Redeem from './Redeem';
import { borrowingContractAbi, useReadCdsUsdtAmountDepositedTillNow, useReadTreasuryTotalVolumeOfBorrowersAmountinUsd } from '@/abiAndHooks';
import { formatEther } from 'ethers';
import eth from "@/app/assets/eth.svg";
import usdt from "@/app/assets/tether-usdt.svg";
import Image from 'next/image';
import RatioPieChart from './RatioPieChart';
import HeaderItems from '@/components/Header/HeaderItems';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const poolValues = [
  {
    type: "usdt",
    value: 0,
    limit: 0
  },
  {
    type: "eth",
    value: 0,
    limit: 0
  },
]
const setLimit = (value: number) => {
  const limitArray = [1000, 10000, 100000, 1000000, 10000000, 100000000]
  let limit = limitArray[0];
  for (let i = 0; i < limitArray.length; i++) {
    if (value < limitArray[i] * 0.95) {
      limit = limitArray[i];
      break;
    }
  }
  return limit;
}
function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'k';
  } else {
    return num.toFixed(2);
  }
}
const RedeemPage = () => {

  // get the account details
  const { isConnected, address, connector: activeConnector } = useAccount();
  const [open2, setOpen2] = React.useState(false);
  // fetch data from the blockchain
  const { data: ethLocked } = useReadTreasuryTotalVolumeOfBorrowersAmountinUsd();
  const { data: usdtLocked } = useReadCdsUsdtAmountDepositedTillNow();

  useEffect(() => {
    if (ethLocked && usdtLocked) {

      poolValues[0].value = Number(usdtLocked) / (10 ** 6);
      poolValues[0].limit = setLimit(Number(usdtLocked) / (10 ** 6))
      poolValues[1].value = Number(formatEther(ethLocked ?? 0n)) / 100;
      poolValues[1].limit = setLimit(Number(formatEther(ethLocked)) / 100)

    }
  }, [ethLocked, usdtLocked]);

  return (
    <>
    {
      !isConnected ? <ConnectWallet /> :(
        <div className="relative rounded-[10px] p-2 mt-4   flex flex-col self-stretch overflow-hidden ">
        <div className='flex flex-col w-full gap-4'>
          <div className='w-full '>
            <div className='w-full border-lineGrey'>
              <Redeem openRedeemableAssets={setOpen2} />
            </div>
          </div>
         
          <Dialog open={open2} onOpenChange={setOpen2} >
            <DialogContent className="max-w-[800px] pb-5">
              <div className="flex justify-end w-full ">
                <DialogClose asChild>
                  <Button
                    variant={"ghostOutline"}
                    size={"primary"}
                    className="flex gap-[10px] border border-borderGrey "
                  >
                    <Cross2Icon className="w-4 h-4" />
                    <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                      Close
                    </p>
                  </Button>
                </DialogClose>
              </div>
              <DialogHeader className="flex items-start">
                <DialogTitle className="">
                  <div>
                    <div className='text-2xl text-[#041A50] font-medium dark:text-[#90AFFF] '>Collateral Pool</div>
                    <div className='text-sm text-[#5B5B5B] dark:text-[#EEEEEE] '>A list of all locked assests int the Asset Pool</div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className='flex flex-col items-center justify-center gap-4 '>
                {
                  poolValues.map((item, index) => {
                    return (
                      <div key={index} className='flex w-full min-h-[220px] h-full border  border-lineGrey bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)] dark:border-[#5B5B5B] rounded-lg shadow-lg overflow-hidden'>
                        <div className='basis-[60%] p-4 '>
                          <div className='flex gap-2 text-2xl'>
                            <Image src={item.type === 'usdt' ? usdt : eth} alt="usdt" width={35} height={35} /> {item.type === 'usdt' ? 'USDT' : 'ETH'}
                          </div>
                          <div className='flex px-4 py-5 '>
                            <HeaderItems
                              props={{
                                textHeadline: "Withdraw Fee",
                                textValue: "2.00%",
                                className: " ",
                              }}
                            />  <HeaderItems
                              props={{
                                textHeadline: "Redemption Time",
                                textValue: "-",
                                className: " ",
                              }}
                            />
                          </div>
                        </div>
                        <div className="basis-[40%] ">
                          <div className="flex pt-4 w-full h-full flex-col bg-[linear-gradient(270deg,#CDF3FF_0%,#D8FFEA_100%)]      dark:bg-[linear-gradient(270deg,#16603B_0%,#0D4A5C_100%)]   rounded-br-none">
                            <div className="px-[20px]  flex justify-between">
                              <div className="flex flex-col gap-2">
                                <h5 className="text-[#47D58C] text-sm font-normal">
                                  Current TVL
                                </h5>
                                <p className="font-medium text-2xl text-[#47D58C]">${formatNumber(item.value)}</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <h5 className="text-[#545454] text-sm font-normal dark:text-[#EEEEEE]">
                                  Target TVL
                                </h5>
                                <p className="font-medium text-2xl text-[#545454] dark:text-[#EEEEEE]">${formatNumber(item.limit)}</p>
                              </div>
                            </div>
                            <div className="h-full ">
                              <RatioPieChart key={index} value1={(item.value / item.limit * 100).toFixed(2)} value2={((item.limit - item.value) / item.limit * 100).toFixed(2)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      )
    }


    </>
  )
}
export default RedeemPage;


