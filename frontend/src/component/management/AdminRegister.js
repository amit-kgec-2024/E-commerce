import Input from "../../component/Input";
import Button from "../../component/Button";
import { useEffect, useState } from "react";

const AdminRegister = () => {
    const [usersData, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/admin/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.loh(error);
      }
    };
    const [data, setData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });

    const handelSubmit = async (e)=> {
        e.preventDefault(e)
        try {
            const res = await fetch(
              `https://e-commerce-nu-seven.vercel.app/api/admin/register`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data }),
              }
            );
            await res.json();
            fetchUsers();
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className="flex h-screen flex-row justify-around items-center bg-gray-100">
      <div className="border rounded shadow p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold uppercase mb-4">welcome</h1>
        <h2 className="text-md font-extralight uppercase mb-8">
          ples register to Admin
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
          <Button type="submit" label={"Sign up"} />
        </form>
      </div>
      <div className="border-4 w-[20rem] h-[30rem] overflow-y-scroll">
        {usersData.map((user) => (
          <div key={user._id} className="bg-teal-300 p-2 my-2">
            <div className="e-full flex flex-row justify-between items-center text-xs">
              <h1 className="">Delivery Patner</h1>
              <button className="px-3 py-1 bg-red-600 rounded-md shadow text-white">
                Remove
              </button>
            </div>
            <div className="overflow-hidden">
              <h1>
                {user.firstname} {user.lastname}{user.username}
              </h1>
              <h1>{user.email}</h1>
              <h1>{user.password}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRegister;
