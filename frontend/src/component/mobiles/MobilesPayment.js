import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const MobilesPayment = () => {
  const { id, dropItems, formattedDate } = useParams();
  const [getData, setGetData] = useState([]);
  const [payBtn, setPayBtn] = useState();
  const paymentType = [
    "UPI",
    "Wallets",
    "Credit/Debit/ATM Card",
    "Net Banking",
    "Cash on Delivery",
  ];
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
 const [isAddress, setAddress] = useState([]);
 useEffect(() => {
   const fetchData = async () => {
     try {
       const rese = await fetch(
         `https://e-commerce-nu-seven.vercel.app/api/userdetails/${user.id}`
       );
       const jsonData = await rese.json();
       setAddress(jsonData);
     } catch (error) {
       console.log("Error Fetching Data", error);
     }
   };
   fetchData();
 }, [user.id]);

  // PlaceOrder POST requests..........................
  const handelClick = async () => {
    console.log("pay-->",payBtn )
    console.log("formattedDate-->", formattedDate);
  };

  // API CAlllll..........................
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

  if (!getData) {
    return <div>Loading...</div>;
  }
  const data = getData.find((p) => p.product.id === id);

  if (data)
    return (
      <div className="flex flex-col justify-center items-center px-4">
        <div className="w-full p-3">
          {isAddress.map((ele, index) => (
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
        </div>
        <div className="">{user.id}</div>
        <div className="w-full h-1 my-2 bg-gray-100" />
        <div className="w-full md:px-20">
          <h1 className="text-sm md:text-base font-semibold text-gray-500">
            All payments options
          </h1>
          <div className="p-4">
            {paymentType.map((e) => {
              return (
                <div key={e} className="py-2">
                  <input
                    type="radio"
                    id={e}
                    name="paymentType"
                    value={e}
                    onChange={(ele) => {
                      setPayBtn(ele.target.value);
                    }}
                  />
                  <label htmlFor={e} className="px-2 text-sm md:text-base">
                    {e}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full my-2 md:px-20">
          <h1 className="text-sm md:text-base font-bold uppercase text-gray-300 mb-3">
            Price Details
          </h1>
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-xs md:text-sm font-light">
              Price ({dropItems} item)
            </h1>
            <h1 className="text-xs md:text-sm font-light">
              ₹{data.product.price * dropItems}
            </h1>
          </div>
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-xs md:text-sm font-light">Delivery Charge</h1>
            <h1 className="text-xs md:text-sm font-light">
              <span className="text-green-400"><del className="text-slate-400">₹40</del>{" "}FREE</span>
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
        </div>
        <div className="w-full my-2 md:px-20 flex flex-row justify-between items-center bg-stone-100 p-3">
          <h1 className="flex flex-col">
            <span className="font-semibold">₹
              {Math.round(
                dropItems *
                  (data.product.price -
                    (data.product.price / 100) * data.product.discount)
              )}
            </span>
          </h1>
          <button
            onClick={handelClick}
            className="bg-yellow-400 text-xs md:text-sm py-1 px-4 rounded font-semibold"
          >
            Place order
          </button>
        </div>
      </div>
    );
}

export default MobilesPayment;
