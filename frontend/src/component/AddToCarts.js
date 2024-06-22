import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdElectricBolt } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const AddToCarts = () => {
  // get Request AddtoCart.............
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const [addCartGet, setAddCartGet] = useState([]);
  const userId = user.id;;
  useEffect(() => {
    fetchAllData(userId);
  }, [userId]);
  const fetchAllData = async (userId) => {
    try {
      const addCartRes = await fetch(
        `http://localhost:4000/api/addToCart/${userId}`
      );

      const addCartJsonData = await addCartRes.json();

      setAddCartGet(addCartJsonData);
      console.log(addCartJsonData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  // Removed products............................
  const handelRemove = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/removeCart/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
        fetchAllData(userId);
    } catch (error) {
      console.error(error);
    }
  };
  // Date..........................
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
    <div className="w-full h-screen">
      <div className="flex flex-wrap gap-4 justify-center items-center p-10">
        {addCartGet.map((e, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-around gap-3 border w-full rounded shadow"
          >
            <div className="w-32">
              <img src={e.img} alt={e.title} width={200} height={200} />
            </div>
            <div className="p-4">
              <h1 className="text-xs mb-2">{e.title}</h1>
              <div className="flex flex-row text-sm mb-2 text-green-700">
                {[1, 2, 3, 4, 5].map((ele) =>
                  ele <= e.stars ? (
                    <AiFillStar key={ele} />
                  ) : (
                    <AiOutlineStar key={ele} />
                  )
                )}
              </div>
              <h1 className="text-xs mb-2 text-blue-700">{e.discount}% OFF</h1>
              <div className="flex flex-row text-sm mb-2 gap-1">
                <span className="">
                  ₹{Math.round(e.price - (e.price / 100) * e.discount)}
                </span>{" "}
                <del className="text-gray-500">₹{e.price}</del>
              </div>
            </div>
            <div className="flex flex-col text-sm mb-2 gap-1">
              <span>Delivery by {formattedDate} </span>{" "}
              <del className="text-gray-400">₹40</del>{" "}
              <span className="text-green-500">FREE Delivery</span>
            </div>
            <div className="flex flex-row text-sm text-white gap-2">
              <button
                onClick={() => handelRemove(e.id)}
                className="flex flex-row gap-2 items-center border py-1 px-3 shadow bg-teal-500 hover:bg-teal-600"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>
              <Link
                to={`/mobilesDetails/${e.id}`}
                className="flex flex-row gap-2 items-center border py-1 px-3 shadow bg-cyan-400 hover:bg-cyan-500"
              >
                <MdElectricBolt />
                <span>Buy this now</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-sm font-light text-center py-3">
        No more Add To Cart
      </h1>
    </div>
  );
};

export default AddToCarts;
