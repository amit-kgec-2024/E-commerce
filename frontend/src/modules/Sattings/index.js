import React, { useState } from "react";
import {Link} from 'react-router-dom'
import General from "../../allsatting/General";
import Themes from "../../allsatting/Themes";

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
