'use client';
import React,{useState} from 'react'
import { useAccount, useBalance, useChainId, useDisconnect } from 'wagmi';
import { usDaAddress } from "@/abiAndHooks";
import { Button } from '../ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Terms_Privacy from './Terms_Privacy';
const Profile=({setOpen, open}: { setOpen: Function, open: boolean }) => {
    const { disconnect } = useDisconnect();
    const chainId = useChainId()
    const {address} = useAccount()
    const { data, isError, isLoading } = useBalance({
        address: usDaAddress ? address : undefined,
        token: usDaAddress
          ? usDaAddress[chainId as keyof typeof usDaAddress]
          : undefined,
      });
      const [openGetstart, setOpenGetstart] = React.useState(false);
  return (
        <div className=" fixed w-[100%] border-black  sm:w-auto dark:bg-[#141414] sm:right-5 sm:top-[4rem] right-0 top-0 border dark:border-gray-600 bg-white px-4 py-4 pt-2 shadow-xl">
              <div className="flex items-center justify-end w-full mb-2 ">
                <button onClick={() => setOpen(!open)} className="p-1 border border-black dark:border-white dark:white hover:bg-gray-200"><Cross2Icon className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-3">
                  <div className="p-3 text-sm border  bg-[#EEEEEE] dark:bg-[#3A3A3A]">
                    {address}
                  </div>
                  <div className="p-3 relative text-sm border  bg-[#EEEEEE] dark:bg-[#3A3A3A]">
                    <div className="text-[0.8rem]"> USDa Balance</div>
                    <div className="absolute flex items-center gap-2 text-xs top-3 right-2">
                      <div className="h-4 w-4 bg-[#93F3BA] rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-[#009350] rounded-full"></div>
                      </div>
                      {chainId === 11155111 ? "Ethereum Sepolia " : chainId === 84532 ? "Base Sepolia" : "unsupported network"}

                    </div>
                    <div className="text-xl font-bold">${data?.formatted.slice(0, 8)}</div>
                  </div>

                  <div className="flex gap-2 text-sm ">

                    <Button  className="border-[#041A50] bg-[#ABFFDE] dark:text-black text-sm border-[1px] shadow-smallcustom py-2 rounded-none w-full" onClick={() => { disconnect(); setOpen(!open) }}>Disconnect</Button>
                  </div>
                  <div className="p-3 text-sm underline border dark:bg-[#3A3A3A] bg-[#EEEEEE]">
                    <a href={`https://sepolia.${chainId==11155111?"etherscan.io":"basescan.org"}/${address}`} >View All Wallets Transactions </a>
                  </div>
                  <div className="flex justify-between p-3 text-sm border  bg-[#EEEEEE] dark:bg-[#3A3A3A]"><div>Verify Joseon ID</div><a className="underline" href="https://www.joseon.com/l/en-US/" target="_blank">Learn More</a></div>
                  <div className="p-3 text-sm border  bg-[#EEEEEE] dark:bg-[#3A3A3A]">
                    Terms & privacy policy <Button  variant={'outline'} onClick={()=>setOpenGetstart(!openGetstart)} className="text-black dark:text-white">click to view</Button>
                  </div>
          
                </div>
              </div>
              <Dialog open={openGetstart} onOpenChange={setOpenGetstart} >
                <DialogContent className="max-w-[800px] max-h-[90vh]  p-5">
                    <div className="flex justify-end w-full ">
                        <DialogClose asChild>
                            <Button
                                variant={"ghostOutline"}
                                size={"primary"}
                                className="flex gap-[10px] mb-4 border border-borderGrey rounded-none"
                            >
                                <Cross2Icon className="w-4 h-4" />
                                
                            </Button>
                        </DialogClose>
                    </div>
                    <div className='-mt-4'>

    
                        <Terms_Privacy/>

                    </div>

                </DialogContent>
            </Dialog>
            </div>
  )
}
export default Profile;
