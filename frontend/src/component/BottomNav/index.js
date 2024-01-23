import React, { useState, useEffect } from "react";
import { IoMdLocate } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import {
  FaRegHeart,
  FaShoppingCart,
  FaAddressBook,
} from "react-icons/fa";
import { SlNote } from "react-icons/sl";
import { Link } from "react-router-dom";

const BottomNav = () => {
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  // Get Request.................
  const [getAdd, setGetAdd] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/userprofileget/${user.id}`
        );
        const jsonData = await res.json();
        setGetAdd(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <div className="w-screen fixed bottom-0 md:hidden">
      <div className="bg-black flex flex-row p-3 text-white shadow justify-around items-center">
        <Link to={"/userDetail"}>
          {getAdd.map((ele, index) => (
            <div
              key={index}
              className="border w-[20px] sm:w-[30px] h-[20px] sm:h-[30px] overflow-hidden rounded-full"
            >
              <img
                src={ele.profile.img}
                alt="Bird"
                className="w-full"
                width={40}
                height={40}
              />
            </div>
          ))}
        </Link>
        <Link
          to={`/addToCart`}
          className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
        >
          <FaRegHeart className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/shopping"}
          className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
        >
          <FaShoppingCart className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/trackorder"}
          className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
        >
          <IoMdLocate className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/saveAddress"}
          className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
        >
          <FaAddressBook className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/reviews"}
          className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
        >
          <SlNote className="text-xl sm:text-2xl" />
        </Link>
        <Link
          to={"/sattings"}
          className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
        >
          <CiSettings className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
