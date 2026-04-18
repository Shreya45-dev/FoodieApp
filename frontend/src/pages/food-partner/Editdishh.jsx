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
   

    
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">

        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Edit Dish
        </h2>

        <form onSubmit={submithandler} className="flex flex-col gap-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Dish Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Cost */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Cost (₹)
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setcost(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition duration-200"
          >
            Update Dish
          </button>

        </form>
      </div>
    </div>
  )
}

export default Editdishh
