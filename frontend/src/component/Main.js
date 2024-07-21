import React, { useState } from "react";
import Home from "./Home";
import Electronics from "../component/electronics/Electronics";
import Fashion from "../component/fashion/Fashion";
import Beauty from "../component/beauty/Beauty";
import Furniture from "../component/furniture/Furniture";
import Grocery from "../component/grocery/Grocery";
import Mobiles from "../component/mobiles/Mobiles";
import Appliens from "../component/appliens/Appliens";
import Kitchen from "../component/kitchene/Kitchen";
import Layout from "./layout/Layout";

const Main = () => {
  const [isProduct, showProduct] = useState("home");
  const handelProduct = (toggleProduct) => {
    showProduct(toggleProduct);
  };
  return (
    <Layout>
      <div className="bg-slate-100 flex flex-row justify-between items-start w-full p-2 gap-2">
        <div
          className={`${
            isProduct === "profile"
              ? "hidden"
              : "w-[10%] uppercase flex flex-col gap-10 p-3 justify-around items-center font-semibold bg-white"
          }`}
        >
          <button
            className={`${isProduct === "home" ? "text-teal-300" : ""}`}
            onClick={() => handelProduct("home")}
          >
            Home
          </button>
          <button
            className={`${isProduct === "mobiles" ? "text-teal-300" : ""}`}
            onClick={() => handelProduct("mobiles")}
          >
            Mobile
          </button>
          <button
            className={`${isProduct === "appliances" ? "text-teal-300" : ""}`}
            onClick={() => handelProduct("appliances")}
          >
            Appliense
          </button>
          <button
            className={`${isProduct === "electronics" ? "text-teal-300" : ""}`}
            onClick={() => handelProduct("electronics")}
          >
            Electronics
          </button>
          <button
            className={`${isProduct === "fashion" ? "text-teal-300" : ""}`}
            onClick={() => handelProduct("fashion")}
          >
            Fashion
          </button>
          <button
            className={`${isProduct === "beauty" ? "text-teal-300" : ""}`}
            onClick={() => handelProduct("beauty")}
          >
            Beauty
          </button>
          <button
            className={`${isProduct === "kitchene" ? "text-teal-300" : ""}`}
            onClick={() => handelProduct("kitchene")}
          >
            Kitchene
          </button>
          <button
            className={`${isProduct === "furniture" ? "text-teal-300" : ""}`}
            onClick={() => handelProduct("furniture")}
          >
            Furniture
          </button>
          <button
            className={`${isProduct === "grocery" ? "text-teal-300" : ""}`}
            onClick={() => handelProduct("grocery")}
          >
            Grocery
          </button>
        </div>
        <div className="w-full bg-slate-50 overflow-y-scroll h-screen p-2">
          {isProduct === "mobiles" && <Mobiles />}
          {isProduct === "appliances" && <Appliens />}
          {isProduct === "electronics" && <Electronics />}
          {isProduct === "fashion" && <Fashion />}
          {isProduct === "beauty" && <Beauty />}
          {isProduct === "kitchene" && <Kitchen />}
          {isProduct === "furniture" && <Furniture />}
          {isProduct === "grocery" && <Grocery />}
          {isProduct === "home" && <Home />}
          {isProduct === "home" && <Home />}
          {isProduct === "home" && <Home />}
          {isProduct === "home" && <Home />}
        </div>
      </div>
    </Layout>
  );
};

export default Main;
