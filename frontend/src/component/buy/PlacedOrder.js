import React, { useEffect, useState } from 'react';
import { AiFillStar } from "react-icons/ai";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";

const PlacedOrder = () => {
  const {id} = useParams();
    const history = useNavigate();
    const [isOrder, setOrder] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const rese = await fetch(
            `https://e-commerce-nu-seven.vercel.app/api/order/${id}`
          );
          const jsonData = await rese.json();
          setOrder(jsonData);
        } catch (error) {
          console.log("Error Fetching Data", error);
        }
      };
      fetchData();
    }, [id]);
    // FDF file downloads.................
    const handleDownload = () => {
    const doc = new jsPDF();

    doc.text("Order Details", 10, 10);
    doc.text(`Order ID: ${isOrder._id}`, 10, 20);
    doc.text(`Delivered to: ${isOrder.firstname} ${isOrder.lastname}`, 10, 30);
    doc.text(`Mobile: ${isOrder.mobile}`, 10, 40);
    doc.text(`Email: ${isOrder.email}`, 10, 50);
    doc.text(`Address: ${isOrder.place} ${isOrder.post} ${isOrder.police} ${isOrder.dist} ${isOrder.pin} ${isOrder.state} ${isOrder.mobil}`, 10, 60);
    doc.text(`Product: ${isOrder.title}`, 10, 70);
    doc.text(`Category: ${isOrder.category}`, 10, 80);
    doc.text(`Discount: ${isOrder.discount}% off`, 10, 90);
    doc.text(`Price: ₹${isOrder.price}`, 10, 100);
    doc.text(`Stars: ${isOrder.stars}`, 10, 110);
    doc.text(`Items: ${isOrder.items}`, 10, 120);
    doc.text(`Order Date: ${isOrder.orderDate}`, 10, 130);
    doc.text(`Delivery Date: ${isOrder.deliveryDate}`, 10, 140);
    doc.text(`Delivery Type: ${isOrder.payType}`, 10, 150);
    doc.text(`Total Amount: ₹${isOrder.totalAmount}`, 10, 160);
    doc.text(`You will save ₹${isOrder.amountSave} on this order`, 10, 170);

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
        {isOrder._id}
      </h1>
      <div className="">
        <h1 className="font-bold">Delivered to :-</h1>
        <div className="">
          <h1 className="">
            {isOrder.firstname} {isOrder.lastname}
          </h1>
          <h1 className="">{isOrder.mobile}</h1>
          <h1 className="">{isOrder.email}</h1>
        </div>
        <div className=" flex flex-row gap-3 w-full items-center py-2">
          {isOrder.place}{" "}
          {isOrder.post}{" "}
          {isOrder.police}{" "}
          {isOrder.dist}{" "}
          {isOrder.pin}{" "}
          {isOrder.state}{" "}
          {isOrder.mobil}
        </div>
        <div className="flex flex-row-reverse gap-8 items-center justify-center">
          <div className="">
            <h1 className="font-bold text-xl">
              {isOrder.title}
            </h1>
            <h1 className="uppercase">
              {isOrder.category}
            </h1>
            <h1 className="text-green-400">
              {isOrder.discount}%off
            </h1>
            <del className="text-slate-400">
              ₹{isOrder.price}
            </del>
            <h1 className="flex flex-row gap-1 items-center px-3 py-1 text-yellow-500">
              {isOrder.stars}
              <AiFillStar />
            </h1>
            <h1 className="w-[45rem]">
              {isOrder.models}
            </h1>
            <h1 className="">Items:- {isOrder.items}</h1>
            <h1 className="">
              Order Date -{isOrder.orderDate}
            </h1>
            <h1 className="">
              Delivery Date -{isOrder.deliveryDate}
            </h1>
            <h1 className="">
              Delivery Type -{isOrder.payType}
            </h1>
          </div>
          <img src={isOrder.img} width={300} alt={isOrder.title} />
        </div>

        <div className="w-full flex flex-col font-light gap-2">
          <h1 className="text-xl font-bold py-2">Price Details</h1>
          <div className="w-full flex flex-row items-center justify-between">
            <h1 className="">
              Price ({isOrder.items} item)
            </h1>
            <h1 className="">
              ₹
              {isOrder.items *
                isOrder.price}
            </h1>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <h1 className="">Discount</h1>
            <h1 className="text-black">₹{isOrder.amountSave}</h1>
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
            <h1 className="">₹{isOrder.totalAmount}</h1>
          </div>
          <h1 className="font-bold text-lg text-green-500">
            You will save ₹{isOrder.amountSave} on this order
          </h1>
        </div>
      </div>
    </div>
  );
}

export default PlacedOrder
