import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import Control from "../../modules/Control";

const Navbar = () => {
  // nan show responsive mode
  const [showBox, setShowBox] = useState(false);
  const togleBox = () => {
    setShowBox(!showBox);
  };
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
          `http://localhost:4000/api/userprofileget/${user.id}`
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
    <div className="w-full sticky z-50 top-0 p-4 bg-white flex flex-col md:flex-row justify-between shadow-lg">
      <div className="text-xl font-bold flex items-center justify-between">
        <NavLink
          to="/"
          className={
            "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-300"
          }
        >
          IndMart
        </NavLink>
        <div className={"md:hidden cursor-pointer"} onClick={togleBox}>
          {showBox ? <ImCross /> : <CiMenuFries />}
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex md:flex-row py-3 md:py-0 gap-3">
          <NavLink
            to="/"
            className={"text-sm md:text-lg font-semibold cursor-pointer"}
          >
            Home
          </NavLink>
          <NavLink
            to="/men"
            className={"text-sm md:text-lg font-semibold cursor-pointer"}
          >
            Men
          </NavLink>
          <NavLink
            to="/women"
            className={"text-sm md:text-lg font-semibold cursor-pointer"}
          >
            Women
          </NavLink>
          <NavLink
            to="/beauty"
            className={"text-sm md:text-lg font-semibold cursor-pointer"}
          >
            Beauty
          </NavLink>
        </div>
      </div>
      {showBox && (
        <div className="flex flex-col md:flex-row py-3 md:py-0 gap-3">
          <NavLink
            to="/"
            className={"text-sm md:text-lg font-semibold cursor-pointer"}
            onClick={togleBox}
          >
            Home
          </NavLink>
          <NavLink
            to="/men"
            className={"text-sm md:text-lg font-semibold cursor-pointer"}
            onClick={togleBox}
          >
            Men
          </NavLink>
          <NavLink
            to="/women"
            className={"text-sm md:text-lg font-semibold cursor-pointer"}
            onClick={togleBox}
          >
            Women
          </NavLink>
          <NavLink
            to="/beauty"
            className={"text-sm md:text-lg font-semibold cursor-pointer"}
            onClick={togleBox}
          >
            Chield
          </NavLink>
        </div>
      )}
      <div className="hidden md:block">
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
          <div
            className={"cursor-pointer rounded-full p-1.5 hover:bg-slate-100"}
            onClick={togleControl}
          >
            <BsThreeDotsVertical />
          </div>
        </div>
        {controlBox && <Control />}
      </div>
    </div>
  );
};

export default Navbar;
