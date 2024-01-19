import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
  TbSquareRoundedCheckFilled,
} from "react-icons/tb";

const TrackOrder = () => {
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const [showOrder, setShowOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/buy/payment/placeorder/${user.id}`
        );
        const jsonOrder = await res.json();
        setShowOrder(jsonOrder);
      } catch (error) {}
    };
    fetchOrder();
  }, [user.id]);
  // console.log(showOrder);
  const currentedDate = new Date();
  const futureesDate = new Date(currentedDate);
  futureesDate.setDate(currentedDate.getDate());
  const futurTwoDate = new Date(currentedDate);
  futurTwoDate.setDate(currentedDate.getDate() + 2);

  const optioned = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const currentfromDate = futureesDate.toLocaleDateString(undefined, optioned);
  const currentTwofromDate = futurTwoDate.toLocaleDateString(
    undefined,
    optioned
  );
  return (
    <div>
      <div className="w-full bg-stone-200 h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-sm md:text-xl text-white px-6">
          Track Orders
        </h1>
        <Link
          to={"/"}
          className="py1 px-3 bg-gray-600 text-white font-semibold mx-4"
        >
          Home
        </Link>
      </div>
      <div className="flex flex-col justify-center mt-2">
        {showOrder.map((ele, index) => {
          return (
            <Link
              to={`/placeorder/${ele.order.id}`}
              className="flex flex-wrap py-6 gap-10 border justify-center"
              key={index}
            >
              <img
                src={ele.order.img}
                alt="Bird"
                className="w-[100px] md:w-[200px] h-[100px] md:h-[200px]"
              />
              <div className="">
                <h1 className="font-bold text-sm md:text-base text-emerald-800">
                  <span>{ele.order.title}</span>
                </h1>
                <h1 className="font-bold text-sm md:text-base">
                  Price:{" "}
                  <span className="font-semibold text-gray-700">
                    {ele.order.price}
                  </span>
                </h1>
                <h1 className="font-bold text-sm md:text-base">
                  Size:{" "}
                  <span className="font-semibold text-gray-700">
                    {ele.order.size}
                  </span>
                </h1>
                <h1 className="font-bold text-sm md:text-base">
                  Items:{" "}
                  <span className="font-semibold text-gray-700">
                    {ele.order.items}
                  </span>
                </h1>
                <h1 className="font-bold text-sm md:text-base">
                  Date:{" "}
                  <span className="font-semibold text-green-700">
                    {ele.order.conformDate}
                  </span>
                </h1>
              </div>
              <div className="flex flex-col">
                <h1>{currentfromDate}</h1>
                <h1>{currentTwofromDate}</h1>
                <div className="mb-6 flex items-center gap-6">
                    <TbSquareRoundedNumber1Filled className="text-green-500" />
                  <span>{ele.order.title} is Confirmed Order</span>
                </div>
                <div className="mb-6 flex items-center gap-6">
                  { currentTwofromDate <= currentfromDate ? (<TbSquareRoundedNumber2Filled className='text-red-500'/>):
                  (<TbSquareRoundedNumber2Filled className='text-green-500'/>)}
                  <span>Shipped {ele.order.state}</span>
                </div>
                <div className="mb-6 flex items-center gap-6">
                  <TbSquareRoundedNumber3Filled />
                  <span>{ele.order.dist} Branch Received</span>
                </div>
                <div className="mb-6 flex items-center gap-6">
                  <TbSquareRoundedNumber4Filled />
                  <span>Will be deliverd tomorrow</span>
                </div>
                <div className="mb-6 flex items-center gap-6">
                  <TbSquareRoundedCheckFilled />
                  <span>Delivered</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <h1 className="font-light text-center text-xs md:text-base">
        No more orders
      </h1>
    </div>
  );
};

export default TrackOrder;
