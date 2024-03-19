'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAccount, useChainId, useSwitchNetwork,useNetwork } from "wagmi";

export default function CheckNetwork() {
    const { isConnected } = useAccount()
    console.log("isConnected", useNetwork());
    const {chain} = useNetwork();
    const chainId = useChainId();
    const [open, setOpen] = React.useState(true);
    const { switchNetwork } = useSwitchNetwork();
    console.log("chainId", chainId);
  return (
    <div>
        {  isConnected && (chain?.id == 11155111 ? "":
              <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent style={{ width: "300px", textAlign: "center", padding: "5vh" }} >
            <DialogHeader className="flex items-start">
              <DialogTitle className="text-textPrimary text-center font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-3xl text-2xl tracking-[-1.8px]">
                Unsupported Network
              </DialogTitle>
            </DialogHeader>
            <div>
              <Button
                variant={"primary"}
                onClick={() => switchNetwork && switchNetwork(11155111)}
                className="px-5 py-3 text-white"
              >
                Switch to Sepolia
              </Button>
            </div>
          </DialogContent>


        </Dialog>
        )
        }

    </div>
  )
}
