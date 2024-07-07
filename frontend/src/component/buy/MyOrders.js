import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

const MyOrders = () => {
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const userId = user.id;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/my/order/${userId}`
        );
        const jsonData = await response.json();
        setOrders(jsonData);
      } catch (err) {
        console.log(err.message || "Something went wrong");
      }
    };

    fetchOrders();
  }, [userId]);
  return (
    <div>
      <div className="p-2 flex flex-col gap-4">
        {orders.map((ele, index) => (
          <OrderCard
            key={index}
            id={ele._id}
            title={ele.title}
            img={ele.img}
            orderDate={ele.orderDate}
            deliveryDate={ele.deliveryDate}
          />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
