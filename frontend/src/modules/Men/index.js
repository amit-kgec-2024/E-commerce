import React, { useEffect, useState } from "react";
import Card from "../../component/Card";

const Men = () => {
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/product/register/get"
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

  let shuffledProducts = shuffleArray(getData).slice(0, 20);
  return (
    <div>
    {<div className="flex flex-wrap  gap-6 justify-center items-center p-4">
      {shuffledProducts.map((ele, index) => (ele.product.category === 'boys' &&
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
    </div>}
    </div>
  );
};

export default Men;
