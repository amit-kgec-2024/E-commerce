import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsArrowRightCircle } from "react-icons/bs";
import { TbCircleNumber2, TbCircleNumber3 } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { quentity } from "../../utils/dropdown";

const BeautyBuy = () => {
  const { id, selectedSize, formattedDate } = useParams();
  const [getData, setGetData] = useState([]);
  // drop down box
  const [dropItems, setdropItems] = useState(1);
  const handelDrop = (event) => {
    setdropItems(event.target.value);
  };
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  // Get Request.................
  const [getAddGet, setGetAddGet] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rese = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/userdetails/${user.id}`
        );
        const jsonData = await rese.json();
        setGetAddGet(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [user.id]);
  // API CAlllll.........................
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

  if (!getData) {
    return <div>Loading...</div>;
  }
  const data = getData.find((p) => p.product.id === id);

  if (data)
    return (
      <div className="flex flex-col justify-center items-center px-4">
        <div className="flex flex-row justify-around gap-1 mt-3 w-full">
          <BsArrowRightCircle className={"md:text-2xl text-blue-200"} />
          <TbCircleNumber2 className={"md:text-2xl text-blue-800"} />
          <TbCircleNumber3 className={"md:text-2xl text-blue-200"} />
        </div>
        <div className="w-full flex flex-row justify-around">
          <h1 className="text-xs md:text-base text-gray-300">Address</h1>
          <h1 className="text-xs md:text-base text-gray-800">Order Summary</h1>
          <h1 className="text-xs md:text-base text-gray-300">Payment</h1>
        </div>
        <div className="w-full h-2 my-2 bg-gray-100" />
        {getAddGet.map((ele, index) => (
          <div
            key={index}
            className="w-full my-4 md:px-20 flex flex-row justify-between"
          >
            <div className="">
              <h1 className="font-bold">Deliver to:</h1>
              <h1 className="font-bold">{user.username}</h1>
              <h1 className="font-light">
                {ele.details.place}, {ele.details.post}, {ele.details.police},{" "}
                {ele.details.dist}, {ele.details.pin}, {ele.details.state}
              </h1>
              <h1 className="font-light">{ele.details.mobil}</h1>
            </div>
            <div>
              <Link
                to={"/saveAddress"}
                className="bg-blue-500 px-3 py-2 rounded text-white font-semibold"
              >
                Change
              </Link>
            </div>
          </div>
        ))}
        <div className="w-full h-2 my-2 bg-gray-100" />
        <div className="flex flex-row justify-around gap-4">
          <div className="p-3">
            <img
              src={data.product.img}
              alt={data.product.title}
              width={250}
              height={100}
              className="w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] mb-3"
            />
            <div
              className="border flex flex-row sm:mx-12 justify-center text-xs sm:text-base items-center shadow"
              value={setdropItems}
              onChange={handelDrop}
            >
              <h1>Qty:</h1>
              <select className="form-select outline-none">
                {quentity.map((option) => (
                  <option key={option} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start items-start p-3">
            <h1 className="text-sm md:text-xl font-light">
              {data.product.title}
            </h1>
            <h1 className="text-sm md:text-base font-thin">
              Size: <span>{selectedSize}</span>
            </h1>
            <div className="flex gap-2 md:text-2xl text-green-600">
              {[1, 2, 3, 4, 5].map((w) =>
                w <= data.product.stars ? (
                  <AiFillStar key={w} />
                ) : (
                  <AiOutlineStar key={w} />
                )
              )}
            </div>
            <h1 className="text-sm md:text-xl font-bold">
              <span className="text-xs md:text-md font-bold text-green-400">
                {data.product.discount}% Off
              </span>{" "}
              ₹
              {Math.round(
                data.product.price -
                  (data.product.price / 100) * data.product.discount
              )}
              .00{" "}
              <del className="text-xs md:text-sm text-gray-500">
                ₹{data.product.price}.00
              </del>
            </h1>
            <h1 className="text-xs sm:text-base">
              Delivery by Mon Jan 22 | <del className="text-gray-400">₹40</del>{" "}
              <span className="text-green-500">FREE Delivery</span>
            </h1>
          </div>
        </div>
        <div className="w-full h-1 my-2 bg-gray-100" />
        <div className="w-full my-2 md:px-20">
          <h1 className="text-sm md:text-base font-bold mb-3">Price Details</h1>
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-xs md:text-sm font-light">
              Price ({dropItems} item)
            </h1>
            <h1 className="text-xs md:text-sm font-light">
              ₹{data.product.price * dropItems}
            </h1>
          </div>
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-xs md:text-sm font-light">Discount</h1>
            <del className="text-xs md:text-sm font-light text-green-400">
              -₹
              {Math.round(
                dropItems * (data.product.price / 100) * data.product.discount
              )}
            </del>
          </div>
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-xs md:text-sm font-light">Size:</h1>
            <h1 className="text-xs md:text-sm font-light">{selectedSize}</h1>
          </div>
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-xs md:text-sm font-light">Delivery Charge</h1>
            <h1 className="text-xs md:text-sm font-light">
              <del>₹40</del>{" "}
              <span className="text-green-400">FREE Delivery</span>
            </h1>
          </div>
          <div className="flex flex-row justify-between py-2 border-t-2 border-dotted">
            <h1 className="text-xs md:text-sm font-semibold">Total Amount</h1>
            <h1 className="text-xs md:text-sm font-semibold">
              ₹
              {Math.round(
                dropItems *
                  (data.product.price -
                    (data.product.price / 100) * data.product.discount)
              )}
            </h1>
          </div>
          <div className="py-2 border-t-2">
            <h1 className="text-xs md:text-sm font-semibold text-green-600">
              You will save{" "}
              <span>
                {Math.round(
                  dropItems *
                    ((data.product.price / 100) * data.product.discount)
                )}
              </span>{" "}
              on this order
            </h1>
          </div>
        </div>
        <div className="w-full my-2 md:px-20 flex flex-row justify-between items-center bg-stone-100 p-3">
          <h1 className="flex flex-col">
            <del className="font-light text-xs">
              {Math.round(
                dropItems * (data.product.price / 100) * data.product.discount
              )}
            </del>
            <span className="font-semibold">
              {Math.round(
                dropItems *
                  (data.product.price -
                    (data.product.price / 100) * data.product.discount)
              )}
            </span>
          </h1>
          <Link
            to={`/fashionDetails/buynow/payment/${id}/${selectedSize}/${dropItems}/${formattedDate}/${getAddGet}`}
            className="bg-yellow-400 text-xs md:text-sm py-1 px-4 rounded font-semibold"
          >
            Place order
          </Link>
        </div>
      </div>
    );
}

export default BeautyBuy;
