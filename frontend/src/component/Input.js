import React from "react";

const Input = ({
  name = "",
  label = "",
  type = "text",
  placeholder = "",
  value = "",
  className = "",
  onChange = () => null,
  isRequired = true,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          className="block text-black font-bold text-sm mb-2"
          for={name}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
        className={`rounded border shadow px-3 outline-none py-2 appearance-none w-full ${className}`}
      />
    </div>
  );
};

export default Input;
