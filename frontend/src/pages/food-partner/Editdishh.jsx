import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Editdishh = () => {
    
    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const[cost,setcost]=useState('')
    
     const {id}=useParams()
     useEffect(()=>{
        const update=async()=>{
        try{
            const response=await axios.get(`https://foodieappp.onrender.com/api/food/particulardish/${id}`,{withCredentials:true})
            setName(response.data.particulardish.name)
            setDescription(response.data.particulardish.description)
            setcost(response.data.particulardish.cost)
        }
        catch(err){
            console.log(err)
        }}
        update()
     },[id])
     
     const submithandler=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.put(`https://foodieappp.onrender.com/api/food/edit/dish/${id}`,{
                name:name,
                description:description,
                cost:cost},{withCredentials:true})
                alert('dish updated successfully')
                console.log(response.data.message)
            
        }
        catch(err){
            console.log(err)
        }
     }
        
  return (
   

    
    <div>
      
       <form onSubmit={submithandler} className="flex flex-col gap-4">

                   
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Dish Name</label>
                        <input
                            type="text"
                            placeholder="Enter dish name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Description</label>
                        <input
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    {/* Cost */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Cost</label>
                        <input
                            type="text"
                            placeholder="Enter cost"
                            value={cost}
                            onChange={(e) => setcost(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 font-bold transition mt-2"
                    >
                        Update Dish
                    </button>
                </form>
    </div>
  )
}

export default Editdishh
