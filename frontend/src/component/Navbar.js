import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import Control from "../modules/Control";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  // Customize and Control
  const [controlBox, setControlBox] = useState(false);
  const togleControl = () => {
    setControlBox(!controlBox);
  };
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
    <div className="w-full sticky z-50 top-0 px-4 py-3 bg-white shadow-lg">
      <div className="flex flex-row justify-around items-center gap-5">
        <div className="text-xl font-bold flex items-center justify-between">
          <NavLink
            to="/"
            className={
              "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-300"
            }
          >
            IndMart
          </NavLink>
        </div>
        <div className="bg-teal-100 text-xl p-1 rounded-md px-2 flex flex-row items-center justify-center">
          <IoSearchOutline />
          <input
            placeholder="Search for Products, Brands and More"
            className="bg-teal-100 p-1 outline-none w-[50rem]"
          />
        </div>
        <div className="flex flex-row justify-end gap-5 items-center">
          {getAdd.map((ele, index) => (
            <div
              key={index}
              className="border w-[30px] h-[30px] overflow-hidden rounded-full"
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
        </div>
        <div className="flex flex-row gap-2 items-center">
          <FiShoppingCart />
          <span>Cart</span>
        </div>
        <div
          className={"cursor-pointer rounded-full p-1.5 hover:bg-slate-100"}
          onClick={togleControl}
        >
          <BsThreeDotsVertical />
        </div>
      </div>
      <div className="">{controlBox && <Control />}</div>
    </div>
  );
};

export default Navbar;
