import React from "react";
import { useNavigate } from "react-router-dom";


const DeliveryPartner = () => {
  // LOG Out................
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("user:token");
    window.localStorage.removeItem("user:details");
    navigate("/account/signin");
  };

  return (
    <div className="flex flex-col w-full h-screen bg-blend-darken">
      <div className="flex flex-none justify-between items-center w-full p-4 shadow-md">
        <h1 className="">Delivery</h1>
        <button onClick={()=> logOut()}>LogOut</button>
      </div>
      <div className="w-full flex flex-row">
        <div className="w-[10rem] shadow-md h-screen p-3">e</div>
        <div className="">e</div>
      </div>
    </div>
  );
};

export default DeliveryPartner;
