import React, { useState, useEffect } from "react";
import { BsHouseCheckFill } from "react-icons/bs";
import Card from "./card/Card";

const Home = () => {
  const [categorizedProducts, setCategorizedProducts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/data/all-data"
        );
        const data = await response.json();
        setCategorizedProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const renderProducts = (category) => {
    const shuffledCategory = shuffleArray([...category]);
    return shuffledCategory.slice(0, 12).map((ele, index) => (
      <div key={index} className="p-2">
        <Card
          id={ele._id}
          img={ele.img}
          title={ele.title}
          price={ele.price}
          discount={ele.discount}
          stars={ele.stars}
          sale={ele.sale}
        />
      </div>
    ));
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center p-4">
        {Object.keys(categorizedProducts).map((category) => (
          <div key={category} className="w-full mt-10">
            <div className="flex flex-row items-center border justify-between shadow p-2">
              <h2 className="text-xl uppercase font-semibold">{category}</h2>
              <button className="text-blue-500 text-2xl">
                <BsHouseCheckFill />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {renderProducts(categorizedProducts[category])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
