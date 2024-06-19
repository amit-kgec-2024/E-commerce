import React, { useEffect, useState } from "react";

const ProfileInformation = () => {
  const [isName, setIsName] = useState();
  const handelName = () => {
    setIsName(!isName);
  };
  const [isEmail, setIsEmail] = useState();
  const handelEmail = () => {
    setIsEmail(!isEmail);
  };
  
  const [isMobile, setIsMobile] = useState();
  const handelMobile = () => {
    setIsMobile(!isMobile);
  };
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const userId = user.id;
  // User Data show--------------
  const [isData, setIsdata] = useState()
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);
  const fetchUser = async (userId) => {
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/users/${userId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setIsdata(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  // Mobile update................
  const [mobile, setMobile] = useState("");
  const handelSaveMobile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/mobile/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await response.text();
      fetchUser(userId);
      setIsMobile(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // Email update................
  const [email, setEmail] = useState("");
  const handelSaveEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/email/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await response.text();
      fetchUser(userId);
      setIsEmail(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // Mobile update................
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const handelSaveUsername = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/usernamd/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname, lastname, gender }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await response.text();
      setIsName(false);
      fetchUser(userId);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="w-full flex gap-3">
        <span className="text-xl font-bold">Personal Information</span>
        {isName ? (
          <button onClick={() => setIsName(false)} className="text-blue-600">
            Cancel
          </button>
        ) : (
          <button onClick={handelName} className="text-blue-600">
            Edit
          </button>
        )}
      </div>
      <div className="">
        {isName && (
          <div className="flex flex-row gap-3 py-3">
            <input
              type="text"
              placeholder={isData?.firstname}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="outline-none px-3"
            />
            <input
              type="text"
              placeholder={isData?.lastname}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="outline-none px-3"
            />
            <button
              onClick={handelSaveUsername}
              className="uppercase px-8 py-2 bg-blue-500 text-white"
            >
              Save
            </button>
          </div>
        )}
        <div
          className={`${isName ? "hidden" : "flex flex-row w-full gap-3 py-3"}`}
        >
          <h1 className="border w-[13rem] py-2 px-3 bg-slate-50 text-slate-400 cursor-not-allowed">
            {isData?.firstname}
          </h1>
          <h1 className="border w-[13rem] py-2 px-3 bg-slate-50 text-slate-400 cursor-not-allowed">
            {isData?.lastname}
          </h1>
        </div>
        <h1 className="">Your Gender</h1>
        <div
          className={`${
            isName ? "text-slate-600" : "text-black"
          } text-xl flex flex-row gap-4`}
        >
          <input
            type="radio"
            name="gender"
            value={"Male"}
            onChange={(e) => setGender(e.target.value)}
            className=""
            id="male"
            checked={isData?.gender === "Male"}
            disabled={!isName}
          />
          <label
            htmlFor="male"
            className={`${!isName ? "cursor-not-allowed" : ""}`}
          >
            Male
          </label>
          <input
            type="radio"
            name="gender"
            className=""
            value={"Femal"}
            onChange={(e) => setGender(e.target.value)}
            id="female"
            checked={isData?.gender === "Femal"}
            disabled={!isName}
          />
          <label
            htmlFor="female"
            className={`${!isName ? "cursor-not-allowed" : ""}`}
          >
            Female
          </label>
        </div>
      </div>
      {/* Email set..................... */}
      <div className="w-full flex gap-3">
        <span className="text-xl font-bold">Email Address</span>
        {isName ? (
          <button onClick={() => setIsEmail(false)} className="text-blue-600">
            Cancel
          </button>
        ) : (
          <button onClick={handelEmail} className="text-blue-600">
            Edit
          </button>
        )}
      </div>
      <div className="">
        {isEmail && (
          <div className="flex flex-row gap-3 py-3">
            <input
              type="text"
              placeholder={isData?.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none px-3"
            />
            <button
              onClick={handelSaveEmail}
              className="uppercase px-8 py-2 bg-blue-500 text-white"
            >
              Save
            </button>
          </div>
        )}
        <div
          className={`${
            isEmail ? "hidden" : "flex flex-row w-full gap-3 py-3"
          }`}
        >
          <h1 className="border w-[13rem] py-2 px-3 bg-slate-50 text-slate-400 cursor-not-allowed">
            {isData?.email}
          </h1>
        </div>
      </div>
      {/* Mobile Save............ */}
      <div className="w-full flex gap-3">
        <span className="text-xl font-bold">Mobile Number</span>
        {isMobile ? (
          <button onClick={() => setIsMobile(false)} className="text-blue-600">
            Cancel
          </button>
        ) : (
          <button onClick={handelMobile} className="text-blue-600">
            Edit
          </button>
        )}
      </div>
      <div className="">
        {isMobile && (
          <div className="flex flex-row gap-3 py-3">
            <input
              type="text"
              placeholder={isData?.mobile}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="outline-none px-3"
            />
            <button
              onClick={handelSaveMobile}
              className="uppercase px-8 py-2 bg-blue-500 text-white"
            >
              Save
            </button>
          </div>
        )}
        <div
          className={`${
            isMobile ? "hidden" : "flex flex-row w-full gap-3 py-3"
          }`}
        >
          <h1 className="border w-[13rem] py-2 px-3 bg-slate-50 text-slate-400 cursor-not-allowed">
            {isData?.mobile}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
