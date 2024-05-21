import React from 'react'
import { DEV_PROXY_AMINT_ADDRESS, DEV_PROXY_TESTUSDT_ADDRESS,DEV_PROXY_ABOND_ADDRESS } from "@/constants/Addresses";
import { useBalance,useAccount } from "wagmi";

 const  GetBalance=({token}:{token:string})=> {
    const {address} = useAccount();
    const { data } = useBalance({
        address:address,
        token: token == "amint" ? DEV_PROXY_AMINT_ADDRESS : token == "usdt" ? DEV_PROXY_TESTUSDT_ADDRESS : token=="abond"?DEV_PROXY_ABOND_ADDRESS: undefined,
        watch: true,
      });
  return (
    <div>
       bal. {data?.formatted.slice(0, 8) } {token?.toUpperCase()}
    </div>
  )
}
export default GetBalance;
