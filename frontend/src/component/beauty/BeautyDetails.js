import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoReturnUpBack } from "react-icons/io5";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { TbShoppingCartCancel } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";

const BeautyDetails = () => {
  const { id } = useParams();
  const [getData, setGetData] = useState([]);
  // Date..........................
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 6);

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = futureDate.toLocaleDateString(undefined, options);
  // Call Sizes
  const [selectedSize, setSelectedSize] = useState("S");
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  // Handel AddToCart..............
  const handelAddtoCart = async () => {
    const res = await fetch(
      "https://e-commerce-nu-seven.vercel.app/api/addToCart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: id,
        }),
      }
    );
    if (res.status === 400) {
      alert("Alredy Add To Cart!");
    } else {
      await res.json();
    }
  };
  //  API CALL Reviews................
  const [reviewsProduct, setReviewsProducts] = useState({ reviews: "" });
  const handelSubmit = async () => {
    const res = await fetch(
      "https://e-commerce-nu-seven.vercel.app/api/productReviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          username: user.username,
          reviews: reviewsProduct.reviews,
        }),
      }
    );
    if (res.status === 400) {
      alert("Please Fill Reviews!");
    } else {
      await res.json();
      alert("Add Comment!");
    }
  };
  // API CAll Reviews Get......................
  const [reviewGet, setReviewGet] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/productReviews/${id}`
        );
        const jsonReview = await res.json();
        setReviewGet(jsonReview);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [id]);
  //  Api Calll Products
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
        <div className="my-6 p-2 bg-stone-200 flex flex-row justify-around items-center gap-1 text-stone-400 w-full">
          <Link to={"/"} className="text-xs sm:text-base font-semibold">
            Home
          </Link>
          <h1 className="text-xs sm:text-base font-semibold">
            {data.product.category}
          </h1>
          <h1 className="text-xs sm:text-base font-semibold">
            {data.product.title}
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-around gap-4">
          <div className="p-3">
            <img
              src={data.product.img}
              alt={data.product.title}
              width={250}
              height={100}
              className="w-[200px] sm:w-[300px] h-[200px] sm:h-[300px]"
            />
          </div>
          <div className="flex flex-col gap-3 justify-start items-start p-3">
            <h1 className="text-sm md:text-xl font-bold">
              {data.product.title}
            </h1>
            <h1 className="text-sm md:text-xl font-bold text-green-400">
              {data.product.discount}% Off
            </h1>
            <h1 className="text-sm md:text-xl font-bold">
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
            <div className="flex gap-2 md:text-2xl text-yellow-400">
              {[1, 2, 3, 4, 5].map((ele) =>
                ele <= data.product.stars ? (
                  <AiFillStar key={ele} />
                ) : (
                  <AiOutlineStar key={ele} />
                )
              )}
            </div>
            <h1 className="text-xs font-bold md:text-base">
              Size: <span>{selectedSize}</span>
            </h1>
            <div className="flex flex-row gap-2">
              {sizes.map((size) => (
                <div key={size}>
                  <button
                    type="button"
                    id={`size${size}`}
                    name="size"
                    onClick={() => handleSizeClick(size)}
                    className={
                      selectedSize === size
                        ? "selected border bg-slate-400 py-1 px-2 text-sm"
                        : "border bg-gray-100 py-1 px-2 text-sm"
                    }
                  >
                    {size}
                  </button>
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={handelAddtoCart}
                className="uppercase bg-red-500 hover:bg-red-600 py-1 px-3 text-xs md:text-base font-semibold text-white rounded-lg"
              >
                add to Cart
              </button>
            </div>
            <div>
              <Link
                to={`/BeautyDetails/buynow/${id}/${selectedSize}/${formattedDate}`}
                className="uppercase bg-blue-500 hover:bg-blue-600 py-1 px-3 text-xs md:text-base font-semibold text-white rounded-lg"
              >
                buy now!
              </Link>
            </div>
            <h1 className="text-xs sm:text-sm font-bold">
              Name: {data.product.title}
            </h1>
            <h1 className="text-xs sm:text-sm font-bold">
              Category: {data.product.category}
            </h1>
          </div>
        </div>
        <div className="w-full h-1 my-2 bg-gray-100" />
        <div className="w-full my-2 md:px-20">
          <div className="flex flex-row items-center gap-4 mb-2">
            <CiDeliveryTruck className={"text-2xl"} />
            <div className="">
              <h1 className="text-xs md:text-base font-bold">
                <span className="text-green-400">FREE Delivery</span>{" "}
                <del className="text-gray-400">₹40</del> | Delivery by
              </h1>
              <h1 className="text-xs md:text-base font-bold">
                {formattedDate}
              </h1>
            </div>
          </div>
          <div className="flex flex-row gap-5 mb-2">
            <IoReturnUpBack className={"text-xl"} />
            <span className="text-xs md:text-base">10 days return policy</span>
          </div>
          <div className="flex flex-row gap-5 mb-2">
            <HiOutlineCurrencyRupee className={"text-xl"} />
            <span className="text-xs md:text-base">
              Cash on Delivery Available
            </span>
          </div>
          <div className="flex flex-row gap-5">
            <TbShoppingCartCancel className={"text-xl"} />
            <span className="text-xs md:text-base">
              Cancellation Upto 24 hrs
            </span>
          </div>
        </div>
        <div className="w-full h-1 my-2 bg-gray-100" />
        <div className="flex flex-col justify-start my-4 w-full md:px-20">
          <h1 className="font-bold">Reviews</h1>
          <h1 className="font-light text-sm text-gray-300">212 reviews</h1>
          <form
            className="flex justify-between gap-3"
            onSubmit={() => handelSubmit()}
          >
            <input
              type="text"
              name="reviews"
              className="outline-none border-2 p-1 text-sm w-full"
              valu={reviewsProduct.reviews}
              onChange={(e) =>
                setReviewsProducts({
                  ...reviewsProduct,
                  reviews: e.target.value,
                })
              }
            />
            <button
              type="submit"
              className="bg-blue-500 border py-1 px-2 text-white shadow"
            >
              Add
            </button>
          </form>
        </div>
        <div className="w-full my-2 md:px-20">
          {reviewGet.map((ele, index) => (
            <div key={index} className="mb-2 border-t-2 border-r-red-600 py-2">
              <h1 className="font-bold text-sm md:text-base mb-1">
                {ele.review.username}
              </h1>
              <h1 className="text-xs md:text-sm text-gray-600 font-semibold">
                {ele.review.reviews}
              </h1>
            </div>
          ))}
        </div>
      </div>
    );
}

export default BeautyDetails;
