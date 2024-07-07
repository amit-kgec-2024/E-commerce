import React from 'react'

const FashionCard = ({ img, title, price }) => {
  const deFaultImage = "amitphotos.jpg";
  return (
    <div className="border text-xs shadow p-2 w-[180px] h-[300px] rounded flex flex-col justify-around cursor-pointer">
      <div
        className="w-full h-[80%] text-end bg-opacity-95"
        style={{
          backgroundImage: `url(${img || deFaultImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <h1 className="font-semibold text-lg truncate">{title}</h1>
      <p className="text-black text-sm font-semibold">
        From{"  "}₹{price}
      </p>
    </div>
  );
};

export default FashionCard
