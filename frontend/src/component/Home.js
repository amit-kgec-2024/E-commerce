import React, { useState, useEffect } from "react";
import Card from "./fashion/Card";

const Home = () => {
  const [shuffledProducts, setShuffledProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/data/all-data"
        );
        const data = await response.json();

        const allProducts = [
          ...data.products,
          ...data.mobiles,
          ...data.appliances,
          ...data.electronics,
          ...data.beauty,
          ...data.kitchen,
          ...data.furniture,
          ...data.grocery,
        ];

        const shuffled = allProducts.sort(() => Math.random() - 0.5);

        setShuffledProducts(shuffled);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap  gap-6 justify-center items-center p-4">
        {shuffledProducts.map((ele, index) => (
          <Card
            key={ele._id}
            id={ele._id}
            img={ele.img}
            title={ele.title}
            price={ele.price}
            discount={ele.discount}
            stars={ele.stars}
            sale={ele.sale}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
