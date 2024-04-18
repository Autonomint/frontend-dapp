'use client';
import React from 'react'
import LeaderTable from './LeaderTable';


interface TableData {
    sno: string;
    address: string;
    cdsdeposit: number;
    borrowdeposit: string;
    points: string;
    ltvratio: number;
    yield: number;
}

export default function page() {

    const [selectedTab, setSelectedTab] = React.useState("borrow");

    return (
        <div>
            <div className='w-4/5 bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)] dark:bg-none dark:bg-[#141414] p-4 mx-auto mt-10 overflow-hidden border-2 rounded-md shadow-md'>
                <div className='w-[350px] mb-2'>
                    <ul className="overflow-hidden text-sm font-medium text-center text-gray-500 shadow rounded-xl sm:flex dark:divide-gray-700 dark:text-gray-400">
                        <li onClick={()=>setSelectedTab("borrow")} className="w-full focus-within:z-10">
                            <a href="#" className="inline-block w-full p-2 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg dark:bg-gray-700 dark:text-white" aria-current="page">Borrow</a>
                        </li>
                        <li onClick={()=>setSelectedTab("dcds")} className="w-full focus-within:z-10">
                            <a href="#" className="inline-block w-full p-2 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">dCDS</a>
                        </li>
                    </ul>
                </div>
                <LeaderTable/>

            </div>
        </div>
    )
}
