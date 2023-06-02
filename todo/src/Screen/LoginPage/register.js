import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Profile from "../../Image/profile.png"
import { useNavigate } from 'react-router-dom';
import { register } from '../../helper/helper';
export const Register = () => {
  const navigate = useNavigate()
  const initData = {
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    middleName: "",
    address: "",
    phone: ""
  }
  const [formData, setFormData] = useState(initData);
  const [profile, setProfile] = useState("")
  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register({ formData, profile })
    if (res.status === 200) {
      toast.success(res.data)
      // console.log(res.data)
    }
    else {
      toast.error(res)
    }
    setTimeout(() => {
      if (res.status === 200) {
        navigate("/login")
      }

    }, 1500);


  }
  return (
    <div className='flex justify-center items-center h-full bg-logbg overflow-y-scroll '>
      <div className='flex items-center justify-start flex-col p-16  gap-3 rounded-lg shadow-2xl bg-slate-100  pt-10 pb-24'>
        <h2 className='font-semibold text-3xl'>Hellow Again!</h2>
        <div className='flex flex-col justify-center items-center text-sm font-thin'>
          <span>Explore More by</span>
          <span>connecting with us</span>
        </div>
       <form onSubmit={handleSubmit}>
       <div className='flex justify-center p-2'>
          <label htmlFor="profile" className='cursor-pointer'>
            <img src={Profile} alt='h' className='w-20 bg-contain'></img>
            <input id='profile' name='profile' type="file" className='hidden' onChange={(e) => {
              setProfile(e.target.value)
            }} />
          </label>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
          <input type='text' required name='firstName' placeholder='First Name' className='p-2 border-2 rounded-xl focus:outline-none' onChange={handleChange} />
          <input type='text' name='middleName' onChange={handleChange} placeholder='Middle Name' className='p-2 border-2 rounded-xl focus:outline-none' />
          <input type="text" placeholder='Last Name' name='lastName' onChange={handleChange} className='p-2 border-2 rounded-xl focus:outline-none' />
          <input type='email' placeholder='email' name='email' onChange={handleChange} className='p-2 border-2 rounded-xl focus:outline-none' />
          <input type='text' placeholder='Username' name='userName' onChange={handleChange} className='p-2 border-2 rounded-xl focus:outline-none' />
          <input type='text' placeholder='Address' name='address' onChange={handleChange} className='p-2 border-2 rounded-xl focus:outline-none' />
          <input type='number' placeholder='Phone' name='phone' onChange={handleChange} className='p-2 border-2 rounded-xl focus:outline-none' />
          <input type='password' placeholder='password' name='password' onChange={handleChange} className='p-2 border-2 rounded-xl focus:outline-none' />
        </div>
        <div className='flex justify-center pt-2'>
        <button className='border-2 w-[200px] rounded-2xl bg-blue-600 text-white font-thin p-1'
          // onClick={handleSubmit}
        >Sign Up</button>
        </div>

       
       </form>
        <div className='text-sm font-thin'>
          <span>Already a user?  </span>
          <span className='cursor-pointer hover:text-blue-600 underline'
            onClick={() => {
              navigate("/login")
            }}
          >Sign In</span>
        </div>
        <ToastContainer position='top-center' autoClose={1000} closeOnClick theme='light' />
      </div>
    </div>
  )
}


