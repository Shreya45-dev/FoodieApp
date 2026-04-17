import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Alldish = () => {
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Alldish = () => {
    const fp=useSelector((state)=>state.fpartner.fp)
  
    const id=fp._id
  
    const [data, setdata] = useState(second)
    useEffect(() => {
 const find=async()=>{
  try{
   const res=await axios.get("https://foodieappp.onrender.com/api/food/alldish")
      setdata(res.data.dish)
    }
    catch(err){
      console.log(err);
    }
  }
 find()
  
}, [])



  return (
    <div>
     {data.map((item)=>{
        return(
          <div>
            <img className="h-20 w-20" src={item.image} />
            <h1>{item.name}</h1>
            <h1>{item.description}</h1>
            <h1>{item.cost}</h1>
          </div>
        
        )
      })}
      
        
      
    </div>
  )
}

export default Alldish}
