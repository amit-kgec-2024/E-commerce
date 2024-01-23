import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import General from "../../allsatting/General";
import Themes from "../../allsatting/Themes";
import { MdOutlineExitToApp } from "react-icons/md";


const Sattings = () => {
  // Customize and Control
  const [controlBox, setControlBox] = useState(false);
  const togleControl = () => {
    setControlBox(!controlBox);
  };
  const [controlTheams, setControlTheams] = useState(false);
  const togleTheams = () => {
    setControlTheams(!controlTheams);
  };
  // LOG Out................
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("user:token");
    window.localStorage.removeItem("user:details");
    navigate("/account/signin");
  };
  return (
    <div className="w-full h-full bg-gray-950">
      <div className="w-full bg-gray-900 h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-sm md:text-xl text-white px-6">
          Sattings
        </h1>
        <Link
          to={"/"}
          className="py1 px-3 bg-gray-600 text-white font-semibold mx-4"
        >
          Home
        </Link>
      </div>
      <div className="flex flex-row">
        <div className="w-[200px] bg-gray-800 h-screen flex flex-col py-4">
          <button
            onClick={togleControl}
            className="font-bold text-white border rounded py-1 bg-slate-500 cursor-pointer"
          >
            General
          </button>
          <button
            onClick={togleTheams}
            className="font-bold text-white border rounded py-1 bg-slate-500 cursor-pointer"
          >
            Themes
          </button>

          <div
            className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
            onClick={() => logOut()}
          >
            <MdOutlineExitToApp className="text-2xl" />
          </div>
        </div>
        <div className="flex bg-gray-300">
          {controlBox && <General />}
          {controlTheams && <Themes />}
        </div>
      </div>
    </div>
  );
};

export default Sattings;
