 
 /*import React, { useEffect, useState } from 'react';
 import "./pro.css";
 import { Link, useParams } from 'react-router-dom';
 import axios from 'axios'
 import Showfpss from './Showfpss'
//const FoodPartnerpage = () => {

  /* const { id } = useParams();
   const [data, setdata] = useState(null);
   const [videos, setVideos] = useState([]);
   const [loading, setLoading] = useState(true);
   const [order,setorder]=useState([])
   const flag=true;
  
  useEffect(()=>{
    
  const fetchDish=async()=>{
      try{
        const response=await axios.get(`https://foodieappp.onrender.com/api/food-partner/dish/${id}`,
          {withCredentials:true}
        )
        setdata(response.data.dish)
        console.log(response.data.message)
        console.log(response.data.dish)
      //  console.log("hello")
      }
      catch(err){
        console.log(err)
      }
    }
     fetchDish()
    
    },[])
   /* useEffect(()=>{
     
      const fetchorder=async()=>{
        try{
        const response=await axios.get(`https://foodieappp.onrender.com/api/food/restaurant-orders/${id}`,
        {withCredentials:true}
        )
        setorder(response.data.orders)
        console.log(response.data.orders)
      }
      catch(err){
        console.log("error");
        console.log(err)
      }}

      fetchorder()
    },[])
    useEffect(() => {
      const updateStatus = async (orderId, status) => {
  try {
    await axios.put(
      `https://foodieappp.onrender.com/api/order/${orderId}`,
      { status },
      { withCredentials: true }
    );

    // 🔥 refresh orders
    const res = await axios.get(
      `https://foodieappp.onrender.com/api/food/restaurant-orders/${id}`,
      { withCredentials: true }
    );

    setorder(res.data.orders);

  } catch (err) {
    console.log(err);
  }}
  updateStatus();
},[]);
 
  
 
   return (
    <div className="h-screen w-screen flex items-center justify-center">

    <div className="profile-container fixed">
       {data && (
         <div className="profile-info ">
           <img
             src=""
             alt={data.name}
             className="profile-img"
           />
          
           <div>
             <Link to={`/food-partner/${data._id}`} >See Uploaded Videos--></Link>
             <h2 className="profile-name">{data.name}</h2>
           <Link className="block text-red-800" to="/restaurantcreatewithfood">Upload Dishes </Link>
           <Link className="text-green-800" to={`/create-food`} >Upload Videos/Reels</Link>
           
           </div>
         </div>
       )}
       
    
       <div className="overflow-y-auto flex items-center justify-center flex-wrap h-[450px] ">
       {data && data.alldishes.map((dish)=>{
        return(
          
          <div className="h-48 w-48">
          <img className="h-40 w-40 rounded-xl overflow-hidden object-cover"src={dish.image}/>
          </div>
          
        )
       })
      }
        <h1>order</h1>
      <div className="overflow-y-auto flex flex-col flex-wrap items-center justify-center  h-[450px] ">
    {order && order.map((order)=>{
      return(
        <div key={order._id} className="h-60 w-full border-2 border-black m-2 p-2">
          <h1>{order.customerName.fullName}</h1>
          <h3>Order ID: {order._id}</h3>
          <p>Total: {order.total}</p>
          hi
          <p>Address: {order.address}</p>
         // <h1>order.foodId</h1>
            {order.items.map((item) => (
                <div
                Hello
                  key={item.foodId._id}
                  className="flex justify-between h-12 items-center"
                >
                  <img
                    className="h-10 w-10 m-5 object-cover rounded-xl overflow-hidden"
                    src={item.foodId?.image}
                    alt={item.foodId?.name}
                  />
                  <i>
                    {item.qty} x {item.foodId?.name}
                  </i>
                  <p className="font-semibold text-blue-600">
  Status: {order.status}
  <button onClick={() => updateStatus(order._id, "preparing")}>
  Preparing
</button>

<button onClick={() => updateStatus(order._id, "delivered")}>
  Delivered
</button>
</p>
                </div>
              ))}
        </div>
      )
    })}
    <Showfpss foodPartnerId={id} /> 
    
    </div>
       </div>
 
 
         </div>
         
         </div>
      
   );
 };
 


export default FoodPartnerpage;
*/

import React, { useEffect, useState } from "react";
import "./pro.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Showfpss from "./Showfpss";

const FoodPartnerpage = () => {
  const { id } = useParams();
  const [data, setdata] = useState(null);
  const [order, setorder] = useState([]);

  // 🔹 Fetch dishes (Food Partner data)
  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(
          `https://foodieappp.onrender.com/api/food-partner/dish/${id}`,
          { withCredentials: true }
        );
        setdata(response.data.dish);
        console.log(response.data.dish);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDish();
  }, [id]);

  // 🔹 Fetch orders
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `https://foodieappp.onrender.com/api/food/restaurant-orders/${id}`,
          { withCredentials: true }
        );
        setorder(res.data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [id]);

  // 🔹 Update order status
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `https://foodieappp.onrender.com/api/food/api/order/${orderId}`,
        { status },
        { withCredentials: true }
      );
      

      // Refresh orders
      const res = await axios.get(
        `https://foodieappp.onrender.com/api/food/restaurant-orders/${id}`,
        { withCredentials: true }
      );
      setorder(res.data.orders);
      console.log(orderId)
    } catch (err) {
      console.log(err);
    }
  };

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
         

          <i className="text-2xl mt-10 font-bold ">Orders</i>

      

            {order &&
  order.map((orderItem) => (
    <div
      key={orderItem?._id}
      className="h-auto w-full border-2 border-black m-2 p-2 rounded-lg"
    >
     

      <h1 className="font-semibold">{orderItem?.customerName.fullName}</h1>
      <h3>Order ID: {orderItem?._id}</h3>
      <p>Total: {orderItem?.total.toFixed(2)}</p>
      <p>Address: {orderItem?.address || "No address provided"}</p>
      <h1 className="font-semibold">PhoneNumber:{orderItem?.customerName?.phonenumber}</h1>
      
      <div className="flex items-center gap-2 mt-2">
        <p className="font-semibold text-blue-600">
          Status: {orderItem?.status.toUpperCase()}/
        </p>

       
        {orderItem?.status !== "delivered" && (
          <>
            <button
              onClick={() => updateStatus(orderItem?._id, "preparing")}
              
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Preparing
            </button>

            <button
              onClick={() => updateStatus(orderItem?._id, "delivered")}
              className="bg-green-600 text-white px-2 py-1 rounded"
            >
              Delivered
            </button>
          </>
        )}
      </div>

     
      <div className="mt-2">
        {orderItem.items.map((item) => (
          <div
            key={item.foodId._id}
            className="flex justify-between h-12 items-center"
          >
            <img
              className="h-10 w-10 m-5 object-cover rounded-xl overflow-hidden"
              src={item.foodId?.image}
              alt={item.foodId?.name}
            />
            <i>
              {item.qty} x {item.foodId?.name}
            </i>
          </div>
        ))}
      </div>
    </div>
  ))}
           
          </div>
        </div>
      </div>
   
  );
};



export default FoodPartnerpage;


/*
          {data &&
            data.alldishes.map((dish) => (
              <div key={dish._id} className="h-48 w-48">
                <img
                  className="h-40 w-40 rounded-xl overflow-hidden object-cover"
                  src={dish.image}
                  alt={dish.name}
                />
              </div>
            ))}
            */
