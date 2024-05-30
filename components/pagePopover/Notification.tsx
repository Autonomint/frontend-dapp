import React from 'react'
import { useTheme } from "next-themes";
import { Cross2Icon } from '@radix-ui/react-icons';

const Notification = ({ showNotifications, setShowNotifications }: { showNotifications: Boolean, setShowNotifications: Function }) => {

    return (
        <div className={`${showNotifications?"flex":"hidden"} absolute flex-col gap-4 w-[300px] dark:bg-[#141414] right-20  top-5 border border-black z-30 bg-white px-2 py-4 shadow-xl`}>
            <div className="flex justify-between text-sm font-semibold rounded-md">
                Notifications
                <div className="items-center -mt-2 border border-black cursor-pointer h-fit" onClick={() => setShowNotifications(!showNotifications)}><Cross2Icon /></div>
            </div>
            <div className="border-t">
                <div className="p-2 text-xs">Check out the new leaderboard</div>
            </div>
        </div>
    )
}

export default Notification