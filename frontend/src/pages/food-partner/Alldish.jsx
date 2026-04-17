import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Alldish = () => {


   
    const [data, setdata] = useState([])
    useEffect(() => {
 const find=async()=>{
  try{
   const res=await axios.get("https://foodieappp.onrender.com/api/food/alldish",
     {withCredentials:true}
   )
      setdata(res.data.dish)
      console.log(res.data.dish)
    }
    catch(err){
      console.log(err);
      console.log("helllllllllllllllllllo")
    }
  }
 find()
  
}, [])



  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center ">
     {data.map((item)=>{
        return(
          <div className=" h-[8vh] shadow-2xl w-[5vw]" key={item._id}>
            <img className="h-[5vh] w-[5vw]" src={item.image} />
            <h1>{item.name}</h1>
            <h1>{item.description}</h1>
            <h1>{item.cost}</h1>
          </div>
        
        )
      })}
      
        
      
    </div>
  )
}

export default Alldish
