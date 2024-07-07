import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdElectricBolt } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuLoader2 } from "react-icons/lu";

const CartCard = ({
  id,
  category,
  discount,
  models,
  img,
  price,
  sale,
  stars,
  title,
  productId,
  userId,
  fetchAllData,
}) => {
  // Removed products............................
  const [isLoader, setIsLoader] = useState(false);
  const handelRemove = async (id) => {
    setIsLoader(true);
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/removeCart/${id}`,
        {
          method: "DELETE",
        }
      );
      setIsLoader(false);
      fetchAllData(userId);
      if (!response) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Dat.........................
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 6);

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = futureDate.toLocaleDateString(undefined, options);
  return (
    <div className="flex flex-row items-center justify-around gap-3 border w-full rounded shadow">
      <div className="w-32">
        <img src={img} alt={title} width={200} height={200} />
      </div>
      <div className="p-4">
        <h1 className="text-xs mb-2">{title}</h1>
        <div className="flex flex-row text-sm mb-2 text-green-700">
          {[1, 2, 3, 4, 5].map((ele) =>
            ele <= stars ? (
              <AiFillStar key={ele} />
            ) : (
              <AiOutlineStar key={ele} />
            )
          )}
        </div>
        <h1 className="text-xs mb-2 text-blue-700">{discount}% OFF</h1>
        <div className="flex flex-row text-sm mb-2 gap-1">
          <span className="">
            ₹{Math.round(price - (price / 100) * discount)}
          </span>{" "}
          <del className="text-gray-500">₹{price}</del>
        </div>
      </div>
      <div className="flex flex-col text-sm mb-2 gap-1">
        <span>Delivery by {formattedDate} </span>{" "}
        <del className="text-gray-400">₹40</del>{" "}
        <span className="text-green-500">FREE Delivery</span>
      </div>
      <div className="flex flex-row text-sm text-white gap-2">
        <button
          onClick={() => handelRemove(id)}
          className="flex flex-row gap-2 items-center border py-1 px-3 shadow bg-teal-500 hover:bg-teal-600"
        >
          {!isLoader && <RiDeleteBin6Line />}
          {isLoader && (
            <LuLoader2 className="loader rounded-full border-solid animate-spin" />
          )}
        </button>
        <Link
          to={`/product/${productId}`}
          className="flex flex-row gap-2 items-center border py-1 px-3 shadow bg-cyan-400 hover:bg-cyan-500"
        >
          <MdElectricBolt className="text-orange-200" />
          <span>Buy</span>
        </Link>
      </div>
    </div>
  );
};

export default CartCard;
