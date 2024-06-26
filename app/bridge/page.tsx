'use client';
import React from 'react'

import { useAccount } from 'wagmi';

import ConnectWallet from '@/components/ConnectWallet/ConnectWallet';
import Bridge from './Bridge';

export default function page() {
  const { address: accountAddress,isConnected } = useAccount();
  return (
    <div className='w-full px-2 sm:px-5 '>
      <div className='w-full relative bg-white border border-[#9E9E9E] shadow-custom dark:bg-[#242424] dark:shadow-darkcustom min-h-[84vh]'>
        {
          isConnected ? (
            <Bridge/>
         ):(<ConnectWallet/>)}
      </div>
    </div>

  )
}
