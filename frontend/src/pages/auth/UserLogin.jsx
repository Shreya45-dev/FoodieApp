/*import React, { useEffect, useId, useState } from 'react'
import axios from 'axios'
import {Link, useLoaderData, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../../redux/authSlice';
const UserLogin = () => {
  
  const navigate=useNavigate()
  const [email, setemail] = useState('')
  const [password,setpassword] = useState('')
  const dispatch=useDispatch()
  const[data,setdata]=useState([])
     
  
  const submithandle=async(e)=>{
    e.preventDefault();

    /*const formdata={
      name,
    password
    }
    console.log(formdata)                //yha pr bnd krna comment
     const response=await axios.post("https://foodieappp.onrender.com/api/auth/user/login",{
      email,
      password 
    },{
      withCredentials:true
    })
    console.log(response.data.user._id)
    navigate("/Home")
    dispatch(setAuthUser(response.data.user))
    

  }
//console.log(resp)
  
  return (
    
    <>
   <div className='flex items-center bg-gradient-to-br from-blue-300 via-blue-600 to-yellow-400 justify-center h-screen w-screen '>
      <div className='h-80 w-[600px] border-2 border-slate-100'>
        <div className='h-80 w-[580px] ml-3'>
      <form onSubmit={submithandle} >
        <h1 className='mb-4 mt-4 text-4xl font-bold'>Login</h1>
        <h1 className='font-semibold'>userName</h1>
        <input  type="email" className='bg-slate-200 mt-2 w-full p-1' value={email} onChange={(e)=>setemail(e.target.value)} ></input>
        <h1 className='font-semibold mt-5'>password</h1>
        <input type="password"  className='bg-slate-200 mt-2  w-full p-1' value={password} onChange={(e)=>setpassword(e.target.value)}></input>
        <h1>If Not registered<Link to="/user/register">Register</Link></h1>
        <button className='bg-blue-600 mt-9 text-green-500 w-full p-1'>login</button>
      </form></div></div>
    </div>

     <div>
        
          </div></>
        
        
  )
}

export default UserLogin
*/




import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../../redux/authSlice'

const UserLogin = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const submithandle = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
        "https://foodieappp.onrender.com/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      )

     dispatch(setAuthUser({
  ...response.data.user,
  token: response.data.token
}));
      navigate("/Home")

    } catch (error) {
      console.log(error)
      alert("Login failed ❌")
        }
    }

    return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            
      <div className="bg-white/10 h-60  backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-[400px] border border-white/20">
                
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
                </h1>

        <form onSubmit={submithandle} className="flex flex-col gap-2">

          {/* Email */}
                    <div>
            <label className="text-white font-semibold">Email</label>
                        <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full p-3 py-3 rounded-2xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
                        />
                    </div>

          {/* Password */}
                    <div>
            <label className="text-white font-semibold">Password</label>
                        <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full p-3 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
                        />
                    </div>

          {/* Register link */}
          <p className="text-white text-sm text-center">
            Don’t have an account?{" "}
            <Link
              to="/user/register"
              className="text-yellow-300 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          {/* Button */}
                    <button
                        type="submit"
            className="bg-white text-indigo-600 font-bold py-5 rounded-xl hover:bg-indigo-100 transition duration-300 shadow-lg"
                    >
            Login 🚀
                    </button>

                </form>
            </div>

        </div>
    )
}

export default UserLogin










