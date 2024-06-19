import React from 'react'
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { TbBrandVercel } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="p-4 bg-slate-900">
      <div className="flex flex-wrap justify-around gap-4 px-3 py-2">
        <div className="">
          <label className="font-bold text-md md:text-xl text-gray-950">Product</label>
          <h1 className="font-semibold text-sm md:text-lg text-white mt-2">Demo</h1>
          <h1 className="font-semibold text-sm md:text-lg text-white">Pricing</h1>
          <h1 className="font-semibold text-sm md:text-lg text-white">Roadmap</h1>
          <h1 className="font-semibold text-sm md:text-lg text-white">Security FAQ</h1>
          <h1 className="font-semibold text-sm md:text-lg text-white">Features</h1>
        </div>
        <div className="">
          <label className="font-bold text-md md:text-xl text-gray-950">Company</label>
          <h1 className="font-semibold text-sm md:text-lg text-white mt-2">About Us</h1>
          <h1 className="font-semibold text-sm md:text-lg text-white">Careers</h1>
          <h1 className="font-semibold text-sm md:text-lg text-white">Press</h1>
          <h1 className="font-semibold text-sm md:text-lg text-white">Support</h1>
        </div>
        <div className="">
          <label className="font-bold text-md md:text-xl text-gray-950">Resourse</label>
          <h1 className="font-semibold text-sm md:text-lg text-white mt-2">installotion Manual</h1>
          <h1 className="font-semibold text-sm md:text-lg text-white">Relesae Notes</h1>
          <h1 className="font-semibold text-sm md:text-lg text-white">Community Help</h1>
        </div>
        <div className="">
          <label className="font-bold text-md md:text-xl text-gray-950">Connect width us</label>
          <div className="flex flex-row my-4 gap-2 text-xl md:text-2xl text-white">
            <CiFacebook />
            <CiTwitter />
            <CiInstagram />
            <FaGithub />
            <TbBrandVercel />
          </div>
          <label className="font-bold text-md md:text-xl text-gray-950">Stay Up to date with passbolt</label>
          <h1 className="font-semibold text-sm md:text-lg text-white mt-2">
            Elevate your style effortlessly with our curated collection of the
            latest trends. Discover fashion that speaks to you and technology
            that enhances your lifestyle. Your satisfaction is our top priority,
            and we're here to make every shopping experience a joyful one.
          </h1>
        </div>
      </div>
      <div className="text-center py-2 text-white">Created by AMIT | © 2024 All rights reserved.</div>
    </footer>
  );
}

export default Footer
