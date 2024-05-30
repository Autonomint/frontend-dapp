import React from 'react'
import { useTheme } from "next-themes";
import { Cross2Icon } from '@radix-ui/react-icons';
import { usDaAddress, testusdtAbiAddress } from '@/abiAndHooks';
import { useChainId } from 'wagmi';
const PageSettings = ({ showSettings, setShowSettings }: { showSettings: Boolean, setShowSettings: Function }) => {
    const { resolvedTheme, theme, setTheme } = useTheme();
    const chainId = useChainId();
    const onWatchAssetAmintClick = async () => {
        const result = await (window as any).ethereum?.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: usDaAddress[chainId as keyof typeof usDaAddress],
                    decimals: 6,
                    name: "USDa",
                    symbol: "USDa"
                }
            }
        });
    };
    const onWatchAssetUsdtClick = async () => {
        const result = await (window as any).ethereum?.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
                    decimals: 6,
                    name: "TUSDT",
                    symbol: "TUSDT"
                }
            }
        });
    };
    return (
        <div className={`${showSettings ? "flex" : "hidden"} absolute flex-col gap-4 w-[300px] dark:bg-[#141414] right-20  top-5 border border-black z-30 bg-white px-2 py-4 shadow-xl`}>
            <div className="flex justify-between text-sm font-semibold rounded-md">
                Settings
                <div className="items-center -mt-2 border border-black cursor-pointer h-fit" onClick={() => setShowSettings(!showSettings)}><Cross2Icon /></div>
            </div>
            <div className="">
                <div className='flex gap-2'>

                    <div className='mr-5'>Theme :</div>
                    <label className="relative items-center hidden cursor-pointer mdb:inline-flex ">
                        <input type="checkbox" value="" className="sr-only peer" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} checked={resolvedTheme === "dark" ? true : false} />
                        <div className="relative w-10 h-5 border border-black bg-white peer-focus:outline-none    peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[0px] after:bg-[#ABFFDE]  after:border after:h-full after:border-black after:w-5 after:transition-all dark:border-gray-600 "></div>

                        <div className="absolute  dark:right-[1px] ">
                            {resolvedTheme === "light" ? (<div className="bg-[#ABFFDE]"></div>) : (<div className="bg-[#ABFFDE]"></div>)}
                        </div>
                    </label>
                </div>
                <div className='mt-2'>Add assets to the wallet :</div>
                <div className='flex flex-col gap-2 mt-2'>

                <div>
                    <button className="bg-[#ABFFDE] shadow-smallcustom  w-20 text-black p-1 " onClick={onWatchAssetAmintClick}>USDa</button>
                </div>
                <div>
                    <button className="bg-[#ABFFDE] shadow-smallcustom w-20 text-black p-1" onClick={onWatchAssetUsdtClick}>TUSDT</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default PageSettings