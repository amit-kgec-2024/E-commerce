import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { BiSolidUserRectangle } from "react-icons/bi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { BiLogOutCircle } from "react-icons/bi";
import MyOrders from "../orders/MyOrders";
import Address from "./Address";
import Coupons from "./Coupons";
import Reviews from "./Reviews";
import GiftCard from "./GiftCard";
import Notifications from "./Notifications";
import PanCard from "./PanCard";
import ProfileInformation from "./ProfileInformation";
import SaveCards from "./SaveCards";
import SavedUPI from "./SavedUPI";
import WishList from "./Wishlist";
import Layout from "../layout/Layout";

const Profile = () => {
  const [isShow, setIsShow] = useState("personal");
  const handelToggle = (toggleBox) => {
    setIsShow(toggleBox);
  };
  // LOG Out................
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("user:token");
    window.localStorage.removeItem("user:details");
    navigate("/account/signin");
  };

  return (
    <Layout>
      <div className="flex flex-row p-3 gap-4">
        <div className="w-[15rem] flex flex-col gap-3 text-xl">
          <button className="flex flex-row items-center gap-3 p-3 bg-slate-100">
            <div className="flex text-4xl items-center justify-center text-orange-500 overflow-hidden">
              <HiMiniUserCircle />
            </div>
            <div className="text-xs flex flex-col items-start">
              <span>Hello,</span>
              <h1 className="text-base font-semibold">Amit Mandal</h1>
            </div>
          </button>
          <div className="bg-slate-100">
            <button
              onClick={() => handelToggle("orders")}
              className="flex flex-row items-center justify-between w-full border-b-2 p-3"
            >
              <RiInboxUnarchiveFill className="text-blue-800" />
              <span className="uppercase">My orders</span>
              <FaAngleRight />
            </button>
            <h1 className="flex flex-row items-center p-3 gap-4">
              <FaUserAlt className="text-blue-800" />
              <span>Account setting</span>
            </h1>
            <div className="flex flex-col">
              <button
                onClick={() => handelToggle("personal")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "personal" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => handelToggle("address")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "address" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                Manage Addresses
              </button>
              <button
                onClick={() => handelToggle("pancard")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "pancard" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                PAN Card Information
              </button>
            </div>
            <h1 className="flex flex-row items-center p-3 gap-4">
              <MdOutlinePayment className="text-blue-800" />
              <span>PAYMENTS</span>
            </h1>
            <div className="flex flex-col">
              <button
                onClick={() => handelToggle("giftcard")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "giftcard" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                Gift Card
              </button>
              <button
                onClick={() => handelToggle("saveupi")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "saveupi" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                Save UPI
              </button>
              <button
                onClick={() => handelToggle("savecards")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "savecards" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                Save Cards
              </button>
            </div>
            <h1 className="flex flex-row items-center p-3 gap-4">
              <BiSolidUserRectangle className="text-blue-800" />
              <span>My stuff</span>
            </h1>
            <div className="flex flex-col">
              <button
                onClick={() => handelToggle("coupons")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "coupons" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                My Coupons
              </button>
              <button
                onClick={() => handelToggle("reviews")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "reviews" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                My Reviews & Ratings
              </button>
              <button
                onClick={() => handelToggle("notifications")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "notifications" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                All Notifications
              </button>
              <button
                onClick={() => handelToggle("wishlist")}
                className={`text-sm p-3 w-full hover:bg-teal-50 ${
                  isShow === "wishlist" ? "text-blue-400 bg-teal-50" : " "
                }`}
              >
                My Wishlist
              </button>
            </div>
            <button
              onClick={() => logOut()}
              className="flex flex-row p-3 items-center w-full border-t-2 border-b-2 gap-3"
            >
              <BiLogOutCircle className="text-blue-800" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        <div className="bg-slate-100 w-full p-2">
          {isShow === "orders" && <MyOrders />}
          {isShow === "address" && <Address />}
          {isShow === "coupons" && <Coupons />}
          {isShow === "reviews" && <Reviews />}
          {isShow === "giftcard" && <GiftCard />}
          {isShow === "notifications" && <Notifications />}
          {isShow === "pancard" && <PanCard />}
          {isShow === "personal" && <ProfileInformation />}
          {isShow === "savecards" && <SaveCards />}
          {isShow === "saveupi" && <SavedUPI />}
          {isShow === "wishList" && <WishList />}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
