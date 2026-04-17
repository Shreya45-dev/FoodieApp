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
    <div className="h-screen w-screen flex flex-wrap  justify-center ">
     {data.map((item)=>{
        return(
          <div className=" h-[20vh] shadow-2xl w-[20vw]" key={item._id}>
            <img className="h-[15vh] w-[15vw]" src={item.image} />
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
 //git add .
 //git commit -m"res"

//git push -u origin main