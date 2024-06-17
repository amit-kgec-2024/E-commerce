import React, { useState, useEffect } from "react";
import Card from "../fashion/Card";

const Appliens = () => {
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/appliances/data"
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
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  let shuffledProducts = shuffleArray(getData).slice(0, 50);
  return (
    <div>
      <div className="flex flex-wrap  gap-6 justify-center items-center p-4">
        {shuffledProducts.map((ele, index) => (
          <Card
            key={ele.product.id}
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
)};

export default Appliens;
