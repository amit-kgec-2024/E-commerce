import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Placeorder = () => {
  const { id } = useParams();
  // Current Data
  const currentedDate = new Date();
  const futureesDate = new Date(currentedDate);
  futureesDate.setDate(currentedDate.getDate());

  const optioned = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const currentfromDate = futureesDate.toLocaleDateString(undefined, optioned);
  // user Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  // Placeorder Get Request
  const [showOrder, setShowOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/buy/payment/placeorder/${user.id}`
        );
        const jsonOrder = await res.json();
        setShowOrder(jsonOrder);
      } catch (error) {}
    };
    fetchOrder();
  }, [user.id]);
  if (!showOrder) {
    return <div>Loading...</div>;
  }
  const orderdata = showOrder.find((w) => w.order.id === id);
  if (orderdata)
    return (
      <div>
        <div className="w-full bg-stone-200 h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-sm md:text-xl text-white px-6">
          Order Details
        </h1>
        <Link
          to={"/"}
          className="py1 px-3 bg-gray-600 text-white font-semibold mx-4"
        >
          Home
        </Link>
      </div>
        <div className="p-3">
          <h1 className="text-xs md:text-base">Order ID -{""}<span>{orderdata.order.id}</span></h1>
        </div>
        <div className="flex flex-row justify-around p-6 border-y-2">
          <div className="">
            <h1 className="font-bold text-sm md:text-base text-orange-500"><span>{orderdata.order.title}</span></h1>
            <h1 className="font-bold text-xs md:text-base">Size:{' '}<span className="font-semibold text-gray-500">{orderdata.order.size}</span></h1>
            <h1 className="font-bold text-xs md:text-base">Items:{' '}<span className="font-semibold text-gray-500">{orderdata.order.items}</span></h1>
            <h1 className="font-bold text-xs md:text-base">Prise:{' '} <span className="font-semibold text-gray-500">₹{orderdata.order.price}</span></h1>
            <h1 className="font-bold text-xs md:text-base">Payment Mode:{' '} <span className="font-semibold text-gray-500">{orderdata.order.payment}</span></h1>
          </div>
          <img src={orderdata.order.img} alt="Bird" className="w-[100px] md:w-[200px] h-[100px] md:h-[200px]"/>
        </div>
        <div className="p-6">
          <h1 className="flex flex-row items-center mb-4 gap-4"><IoIosCheckmarkCircle className='text-green-600'/><span className="text-xs md:text-base">Order Confromed,{' '}{orderdata.order.conformDate}</span></h1>
          <h1 className="flex flex-row items-center gap-4">{currentfromDate >= orderdata.order.deliveryDate ? <IoIosCheckmarkCircle className="text-green-600" /> : <IoIosCheckmarkCircle className="text-red-600" />}<span className="text-xs md:text-base">Deliverd, {orderdata.order.deliveryDate}</span></h1>
        </div>
        <div className="border-y-2 p-6">
          <label className="text-xs md:text-sm text-gray-400">Shipping Details</label>
          <div className="py-2 ">
            <h1 className="text-lg md:text-xl font-semibold mb-2">{orderdata.order.username}</h1>
            <h1 className="text-sm md:text-base">{orderdata.order.place}</h1>
            <h1 className="text-sm md:text-base">{orderdata.order.police},{' '}{orderdata.order.post}</h1>
            <h1 className="text-sm md:text-base">{orderdata.order.dist}{' '}District</h1>
            <h1 className="text-sm md:text-base">{orderdata.order.state}{' '}-{' '}{orderdata.order.pin}</h1>
            <h1 className="text-sm md:text-base">Phone number:{' '}{orderdata.order.mobil}</h1>
          </div>
        </div>
        <div className="p-6 border-b-2">
          <h1 className="text-xs md:text-sm text-gray-400 mb-2">Price Details</h1>
          <div className="flex flex-row justify-between mb-1">
            <h1 className="text-sm md:text-base">Selling price</h1>
            <h1 className="text-sm md:text-base">₹{orderdata.order.price}</h1>
          </div>
          <div className="flex flex-row justify-between mb-1">
            <h1 className="text-sm md:text-base text-green-600">Delivery</h1>
            <del className="text-sm md:text-base text-gray-400">₹40</del>
          </div>
          <div className="flex flex-row justify-between mb-1 border-dotted border-t-2">
            <h1 className="text-sm md:text-base">Total Amount</h1>
            <h1 className="text-sm md:text-base">{orderdata.order.price}</h1>
          </div>
        </div>
        <div className="px-6 py-3">
          <li className="text-xs md:text-sm">IndMart Wallet:<span>{' '}₹{orderdata.order.price}.0</span></li>
        </div>
      </div>
    );
};

export default Placeorder;
