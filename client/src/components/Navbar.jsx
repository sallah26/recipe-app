import React from 'react'
import {Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex left-0 justify-center absolute  top-10 w-full">
a
    <header className=' p-10 flex justify-center gap-7 text-2xl'>
      <Link to={"/"}>Home</Link>
      <Link to={"/"}>Login</Link>
      <Link to={"/"}>Add Book</Link>
      <Link to={"/"}>Headless</Link>
    </header>
    </div>
  )
}

export default Navbar
