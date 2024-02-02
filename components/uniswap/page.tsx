'use client';
import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import ConnectWallet from '@/components/ConnectWallet/ConnectWallet';
import Swap from './Swap';

const Example = () => {

  const { isConnected} = useAccount();
  return (
    <div className="App">
      {
        !isConnected ? <ConnectWallet /> : (
          <Swap/>
        )
      }
    </div>
  )
}
export default Example