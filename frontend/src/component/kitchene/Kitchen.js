import React, { useState, useEffect } from "react";
import { BsHouseCheckFill } from "react-icons/bs";
import KitchenCard from "./KitchenCard";

const Kitchen = () => {
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/kitchen/data"
        );
        const jsonData = await res.json();
        setGetData(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const groupByCategory = (array) => {
    return array.reduce((result, item) => {
      (result[item.product.category] =
        result[item.product.category] || []).push(item);
      return result;
    }, {});
  };

  const groupedProducts = groupByCategory(shuffleArray(getData).slice(0, 50));

  return (
    <div>
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="category-section">
          <div className="flex flex-row items-center justify-between text-xl font-bold border p-3 shadow">
            <h2 className="category-title">{category}</h2>
            <button className="text-blue-500 text-3xl">
              <BsHouseCheckFill />
            </button>
          </div>
          <div className="flex flex-wrap gap-6 justify-staet w-full items-center p-4">
            {groupedProducts[category].map((ele) => (
              <div key={ele.product.id} className="">
                <KitchenCard
                  id={ele.product.id}
                  img={ele.product.img}
                  title={ele.product.title}
                  price={ele.product.price}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Kitchen;
