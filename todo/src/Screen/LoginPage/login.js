import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Profile from "../../Image/profile.png";
import { useNavigate } from 'react-router-dom';
import { login } from '../../helper/helper';
import { Store } from '../../Context/store';
export const Login = () => {
  const initData = {
    userName: "",
    password: ""
  }
  const [data, setData] = useState(initData)
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  // function to handle the input change
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  //function to handle the submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ data })
    console.log(res)
    if (res.status === 201) {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      ctxDispatch({ type: "USER_SIGNIN", payload: res.data })
    }
  }

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
      navigate("/")
    }
  }, [navigate, userInfo])

  return (
    <div className='flex justify-center items-center h-full bg-logbg '>
      <div className='flex items-center justify-start flex-col p-16  gap-2 rounded-lg shadow-2xl bg-slate-100  pt-10 pb-32'>
        <h2 className='font-semibold text-3xl'>Hellow Again!</h2>
        <div className='flex flex-col justify-center items-center text-sm font-thin'>
          <span>Explore More by</span>
          <span>connecting with us</span>
        </div>
        <div>
          <img src={Profile} alt='h' className='w-20 bg-contain'></img>
        </div>
        <input type="text" name='userName' placeholder='Username' className='p-2 border-2 rounded-xl mt-2 focus:outline-none' onChange={handleChange} />
        <input type='password' name='password' placeholder='password' className='p-2 border-2 rounded-xl focus:outline-none' onChange={handleChange} />
        <button className='border-2 w-[200px] rounded-2xl bg-blue-600 text-white font-thin p-1'
          onClick={handleSubmit}
        >Sign In</button>
        <span className='text-sm font-thin cursor-pointer text-red-600 hover:text-blue-700 hover:underline ' onClick={()=>{
          navigate("/forgotPassword")
        }}>Forgot Password? </span>
        <div className='text-sm font-thin'>
          <span>Not Registerd Yet?  </span>
          <span className='cursor-pointer hover:text-blue-600 underline'
            onClick={() => {
              navigate("/register")
            }}
          >Sign Up</span>
        </div>
        <ToastContainer position='top-center' autoClose={1000} closeOnClick theme='light' />

      </div>
    </div>
  )
}


