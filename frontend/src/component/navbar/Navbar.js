import React, { useEffect, useState } from "react";
import Form from "../From";
import { Link, NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { SlArrowDown } from "react-icons/sl";
import { FcFlashOn } from "react-icons/fc";
import { MdOutlineLogout } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { GoTag } from "react-icons/go";
import { IoHeartOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { FaPlusSquare } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

const Navbar = ( ) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredMenu, setIsHoveredMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    window.localStorage.getItem("user:token") || false
  );

  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const [isData, setIsdata] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/users/${user.id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setIsdata(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [user.id]);
  // AddCart length...........................
  const userId = user.id;
  const [addCartGet, setAddCartGet] = useState([]);
  useEffect(() => {
    fetchAllData(userId);
  }, [userId]);
  const fetchAllData = async (userId) => {
    try {
      const addCartRes = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/addToCart/${userId}`
      );

      const addCartJsonData = await addCartRes.json();

      setAddCartGet(addCartJsonData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  // LOG Out................
  const logOut = () => {
    window.localStorage.removeItem("user:token");
    window.localStorage.removeItem("user:details");
    setIsUserLoggedIn(false);
  };
  return (
    <div className="w-full sticky z-50 top-0 px-8 py-4 shadow bg-slate-900 text-white">
      <div className="flex flex-row justify-around items-center gap-5">
        <div className="flex flex-row items-center justify-between w-full">
          <NavLink
            to="/"
            className={
              "text-transparent bg-clip-text text-2xl font-bold bg-gradient-to-r from-blue-400 to-yellow-300"
            }
          >
            IndMart
          </NavLink>
          <div className="bg-teal-100 text-lg text-black w-[70%] rounded-md px-3 flex flex-row items-center">
            <IoSearchOutline />
            <input
              placeholder="Search for Products, Brands and More"
              className="bg-teal-100 p-1 text-black outline-none w-full"
            />
          </div>
        </div>
        <div className="flex flex-row items-center w-full justify-end gap-10">
          {isUserLoggedIn ? (
            <button
              className="relative flex flex-row hover:border hover:shadow hover:bg-slate-900 rounded p-1 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex flex-row items-center gap-2">
                <FaRegCircleUser />
                {isData?.firstname}
                <div className="w-6">
                  <SlArrowDown
                    className={`transition-transform text-xs ${
                      isHovered ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {isHovered && (
                <div className="absolute border p-2 flex flex-col w-[12rem] mt-7 rounded shadow-lg bg-slate-900">
                  <Link
                    to="/profile"
                    className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800"
                  >
                    <FaRegCircleUser />
                    My Profile
                  </Link>
                  <Link className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800">
                    <FcFlashOn />
                    SuperCoin Zone
                  </Link>
                  <Link className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800">
                    <FaPlusSquare />
                    Plus Zone
                  </Link>
                  <Link
                    to="/orders"
                    className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800"
                  >
                    <BsBoxSeam />
                    Orders
                  </Link>
                  <Link
                    to="/addToCart"
                    className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800"
                  >
                    <IoHeartOutline />
                    Wishlist
                  </Link>
                  <Link className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800">
                    <GoTag />
                    Coupons
                  </Link>
                  <Link className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800">
                    <MdOutlineCardGiftcard />
                    Gift Cards
                  </Link>
                  <Link className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800">
                    <IoNotificationsOutline />
                    Notifications
                  </Link>
                  <button
                    onClick={logOut}
                    className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800"
                  >
                    <MdOutlineLogout />
                    Logout
                  </button>
                </div>
              )}
            </button>
          ) : (
            <button onClick={() => setIsLogin(true)}>
              <FaRegCircleUser />
            </button>
          )}

          <Link to="/addToCart" className="flex flex-row items-center">
            <FiShoppingCart />
            <div className="text-xs bg-red-500 w-4 text-center rounded-full mb-4">
              {addCartGet.length}
            </div>
          </Link>
          <button
            className="relative flex flex-row hover:border hover:shadow hover:bg-slate-800 rounded p-1 group"
            onMouseEnter={() => setIsHoveredMenu(true)}
            onMouseLeave={() => setIsHoveredMenu(false)}
          >
            <div className="flex flex-row items-center gap-2">
              <BsThreeDotsVertical />
            </div>
            {isHoveredMenu && (
              <div className="absolute border p-2 flex flex-col w-[15rem] mt-5 right-0 rounded shadow-lg bg-slate-900">
                <Link className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800">
                  <IoNotificationsOutline />
                  Notification preferances
                </Link>
                <Link className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800">
                  <IoHeartOutline />
                  24x7 Custromer Care
                </Link>
                <Link className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800">
                  <GoTag />
                  Advertise
                </Link>
                <Link className="flex flex-row items-center gap-2 text-base p-2 hover:bg-slate-800">
                  <MdOutlineFileDownload />
                  Download App
                </Link>
              </div>
            )}
          </button>
        </div>
      </div>
      {isLogin && <Form setIsLogin={setIsLogin} />}
    </div>
  );
};

export default Navbar;
