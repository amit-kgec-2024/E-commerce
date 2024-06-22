import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoReturnUpBack } from "react-icons/io5";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { TbShoppingCartCancel } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { BsLightningFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

const MobilesDetails = () => {
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

  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  // Handel AddToCart..............
  const handelAddtoCart = async () => {
    const res = await fetch("http://localhost:4000/api/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        productId: id,
      }),
    });
    if (res.status === 400) {
      alert("Alredy Add To Cart!");
    } else {
      await res.json();
    }
  };
  // API CAll comment Get......................
  const [reviewGet, setReviewGet] = useState([]);
  useEffect(() => {
    fetchcomment(id);
  }, [id]);
  const fetchcomment = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/productcomment/${id}`);
      const jsonReview = await res.json();
      setReviewGet(jsonReview);
    } catch (error) {
      console.log(error);
    }
  };
 
  //  API CALL comment................
  const userId = user.id;
  const [comment, setcomment] = useState("");
  const handelSubmit = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/productcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          comment: comment,
          userId: userId,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      fetchcomment(id);
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };
  // Delete comment.......................
const handleDelete = async (commentId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/comment/delete/${commentId}`,
      {
        method: "DELETE",
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }
    fetchcomment(id);
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

  //  Api Calll Products..........................
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
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <div className="p-3 flex flex-col">
            <img
              src={data.product.img}
              alt={data.product.title}
              width={250}
              height={100}
              className="w-[20rem] sm:w-[30rem]"
            />
            <div className="flex flex-row justify-center gap-3">
              <button
                onClick={handelAddtoCart}
                className="uppercase bg-yellow-500 flex items-center shadow gap-2 hover:bg-yellow-600 py-2 px-3 text-xs md:text-base font-semibold text-white"
              >
                <FaCartShopping />
                add to Cart
              </button>
              <Link
                to={`/Mobile/buynow/${id}/${formattedDate}`}
                className="uppercase bg-orange-500 hover:bg-orange-600 shadow py-1 px-3 text-xs md:text-base font-semibold text-white flex items-center gap-1"
              >
                <BsLightningFill />
                buy now!
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-start items-start p-3">
            <h1 className="text-sm md:text-xl font-bold">
              {data.product.title}
            </h1>
            <div className="flex gap-2 md:text-2xl text-green-400">
              {[1, 2, 3, 4, 5].map((ele) =>
                ele <= data.product.stars ? (
                  <AiFillStar key={ele} />
                ) : (
                  <AiOutlineStar key={ele} />
                )
              )}
            </div>
            <h1 className="text-sm md:text-xl font-bold text-blue-400">
              {data.product.discount}% Off
            </h1>
            <h1 className="text-sm md:text-xl font-bold">
              ₹
              {Math.round(
                data.product.price -
                  (data.product.price / 100) * data.product.discount
              )}{" "}
              <del className="text-xs md:text-sm text-gray-400">
                ₹{data.product.price}
              </del>
            </h1>
            <h1 className="text-sm sm:text-lg font-bold uppercase">
              Brand: {data.product.category}
            </h1>
            <h1 className="text-sm sm:text-lg w-[30rem]">
              {data.product.models}
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
          <h1 className="font-light text-sm text-gray-300">
            {reviewGet.length} comment
          </h1>
          <div className="flex justify-between gap-3">
            <input
              type="text"
              name="comment"
              className="outline-none border-2 p-1 text-sm w-full"
              valu={comment}
              onChange={(e) => setcomment(e.target.value)}
              required
            />
            <button
              onClick={() => handelSubmit()}
              className="bg-blue-500 border py-1 px-2 text-white shadow"
            >
              Add
            </button>
          </div>
        </div>
        <div className="w-full my-2 md:px-20">
          {reviewGet
            .slice()
            .reverse()
            .map((ele, index) => (
              <div
                key={index}
                className="mb-2 border-t-2 border-r-red-600 py-2"
              >
                <div className="text-xs w-full flex justify-between items-center">
                  <h1 className="font-semibold text-sm md:text-base mb-1">
                    {ele.firstname} {ele.lastname}
                  </h1>
                  {userId === ele.userId && (
                    <button
                      onClick={() => handleDelete(ele.commentId)}
                      className="bg-red-400 px-3 py-1 rounded-md text-white"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <h1 className="text-xs md:text-sm text-gray-600 font-semibold">
                  {ele.comment}
                </h1>
              </div>
            ))}
        </div>
      </div>
    );
}

export default MobilesDetails;
