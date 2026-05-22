import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Searchdish = () => {
  const [search, setsearch] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const finaallrestaurant = async () => {
      try {
        const response = await axios.get(
          "https://foodieappp.onrender.com/api/food-partner/alldishwithrestaurant",
          { withCredentials: true }
        );

        setdata(response.data.dish);
        setsearchdata(response.data.dish);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    };

    finaallrestaurant();
  }, []);

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
    <div className="min-h-screen bg-gray-100 px-3 sm:px-5 md:px-10 py-6">
      
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-red-500 mb-6">
        Search Dishes 🍔
      </h1>

      {/* Search Input */}
      <div className="w-full max-w-3xl mx-auto mb-8">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search dishes..."
          className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-red-400 outline-none text-sm sm:text-base"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center text-lg sm:text-xl font-semibold">
          Loading...
        </div>
      ) : (
        <>
          {/* No Data */}
          {searchdata.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No dishes found 😔
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
              
              {searchdata.map((dish, index) => {
                return (
                  <Link
                    key={index}
                    to={`/food-partner/restaurantdish/${dish.foodPartner._id}`}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                      {/* Image */}
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-44 sm:h-48 md:h-52 object-cover"
                      />

                      {/* Content */}
                      <div className="p-4">
                        <h1 className="font-bold text-lg sm:text-xl text-gray-800 truncate">
                          {dish.name}
                        </h1>

                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                          {dish.description}
                        </p>

                        <div className="mt-4 space-y-1">
                          <h2 className="text-green-700 font-semibold text-sm sm:text-base">
                            {dish.foodPartner.restaurantName}
                          </h2>

                          <p className="text-red-500 text-xs sm:text-sm">
                            {dish.foodPartner.Address}
                          </p>

                          <p className="text-gray-700 font-medium text-sm">
                            {dish.foodPartner.City}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}

            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Searchdish;