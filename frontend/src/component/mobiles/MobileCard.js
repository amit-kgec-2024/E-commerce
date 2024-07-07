import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileCard = ({ id, img, stars, title, price, discount, sale }) => {
  const orgPrice = Math.round(price - (price / 100) * discount);

  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const userId = user.id;
  const [isHeart, setIsHeart] = useState(false);

  const fetchAllData = useCallback(
    async (userId) => {
      try {
        const addCartRes = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/addToCart/${userId}`
        );

        const addCartJsonData = await addCartRes.json();
        setIsHeart(addCartJsonData.some((item) => item.productId === id)); // Check if the product is in the cart
        console.log(addCartJsonData);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchAllData(userId);
  }, [fetchAllData, userId]);

  const handelAddtoCart = async () => {
    setIsHeart(true);
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

    if (res.status === 400) {
      setIsHeart(true); 
    } else {
      await res.json();
      fetchAllData(userId);
      setIsHeart(true);
    }
  };
  // Removed products............................
  const handelRemove = async (id) => {
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/removeHeart/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchAllData(userId);
      setIsHeart(false);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-3 w-[15%] rounded flex flex-col cursor-pointer">
      {!isHeart && (
        <button
          onClick={handelAddtoCart}
          className="text-slate-300 text-xl absolute"
        >
          <FaHeart />
        </button>
      )}
      {isHeart && (
        <button
          onClick={()=> handelRemove(id)}
          className="text-red-300 text-xl absolute"
        >
          <FaHeart />
        </button>
      )}
      <Link
        to={`/product/${id}`}
        className="text-slate-400 hover:text-blue-400"
      >
        <img src={img} alt={title} className="mb-3 w-full h-[200px]" />
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
