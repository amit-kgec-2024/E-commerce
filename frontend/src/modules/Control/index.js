import React, { useState, useEffect } from "react";
import { IoMdHelpCircleOutline, IoMdLocate } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineExitToApp } from "react-icons/md";
import {
  FaRegHeart,
  FaShoppingCart,
  FaHistory,
  FaAddressBook,
} from "react-icons/fa";
import { SlNote } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";

const Control = () => {
  const [showBox, setShowBox] = useState(true);
  const toggleBox = () => {
    setShowBox(!showBox);
  };
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  // Get Request.................
  const [getAdd, setGetAdd] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/userprofileget/${user.id}`
        );
        const jsonData = await res.json();
        setGetAdd(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [user.id]);

  // LOG Out................
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("user:token");
    window.localStorage.removeItem("user:details");
    navigate("/account/signin");
  };
  // Favourits Length...................................
  const [addCartGet, setAddCartGet] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const addCartRes = await fetch(
          `http://localhost:4000/api/addToCartGet/${user.id}`
        );
        const productRes = await fetch(
          "http://localhost:4000/api/product/register/get"
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
    <div>
      {showBox && (
        <div className="border bg-black flex flex-col text-white absolute right-1 top-[61px] w-[300px] h-[500px] rounded-lg shadow justify-center">
          {/* 000000 */}
          <Link
            to={"/userDetail"}
            className="bg-stone-700 rounded-lg w-full flex justify-between items-center py-2 px-4 my-4 cursor-pointer"
            onClick={toggleBox}
          >
            {getAdd.map((ele, index) => (
              <div key={index} className="border w-[50px] h-[50px] overflow-hidden rounded-full">
                <img
                  src={ele.profile.img}
                  alt="Bird"
                  className="w-full"
                  width={40}
                  height={40}
                />
              </div>
            ))}
            <h1 className="">{user.username}</h1>
          </Link>
          {/* 0000000 */}
          <div className="mb-3 p-4 border-t-2 border-white">
            <Link
              to={`/addToCart`}
              onClick={toggleBox}
              className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
            >
              <FaRegHeart className="text-xl" />
              <span>Favourite</span><span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">{common.length}</span>
            </Link>
            <Link
              to={'/shopping'}
              className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
              onClick={toggleBox}
            >
              <FaShoppingCart className="text-xl" />
              <span>Shopping</span>
            </Link>
            <div
              className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
              onClick={toggleBox}
            >
              <FaHistory className="text-xl" />
              <span>History</span>
            </div>
          </div>
          {/* 0000000 */}
          <div className="mb-3 p-4 border-t-2 border-white">
            <Link
            to={'/trackorder'}
              className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
              onClick={toggleBox}
            >
              <IoMdLocate className="text-xl" />
              <span>Tracking Order</span>
            </Link>
            <Link
              to={"/saveAddress"}
              className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
              onClick={toggleBox}
            >
              <FaAddressBook className="text-xl" />
              <span>Save Address</span>
            </Link>
            <Link
              to={"/reviews"}
              className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
              onClick={toggleBox}
            >
              <SlNote className="text-xl" />
              <span>Reviews</span>
            </Link>
          </div>
          {/* 000000 */}
          <div className="mb-3 p-4 border-t border-white">
            <div
              className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
              onClick={toggleBox}
            >
              <IoMdHelpCircleOutline className="text-2xl" />
              <span>Help</span>
            </div>
            <Link
            to={'/sattings'}
              className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
              onClick={toggleBox}
            >
              <CiSettings className="text-2xl" />
              <span>Setting</span>
            </Link>
            <div
              className="flex items-center gap-4 text-md font-bold mb-2 cursor-pointer"
              onClick={() => logOut()}
            >
              <MdOutlineExitToApp className="text-2xl" />
              <span>Log Out</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Control;
