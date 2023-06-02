import React, { useState, useContext } from 'react'
import { AiOutlineSearch, AiOutlineSetting, AiOutlineQuestion, AiOutlineNotification } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg"
import { useNavigate } from "react-router-dom";
import { Store } from '../../Context/store';

export const Navbar = () => {
  const navigate = useNavigate()
  const [profileMenu, setProfileMenu] = useState("")

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const logout = () => {
    localStorage.removeItem("userInfo")
    ctxDispatch({ type: "USER_SIGNOUT" })
    setProfileMenu(!profileMenu)
  }



  return (
    <div className='bg-navbar flex justify-between text-white relative  items-center '>
      <div className='flex '>
        <div className='py-5 px-4 hover:bg-navHov cursor-pointer' onClick={() => {
          navigate("/")
        }}>
          <CgMenuGridR className='text-white'></CgMenuGridR>
        </div>
        <span className="text-[16px]  text-center font-semibold leading-[52px] cursor-pointer hover:underline">To Do</span>

      </div>




      <div className='flex items-center gap-2'>

        <div className='px-2 py-5 hover:bg-navHov cursor-pointer'>
          <AiOutlineSetting></AiOutlineSetting>
        </div>
        <div className='px-2 py-5 hover:bg-navHov cursor-pointer'>
          <AiOutlineQuestion></AiOutlineQuestion>
        </div>
        <div className='px-2 py-5 hover:bg-navHov cursor-pointer'>
          <AiOutlineNotification></AiOutlineNotification>
        </div>
        <div className='px-2 py-4 hover:bg-navHov flex gap-1 cursor-pointer'
        >
          <div >
            {userInfo ? <span onClick={() =>
              setProfileMenu(!profileMenu)}>{userInfo.userName}</span> :
              <span onClick={() => { navigate("/login") }}>Log In</span>}
          </div>
          <div className=' border-2 rounded-full px-1 '>BY</div>
        </div>
        <button className='bg-white text-navbar rounded-xl align-middle p-2 mr-3 '
          onClick={() => {
            navigate("/searchTodo")
          }}
        >
          <AiOutlineSearch className=' text-2xl '></AiOutlineSearch>
        </button>


      </div>
      {
        profileMenu ? <div className="fixed right-0 top-[59px] bg-navbar   text-sm">
          <div className='cursor-pointer hover:bg-navHov p-2'>Edit Profile</div>
          <div className='cursor-pointer hover:bg-navHov p-2' onClick={logout}>Log Out</div>
        </div> : null
      }


    </div>
  )
}




