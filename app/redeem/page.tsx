'use client';
import ConnectWallet from '@/components/ConnectWallet/ConnectWallet';
import exp from 'constants'
import React from 'react'
import { useAccount } from 'wagmi';

const page=()=> {
    const { isConnected, address,connector:activeConnector} = useAccount();
  return (
    <>
    {isConnected ? (
        <div className="relative p-6 rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden min-h-[90vh] md:min-h-[82vh]">
      Redeem
      </div>
      ) : (
        <ConnectWallet />
      )}
    </>
  )
}
export default page;