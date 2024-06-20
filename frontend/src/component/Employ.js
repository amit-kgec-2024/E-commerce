import React from 'react'
import { Link } from 'react-router-dom'

const Employ = () => {
  return (
    <div className="bg-green-400 w-full h-screen flex flex-row justify-center items-center gap-16">
      <Link to={"/adminlogin"} className='px-4 py-1 bg-blue-700 text-white rounded-md shadow-lg'>Admin</Link>
      <Link to={"/deliverylogin"} className='px-4 py-1 bg-blue-700 text-white rounded-md shadow-lg'>Delivery Partner</Link>
    </div>
  );
}

export default Employ
