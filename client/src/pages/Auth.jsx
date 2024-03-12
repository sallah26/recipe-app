import React, { useState } from 'react'
import axios from 'axios';
import {FaKey, FaKeybase, FaKeyboard, FaKeycdn, FaUnlockAlt, FaUserAlt} from "react-icons/fa"
const Auth = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/auth/register",  { username, password })
            alert("Registration completed!")
        } catch (error) {
            console.log(error);
            // console.log(error.message);

        }
    };
  return (
    <div className="min-w-[500px] border-[2px] rounded-2xl border-teal-400 flex flex-col items-center justify-center p-4 gap-7">
      <p className='text-xl font-semibold'>Login With Your Username</p>
      <p className='text-[20px] text-red-600'>{err}</p>
      <form action="" className='flex flex-col w-full gap-4'>
        <div className='flex items-center relative'>
            <FaUserAlt  className='text-slate-800 absolute ml-3' size={23}/>
            <input required value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="" placeholder='username...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        <div className='flex items-center relative'>
            <FaUnlockAlt className='text-slate-800 absolute ml-3' size={23}/>
            <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="" placeholder='password...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        <button onClick={handleLogin} className='bg-teal-600 outline-0 border-[1.5px] shadow-lg shadow-teal-400 rounded-full border-slate-700 w-full h-10 px-10 text-white'>LOG IN</button>
      </form>
      <p className='text-[18px]'>don't have an account? <a href='' className='text-blue-400'>Sign up here</a></p>
    </div>
  )
}

export default Auth