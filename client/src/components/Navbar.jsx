import React, { useState } from 'react'
import {Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../index.css";
import logo from "../images/logo.png";
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access_token"]); 
  const [showNavbar, setShowNavbar] = useState(window.location.pathname === "/auth");
  const [showHamburger, setShowHamburger] = useState(false);
  const  navigate = useNavigate();
  const logout = ()=>{
    setCookie("access_token", "");
    window.localStorage.removeItem("token");
    navigate("/auth");
  }
  
  const handleHamburger = () => {
    setShowHamburger(!showHamburger);
  }

  return (
    <section className="z-50">

    <header className={` ${showNavbar ? `hidden` : ` border-b-[1px] drop-shadow-lg py-2 md:px-20  min-w-full  bg-stone-100 px-4 fixed lg:relative flex justify-between gap-7  text-slate-800`} dark:border-stone-600 border-b-[1px] dark:shadow-stone-600 shadow-xl dark:text-slate-100 dark:bg-zinc-800`} >
      <Link to={"/"} className='w-20 lg:w-24'><img src={logo} alt="logo" /></Link>
      <div className='hidden lg:flex items-center justify-center text-md gap-8 '>
        <DarkModeToggle />
      {localStorage.token && <Link to={"/addrecipe"}>add recipe</Link>}
        <Link to={"/"}>my favorites</Link>
        {localStorage.token ? (
          <button className="p-1 font-semibold px-4 bg-transparent border-2 border-slate-900 dark:border-slate-400 rounded-full" onClick={logout}>Log out</button>
          ) : (
            <Link to={"/auth"} className="p-1 font-semibold px-4 bg-transparent border-2 border-green-600 rounded-full">Login</Link>
            )
          }
      </div>
      <button className={`flex lg:hidden flex-col justify-center  hamburger-menu`} onClick={handleHamburger}>
          <div className={`${showHamburger && 'show-menu'} flex flex-col `}>
            <span className='first dark:bg-white'></span>
            <span className='second dark:bg-white'></span>
            <span className='third dark:bg-white'></span>
          </div>
      </button>
    
    </header>
    {showHamburger && (
      <div className='show-hamburger opacity-85 bg-slate-900 dark:bg-slate-700'>
        <div className="flex flex-col text-lg">
          <Link to={"/"} className='p-4 font-bold border-b-[1px] border-slate-400 '>Home</Link>
          <div className='flex flex-col items-center justify-center text-md gap-1 '>
          {localStorage.token && <Link to={"/addrecipe"} className="p-4 border-b-[1px] border-slate-400">Add Recipes</Link>}
            <Link to={"/"}  className="p-4 border-b-[1px] border-slate-400">Favorite Recipes</Link>
            <div className="p-4">
              {localStorage.token ? (
                <button className="p-1 font-semibold px-7 bg-transparent border-2  border-red-500  rounded-full" onClick={logout}>Log out</button>
                ) : (
                  <Link to={"/auth"} className="p-1 border-b-[1px] font-semibold px-7 bg-transparent border-2 border-green-600 rounded-full">Login</Link>
                  )
                }
            </div>
          </div>
        </div>
      </div>
    )}
    </section>
  )
}

export default Navbar
