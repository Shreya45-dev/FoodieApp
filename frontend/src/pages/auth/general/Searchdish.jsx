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
        console.log("error");
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
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
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
        Search Your Favorite Dish 🍕
      </h1>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search dishes..."
          className="w-full p-4 rounded-2xl border border-gray-300 shadow-md focus:ring-2 focus:ring-red-400 outline-none bg-white"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center text-xl font-semibold text-gray-600">
          Loading dishes...
        </div>
      ) : (
        <>
          {/* Empty State */}
          {searchdata.length === 0 ? (
            <div className="text-center text-gray-500 text-xl">
              No dishes found 😔
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {searchdata.map((dish, index) => {
                return (
                  <Link
                    to={`/food-partner/restaurantdish/${dish.foodPartner._id}`}
                    key={index}
                  >
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">

                      {/* Image */}
                      <img
                        className="h-52 w-full object-cover"
                        src={dish.image}
                        alt={dish.name}
                      />

                      {/* Content */}
                      <div className="p-4">
                        <h1 className="text-xl font-bold text-gray-800">
                          {dish.name}
                        </h1>

                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                          {dish.description}
                        </p>

                        <div className="mt-4">
                          <h2 className="text-green-700 font-semibold">
                            {dish.foodPartner.restaurantName}
                          </h2>

                          <p className="text-red-500 text-sm">
                            {dish.foodPartner.Address}
                          </p>

                          <p className="text-gray-700 font-medium">
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