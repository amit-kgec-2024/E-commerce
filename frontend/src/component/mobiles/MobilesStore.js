import React, { useState, useEffect } from "react";
import MobileCard from "./MobileCard";
import { Link } from "react-router-dom";

const MobilesStore = () => {
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/mobiles/data"
        );
        const jsonData = await res.json();
        setGetData(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);
  const categories = [...new Set(getData.map((ele) => ele.product.category))];
  return (
    <div>
      <div className="">
        {categories.map((category) => (
          <div key={category}>
            <div className="w-full border flex flex-row justify-between py-3 px-5 font-bold">
              <h2 className="uppercase">{category} smartphones</h2>
              <Link to={`/mobile/${category}`} className="px-4 shadow py-1 bg-blue-600 text-gray-100 uppercase">
                View all
              </Link>
            </div>
            <div className="flex flex-row w-full gap-2 p-2">
              {getData
                .filter((ele) => ele.product.category === category)
                .slice(0, 6)
                .map((ele, index) => (
                  <MobileCard
                    key={index}
                    id={ele.product.id}
                    img={ele.product.img}
                    title={ele.product.title}
                    price={ele.product.price}
                    discount={ele.product.discount}
                    stars={ele.product.stars}
                    sale={ele.product.sale}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobilesStore;
