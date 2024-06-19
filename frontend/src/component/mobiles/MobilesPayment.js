import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MobilesPayment = () => {
  const navigate = useNavigate();
  const { id, dropItems, formattedDate, selectedAddressId } = useParams();
  const [getData, setGetData] = useState([]);
  const [payBtn, setPayBtn] = useState();
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const paymentType = [
    "UPI",
    "Wallets",
    "Credit/Debit/ATM Card",
    "Net Banking",
    "Cash on Delivery",
  ];
  // CurrentDate..........................
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate());

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formCurrentDate = futureDate.toLocaleDateString(undefined, options);
  // PlaceOrder POST requests..........................
  const handelClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/order/confrom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: id,
            userId: user.id,
            addressId: selectedAddressId,
            items: dropItems,
            payType: payBtn,
            orderDate: formCurrentDate,
            deliveryDate: formattedDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await response.text();
      navigate("/placedorder");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [isOrderAddress, setOrderAddress] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rese = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/order/address/${selectedAddressId}`
        );
        const jsonData = await rese.json();
        setOrderAddress(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [selectedAddressId]);
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
          <div className="">
            <h1 className="font-bold">Deliver to:</h1>
            <h1 className="font-light">
              {isOrderAddress.place}, {isOrderAddress.post},{" "}
              {isOrderAddress.police}, {isOrderAddress.dist},{" "}
              {isOrderAddress.pin}, {isOrderAddress.state}
            </h1>
            <h1 className="font-light">
              {isOrderAddress.mobil}{" "}{formattedDate}
            </h1>
          </div>
        </div>
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
              <span className="text-green-400">
                <del className="text-slate-400">₹40</del> FREE
              </span>
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
            <span className="font-semibold">
              ₹
              {Math.round(
                dropItems *
                  (data.product.price -
                    (data.product.price / 100) * data.product.discount)
              )}
            </span>
          </h1>
          <button
            onClick={(e) => handelClick(e)}
            className="bg-blue-400 text-white text-xs md:text-sm py-2 px-6 rounded font-semibold"
          >
            Place order
          </button>
        </div>
      </div>
    );
}

export default MobilesPayment;
