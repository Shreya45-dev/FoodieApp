/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// Connect to backend socket
const socket = io("https://foodieappp.onrender.com", { withCredentials: true });

const Showfpss = ({ foodPartnerId }) => {
  const [orders, setOrders] = useState([]);

  // 1️⃣ Fetch missed/existing orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://foodieappp.onrender.com/api/food/restaurant-orders/${foodPartnerId}`,
          { withCredentials: true }
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        console.log("Error fetching orders:", err);
        
      }
    };
    fetchOrders();
  }, []);

  // 2️⃣ Setup Socket.IO for live orders
  useEffect(() => {
    if (!foodPartnerId) return;

    // Join room for this food partner
    socket.emit("joinRestaurant", foodPartnerId);

    // Listen for new orders
    socket.on("newOrder", (order) => {
      console.log("New order received:", order);
      setOrders((prev) => [order, ...prev]); // Add new order on top
    });

    // Cleanup on unmount
    return () => {
      socket.off("newOrder");
    };
  }, [foodPartnerId]);

  return (
    <div className="h-screen  w-screen bg-blue-100 flex items-center justify-center">
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
                <i>
                  {item.qty} x {item.foodId?.name}
                </i>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Showfpss;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Showfpss = ({ foodPartnerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!foodPartnerId) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://foodieapp-ve9r.onrender.com/api/food/restaurant-orders/${foodPartnerId}`,
          { withCredentials: true }
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [foodPartnerId]);

  useEffect(() => {
    if (!foodPartnerId) return;

    const socket = io("https://foodieapp-ve9r.onrender.com", {
      withCredentials: true,
      transports: ["websocket"], // optional, but stability ke liye
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("joinRestaurant", foodPartnerId);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err);
    });

    socket.on("newOrder", (order) => {
      console.log("New order received:", order);
      setOrders((prev) => [order, ...prev]);
    });

    return () => {
      socket.emit("leaveRestaurant", foodPartnerId);
      socket.off("newOrder");
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [foodPartnerId]);

  return (
    <div className="h-screen w-screen bg-blue-100 flex items-center justify-center">
      <div className="w-1/2 h-[600px] overflow-y-auto no-scroll">
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => (
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
                  <i>
                    {item.qty} x {item.foodId?.name}
                  </i>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Showfpss;
