import React from 'react'
import { useTheme } from "next-themes";
import { Cross2Icon } from '@radix-ui/react-icons';

const PageSettings = ({showSettings,setShowSettings }: {showSettings:Boolean,setShowSettings :Function}) => {
    const { resolvedTheme, theme, setTheme } = useTheme();
    return (
        <div className={`${showSettings?"flex":"hidden"} absolute flex-col gap-4 w-[300px] dark:bg-[#141414] right-20  top-5 border border-black z-30 bg-white px-2 py-4 shadow-xl`}>
            <div className="flex justify-between text-sm font-semibold rounded-md">
                  Settings
                  <div className="items-center -mt-2 border border-black cursor-pointer h-fit" onClick={() => setShowSettings(!showSettings)}><Cross2Icon/></div>
                </div>
            <div className="flex ">
                <label className="relative items-center hidden cursor-pointer mdb:inline-flex ">
                    <input type="checkbox" value="" className="sr-only peer" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} checked={resolvedTheme === "dark" ? true : false} />
                    <div className="relative w-10 h-5 border border-black bg-white peer-focus:outline-none    peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[0px] after:bg-[#ABFFDE]  after:border after:h-full after:border-black after:w-5 after:transition-all dark:border-gray-600 "></div>

                    <div className="absolute  dark:right-[1px] ">
                        {resolvedTheme === "light" ? (<div className="bg-[#ABFFDE]"></div>) : (<div className="bg-[#ABFFDE]"></div>)}
                    </div>
                </label>
            </div>
        </div>
    )
}

export default PageSettings