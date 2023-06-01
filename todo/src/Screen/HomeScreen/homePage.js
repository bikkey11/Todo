import React, { useState } from 'react'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import { Myday, Important, Planned, Tasks, AssignedToMe, Flagged } from '../../Components/Myday'
import { sidebarContext } from '../../Context/sidebarContext'
import { Navbar } from '../../Components/Navbar/navbar'

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(1)



  return (
   <div className='h-screen flex flex-col '>
   <Navbar/>
    <div className='flex my-2  h-screen'>
      <sidebarContext.Provider value={{ isOpen: isOpen, slide: slide, setIsOpen: setIsOpen, setSlide: setSlide }}>
        <Sidebar/>
        {slide === 1 && (<Myday />)}
        {slide === 2 && (<Important />)}
        {slide === 3 && (<Planned />)}
        {slide===4 && (<AssignedToMe/>)}
        {slide===5 && (<Flagged/>)}
        {slide === 6 && (<Tasks />)}
      </sidebarContext.Provider>
    </div>
   </div>
  )
}
