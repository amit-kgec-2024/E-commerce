import React, { useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      const response = await fetch(
        "https://e-commerce-nu-seven.vercel.app/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        setShowMessage(true);
        setIsSuccess(true);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/admin");
        }, 3000);
      } else {
        setMessage(data.message || "Login failed");
        setShowMessage(true);
      }
      // Hide...
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);

    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during login.");
      setShowMessage(true);
      // Hide...
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center bg-teal-100">
      {showMessage && (
        <div
          className="absolute right-0 top-0 m-12 px-5 py-1 bg-white"
          style={{ color: isSuccess ? "green" : "red" }}
        >
          {message}
        </div>
      )}
      <div className="border rounded shadow-md bg-teal-400 text-white p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold uppercase mb-4">welcome</h1>
        <h2 className="text-md font-extralight uppercase mb-8">
          ples login to Admines
        </h2>
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            type="email"
            label="Email"
            placeholder="email.."
            className="text-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="password.."
            className="text-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" label="Sign in" />
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
