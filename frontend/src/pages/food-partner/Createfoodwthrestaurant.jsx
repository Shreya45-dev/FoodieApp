/*import axios from 'axios'
import React, { useState } from 'react'

const Createfoodwthrestaurant = () => {
    
    const [name, setName] = useState('')
    const[image,setimage]= useState('')
    const[cost,setcost]= useState('')
    const[description,setDescription]=useState('')
    const filechangehandler=async(e)=>{
    const file=e.target.files?.[0]
    if(file){
       
      
        setimage(file)
    }


}
    const submithandler=async(e)=>{
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image)
  formData.append("cost", cost)
        e.preventDefault()
         try{
            const response=await axios.post("http://localhost:3000/api/food-partner/createrestaurantdish",
              formData,
             
              {
                    withCredentials:true,
                     headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            console.log(response.data.message)
         }
         catch(err){
            console.log(err)
         }
    }
  return (  
    <div>
        <form onSubmit={submithandler}>
            <input type="file" placeholder="image"  onChange={filechangehandler}/>
            <input type='text' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type='text' placeholder='description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
             <input type='text' placeholder='cost' value={cost} onChange={(e)=>setcost(e.target.value)}/>
            <button type='submit'>Create Dish with Restaurant</button>
        </form>

      
    </div>
  )
}

export default Createfoodwthrestaurant*/














import axios from 'axios'
import React, { useState } from 'react'

const Createfoodwthrestaurant = () => {
    const [name, setName] = useState('')
    const [image, setimage] = useState('')
    const [cost, setcost] = useState('')
    const [description, setDescription] = useState('')

    const filechangehandler = async (e) => {
        const file = e.target.files?.[0]
        if (file) setimage(file)
    }

    const submithandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("image", image)
        formData.append("cost", cost)
        try {
            const response = await axios.post(
                "http://localhost:3000/api/food-partner/createrestaurantdish",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                }
            )
            console.log(response.data.message)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            
            <div className="bg-white/80 backdrop-blur-lg h-[340px] rounded-2xl shadow-2xl w-[400px] p-8">
                
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    🍽️ Create Dish
                </h1>

                <form onSubmit={submithandler} className="flex flex-col gap-4">

                    {/* Image */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Dish Image</label>
                        <input
                            type="file"
                            onChange={filechangehandler}
                            className="w-full p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

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
                        Create Dish
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Createfoodwthrestaurant