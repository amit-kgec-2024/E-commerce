import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import Layout from "../layout/Layout";

const Orders = () => {
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
    <Layout>
      <div className="p-2 flex flex-col gap-4">
        {orders.map((ele, index) => (
          <OrderCard
            key={index}
            regNo={ele.regNo}
            title={ele.title}
            img={ele.img}
            orderDate={ele.orderDate}
            deliveryDate={ele.deliveryDate}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Orders;
