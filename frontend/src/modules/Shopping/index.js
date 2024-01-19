import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Shopping = () => {
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
  return (
    <div>
      <div className="w-full bg-stone-200 h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-sm md:text-xl text-white px-6">
          Shoppings
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
              className="flex flex-wrap py-6 gap-6 border justify-center"
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
            </Link>
          );
        })}
      </div>
        <h1 className="font-light text-center text-xs md:text-base">No more orders</h1>
    </div>
  );
};

export default Shopping;
