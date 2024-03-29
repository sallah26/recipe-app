import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaLock, FaUnlockAlt, FaUserAlt } from "react-icons/fa";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useCookies } from "react-cookie";
import Alert from '../components/Alert';

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["access_token"]);
  const [showRegistrationAlert, setShowRegistrationAlert] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) return setErr("Passwords do not match!");

    try {
      await axios.post("https://recipe-app-gr7f.onrender.com/auth/register", { regUsername, regPassword });
      // alert("Registration completed!");
        setShowRegistrationAlert(true)
        setErr("");
     
      
    } catch (error) {
      console.log(error);
      switch (error.response.status) {
        case 409:
          setErr(`Username ${regUsername} already exists`);
          break;
        default:
          setErr("Internal Server Error");
          break;
      }
      console.log(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://recipe-app-gr7f.onrender.com/auth/login", { username, password });
      setCookies("access_token", res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userID', res.data.userId);
      localStorage.setItem('username', res.data.username);
      setShowLoginAlert(true)
    } catch (error) {
      console.log(error);
      switch (error.response.status) {
        case 403:
          setErr(`Sorry ${username}, Wrong Credentials`);
          break;
        default:
          setErr("Internal Server Error");
          break;
      }
    }
  };

  const handleRegistrationAlertConfirm = () => {
    // Redirect to login component or perform any other action here
    setShowRegister(false);

  };

  const handleLoginAlertConfirm = () => {
    // Redirect to login component or perform any other action here
    setShowLoginAlert(false);
    navigate("/");
    window.location.reload()

  };

  return (
    <article className='w-full dark:bg-slate-800 flex items-center justify-center min-h-[100vh] text-slate-800 dark:text-slate-100'>
        {showRegistrationAlert && (
          <Alert success={true} message="Registration completed!! Now Login to your Account!" action="Okay tnx dude!" onConfirm={handleRegistrationAlertConfirm}/>
         )}{" "} 
          {showLoginAlert && (
          <Alert success={true} message="Boom! Login Successful!!" action="Pissay dude!" onConfirm={handleLoginAlertConfirm}/>
         )}{" "} 
      <section className=''>
        {!showRegister ? (
          <>
          <div className="w-full md:min-w-[450px] border-[1px] text-slate-800 dark:text-slate-100 rounded-2xl border-slate-500 shadow-lg shadow-slate-700 flex flex-col items-center justify-center p-4 gap-7">
            <p className='text-xl my-auto font-semibold'>Login With Your Username</p>
            <p className='text-[20px] text-red-600'>{err}</p>
            <form action="" className='flex flex-col w-full gap-4'>
              {/* Username input */}
              <div className='flex items-center relative'>
                <FaUserAlt className='text-slate-800 absolute ml-3' size={23} />
                <input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="" placeholder='username...' id="" className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black' />
              </div>
              {/* Password input */}
              <div className='flex items-center relative'>
                <FaUnlockAlt className='text-slate-800 absolute ml-3' size={23} />
                <input required value={password} onChange={(e) => setPassword(e.target.value)} type={`${showPassword ? "text" : "password"}`} name="" placeholder='password...' id="" className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black' />
                {/* Password visibility toggle */}
                {showPassword ? (
                  <BsEyeSlashFill className='cursor-pointer text-slate-800 right-0 absolute mr-4' size={22} onClick={() => { setShowPassword(!showPassword) }} />
                ) : (
                  <BsEyeFill className='cursor-pointer text-slate-800 right-0 absolute mr-4' size={22} onClick={() => { setShowPassword(!showPassword) }} />
                )}
              </div>
              {/* Login button */}
              <button onClick={handleLogin} className='bg-slate-800 outline-0 border-[1.5px] shadow-lg shadow-slate-400 rounded-full border-slate-700 w-full h-10 px-10 text-white'>LOG IN</button>
            </form>
            {/* Registration link */}
            <p className='text-[16px] '>Don't have an account? <span onClick={() => { setShowRegister(true); setErr("") }} className='text-blue-600 cursor-pointer'>Sign up here</span></p>
          </div></>
        ) : (
          // {/* Registration form */}{" "}
          <div className="w-full md:min-w-[500px] mt-20 md:mt-0 my-10 border-[1px] rounded-2xl border-slate-500 shadow-lg shadow-slate-700 flex flex-col items-center justify-center p-4 gap-7">
            <p className='text-xl font-semibold'>Register With Your Username and Password</p>
            <p className='text-[20px] text-rose-500'>{err}</p>
            <form action="" className='flex flex-col w-full gap-6 py-4'>
              {/* Username input */}
              <div className='flex items-center relative'>
                <FaUserAlt className='text-slate-800 absolute ml-3' size={23} />
                <input required value={regUsername} onChange={(e) => setRegUsername(e.target.value)} type="text" name="" placeholder='username...' id="" className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black' />
              </div>
              {/* Password input */}
              <div className='flex items-center relative'>
                <FaUnlockAlt className='text-slate-800 absolute ml-3' size={23} />
                <input required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} type={`${showPassword ? "text" : "password"}`} name="" placeholder='password...' id="" className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black' />
                {/* Password visibility toggle */}
                {showPassword ? (
                  <BsEyeSlashFill className='cursor-pointer text-slate-800 right-0 absolute mr-4' size={22} onClick={() => { setShowPassword(!showPassword) }} />
                ) : (
                  <BsEyeFill className='cursor-pointer text-slate-800 right-0 absolute mr-4' size={22} onClick={() => { setShowPassword(!showPassword) }} />
                )}
              </div>
              {/* Confirm password input */}
              <div className='flex items-center relative'>
                <FaLock className='text-slate-800 absolute ml-3' size={23} />
                <input required value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} type={`${showRegConfirmPassword ? "text" : "password"}`} name="" placeholder='confirm password...' id="" className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black' />
                {/* Password visibility toggle */}
                {showRegConfirmPassword ? (
                  <BsEyeSlashFill className='cursor-pointer text-slate-800 right-0 absolute mr-4' size={22} onClick={() => { setShowRegConfirmPassword(!showRegConfirmPassword) }} />
                ) : (
                  <BsEyeFill className='cursor-pointer text-slate-800 right-0 absolute mr-4' size={22} onClick={() => { setShowRegConfirmPassword(!showRegConfirmPassword) }} />
                )}
              </div>
              {/* Register button */}
              <button onClick={handleRegistration} className='bg-slate-800 outline-0 border-[1.5px] shadow-lg shadow-slate-400 rounded-full border-slate-700 w-full h-10 px-10 text-white'>REGISTER</button>
            </form>
          </div>
        )}
      </section>
    </article>
  )
}

export default Auth;
