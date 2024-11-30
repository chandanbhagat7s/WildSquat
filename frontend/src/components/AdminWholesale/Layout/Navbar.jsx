import React from "react";
import { Link } from "react-router-dom";

import logo from "./../../../assets/logo.jpeg";

export default function Navbar() {
  return (
    <div className="w-full fixed top-0 z-50 bg-white  shadow-lg">
      <div className="py-5">
        <Link to="/wholesale" className="flex items-center space-x-2">
          <img src={logo} alt="Wild Squat Logo" className="scale-125 h-12" />
          <span className="font-bold text-lg text-gray-800 font-serif ">
            WILDSQUAT
          </span>
        </Link>
      </div>
    </div>
  );
}
