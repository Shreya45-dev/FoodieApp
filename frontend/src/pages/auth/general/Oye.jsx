import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Oyee = () => {
    const[data,setdata]=useState([])
    const[latestdata,setlatestdata]=useState("")
    
    useEffect(() => {
    const allget=async()=>{
        try{
        const response=await axios.get('https://foodieappp.onrender.com/api/food/getorderfood',{
            withCredentials:true

        })
        console.log(response.data.message)
        
        setdata(response.data.orderss)
    }
    catch(err){
        console.log(err)
    }}

          console.log(data);
    const latestorder=async()=>{
      try{
        const res=await axios.get('https://foodieappp.onrender.com/api/food/latestorder',{
          withCredentials:true
        })
        setlatestdata(res.data.orderss)
      //  console.log(res.data.orderss)
      }
      catch(err){
        console.log(err)
      }
    }
    allget()
    latestorder()
    }, [])
    //console.log(data)
  return (
   
     
    <div className="h-screen w-screen   bg-blue-100 flex flex-col items-center justify-center">
   <i className="text-center w-screen bg-blue-100 font-2xl font-bold">All Orders</i>
      <div className="w-1/2 h-[600px] overflow-y-auto no-scroll">
         
      {data &&
  data.map(order => (
    <div key={order._id} className=" w-full border-b-2 border-b-black">

     
       <h1 className="text-center text-xl text-blue-800 font-semibold"> {order.foodpartner?.restaurantName} </h1>
      {order.items.map(item => (
        <div key={item._id} className="flex justify-between h-12 items-center ">
        
           <img className="h-10 w-10  m-5 object-cover rounded-xl overflow-hidden" src={item.foodId?.image}/>
          <i>{item.qty} {item.foodId?.name}</i></div>
        
          
      
      ))}
        <h1>Total:{order.total}</h1>
      <i className=" font-semibold bg-green-500">{order.status.toUpperCase()} </i>
     




    </div>
  ))
}



 
  
      </div>
        
      hello
    </div>
  )
}

export default Oyee
/*import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Oye = ({ foodPartnerId }) => {
  const [orders, setOrders] = useState([]);

  // Fetch initial orders
  useEffect(() => {
    const controller = new AbortController();

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/restaurant-orders",
          { withCredentials: true, signal: controller.signal }
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        if (!axios.isCancel(err)) console.log(err);
      }
    };

    fetchOrders();

    return () => controller.abort();
  }, []);

  // Socket.IO for live orders
  useEffect(() => {
    const socket = io("http://localhost:3000");

    // Join room for this food partner
    socket.emit("joinRestaurant", foodPartnerId);

    // Listen for new orders
    const handleNewOrder = (order) => {
      console.log("New order received:", order);
      setOrders((prev) => [order, ...prev]);
    };

    socket.on("newOrder", handleNewOrder);

    // Cleanup on unmount
    return () => {
      socket.off("newOrder", handleNewOrder);
      socket.disconnect();
    };
  }, [foodPartnerId]);

  return (
    <div className="h-screen w-screen bg-blue-100 flex items-center justify-center">
      <div className="w-1/2 h-[600px] overflow-y-auto no-scroll">
        {orders.length === 0 && <p>No orders yet</p>}

        {orders.map((order) => (
          <div key={order._id} className="w-full border-b-2 border-b-black">
            {order.items.map((item) => (
              <div
                key={item.foodId._id}
                className="flex justify-between h-12 items-center"
              >
                <img
                  className="h-10 w-10 m-5 object-cover rounded-xl overflow-hidden"
                  src={item.foodId?.image}
                  alt={item.foodId?.name}
                />
                <span>
                  {item.qty} x {item.foodId?.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Oye;*/
