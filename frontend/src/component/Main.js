import React, { useState } from 'react'
import Mobiles from "./mobiles/Mobiles";
import Appliens from "./appliens/Appliens";
import Beauty from "./beauty/Beauty"
import Electronics from "./electronics/Electronics";
import Fashion from "./fashion/Fashion";
import Furniture from "./furniture/Furniture";
import Kitchen from "./kitchene/Kitchen";
import Grocery from "./grocery/Grocery";
import Home from './Home';

const Main = () => {
  const [isClick, setIsClick] = useState('');
  const handelToggle = (toggle)=>{
    setIsClick(toggle);
  }
  return (
    <div className="bg-slate-100 p-3 flex flex-col gap-4">
      <div
        className={`${
          isClick
            ? "hidden"
            : "w-full flex flex-row justify-around items-center p-2 bg-white overflow-x-visible"
        }`}
      >
        <button onClick={() => handelToggle("mobile")}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(mobile.webp)" }}
          ></div>
          <span className="font-bold">Mobiles</span>
        </button>
        <button onClick={() => handelToggle("appliances")}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(appliense.webp)" }}
          ></div>
          <span className="font-bold">Appliense</span>
        </button>
        <button onClick={() => handelToggle("electronics")}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(electronics.webp)" }}
          ></div>
          <span className="font-bold">Electronics</span>
        </button>
        <button onClick={() => handelToggle("fashion")}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(fashion.webp)" }}
          ></div>
          <span className="font-bold">Fashion</span>
        </button>
        <button onClick={() => handelToggle("beauty")}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(beauty.webp)" }}
          ></div>
          <span className="font-bold">Beauty</span>
        </button>
        <button onClick={() => handelToggle("kichen")}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(kichen.webp)" }}
          ></div>
          <span className="font-bold">Kichen</span>
        </button>
        <button onClick={() => handelToggle("furniture")}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(furniture.webp)" }}
          ></div>
          <span className="font-bold">Furniture</span>
        </button>
        <button onClick={() => handelToggle("grocery")}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(grocery.webp)" }}
          ></div>
          <span className="font-bold">Grocery</span>
        </button>
      </div>
      <div className="w-full bg-teal-50">
        <div className={`${isClick ? "hidden" : ""}`}>
          <Home />
        </div>
        {isClick === "mobile" && <Mobiles />}
        {isClick === "appliances" && <Appliens />}
        {isClick === "electronics" && <Electronics />}
        {isClick === "fashion" && <Fashion />}
        {isClick === "beauty" && <Beauty />}
        {isClick === "kichen" && <Kitchen />}
        {isClick === "furniture" && <Furniture />}
        {isClick === "grocery" && <Grocery />}
      </div>
    </div>
  );
}

export default Main

