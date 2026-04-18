import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FaPager, FaPaintRoller } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { MdEdit } from "react-icons/md";

const Alldish = () => {
   
   const fp = useSelector((state) => state.fpartner.fp);
const id = fp?._id;
  
   
   
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
  <div className="h-screen w-screen flex items-center justify-center">
      <div className="profile-container fixed">
     
        {data && (
          <div className="profile-info">
            <img src="" alt="" className="profile-img" />
            <div>
              <Link to={`/food-partner/${id}`}>See Uploaded Videos--></Link>
  
              <h2 className="profile-name">{fp.name}</h2>
             
            
            </div>
          </div>
        )}

        <div className="overflow-y-auto flex flex-col   h-[450px]">
         

          <i className="text-2xl mt-10 font-bold ">Dishes</i>

      

      
       <div className="flex items-center justify-center flex-wrap gap-4 mt-10">
         {data.map((item)=>{
        return(
          <div className=" h-[40vh] shadow-2xl w-[40vw] md:w-[15vw] flex flex-col  items-center justify-center" key={item._id}>
            < Link  to={`/edit/dish/${item._id}`} className="px-4 py-2 rounded mt-2 " ><MdEdit/></Link>
            <img className="h-[25vh] w-[40vw] md:w-[15vw]" src={item.image} />
          
            
            <h1>{item.name}</h1>
            <h1>{item.description}</h1>
            <h1>{item.cost}</h1>
          </div>
        
        )
      })}
           </div>
          </div>
        </div></div>
  )}
      
   


export default Alldish
