import React, { useState, useEffect } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { TbCircleNumber2, TbCircleNumber3 } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";

const GroceryPayment = () => {
  const navigate = useNavigate();
  const { id, selectedSize, dropItems, formattedDate } = useParams();
  const [getData, setGetData] = useState([]);
  const [payBtn, setPayBtn] = useState();
  const paymentType = [
    "UPI",
    "Wallets",
    "Credit/Debit/ATM Card",
    "Net Banking",
    "Cash on Delivery",
  ];
  // Current date....
  const currentDated = new Date();

  const currentFormatDate = currentDated.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  // Get Address Request.................
  const [getAddGet, setGetAddGet] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/userdetails/${user.id}`
        );
        const jsonData = await res.json();
        setGetAddGet(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [user.id]);
  const order = getAddGet.find((x) => x.details.userId === user.id);

  // PlaceOrder POST requests..........................
  const handelClick = async () => {
    try {
      const res = await fetch(
        "https://e-commerce-nu-seven.vercel.app/api/buy/payment/placeorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            img: data.product.img,
            title: data.product.title,
            price: Math.round(
              dropItems *
                (data.product.price -
                  (data.product.price / 100) * data.product.discount)
            ),
            items: dropItems,
            size: selectedSize,
            username: user.username,
            userId: user.id,
            productId: data.product.id,
            place: order.details.place,
            post: order.details.post,
            police: order.details.police,
            dist: order.details.dist,
            pin: order.details.pin,
            state: order.details.state,
            mobil: order.details.mobil,
            conformDate: currentFormatDate,
            deliveryDate: formattedDate,
            payment: payBtn,
          }),
        }
      );
      if (res.status === 400) {
        alert("Invalid Credintial!");
      } else {
        await res.json();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        navigate(
          `/nweplaceorder/${user.id}/${selectedSize}/${dropItems}/${currentFormatDate}`
        );
      }, 2000);
    }
  };

  // API CAlllll..........................
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
          <TbCircleNumber2 className={"md:text-2xl text-blue-200"} />
          <TbCircleNumber3 className={"md:text-2xl text-blue-800"} />
        </div>
        <div className="w-full flex flex-row justify-around">
          <h1 className="text-xs md:text-base text-gray-300">Address</h1>
          <h1 className="text-xs md:text-base text-gray-300">Order Summary</h1>
          <h1 className="text-xs md:text-base text-gray-800">Payment</h1>
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
              <span className="text-green-400">FREE</span>
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
            <h1 className="text-xs md:text-sm">{selectedSize}</h1>
            <span className="font-semibold">
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

export default GroceryPayment;
