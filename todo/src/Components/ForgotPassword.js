import React, { useState } from 'react'
import { getUser } from '../helper/helper';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const navigate=useNavigate();
    const [userName, setUserName] = useState("");
    const submitHandler = async () => {
        const res = await getUser({ userName })
         const user=res.data
        if(res.status===200){
            navigate('/generateOTP',{state:user})
        }
    }
    return (
        <div className='flex justify-center items-center h-full bg-logbg '>
            <div className='flex items-center justify-start flex-col p-16  gap-2 rounded-lg shadow-2xl bg-slate-100  pt-10 pb-32'>
                <h2 className='font-semibold text-3xl'>Hellow Again!</h2>
                <div className='flex flex-col justify-center items-center text-sm font-thin'>
                    <span>Explore More by</span>
                    <span>connecting with us</span>
                </div>

                <input type="text" name='userName' placeholder='Username' className='p-2 border-2 rounded-xl mt-2 focus:outline-none' onChange={(e) => {
                    setUserName(e.target.value)
                }} />
                <button className='border-2 w-[200px] rounded-2xl bg-blue-600 text-white font-thin p-1'
                    onClick={submitHandler}

                >Find User</button>
                <span className='text-sm font-thin cursor-pointer text-red-600 hover:text-blue-700 hover:underline'>Login In Now </span>
                <div className='text-sm font-thin'>
                    <span>Not Registerd Yet?  </span>
                    <span className='cursor-pointer hover:text-blue-600 underline'

                    >Sign Up</span>
                </div>

            </div>
        </div>
    )
}

export default ForgotPassword