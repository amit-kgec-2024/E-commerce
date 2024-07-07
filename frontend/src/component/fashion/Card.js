import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Card = ({ id, img, stars, title, price, discount, sale }) => {
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
    <Link to={`/product/${id}`} className="border text-xs bg-teal-100 shadow-lg p-2 w-[150px] h-[250px] rounded flex flex-col justify-around cursor-pointer">
      <div
        className="w-full h-[65%] text-end bg-opacity-95"
        style={{
          backgroundImage: `url(${img || deFaultImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {sale === "true" && (
          <div className="uppercase border bg-red-700 bg-opacity-70 text-white text-xs font-semibold rounded px-3 py-0.5 inline-block">
            sale!
          </div>
        )}
        <div className=" flex flex-col items-end justify-end gap-2 my-4 w-full">
          <div className="text-slate-100 pr-1 text-xl">
            <FaRegHeart />
          </div>
          <div
            className="text-slate-100 pr-1 text-xl"
            onClick={handelAddtoCart}
          >
            <FaShoppingCart />
          </div>
        </div>
      </div>
      {/* <Link to={`/fashionDetails/${id}`}> */}
      <div className="flex gap-1 text-yellow-400">
        {[1, 2, 3, 4, 5].map((ele) =>
          ele <= stars ? <AiFillStar key={ele} /> : <AiOutlineStar key={ele} />
        )}
      </div>
      <h1 className="font-semibold text-xs text-gray-400 hover:text-gray-500 truncate">
        {title}
      </h1>
      <p className="text-blue-600 py-2 font-medium text-sm">{discount}% off</p>
      <p className="text-green-500 font-medium">
        ₹{orgPrice}.00{" "}
        <del className="text-xs text-gray-400 font-light">₹{price}.00</del>
      </p>
      {/* </Link> */}
    </Link>
  );
};

export default Card;
