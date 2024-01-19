import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { stateIndia } from "../../utils/dropdown";

const SaveAddress = () => {
  const navigate = useNavigate();
  // POST request in userDetails
  const [detail, setDetail] = useState({
    img: "",
    bio: "",
    mobil: "",
    place: "",
    post: "",
    police: "",
    dist: "",
    pin: "",
    state: "",
  });
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );

  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/userdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        mobil: detail.mobil,
        place: detail.place,
        post: detail.post,
        police: detail.police,
        dist: detail.dist,
        pin: detail.pin,
        state: detail.state,
      }),
    });
    if (res.status === 400) {
      alert("Invalid Credintial!");
    } else {
      await res.json();
    }
    navigate('/userDetail')
  };
  return (
    <div>
      <div className="w-full bg-stone-200 h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-sm md:text-xl text-white px-6">
          Save Address
        </h1>
        <Link
          to={"/"}
          className="py1 px-3 bg-gray-600 text-white font-semibold mx-4"
        >
          Home
        </Link>
      </div>
      <div className="flex justify-center items-center py-6">
        <div className="p-6">
          <form
            onSubmit={(e) => handelSubmit(e)}
            className="grid md:grid-cols-2 md:grid-rows-3 gap-x-4"
          >
            <Input
              label="Mobil No"
              type="mobil"
              name="mobil"
              id="mobil"
              value={detail.mobil}
              onChange={(e) => setDetail({ ...detail, mobil: e.target.value })}
            />
            <Input
              label="Place"
              type="place"
              name="place"
              id="place"
              value={detail.place}
              onChange={(e) => setDetail({ ...detail, place: e.target.value })}
            />
            <Input
              label="Post"
              type="post"
              name="post"
              id="post"
              value={detail.post}
              onChange={(e) => setDetail({ ...detail, post: e.target.value })}
            />
            <Input
              label="Police Station"
              type="police"
              name="police"
              id="police"
              value={detail.police}
              onChange={(e) => setDetail({ ...detail, police: e.target.value })}
            />
            <Input
              label="Dist"
              type="dist"
              name="dist"
              id="dist"
              value={detail.dist}
              onChange={(e) => setDetail({ ...detail, dist: e.target.value })}
            />
            <Input
              label="Pin"
              type="pin"
              name="pin"
              id="pin"
              value={detail.pin}
              onChange={(e) => setDetail({ ...detail, pin: e.target.value })}
            />
            <div
              className="mb-4"
              value={detail.state}
              onChange={(e) => setDetail({ ...detail, state: e.target.value })}
            >
              <h1>Get select State</h1>
              <select className="form-select outline-none border">
                {stateIndia.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <Button label="Add Now!" type="submit" className="rounded" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SaveAddress;
