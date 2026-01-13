'use client'
import Link from 'next/link'
import React from 'react'
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSidebar } from '@/components/ui/sidebar';

const Navbar = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <div className='flex justify-between items-center p-4  '>
            <div className='flex items-center justify-between gap-3 '>
                <button
                    onClick={toggleSidebar}
                    className='cursor-pointer hover:opacity-80 transition-opacity'
                    aria-label="Toggle Sidebar"
                >
                    <TableRowsRoundedIcon sx={{ color: '#86848C' }} />
                </button>
                <div>
                    <ol className='flex items-center gap-2'>
                        <li>
                            <Link href="/">OneBoard</Link>
                        </li>
                    </ol>
                </div>

            </div>
            <div className='flex items-center justify-between '>
                <div className='border-[0.0625rem] border-[#373737] rounded-full p-2 flex items-center gap-2 bg-[#1A1A1A]'>
                    <div><SearchIcon sx={{ color: '#637188' }} /></div>
                    <div>
                        <input type="text" placeholder='Type here...' className='bg-transparent outline-none border-none text-[#637188] text-16px font-normal' />
                    </div>
                </div>
                <div>
                    <ol className='flex items-center gap-2'>
                        <li><PersonIcon sx={{ color: '##FFFFFF' }} /></li>
                        <li><SettingsIcon sx={{ color: '##FFFFFF' }} /></li>
                        <li><NotificationsIcon sx={{ color: '##FFFFFF' }} /></li>

                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Navbar
