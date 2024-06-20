import Input from "../../component/Input";
import Button from "../../component/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryRegister = () => {
  const navigate = useNavigate();
  const username = {
    firstname: "",
    lastname: "",
  };
  const [data, setData] = useState({
    username ,
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault(e);
    const res = await fetch(
      `https://e-commerce-nu-seven.vercel.app/api/delivery/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      }
    );

    if (res.status === 200) {
        const { token, user } = await res.json();
        console.log(token, user, "response");
        localStorage.setItem("user:token", token);
        localStorage.setItem("user:details", JSON.stringify(user));
        navigate("/");
        alert("Registration successful!");
        navigate("/account/signin");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="flex h-screen flex-row justify-around items-center bg-gray-100"
    >
      <div className="border rounded shadow p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold uppercase mb-4">
          welcome 
        </h1>
        <h2 className="text-md font-extralight uppercase mb-8">
          ples register to delivery patner
        </h2>
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => handelSubmit(e)}
        >
            <Input
              type="text"
              label="First Name"
              placeholder="firstname.."
              value={data.firstname}
              onChange={(e) => setData({ ...data, firstname: e.target.value })}
            />
            <Input
              type="text"
              label="Last Name"
              placeholder="lastname.."
              value={data.lastname}
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
            />
          <Input
            type="email"
            label="Email"
            placeholder="email.."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            type="password"
            label="Password"
            placeholder="password.."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button type="submit" label="Register" />
        </form>
      </div>
    </div>
  );
}

export default DeliveryRegister;
