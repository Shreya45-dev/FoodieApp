import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Alldish = () => {

    const fp=useSelector((state)=>state.fp)
    const id=fp._id

   
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
              <Link to={`/food-partner/${data._id}`}>See Uploaded Videos--></Link>
  
              <h2 className="profile-name">{data.name}</h2>
              <Link className="block text-red-800" to="/restaurantcreatewithfood">
                Upload Dishes
              </Link>
              <Link className="text-green-800" to={`/create-food`}>
                Upload Videos/Reels
              </Link>
            </div>
          </div>
        )}

        <div className="overflow-y-auto flex items-center justify-center flex-wrap h-[450px]">
         

          <i className="text-2xl mt-10 font-bold ">Dishes</i>

      

      
       <div className="flex items-center justify-center flex-wrap gap-4 mt-10">
         {data.map((item)=>{
        return(
          <div className=" h-[25vh] shadow-2xl w-[10vw] flex flex-col  items-center justify-center" key={item._id}>
            <img className="h-[15vh] w-[10vw]" src={item.image} />
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
