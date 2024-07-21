import React from 'react'
import { Link } from 'react-router-dom';

const OrderCard = ({ img, title, regNo, orderDate, deliveryDate }) => {
  const deFaultImage = "amitphotos.jpg";

  return (
    <Link
      to={`/order/confrom/${regNo}`}
      className="flex flex-row justify-between items-center w-full border p-3 shadow"
    >
      <div
        className="w-[10rem] h-[10rem]"
        style={{
          backgroundImage: `url(${img || deFaultImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="">
        <h1>{title}</h1>
      </div>
      <div className="">
        <h1>{orderDate}</h1>
        <h1>{deliveryDate}</h1>
      </div>
    </Link>
  );
};

export default OrderCard
