import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdElectricBolt } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const AddToCart = () => {
  // get Request AddtoCart.............
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const [addCartGet, setAddCartGet] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const addCartRes = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/addToCartGet/${user.id}`
        );
        const productRes = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/product/register/get"
        );

        const addCartJsonData = await addCartRes.json();
        const productJsonData = await productRes.json();

        setAddCartGet(addCartJsonData);
        setProductData(productJsonData);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchAllData();
  }, [user.id]);
  
  const common = productData.filter((cart1) => {
    return addCartGet.some(
      (cart2) => cart1.product.id === cart2.addCart.productId
      );
    });
  return (
    <div className="w-full h-screen bg-gray-50">
      <div className="w-full bg-stone-200 h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-sm md:text-xl text-white px-6">
          Add To Cart <span className="text-white text-xs font-bold rounded-full px-2 py-1 shadow-stone-200 bg-red-700">{common.length}</span>
        </h1>
        <Link
          to={"/"}
          className="py1 px-3 bg-gray-600 text-white font-semibold mx-4"
        >
          Home
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {common.map((e) => (
          <div
            key={e}
            className="flex flex-col p-2 my-3 gap-3 border w-[250px] bg-gray-100 rounded shadow"
          >
            <div className="flex flex-row">
              <img
                src={e.product.img}
                alt="images"
                className="w-[80px] h-[100px] border"
              />
              <div className="p-4">
                <h1 className="text-xs mb-2">{e.product.title}</h1>
                <div className="flex flex-row text-sm mb-2 text-green-700">
                  {[1, 2, 3, 4, 5].map((ele) =>
                    ele <= e.product.stars ? (
                      <AiFillStar key={ele} />
                    ) : (
                      <AiOutlineStar key={ele} />
                    )
                  )}
                </div>
                <h1 className="text-xs mb-2 text-blue-700">
                  {e.product.discount}% OFF
                </h1>
                <div className="flex flex-row text-sm mb-2 gap-1">
                  <span className="">
                    ₹
                    {Math.round(
                      e.product.price -
                        (e.product.price / 100) * e.product.discount
                    )}
                    .00
                  </span>{" "}
                  <del className="text-gray-500">₹{e.product.price}.00</del>
                </div>
              </div>
            </div>
            <div className="flex flex-row text-xs mb-2 gap-1">
              <span>Delivery by Jan 27 24 |</span>{" "}
              <del className="text-gray-400">₹40</del>{" "}
              <span className="text-green-500">FREE Delivery</span>
            </div>
            <div className="flex flex-row text-sm gap-2">
              <h1 className="flex flex-row gap-2 items-center border py-1 px-3 cursor-pointer">
                <RiDeleteBin6Line />
                <span>Remove</span>
              </h1>
              <Link
                to={`/productDat/${e.product.id}`}
                className="flex flex-row gap-2 items-center border p-1"
              >
                <MdElectricBolt />
                <span>Buy this now</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-sm font-light text-center py-3">
        No more Add To Cart
      </h1>
    </div>
  );
};

export default AddToCart;
