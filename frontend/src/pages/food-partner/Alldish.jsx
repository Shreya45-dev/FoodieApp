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
    const fp = useSelector((state) => state.fp);
  //  const [data, setdata] = useState(second)
//useEffect(() => {
//  const find=async()=>{
  //   await axios.get("https://foodieappp.onrender.com/api/food-partner/${id}")
    
///  }

  
//}, [])import { useSelector } from "react-redux";



  return (
    <div>
        {fp?.alldishes?.map((d)=>(
            <div key={d._id}>
                <h3>{d.name}</h3>
                <p>{d.description}</p>
                <p>Price: ${d.price}</p>
            </div>

        ))}
      
    </div>
  )
}

export default Alldish}
