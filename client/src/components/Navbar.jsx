import React, { useState } from 'react'
import {Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access_token"]); 
  const [showNavbar, setShowNavbar] = useState(window.location.pathname === "/auth")
  const  navigate = useNavigate();
  const logout = ()=>{
    setCookie("access_token", "");
    window.localStorage.removeItem("token");
    navigate("/auth");
  }
  

  return (
    
    <header className={` ${showNavbar ? `hidden` : `p-4 md:p-7 md:px-20  min-w-full  bg-stone-100 px-10 flex justify-between gap-7  text-slate-800`} `} >
      <Link to={"/"} className='text-2xl font-bold'>Home</Link>
      <div className='flex items-center justify-center text-md gap-8 '>
      {localStorage.token && <Link to={"/addrecipe"}>Add Recipes</Link>}
        <Link to={"/"}>Favorite Recipes</Link>
        {localStorage.token ? (
          <button className="p-1 font-semibold px-4 bg-transparent border-2 border-slate-900 rounded-full" onClick={logout}>Log out</button>
          ) : (
            <Link to={"/auth"} className="p-1 font-semibold px-4 bg-transparent border-2 border-green-600 rounded-full">Login</Link>
            )
          }
      </div>
    </header>
  )
}

export default Navbar
