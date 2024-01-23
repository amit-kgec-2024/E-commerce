import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import General from "../../allsatting/General";
import Themes from "../../allsatting/Themes";
import { MdOutlineExitToApp } from "react-icons/md";
import UserDetail from "../UserDetail";
import SaveAddress from '../SaveAddress/index'
import Reviews from '../Reviews/index'


const Sattings = () => {
  // LOG Out................
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("user:token");
    window.localStorage.removeItem("user:details");
    navigate("/account/signin");
  };
  const [selectedButton, setSelectedButton] = useState(null);
  const handelButton = (button) => {
    if (selectedButton === button) {
      setSelectedButton(null);
    } else {
      setSelectedButton(button);
    }
  };
  const renderDetails = () => {
    if (selectedButton === "userprofile") {
      return <UserDetail />;
    } else if (selectedButton === "general") {
      return <General />;
    } else if (selectedButton === "themes") {
      return <Themes />;
    } else if (selectedButton === "address") {
      return <SaveAddress />;
    } else if (selectedButton === "reviews") {
      return <Reviews />;
    }
    return <UserDetail />;
  };
  return (
    <div className="w-screen h-screen bg-gray-950">
      <div className="flex flex-row">
        <div className="bg-gray-800 w-[30%] md:w-[15%] p-2 h-screen flex flex-col py-4 fixed left-0">
          <h1 className="font-bold text-center text-sm md:text-xl text-white mb-8">Sattings</h1>
          <button
            onClick={() => handelButton("userprofile")}
            className="font-bold w-full text-white mb-2 border rounded py-1 bg-slate-800 text-sm md:text-base"
          >
            Profile
          </button>
          <button
            onClick={() => handelButton("general")}
            className="font-bold text-white border mb-2 rounded py-1 bg-slate-800 text-sm md:text-base"
          >
            General
          </button>
          <button
            onClick={() => handelButton("themes")}
            className="font-bold text-white border mb-2 rounded py-1 bg-slate-800 text-sm md:text-base"
          >
            Themes
          </button>
          <button
            onClick={() => handelButton("address")}
            className="font-bold text-white border mb-2 rounded py-1 bg-slate-800 text-sm md:text-base"
          >
            Address
          </button>
          <button
            onClick={() => handelButton("reviews")}
            className="font-bold text-white border mb-2 rounded py-1 bg-slate-800 text-sm md:text-base"
          >
            Reviews
          </button>
          <button
            className="flex items-center justify-center mb-2 border rounded text-white bg-slate-800 py-1 gap-1 text-sm md:text-base font-bold"
            onClick={() => logOut()}
          >
            <MdOutlineExitToApp className="text-2xl" />
            LOG OUT
          </button>
        </div>
        <div className="w-screen h-screen bg-gray-600 ml-[30%] md:ml-[15%]">{renderDetails()}</div>
      </div>
    </div>
  );
};

export default Sattings;
