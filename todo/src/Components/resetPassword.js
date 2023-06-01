import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../helper/helper';

export const ResetPassword = (state) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state;
    const [password, setPassword] = useState("");

    const submitHandler = async () => {
        console.log(userName, password);
        await resetPassword({userName,password});
    }
    useEffect(() => {
        if(!userName){
            navigate("/")
        }
 
    }, )
    
    return (
        <div className='flex justify-center items-center h-full bg-logbg '>
            <div className='flex items-center justify-start flex-col p-16  gap-2 rounded-lg shadow-2xl bg-slate-100  pt-10 pb-32'>
                <h2 className='font-semibold text-3xl'>Hellow !</h2>
                <div className='flex flex-col justify-center items-center text-sm font-thin'>
                    <span>Enter the new </span>
                    <span>Password and save somewhere</span>
                </div>
                <input type="text" value={userName} disabled name='userName' placeholder='Username' className='p-2 border-2 rounded-xl mt-2 focus:outline-none' />
                <input type='password' name='password' placeholder='password' className='p-2 border-2 rounded-xl focus:outline-none' onChange={(e) => { setPassword(e.target.value) }} />


                <button className='border-2 w-[200px] rounded-2xl bg-blue-600 text-white font-thin p-1'
                    onClick={submitHandler}
                >Save</button>
                <span className='text-sm font-thin cursor-pointer text-red-600 hover:text-blue-700 hover:underline'
                    onClick={() => {
                        navigate("/login")
                    }}
                >Login In Now </span>
                <div className='text-sm font-thin'>
                    <span>Not Registerd Yet?  </span>
                    <span className='cursor-pointer hover:text-blue-600 underline'

                    >Sign Up</span>
                </div>

            </div>
        </div>
    )
}
