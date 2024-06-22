import React, { useState } from 'react'
import DeliveryRegister from './DeliveryRegister';
import AdminRegister from './AdminRegister';
import { useNavigate } from 'react-router-dom';

const Management = () => {
  const [isManagement, setIsManagement] = useState("admin");
  const handelManagement = (toggleManagement) => {
    setIsManagement(toggleManagement);
  };
  // LOG Out................
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("user:token");
    window.localStorage.removeItem("user:details");
    navigate("/account/signin");
  };
  return (
    <div className="w-full h-screen bg-teal-100 flex flex-col overflow-hidden">
      <div className="w-full py-4 px-6 bg-teal-300 shadow flex flex-row items-center justify-between">
        <span>Employes</span>
        <button onClick={() => logOut()}>Logout</button>
      </div>
      <div className="flex flex-row w-full h-screen justify-start">
        <div className="w-[10rem] shadow bg-teal-200 py-5 mx-h-screen flex flex-col justify-start font-semibold text-slate-400">
          <button
            onClick={() => handelManagement("admin")}
            className={`text-start p-3  ${
              isManagement === "admin"
                ? "bg-teal-300 text-black"
                : "hover:bg-teal-300 hover:text-black"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => handelManagement("delivery")}
            className={`text-start p-3  ${
              isManagement === "delivery"
                ? "bg-teal-300 text-black"
                : "hover:bg-teal-300 hover:text-black"
            }`}
          >
            Delivery Patner
          </button>
        </div>
        <div className="w-full">
          {isManagement === "admin" && <AdminRegister />}
          {isManagement === "delivery" && <DeliveryRegister />}
        </div>
      </div>
    </div>
  );
}

export default Management
