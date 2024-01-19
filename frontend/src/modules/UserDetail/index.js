import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserDetail = () => {
  // User Details
  const [user] = useState(() => JSON.parse(localStorage.getItem("user:details")) || {} );
  // GET request in Profile.......................
  const [useProfile, setUseProfile] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/userprofileget/${user.id}`
        );
        const jsonData = await res.json();
        setUseProfile(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [user.id]);
  // Get Addresss Request.................
  const [getAdd, setGetAdd] = useState([])
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const res = await fetch(`http://localhost:4000/api/userdetails/${user.id}`);
        const jsonData = await res.json();
        setGetAdd(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    }
    fetchData();
  }, [user.id])
  return (
    <div className="bg-zinc-100 flex flex-col h-screen">
      <div className="w-full bg-stone-200 h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-sm md:text-xl text-white px-6">
          User Details
        </h1>
        <Link
          to={"/"}
          className="py1 px-3 bg-gray-600 text-white font-semibold mx-4"
        >
          Home
        </Link>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="">
          {useProfile.map((e, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={e.profile.img}
                alt="Bird"
                className="w-[100px] h-[100px] border rounded-full my-3"
              />
              <label className='w-full font-bold mb-2 text-blue-600'>Bio: </label>
              <h1 className="border border-zinc-700 w-[200px] h-[150px] p-2 text-xs overflow-y-clip shadow bg-stone-400 text-white">
                {e.profile.bio}
              </h1>
            </div>
          ))}
          {getAdd.map((ele, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex flex-col p-4">
                <h1 className="font-bold">Name: <span className='text-stone-400 font-semibold'>{user.username}</span></h1>
                <h1 className="font-bold">Email: <span className='text-stone-400 font-semibold'>{user.email}</span></h1>
                <h1 className="font-bold">Mobil No: <span className='text-stone-400 font-semibold'>{ele.details.mobil}</span></h1>
              </div>
            </div>
          ))}
        </div>

        <div className="">
          {getAdd.map((ele, index) => (
            <div key={index} className="flex flex-col items-center">
              <label className="font-bold w-full text-sm md:text-base text-blue-500">
                Address
              </label>
              <div className="flex flex-col p-4">
                <h1 className="font-bold">Place: <span className='text-stone-400 font-semibold'>{ele.details.place}</span></h1>
                <h1 className="font-bold">Post: <span className='text-stone-400 font-semibold'>{ele.details.post}</span></h1>
                <h1 className="font-bold"> Police Station: <span className='text-stone-400 font-semibold'>{ele.details.police}</span></h1>
                <h1 className="font-bold">District: <span className='text-stone-400 font-semibold'>{ele.details.dist}</span></h1>
                <h1 className="font-bold">Pin: <span className='text-stone-400 font-semibold'>{ele.details.pin}</span></h1>
                <h1 className="font-bold">State: <span className='text-stone-400 font-semibold'>{ele.details.state}</span></h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDetail
