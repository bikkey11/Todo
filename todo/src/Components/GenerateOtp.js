import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { VerifyOTP, generateOTP } from '../helper/helper';

export const GenerateOtp = (state) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userName, email } = location.state;
    const [otp, setOtp] = useState('');

    const generateOtp = async () => {
        const res = await generateOTP({ userName });
        console.log(res)

    }
    const submitHandler = async () => {
        const result = await VerifyOTP({ otp });
        console.log(result);
        if (result.status === 201) {
            navigate("/resetPassword",{state:userName})
        }
        setOtp("")

    }
    // useEffect(() => {
    //     generateOtp();

    // }, [generateOtp])

    return (
        <div className='flex justify-center items-center h-full bg-logbg '>
            <div className='flex items-center justify-start flex-col p-16  gap-2 rounded-lg shadow-2xl bg-slate-100  pt-10 pb-32'>
                <h2 className='font-semibold text-3xl'>Hellow {userName}!</h2>
                <div className='flex flex-col justify-center items-center text-sm font-thin'>
                    <span>Enter the OTP</span>
                    <span>Send to you email address</span>
                </div>
                <button onClick={generateOtp}>Send OTP</button>

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                />
                <button className='border-2 w-[200px] rounded-2xl bg-blue-600 text-white font-thin p-1'
                    onClick={submitHandler}
                >Reset</button>
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
