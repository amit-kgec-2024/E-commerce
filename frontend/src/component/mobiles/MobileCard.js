import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
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
    <div className="p-3 w-[15%] rounded flex flex-col cursor-pointer">
      <button
        onClick={handelAddtoCart}
        className="text-slate-300 text-xl absolute"
      >
        <FaHeart />
      </button>
      <Link to={`/mobilesDetails/${id}`} className="text-slate-400 hover:text-blue-400">
        <img
          src={img || deFaultImage}
          alt={title}
          className="mb-3 w-full h-[200px]"
        />
        <h1 className="font-bold text-xs">{title}</h1>
      </Link>
      <div className="flex gap-1 text-yellow-400 py-1">
        {[1, 2, 3, 4, 5].map((ele) =>
          ele <= stars ? <AiFillStar key={ele} /> : <AiOutlineStar key={ele} />
        )}
      </div>
      <div className="flex flex-row gap-2">
        <p className="font-medium">
          ₹{orgPrice}{" "}
          <del className="text-xs text-gray-400 font-medium">₹{price}</del>
        </p>
        <p className="text-green-500 font-medium">{discount}% off</p>
      </div>
    </div>
  );
};

export default MobileCard;
