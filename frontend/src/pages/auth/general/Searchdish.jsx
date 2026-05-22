import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Searchdish = () => {

  const [search, setsearch] = useState("")
  const [searchdata, setsearchdata] = useState([])
  const [data, setdata] = useState("")

  useEffect(() => {
    const finaallrestaurant = async () => {
      try {
        const response = await axios.get(
          "https://foodieappp.onrender.com/api/food-partner/alldishwithrestaurant",
          { withCredentials: true }
        )

        console.log(response.data.dish)
        setdata(response.data.dish)

      }
      catch (err) {
        console.log("error")
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.log("Headers:", err.response?.headers);
        console.log("Config:", err.config);
      }
    }

    finaallrestaurant()
  }, [])



  const handleSearch = (e) => {
    const value = e.target.value;
    setsearch(value);

    const q = value.trim().toLowerCase();

    const searching = data.filter((item) =>
      item.name.toLowerCase().includes(q)
    );

    setsearchdata(searching);
  };


  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-5 md:px-8 py-5">

      {/* Search Input */}
      <div className="w-full flex justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search dishes..."
          className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] p-3 border rounded-lg shadow focus:ring-2 focus:ring-red-400 outline-none text-sm sm:text-base"
        />
      </div>


      {/* Dish Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">

        {searchdata && searchdata.map((dish, index) => {
          return (

            <Link
              to={`/food-partner/restaurantdish/${dish.foodPartner._id}`}
              key={index}
              className="w-full flex justify-center"
            >

              <div className='w-full max-w-[280px] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300'>

                {/* Image */}
                <img
                  className="h-48 sm:h-52 w-full object-cover"
                  src={dish.image}
                  alt={dish.name}
                />

                {/* Content */}
                <div className="p-4">

                  <h1 className="font-bold text-lg text-gray-800 truncate">
                    {dish.name}
                  </h1>

                  <h1 className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {dish.description}
                  </h1>

                  <i className="block text-green-700 font-semibold mt-3 text-sm sm:text-base">
                    {dish.foodPartner.restaurantName}
                  </i>

                  <h1 className="text-red-500 text-sm mt-1 line-clamp-1">
                    {dish.foodPartner.Address}
                  </h1>

                  <h1 className="font-bold text-gray-700 mt-1 text-sm sm:text-base">
                    {dish.foodPartner.City}
                  </h1>

                </div>
              </div>

            </Link>
          )
        })}

      </div>

    </div>
  )
}

export default Searchdish