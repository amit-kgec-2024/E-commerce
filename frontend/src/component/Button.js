import React from "react";

const Button = ({ label = "", className = "" }) => {
  return (
    <button
      className={`px-4 uppercase py-2 text-sm rounded-sm bg-blue-400 text-white font-bold ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
