import React from 'react'
import Image from 'next/image';
import serverMaintananace from '@/app/assets/serverMaintanance.png';
const page=()=> {
  return (
    <div className="relative p-6  rounded-[10px] bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)] flex flex-col self-stretch overflow-hidden min-h-[90vh] md:min-h-[82vh]">
        <div className='flex flex-col items-center justify-center text-center align-middle'>

        <h1 className="relative text-3xl font-semibold text-black top-5">Server Status</h1>

      <Image  width={400} height={400} src={serverMaintananace} alt="serverMaintanance" />
        <h1 className="text-xl font-semibold text-black">Server is under maintanance mode. Please come back later or <a className='text-[#0101f2]'>contact us</a> if it's urgent</h1>
        </div>
    </div>
  )
}
export default page;