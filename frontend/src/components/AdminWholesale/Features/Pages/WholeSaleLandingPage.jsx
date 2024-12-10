import React from "react";

import logo from "./../../../../assets/logo.jpeg";
export default function WholeSaleLandingPage() {
  return (
    <div className="h-[80vh]  flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center space-y-5  ">
        <div>
          <img
            src={logo}
            alt="Wild Squat Logo"
            className="scale-125 h-[20vh] animate-pulse"
          />
        </div>
        <h1 className="text-2xl font-semibold ">
          Welcome to Wholesale Dashboard
        </h1>
      </div>
    </div>
  );
}
