import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
const FoodPartnerRegister = () => {
const navigate=useNavigate()
  const [first, setfirst] = useState("")
  const[second,setsecond]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("")
  const[restaurantName,setrestaurantName]=useState("")
  const[Address,setAddress]=useState("")
  const[City,setCity]=useState("")
  const[hello,sethello]=useState(false)
  
  
  const submithandler=async(e)=>{

   e.preventDefault()
  /* formdata={
      first,
      second,
      email,
      password,
      phone
    }
   console.log(formdata)*/
    const response=await axios.post("https://foodieappp.onrender.com/api/auth/food-partner/register",{
      name:first+""+second,
      email,
      password,
      restaurantName,
      Address,
      City
    },{
      withCredentials:true
    })
    //console.log(response.data)
    navigate("/food-partner/login")
    

  }

  
  return (
    <>
    
    <div className='flex h-screen w-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500  items-center justify-center'> 
    <div className='outer_border_box h-[550px] w-[460px]  bg-blue-200  border-2 rounded-xl flex items-center justify-center border-zinc-500 mt-20'>
      <div className='inner_box_border h-[520px] w-[430px]'>
      <i className='text-4xl font-bold mt-5 mb-5 ml-3 '>Sign Up</i>  
      <h1 className='mb-3 ml-3'>Please fill in this form to create account</h1>
    <form onSubmit={submithandler}> 
      <i className='  font-semibold'>First Name</i>
      <input type='text' className='bg-slate-200 w-full mt-2 mb-2 ' value={first} onChange={(e)=>setfirst(e.target.value)} />
      <i className=' font-semibold'>Second Name</i>

      <input type='text' className='bg-slate-200 w-full mt-2 mb-2 ' value={second} onChange={(e)=>setsecond(e.target.value)} />
      <i className=' font-semibold'>Email</i>
      <input type='email' className='bg-slate-200 w-full mt-2 mb-2 ' value={email} onChange={(e)=>setemail(e.target.value)} />
      <i className=' font-semibold'>Password</i>
      <input type='Password' className='bg-slate-200 w-full mt-2 mb-2 ' value={password} onChange={(e)=>setpassword(e.target.value)} />
      <i className=' font-semibold'>Restaurant Name</i>
      <input type='text' className='bg-slate-200 w-full mt-2 mb-2 ' value={restaurantName} onChange={(e)=>setrestaurantName(e.target.value)} />
      <i className=' font-semibold'>Address</i>
      <input type='text' className='bg-slate-200 w-full mt-2 mb-2 ' value={Address} onChange={(e)=>setAddress(e.target.value)} />
      <i className=' font-semibold'>City</i>
       <input type='text' className='bg-slate-200 w-full mt-2 mb-2 ' value={City} onChange={(e)=>setCity(e.target.value)} />
    

      <h1 className='ml-3 mt-5 mb-5'>By creating an account you agree to our <span className='text-blue-300'>Terms & Privacy</span></h1>
    <h1>If Already Registered ?<Link className='text-green-800 font-semibold ' to="/food-partner/login" >Login</Link></h1>
    <h1>If registered as user? <Link to="/">Go to Home Page</Link></h1>
     <button type="submit" className='bg-blue-500 h-10 w-full'>Sign Up</button>
      
    
      
    </form>
  
    </div>
  </div>
      
    </div></>
  )
}

export default FoodPartnerRegister

