/*import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"

const FoodPartnerLogin = () => {
  const navigate=useNavigate()
  const [email, setemail] = useState('')
  const [password,setpassword] = useState('')
  const submithandle=async(e)=>{
    e.preventDefault();
    /*const formdata={
      name,
    password
    }
    console.log(formdata)   yhaa pr comment bnd krna dena ok
    try{
     const response=await axios.post("http://localhost:3000/api/auth/food-partner/login",{
      email,
      password
    },{
      withCredentials:true
    })
    console.log(response.data)
    navigate(`/food-partner/page/${response.data.user._id}`)
    
  }
  catch(err){    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);}
  }
  
  return (
   <div className='flex items-center justify-center h-screen w-screen '>
      <div className='h-80 w-[600px] border-2 border-slate-100'>
        <div className='h-80 w-[580px] ml-3'>
      <form onSubmit={submithandle} >
        <h1 className='mb-4 mt-4 text-4xl font-bold'>Login</h1>
        <h1 className='font-semibold'>userName</h1>
        <input  type="email" className='bg-slate-200 mt-2 w-full p-1' value={email} onChange={(e)=>setemail(e.target.value)} ></input>
        <h1 className='font-semibold mt-5'>password</h1>
        <input type="password"  className='bg-slate-200 mt-2  w-full p-1' value={password} onChange={(e)=>setpassword(e.target.value)}></input>
        <h1>If Not registered<Link to="/food-partner/register">Register</Link></h1>
        <button className='bg-blue-600 mt-9 w-full p-1'>login</button>
      </form></div></div>
    </div>
  )
}

export default FoodPartnerLogin



*/

import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const FoodPartnerLogin = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const submithandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://foodieapp-ve9r.onrender.com/api/auth/food-partner/login",
        { email, password },
        { withCredentials: true }
      )
      navigate(`/food-partner/page/${response.data.user._id}`)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl rounded-2xl w-[380px] p-8 text-white">
        
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          🍔 Food Partner
        </h1>
        <p className="text-center text-sm mb-6 text-white/80">
          Login to manage your restaurant
        </p>

        <form onSubmit={submithandle} className="flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            className="w-full p-3 rounded-lg bg-white/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="📧 Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-black focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="🔒 Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          {/* Register */}
          <p className="text-sm text-center">
            New here?{" "}
            <Link 
              to="/food-partner/register"
              className="font-semibold underline hover:text-yellow-200"
            >
              Register Now
            </Link>
          </p>

          {/* Button */}
          <button
            type="submit"
            className="bg-white text-green-500 font-bold py-2 rounded-lg hover:bg-yellow-200 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  )
}

export default FoodPartnerLogin