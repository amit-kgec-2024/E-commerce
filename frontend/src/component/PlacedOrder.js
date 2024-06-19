import React, { useEffect, useState } from 'react';
import { AiFillStar } from "react-icons/ai";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const PlacedOrder = () => {
    const history = useNavigate();
    // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
    const [isOrderAddress, setOrderAddress] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const rese = await fetch(
            `https://e-commerce-nu-seven.vercel.app/api/order/${user.id}`
          );
          const jsonData = await rese.json();
          setOrderAddress(jsonData);
          console.log(jsonData);
        } catch (error) {
          console.log("Error Fetching Data", error);
        }
      };
      fetchData();
    }, [user.id]);
    const discounts = {
      discount:
        (isOrderAddress?.productDetails?.price /
          isOrderAddress?.productDetails?.discount) *
        isOrderAddress?.lastOrder?.items
    };
    const total = {
      total:
        isOrderAddress?.lastOrder?.items *
          isOrderAddress?.productDetails?.price -
        discounts.discount,
    };
    // FDF file downloads.................
    const handleDownload = () => {
    const doc = new jsPDF();

    doc.text("Order Details", 10, 10);
    doc.text(`Order ID: ${isOrderAddress?.lastOrder?._id}`, 10, 20);
    doc.text(`Delivered to: ${isOrderAddress?.user?.firstname} ${isOrderAddress?.user?.lastname}`, 10, 30);
    doc.text(`Mobile: ${isOrderAddress?.user?.mobile}`, 10, 40);
    doc.text(`Email: ${isOrderAddress?.user?.email}`, 10, 50);
    doc.text(`Address: ${isOrderAddress?.addressDetails?.place} ${isOrderAddress?.addressDetails?.post} ${isOrderAddress?.addressDetails?.police} ${isOrderAddress?.addressDetails?.dist} ${isOrderAddress?.addressDetails?.pin} ${isOrderAddress?.addressDetails?.state} ${isOrderAddress?.addressDetails?.mobil}`, 10, 60);
    doc.text(`Product: ${isOrderAddress?.productDetails?.title}`, 10, 70);
    doc.text(`Category: ${isOrderAddress?.productDetails?.category}`, 10, 80);
    doc.text(`Discount: ${isOrderAddress?.productDetails?.discount}% off`, 10, 90);
    doc.text(`Price: ₹${isOrderAddress?.productDetails?.price}`, 10, 100);
    doc.text(`Stars: ${isOrderAddress?.productDetails?.stars}`, 10, 110);
    doc.text(`Items: ${isOrderAddress?.lastOrder?.items}`, 10, 120);
    doc.text(`Order Date: ${isOrderAddress?.lastOrder?.orderDate}`, 10, 130);
    doc.text(`Delivery Date: ${isOrderAddress?.lastOrder?.deliveryDate}`, 10, 140);
    doc.text(`Delivery Type: ${isOrderAddress?.lastOrder?.payType}`, 10, 150);
    doc.text(`Total Amount: ₹${total.total}`, 10, 160);
    doc.text(`You will save ₹${discounts.discount} on this order`, 10, 170);

    doc.save("order-details.pdf");
    history("/");
  };
  return (
    <div className="px-16 py-10">
      <div className="w-full flex justify-end">
        <button onClick={handleDownload} className="text-blue-500">
          Invoice Download
        </button>
      </div>
      <h1 className="py-4">
        Order ID:-{""}
        {isOrderAddress?.lastOrder?._id}
      </h1>
      <div className="">
        <h1 className="font-bold">Delivered to :-</h1>
        <div className="">
          <h1 className="">
            {isOrderAddress?.user?.firstname} {isOrderAddress?.user?.lastname}
          </h1>
          <h1 className="">{isOrderAddress?.user?.mobile}</h1>
          <h1 className="">{isOrderAddress?.user?.email}</h1>
        </div>
        <div className=" flex flex-row gap-3 w-full items-center py-2">
          {isOrderAddress?.addressDetails?.place}{" "}
          {isOrderAddress?.addressDetails?.post}{" "}
          {isOrderAddress?.addressDetails?.police}{" "}
          {isOrderAddress?.addressDetails?.dist}{" "}
          {isOrderAddress?.addressDetails?.pin}{" "}
          {isOrderAddress?.addressDetails?.state}{" "}
          {isOrderAddress?.addressDetails?.mobil}
        </div>
        <div className="flex flex-row-reverse items-center justify-center">
          <div className="">
            <h1 className="font-bold text-xl">
              {isOrderAddress?.productDetails?.title}
            </h1>
            <h1 className="uppercase">
              {isOrderAddress?.productDetails?.category}
            </h1>
            <h1 className="text-green-400">
              {isOrderAddress?.productDetails?.discount}%off
            </h1>
            <del className="text-slate-400">
              ₹{isOrderAddress?.productDetails?.price}
            </del>
            <h1 className="flex flex-row gap-1 items-center px-3 py-1 text-yellow-500">
              {isOrderAddress?.productDetails?.stars}
              <AiFillStar />
            </h1>
            <h1 className="w-[25rem]">
              {isOrderAddress?.productDetails?.models}
            </h1>
            <h1 className="">Items:- {isOrderAddress?.lastOrder?.items}</h1>
            <h1 className="">
              Order Date -{isOrderAddress?.lastOrder?.orderDate}
            </h1>
            <h1 className="">
              Delivery Date -{isOrderAddress?.lastOrder?.deliveryDate}
            </h1>
            <h1 className="">
              Delivery Type -{isOrderAddress?.lastOrder?.payType}
            </h1>
          </div>
          <img src={isOrderAddress?.productDetails?.img} width={500} alt="" />
        </div>

        <div className="w-full flex flex-col font-light gap-2">
          <h1 className="text-xl font-bold py-2">Price Details</h1>
          <div className="w-full flex flex-row items-center justify-between">
            <h1 className="">
              Price ({isOrderAddress?.lastOrder?.items} item)
            </h1>
            <h1 className="">
              ₹
              {isOrderAddress?.lastOrder?.items *
                isOrderAddress?.productDetails?.price}
            </h1>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <h1 className="">Discount</h1>
            <del className="text-green-500">-₹{discounts.discount}</del>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <h1 className="">Delivery Charge</h1>
            <h1 className="">
              <del>₹40</del>
              <span className="text-green-400">FREE Delivery</span>
            </h1>
          </div>
          <div className="w-full flex flex-row items-center justify-between border-y-2 py-2 font-semibold">
            <h1 className="">Total Amount</h1>
            <h1 className="">₹{total.total}</h1>
          </div>
          <h1 className="font-bold text-lg text-green-500">
            You will save ₹{discounts.discount} on this order
          </h1>
        </div>
      </div>
    </div>
  );
}

export default PlacedOrder
