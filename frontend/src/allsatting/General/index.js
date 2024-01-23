import React, { useState } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";

const General = () => {
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  // POST request in userDetails
  const [detail, setDetail] = useState({
    img: "",
    bio: "",
  });
  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", detail.img);
    formData.append("upload_preset", "e-commerse-react");
    formData.append("cloud_name", "dn2tlzn9b");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dn2tlzn9b/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.status === 200) {
      return await res.json();
    } else {
      return "Error";
    }
  };
  //   Submit profile....
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { secure_url } = await uploadImage();
    setImgUrl(secure_url);
    console.log(imgUrl, "ImhUrl :>>");
    const res = await fetch("http://localhost:4000/api/userprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        imgUrl: secure_url,
        bio: detail.bio,
      }),
    });
    if (res.status === 400) {
      alert("Invalid Credintial!");
    } else {
      await res.json();
    }
  };
  return (
    <div className="p-6 flex justify-center items-center">
      <div className="">
        <form className="flex flex-col gap-4" onSubmit={(e) => handelSubmit(e)}>
          <Input
            type="file"
            name="image"
            className="hidden"
            isRequired={false}
            onChange={(ele) =>
              setDetail({ ...detail, img: ele.target.files[0] })
            }
          />
          <label
            htmlFor="image"
            className="border cursor-pointer w-full shadow p-4"
          >
            {detail?.imh?.name || "Uplode Profile"}
          </label>
          <textarea
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            className="outline-none border p-2 text-xs"
            value={detail.bio}
            onChange={(e) => setDetail({ ...detail, bio: e.target.value })}
          />
          <Button label="Add Now!" type="submit" className="rounded" />
        </form>
      </div>
    </div>
  );
};

export default General;
