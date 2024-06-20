import React from "react";
import { Link } from "react-router-dom";

const ManagementSection = () => {
  return (
    <div className="bg-green-400 w-full h-screen flex flex-row justify-center items-center gap-16">
      <Link
        to={"/management/login"}
        className="absolute bottom-0 right-0 px-4 py-1 m-10 bg-orange-400 rounded-lg shadow text-slate-100"
      >
        Management Login
      </Link>
      <Link
        to={"/adminlogin"}
        className="px-4 py-1 bg-blue-700 text-white rounded-md shadow-lg"
      >
        Admin
      </Link>
      <Link
        to={"/deliverylogin"}
        className="px-4 py-1 bg-blue-700 text-white rounded-md shadow-lg"
      >
        Delivery Partner
      </Link>
    </div>
  );
};

export default ManagementSection;
