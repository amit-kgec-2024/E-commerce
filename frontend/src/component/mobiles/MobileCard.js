import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileCard = ({ id, img, stars, title, price, discount, sale }) => {
  const orgPrice = Math.round(price - (price / 100) * discount);

  // post AddToCart.........................
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );

  const handelAddtoCart = async () => {
    const res = await fetch(
      "https://e-commerce-nu-seven.vercel.app/api/addToCart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: id,
        }),
      }
    );
    alert("Product Add To Cart!");
    if (res.status === 400) {
      alert("Alredy Add To Cart!");
    } else {
      await res.json();
    }
  };

  const deFaultImage = "amitphotos.jpg";
  return (
    <div className="border bg-teal-100 shadow-lg p-3 w-[230px] h-[350px] rounded flex flex-col cursor-pointer">
      <img
        src={img || deFaultImage}
        alt={title}
        className="mb-3 w-full h-[200px] shadow"
      />
      {sale === "true" && (
        <div className="uppercase border bg-green-700 bg-opacity-40 text-white text-xs font-semibold rounded p-1 inline-block absolute">
          sale!
        </div>
      )}
      <div className=" flex flex-row gap-6 justify-center mb-3 mt-[-63px]">
        <div className="bg-white p-2 text-xl shadow mt-3">
          <FaRegHeart />
        </div>
        <div
          className="bg-white p-2 text-xl shadow mt-3"
          onClick={handelAddtoCart}
        >
          <FaShoppingCart />
        </div>
      </div>
      <Link to={`/fashionDetails/${id}`}>
        <div className="flex gap-1 text-yellow-400 mb-2">
          {[1, 2, 3, 4, 5].map((ele) =>
            ele <= stars ? (
              <AiFillStar key={ele} />
            ) : (
              <AiOutlineStar key={ele} />
            )
          )}
        </div>
        <h1 className="font-bold text-xs text-gray-400 hover:text-gray-500">
          {title}
        </h1>
        <p className="text-blue-600 py-2 font-medium">{discount}% off</p>
        <p className="text-green-500 font-medium">
          ₹{orgPrice}.00{" "}
          <del className="text-xs text-gray-400 font-medium">₹{price}.00</del>
        </p>
      </Link>
    </div>
  );
};

export default MobileCard;
