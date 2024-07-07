import React, { useState, useEffect } from "react";
import { IoStarSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

const Mobiles = () => {
  const { category } = useParams();
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/mobiles/data"
        );
        const jsonData = await res.json();
        setGetData(jsonData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);
  const filteredData = getData.filter(
    (item) => item.category === category
  );
  // Function to calculate delivery date
  const getDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 6); 

    const options = { day: "numeric", month: "long" };
    return deliveryDate.toLocaleDateString("en-US", options);
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="">
        {filteredData.map((ele) => (
          <Link
            to={`/product/${ele.product.id}`}
            className="w-full flex flex-row p-3 justify-around border"
          >
            <div className="">
              {ele.product.sale && (
                <h1 className="text-xs px-2 bg-teal-600 absolute rounded-sm text-gray-100">
                  Bestsellers
                </h1>
              )}
              <img
                src={ele.product.img}
                alt={ele.product.title}
                className="w-[20rem]"
              />
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h1 className="font-bold">{ele.product.title}</h1>
              <div className="flex items-start">
                <h1 className="flex items-center gap-1 px-3 rounded-md text-white bg-green-600">
                  {ele.product.stars}
                  <IoStarSharp />
                </h1>
              </div>
              <h1 className="w-[35rem]">{ele.product.models}</h1>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-bold">
                ₹
                {Math.round(
                  ele.product.price -
                    (ele.product.price / 100) * ele.product.discount
                )}
              </h1>
              <del className="font-bold text-slate-500">
                ₹{ele.product.price}
              </del>
              <h1 className="text-green-500">{ele.product.discount}% off</h1>
              <h1 className="">Free delivery by {getDeliveryDate()}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Mobiles;
