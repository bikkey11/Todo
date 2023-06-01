import React, { useContext } from 'react'
import { AiOutlineMenu, AiOutlineStar, AiOutlineCalendar, AiOutlineHome, AiOutlineMail, AiOutlinePlus, AiOutlineContacts } from "react-icons/ai"
import { BsPersonUp, BsFlag, BsFillPeopleFill } from "react-icons/bs"
import { RiSunLine } from "react-icons/ri"
import { TiTick } from "react-icons/ti"
import { sidebarContext } from '../../Context/sidebarContext'

export const Sidebar = () => {
    const { isOpen,  setIsOpen, setSlide } = useContext(sidebarContext);
    // console.log(isOpen,slide)

    if (isOpen === false) {
        return (
            <div className='flex flex-col  border-r-2 w-60 shadow-2xl justify-between h-full p-4 overflow-hidden '>
                <div className='flex flex-col gap-4 '>
                    <div className='flex items-center gap-3 cursor-pointer '
                        onClick={() => {
                            setIsOpen(!isOpen)
                        }}
                    >
                        <AiOutlineMenu></AiOutlineMenu>
                    </div>
                    <div className='flex items-center gap-3 hover:bg-slate-100 py-2 cursor-pointer'
                        onClick={() => {
                            setSlide(1)
                        }}
                    >
                        <RiSunLine></RiSunLine>
                        <span>My Day</span>
                    </div>
                    <div className='flex items-center gap-3  hover:bg-slate-100 py-2 cursor-pointer'
                        onClick={() => {
                            setSlide(2)
                        }}
                    >
                        <AiOutlineStar></AiOutlineStar>
                        <span>Important</span>
                    </div>
                    <div className='flex items-center gap-3  hover:bg-slate-100 py-2 cursor-pointer'
                        onClick={() => {
                            setSlide(3)
                        }}
                    >
                        <AiOutlineCalendar></AiOutlineCalendar>
                        <span>Planned</span>
                    </div>
                    <div className='flex items-center gap-3  hover:bg-slate-100 py-2 cursor-pointer'
                        onClick={() => {
                            setSlide(4)
                        }}>
                        <BsPersonUp></BsPersonUp>
                        <span>Assigned to me</span>
                    </div>
                    <div className='flex items-center gap-3  hover:bg-slate-100 py-2 cursor-pointer'
                        onClick={() => {
                            setSlide(5)
                        }}>
                        <BsFlag></BsFlag>
                        <span>Flagged</span>
                    </div>
                    <div className='flex items-center gap-3  hover:bg-slate-100 py-2 cursor-pointer'
                        onClick={() => {
                            setSlide(6)
                        }}>
                        <AiOutlineHome></AiOutlineHome>
                        <span>Task</span>
                    </div>
                    <div className='w-[220px] h-[1px] bg-gray-400 '></div>
                    <div className='flex items-center gap-12  hover:bg-slate-100 py-2 cursor-pointer text-blue-800'
                        onClick={() => {
                            setSlide(7)
                        }}>
                        <AiOutlinePlus></AiOutlinePlus>
                        <span>New List</span>
                        <AiOutlineContacts></AiOutlineContacts>
                    </div>
                </div>
                <div className='flex items-center gap-6 '>
                    <div className='hover:bg-slate-400 cursor-pointer p-2'><AiOutlineMail></AiOutlineMail></div>
                    <div className='hover:bg-slate-400 cursor-pointer p-2'><AiOutlineCalendar></AiOutlineCalendar></div>
                    <div className='hover:bg-slate-400 cursor-pointer p-2'><BsFillPeopleFill></BsFillPeopleFill></div>
                    <div className='hover:bg-slate-400 cursor-pointer p-2' > <TiTick></TiTick></div>
                </div>
            </div>
        )
    }


}


