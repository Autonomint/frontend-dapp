'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAccount, useChainId, useSwitchNetwork, useNetwork } from "wagmi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function CheckNetwork() {
  const { isConnected } = useAccount()
  console.log("isConnected", useNetwork());
  const { chain } = useNetwork();
  const chainId = useChainId();
  const [open, setOpen] = React.useState(true);
  const { switchNetwork } = useSwitchNetwork();
  console.log(chain)
  console.log("chainId", chainId);
  const [selectedNetwork,setSelectedNetwork] = React.useState("")
  return (
    <div>
      {isConnected && (chain?.id == 11155111  ? "" :
        <Dialog open={open}   >
          <DialogContent className='border border-black rounded-none max-w-[350px] p-4'>
            <DialogHeader className="flex items-start">
              <DialogTitle className="text-black text-center font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-3xl text-2xl tracking-[-1.8px]">
                Unsupported Network
              </DialogTitle>
            </DialogHeader>
            <div className='mt-4'>
              <Select
                onValueChange={(value) => {
                  switchNetwork && switchNetwork(11155111)
                  setOpen(false)
                }}
                value={selectedNetwork}
                
              >
                <SelectTrigger className='border border-black rounded-none bg-[#020202] text-white' >
                  <SelectValue placeholder="Select Network" />
                </SelectTrigger>
                <SelectContent className='text-white  bg-[#020202] rounded-none '>
                  <SelectGroup>
                    <SelectItem value="11155111">Ethereum Sepolia</SelectItem>
                    <SelectItem value="11155111">Base Sepolia</SelectItem>
                  </SelectGroup>
                </SelectContent>

              </Select>
              {/* <Button
                variant={"primary"}
                onClick={() => switchNetwork && switchNetwork(11155111)}
                className="px-5 py-3 text-white"
              >
                Switch to Sepolia
              </Button> */}
            </div>
          </DialogContent>


        </Dialog>
      )
      }

    </div>
  )
}
