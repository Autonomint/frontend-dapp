import React from 'react'
import eth from "@/app/assets/eth.svg";
import usdt from "@/app/assets/tether-usdt.svg";
import Image from 'next/image';
import { formatEther } from 'ethers';
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
    // 
    const percentage = (TVL / limit);
    return (
        <div className='flex gap-8 p-2 '>
            <div className='flex items-center '>
                <div className='flex flex-col gap-1 p-4 border border-lineGrey shadow-md w-[160px] rounded-lg'>

                    <div className='flex items-center gap-2 text-sm'>
                        <span>Apy :</span> <span>0</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <span>TVL :</span> <span>$ {formatNumber(TVL)}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <span>Limit :</span> <span>$ {formatNumber(limit)}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <span>Position :</span> <span>0</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <span>Loked :</span> <span>0</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <span>Unlocked :</span> <span>0</span>
                    </div>


                </div>
            </div>
            <div className='relative group'>
                <div className='absolute min-w-[120px] z-50 p-2 border rounded-md -right-32 border-lineGrey text-sm top-10 bg-white shadow-lg
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300
                ' >

                    <p><span>Apy :</span> <span>0</span></p>
                    <p><span>TVL :</span> <span>{formatNumber(TVL)}</span></p>
                    <p><span>Limit :</span> <span>{formatNumber(limit)}</span></p>
                    <p><span>Position :</span> <span>0</span></p>
                </div>



                <div className='relative m-0 w-[200px]'>
                    <div className="
                relative w-[200px] h-[300px] border-solid bg-[#D4F5FF] rounded-[93px/40px] overflow-hidden mx-auto my-0
                hover:bg-[#c5f1ff] hover:transition-all hover:duration-300
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-[200px] before:h-[93px] before:rounded-[100px/50px] before:bg-[#c8effb]
                
                ">
                        <div style={{ height: 300 * percentage < 93 ? 93 + 300 * percentage : 300 * percentage }} className={`
                absolute left-0 bottom-0 w-[200px]  rounded-[100px/50px] bg-[#007AFF] 
                hover:bg-[rgba(0,81,255,0.9)] hover:transition-all hover:duration-300
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-[200px] before:h-[93px] before:rounded-[100px/50px] before:bg-[rgba(0,81,255,0.30)]
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[200px] after:h-[93px] after:rounded-[100px/50px] after:bg-[rgba(0,81,255,0.30)]
                `}>

                    <span className='absolute bottom-10 left-[80px]'>{type == "eth" ? <Image src={eth} width={35} alt='' /> : <Image src={usdt} width={35} alt='' />}</span>
                </div>

                    </div>


                </div>



            </div>


        </div>
    )
}




export default CylinderChart;


