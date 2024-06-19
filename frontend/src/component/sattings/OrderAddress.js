import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const OrderAddress = ({ isAddressSet, handleSelectAddress, selectedAddressId }) => {
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  // Get Request.................
  const [isAddress, setAddress] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rese = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/address/${user.id}`
        );
        const jsonData = await rese.json();
        setAddress(jsonData.userAddresses);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [user.id]);
  return (
    <div className="bg-slate-100 shadow p-4">
      <div className="w-full flex justify-end">
        <Link
          to={"/profile"}
          className="bg-blue-500 px-3 py-2 rounded text-white font-semibold"
        >
          Add New
        </Link>
      </div>
      {isAddress.map((ele, index) => (
        <div className="flex flex-row items-center p-4">
          <input
            type="radio"
            name="address"
            checked={selectedAddressId === ele._id}
            onChange={() => handleSelectAddress(ele._id)}
            className="w-5 h-5"
          />
          <button
            key={index}
            className="w-full my-4 md:px-20 flex flex-col justify-between"
          >
            <h1 className="font-bold">Deliver to:</h1>
            <h1 className="font-light">
              {ele.place}, {ele.post}, {ele.police}, {ele.dist}, {ele.pin},{" "}
              {ele.state}
            </h1>
            <h1 className="font-light">{ele.mobil}</h1>
          </button>
        </div>
      ))}
      <div className="w-full text-blue-500 text-end">
        <button onClick={() => isAddressSet(false)}>Close</button>
      </div>
    </div>
  );
};

export default OrderAddress
