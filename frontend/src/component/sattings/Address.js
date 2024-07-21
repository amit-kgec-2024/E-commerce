import React, { useEffect, useState } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

const Address = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isShowBox, setIsShowBox] = useState();
  const handelBox = ()=>{
    setIsShowBox(!isShowBox);
  }
  const [isMenu, setIsMenu] = useState();
  const [editId, setEditId] = useState(null);
  const handelMenu = (index, id) => {
    setIsHovered(index);
    setEditId(id);
    setIsMenu(true);
    // Fetch address details to populate the form
    const selectedAddress = isAddress.find((address) => address._id === id);
    if (selectedAddress) {
      setDetail({
        mobil: selectedAddress.mobil,
        place: selectedAddress.place,
        post: selectedAddress.post,
        police: selectedAddress.police,
        dist: selectedAddress.dist,
        pin: selectedAddress.pin,
        state: selectedAddress.state,
      });
    }
  };
  // POST request in userDetails
  const [detail, setDetail] = useState({
    mobil: "",
    place: "",
    post: "",
    police: "",
    dist: "",
    pin: "",
    state_id: "",
    district_id: "",
  });
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user:details")) || {}
  );
  const userId = user.id;
  // get Address......................
  const [isAddress, setIsAddress] = useState([]);
  const [isUsers, setIsUsers] = useState({});
  useEffect(()=>{
    fetchAddress(userId);
  }, [userId])
  const fetchAddress = async (userId)=>{
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/address/${userId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setIsAddress(data.userAddresses);
      setIsUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }
  // PUT address.....................
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/address/update/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(detail),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      await response.json();
      setIsMenu(false);
      fetchAddress(userId);
    } catch (error) {
      console.error("Error updating address:", error.message);
    }
  };
  // DELETE address.....................
 const handleSubmitRemove = async (id) => {
   try {
     const response = await fetch(
       `https://e-commerce-nu-seven.vercel.app/api/address/remove/${id}`,
       {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     if (!response.ok) {
       throw new Error(`Error: ${response.statusText}`);
     }
     console.log("Address deleted successfully");
     fetchAddress(userId); // Refresh the address list
   } catch (error) {
     console.error("Error deleting address:", error.message);
   }
 };
  // post address.....................
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/address`,
        {
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
            state_id: detail.state_id,
            district_id: detail.district_id,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      await res.text();
      fetchAddress(userId);
      setIsShowBox(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedState, setSelectedState] = useState("");
  const [isState, setIsState] = useState([]);
  const [isDistrict, setIsDistrict] = useState([]);
   useEffect(() => {
     const fetchState = async () => {
       try {
         const response = await fetch(
           "https://e-commerce-nu-seven.vercel.app/state/list"
         );
         if (!response.ok) {
           throw new Error("Network response was not ok");
         }
         const dataState = await response.json();
         setIsState(dataState);
       } catch (error) {
         console.log(error);
       }
     };
     fetchState();
   }, []);
   useEffect(() => {
     if (selectedState) {
       const fetchDistricts = async () => {
         try {
           const response = await fetch(
             `https://e-commerce-nu-seven.vercel.app/state/district/${selectedState}`
           );
           if (!response.ok) {
             throw new Error("Network response was not ok");
           }
           const dataDist = await response.json();
           setIsDistrict(dataDist);
         } catch (error) {
           console.log(error);
         }
       };
       fetchDistricts();
     }
   }, [selectedState]);
   const handleStateChange = (event) => {
     const stateId = event.target.value;
     setSelectedState(stateId);
     setDetail((prevstep2) => ({ ...prevstep2, state_id: stateId }));
   };
    const handleDistrictChange = (event) => {
      const districtId = event.target.value;
      setDetail((prevstep2) => ({ ...prevstep2, district_id: districtId }));
    };
  return (
    <div>
      <div className="">
        <h1 className="text-lg font-bold p-2">Manage Addresses</h1>
        <button
          onClick={handelBox}
          className={`${
            isShowBox
              ? "hidden"
              : "bg-white uppercase text-blue-600 border w-full flex flex-row gap-5 p-3 items-center"
          }`}
        >
          <FaPlus />
          <span>Add a new address</span>
        </button>
      </div>
      {/* Addresss POST */}
      {isShowBox && (
        <div className="flex justify-center items-center py-6 border bg-white">
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
                maxLength={10}
                onChange={(e) =>
                  setDetail({ ...detail, mobil: e.target.value })
                }
              />
              <Input
                label="Place"
                type="place"
                name="place"
                id="place"
                value={detail.place}
                onChange={(e) =>
                  setDetail({ ...detail, place: e.target.value })
                }
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
                onChange={(e) =>
                  setDetail({ ...detail, police: e.target.value })
                }
              />
              <Input
                label="Pin"
                type="pin"
                name="pin"
                id="pin"
                value={detail.pin}
                onChange={(e) => setDetail({ ...detail, pin: e.target.value })}
              />
              {/* 000000000000000000 */}
              <div className="w-full flex flex-col">
                <label htmlFor="state">State</label>
                <select
                  onChange={handleStateChange}
                  value={selectedState}
                  className="border-gray-400 border outline-none p-2"
                  id="state"
                >
                  <option value="">Select State</option>
                  {isState.map((state) => (
                    <option key={state._id} value={state.state_id}>
                      {state.state_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="district">District</label>
                <select
                  id="district"
                  onChange={handleDistrictChange}
                  className="border-gray-400 border outline-none p-2"
                >
                  <option value="">Select District</option>
                  {isDistrict.map((district) => (
                    <option key={district._id} value={district.district_id}>
                      {district.district_name}
                    </option>
                  ))}
                </select>
              </div>
              <Button label="Add Now!" type="submit" className="rounded" />
              <button
                onClick={() => setIsShowBox(false)}
                className="bg-blue-500 text-white border p-3"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Address map Get........... */}
      <div className={`${isMenu ? "hidden" : "mt-10"}`}>
        {isAddress.map((ele, index) => (
          <div key={index} className="border p-4 flex flex-col gap-3 bg-white">
            <div className="w-full flex justify-end">
              <button
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative"
              >
                <BsThreeDotsVertical />
                {isHovered === index && (
                  <div className="absolute p-2 shadow bg-slate-100 right-0">
                    <button
                      onClick={() => handelMenu(index, ele._id)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button className="text-black">Primary</button>
                    <button
                      onClick={() => handleSubmitRemove(ele._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </button>
            </div>
            <div className="flex uppercase flex-row items-center gap-3 font-semibold">
              <span>{isUsers?.firstname}</span>
              <span>{isUsers?.lastname}</span>
              <span>{isUsers?.mobile}</span>
            </div>
            <div className="flex uppercase flex-row items-center gap-3">
              <span>{ele.place}</span>
              <span>{ele.police}</span>
              <span>{ele.district_id}</span>
              <span>{ele.pin}</span>
              <span>{ele.state_id}</span>
              <span>{ele.mobil}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Address EDIT */}
      {isMenu && (
        <div className="flex justify-center mt-10 items-center py-6 border bg-white">
          <div className="p-6">
            <form
              onSubmit={(e) => handleSubmitEdit(e)}
              className="grid md:grid-cols-2 md:grid-rows-3 gap-x-4"
            >
              <Input
                label="Mobil No"
                type="mobil"
                name="mobil"
                id="mobil"
                value={detail.mobil}
                onChange={(e) =>
                  setDetail({ ...detail, mobil: e.target.value })
                }
              />
              <Input
                label="Place"
                type="place"
                name="place"
                id="place"
                value={detail.place}
                onChange={(e) =>
                  setDetail({ ...detail, place: e.target.value })
                }
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
                onChange={(e) =>
                  setDetail({ ...detail, police: e.target.value })
                }
              />
              <Input
                label="Pin"
                type="pin"
                name="pin"
                id="pin"
                value={detail.pin}
                onChange={(e) => setDetail({ ...detail, pin: e.target.value })}
              />
              {/* 000000000000000000 */}
              <div className="w-full flex flex-col">
                <label htmlFor="state">State</label>
                <select
                  onChange={handleStateChange}
                  value={selectedState}
                  className="border-gray-400 border outline-none p-2"
                  id="state"
                >
                  <option value="">Select State</option>
                  {isState.map((state) => (
                    <option key={state._id} value={state.state_id}>
                      {state.state_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="district">District</label>
                <select
                  id="district"
                  onChange={handleDistrictChange}
                  className="border-gray-400 border outline-none p-2"
                >
                  <option value="">Select District</option>
                  {isDistrict.map((district) => (
                    <option key={district._id} value={district.district_id}>
                      {district.district_name}
                    </option>
                  ))}
                </select>
              </div>
              <Button label="Add Now!" type="submit" className="rounded" />
              <button
                onClick={() => setIsMenu(false)}
                className="bg-blue-500 text-white border p-3"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
