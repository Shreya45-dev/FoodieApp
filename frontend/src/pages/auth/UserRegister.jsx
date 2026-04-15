
//this is perfect

import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
const UserRegister = () => {
const navigate=useNavigate()
  const [first, setfirst] = useState("")
  const[second,setsecond]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("")
  const[hello,sethello]=useState(false)
  const[phonenumber,setphonenumber]=useState("")
  
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
    const response=await axios.post("https://foodieappp.onrender.com/api/auth/user/register",{
      fullName:first+""+second,
      email,
      password,
      phonenumber
    },{
      withCredentials:true
    })
    console.log(response.data)
    navigate("/user/login")
    

  }

  
  return (
    <>
    
    <div className='flex justify-center items-center bg-gradient-to-br from-blue-300 via-blue-600 to-yellow-400 h-screen w-screen'> 
    <div className=' h-[350px] md:h-[400px] w-[380px] md:w-[440px] border-2 rounded-xl bg-blue-200 border-zinc-500 flex items-center justify-center mt-20'>
      <div className="h-[380px] w-[420px]">
      <i className='text-4xl font-bold mt-5 mb-5 ml-3 '>Sign Up</i>  
      <h1 className='mb-3 ml-3'>Please fill in this form to create account</h1>
    <form onSubmit={submithandler}> 
      <h1 className=' font-semibold'>First Name</h1>
      <input type='text' className='bg-slate-200 w-full mt-2 mb-2 ' value={first} onChange={(e)=>setfirst(e.target.value)} />
      <h1 className=' font-semibold'>Second Name</h1>

      <input type='text' className='bg-slate-200 w-full mt-2 mb-2 ' value={second} onChange={(e)=>setsecond(e.target.value)} />
      <h1 className=' font-semibold'>Email</h1>
      <input type='email' className='bg-slate-200 w-full mt-2 mb-2 ' value={email} onChange={(e)=>setemail(e.target.value)} />
      <h1 className=' font-semibold'>Password</h1>
      <input type='Password' className='bg-slate-200 w-full mt-2 mb-2 ' value={password} onChange={(e)=>setpassword(e.target.value)} />
      <h1 className=' font-semibold'>Phone Number</h1>
      <input type='number' className='bg-slate-200 w-full mt-2 mb-2 ' value={phonenumber} onChange={(e)=>setphonenumber(e.target.value)} />
      <h1 className='ml-3 mt-5 mb-5'>By creating an account you agree to our <span className='text-blue-500'>Terms & Privacy</span></h1>
       <h1>If Already Registered ?<Link className="text-green-900 font-semibold" to="/user/login" >Login</Link></h1>
    <h1>If registered as food-partner? <Link to="/">Go to Home Page</Link></h1>
     <button type="submit" className='bg-blue-500 h-10 w-full'>Sign Up</button>
      
    
      
    </form>
  </div>
    
  </div>
      
    </div></>
  )
}

export default UserRegister
/*
import React, { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullame: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your BRM backend endpoint
      const response = await axios.post('https://foodieappp.onrender.com/api/register', formData);

      if (response.status === 200 || response.status === 201) {
        setMessage('Registration successful!');
      } else {
        setMessage('Registration failed.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>fullName:</label><br />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;


import React, { useState } from 'react';

const UserRegister = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  // Handling input values
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    try{
    const response=await fetch(`https://foodieappp.onrender.com/api/auth/user/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(user),
    })
  

    }
    catch(error){
      console.log("error")
    }
    // You can add further form submission logic here (e.g., API call)
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Username</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            id="fullName"
            required
            autoComplete="off"
            value={user.fullName}
            onChange={handleInput}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            required
            autoComplete="off"
            value={user.email}
            onChange={handleInput}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            required
            autoComplete="off"
            value={user.password}
            onChange={handleInput}
          />
        </div>

        <button type="submit">Register Now</button>
      </form>
    </>
  );
};

export default UserRegister;*/

//this is perfect
/*import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const UserRegister = () => {
  const navigate=useNavigate()
   const handleSubmit = async(e) => {
    e.preventDefault();

    // Access values directly from the form
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    
    const password = e.target.password.value;

    const response=await axios.post("https://foodieappp.onrender.com/api/auth/user/register",{
      fullName,
      email,
      password
    },{
      withCredentials:true
    })
    console.log(response.data)
    navigate("/")
    

  }

  
   
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Username</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            id="fullName"
            required
            autoComplete="off"
            
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            required
            autoComplete="off"
          
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            required
            autoComplete="off"
      
          />
        </div>

        <button type="submit">Register Now</button>
      </form>
    </>
  );}


export default UserRegister;*/
