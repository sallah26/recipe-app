import React from 'react'
import {Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access_token"]); 
  const  navigate = useNavigate();
  const logout = ()=>{
    setCookie("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  }
  return (
    <div className="flex left-0 justify-center   top-10 w-full">
    <header className=' p-10 flex justify-center gap-7 text-2xl'>
      <Link to={"/"}>Home</Link>
      <Link to={"/addrecipe"}>Add Recipes</Link>
      <Link to={"/"}>Saved Recipes</Link>
      {!cookie.access_token ? (
        <button onClick={logout}>Log out</button>
        ) : (
          <Link to={"/auth"}>Login</Link>
      )
      }
    </header>
    </div>
  )
}

export default Navbar
