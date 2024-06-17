import React from 'react'
import Home from './Home';
import { Link } from 'react-router-dom';

const Main = () => {

  return (
    <div className="bg-slate-100 p-3 flex flex-col gap-4">
      <div className="w-full flex flex-row justify-around items-center p-2 bg-white overflow-x-visible">
        <Link to={"mobiles"}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(mobile.webp)" }}
          ></div>
          <span className="font-bold">Mobiles</span>
        </Link>
        <Link to={"appliances"}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(appliense.webp)" }}
          ></div>
          <span className="font-bold">Appliense</span>
        </Link>
        <Link to={"electronics"}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(electronics.webp)" }}
          ></div>
          <span className="font-bold">Electronics</span>
        </Link>
        <Link to={"fashion"}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(fashion.webp)" }}
          ></div>
          <span className="font-bold">Fashion</span>
        </Link>
        <Link to={"beauty"}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(beauty.webp)" }}
          ></div>
          <span className="font-bold">Beauty</span>
        </Link>
        <Link to={"kitchene"}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(kichen.webp)" }}
          ></div>
          <span className="font-bold">Kitchene</span>
        </Link>
        <Link to={"furniture"}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(furniture.webp)" }}
          ></div>
          <span className="font-bold">Furniture</span>
        </Link>
        <Link to={"grocery"}>
          <div
            className="p-10"
            style={{ backgroundImage: "url(grocery.webp)" }}
          ></div>
          <span className="font-bold">Grocery</span>
        </Link>
      </div>
      <div className="w-full bg-teal-50">
        <div>
          <Home />
        </div>
      </div>
    </div>
  );
}

export default Main

