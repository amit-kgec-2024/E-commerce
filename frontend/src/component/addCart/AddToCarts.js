import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import Layout from "../layout/Layout";

const AddToCarts = () => {
  // get Request AddtoCart.............
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const [addCartGet, setAddCartGet] = useState([]);
  const userId = user.id;;
  useEffect(() => {
    fetchAllData(userId);
  }, [userId]);
  const fetchAllData = async (userId) => {
    try {
      const addCartRes = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/addToCart/${userId}`
      );

      const addCartJsonData = await addCartRes.json();

      setAddCartGet(addCartJsonData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  return (
    <Layout>
      <div className="w-full h-screen">
        <div className="flex flex-wrap gap-4 justify-center items-center p-10">
          {addCartGet.map((e, index) => (
            <CartCard
              key={index}
              id={e.id}
              category={e.category}
              discount={e.discount}
              models={e.models}
              img={e.img}
              price={e.price}
              sale={e.sale}
              stars={e.stars}
              title={e.title}
              productId={e.productId}
              userId={e.userId}
              fetchAllData={fetchAllData}
            />
          ))}
        </div>
        <h1 className="text-sm font-light text-center py-3">
          No more Add To Cart
        </h1>
      </div>
    </Layout>
  );
};

export default AddToCarts;
