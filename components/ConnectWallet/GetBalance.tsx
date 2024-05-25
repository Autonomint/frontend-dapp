import React from 'react'
import { usDaAddress,abondAddress,testusdtAbiAddress } from '@/abiAndHooks';
import { useBalance,useAccount, useChainId } from "wagmi";

 const  GetBalance=({token}:{token:string})=> {
    const chainId = useChainId();
    const {address} = useAccount();
    const { data } = useBalance({
        address:address,
        token: token == "USDa" ? usDaAddress[chainId as keyof typeof usDaAddress] 
        : token == "TUSDT" ? testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress]
        : token=="ABOND"?abondAddress[chainId as keyof typeof abondAddress]
        : undefined,

      });
  return (
    <div>
      
       bal. {data?.formatted.slice(0, 8) } {data?.value} {token}
    </div>
  )
}
export default GetBalance;
