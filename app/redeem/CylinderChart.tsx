import React from 'react'
import eth from "@/app/assets/eth.svg";
import usdt from "@/app/assets/tether-usdt.svg";
import Image from 'next/image';
import RatioPieChart from './RatioPieChart';
function formatNumber(num: number) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'k';
    } else {
        return num.toFixed(2);
    }
}
const CylinderChart: React.FC<{ type?: string, value: number }> = ({ type, value }) => {
    const limitArray = [100000, 1000000, 10000000, 100000000]
    const TVL = value
    let limit = limitArray[0];
    for (let i = 0; i < limitArray.length; i++) {
        if (TVL < limitArray[i] * 0.95) {
            limit = limitArray[i];
            break;
        }
    }
    console.log(TVL, limit)
    const percentage = (TVL / limit);
    return (
        <div className='flex w-full h-full border  border-lineGrey bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)] dark:border-[#5B5B5B] rounded-lg shadow-lg overflow-hidden'>
            <div className='basis-[60%] p-4 '>
                <div className='flex gap-2 text-2xl'>
                    <Image src={type === 'usdt' ? usdt : eth} alt="usdt" width={35} height={35} /> {type === 'usdt' ? 'USDT' : 'ETH'}
                </div>
                <div className='grid grid-cols-3 gap-5 p-2 mt-2 '>
                    <div >
                        <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>APY</p>
                        <p className='text-xl font-medium'>0.00%</p>
                    </div>
                    <div>
                        <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>Withdraw Fee</p>
                        <p className='text-xl font-medium'>0.00%</p>
                    </div>
                    <div>
                        <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>Withdraw Fee</p>
                        <p className='text-xl font-medium'>0.00%</p>
                    </div>
                    <div>
                        <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>Limit</p>
                        <p className='text-xl font-medium'>0.00%</p>
                    </div>
                    <div>
                        <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>Collateral</p>
                        <p className='text-xl font-medium'>0.00%</p>
                    </div>
                    <div>
                        <p className='text-[#3A3A3A] text-sm mb-1 dark:text-[#EEEEEE]'>APY</p>
                        <p className='text-xl font-medium'>0.00%</p>
                    </div>
                </div>

            </div>
            <div className="basis-[40%] ">
                  <div className="flex pt-4 w-full h-full flex-col bg-[linear-gradient(270deg,#CDF3FF_0%,#D8FFEA_100%)] dark:bg-none dark:bg-[#141414]  rounded-[10px] rounded-t-none rounded-br-none">
                    <div className="px-[20px]  flex justify-between">
                      <div className="flex flex-col gap-2">
                        <h5 className="text-[#00773F] text-sm font-normal">
                          Current TVL
                        </h5>
                        <p className="font-medium text-2xl text-[#00773F]">${formatNumber(TVL)}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h5 className="text-[#242424] text-sm font-normal dark:text-[#9E9E9E]">
                          Target TVL
                        </h5>
                        <p className="font-medium text-2xl text-[#5B5B5B] dark:text-[#9E9E9E]">${formatNumber(limit)}</p>
                      </div>
                    </div>
                    <div className="w-full h-full ">
                      <RatioPieChart collaterals={TVL.toFixed(2)} dcds={(limit-TVL).toString()} />
                    </div>
                  </div>
                </div>

        </div>
    )
}




export default CylinderChart;


