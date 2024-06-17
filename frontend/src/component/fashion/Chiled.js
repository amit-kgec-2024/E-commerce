import React, { useState, useEffect } from "react";
import Card from "./Card";
import Loader from "./Loader";

const Chiled = () => {
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/fashion/data"
        );
        const jsonData = await res.json();
        setGetData(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);
  const shuffleAndFilterArray = (array) => {
    const shuffledArray = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    const beautyProducts = shuffledArray.filter(
      (product) => product.product.category === "beauty"
    );

    return beautyProducts.slice(0, 20);
  };

  let shuffledAndFilteredProducts = shuffleAndFilterArray(getData);
  const [isLoder, setIsLoader] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoader("Loader finished");
    }, 2000);

    return () => clearTimeout(timeoutId);
  });
  return (
    <div>
      {isLoder ? (
        <div className="flex flex-wrap  gap-6 justify-center items-center p-4">
          {shuffledAndFilteredProducts.map((ele, index) => (
            <Card
              key={ele.product.id}
              id={ele.product.id}
              img={ele.product.img}
              title={ele.product.title}
              price={ele.product.price}
              discount={ele.product.discount}
              stars={ele.product.stars}
              category={ele.product.category}
              sale={ele.product.sale}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Chiled;
