import React from "react";
import { FaDumbbell } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex flex-col md:flex-row items-center justify-around">
        {/* Image Section */}
        <div className="md:w-1/3 relative h-[600px] w-full">
          {/* Top-left image */}
          <img
            src="https://fuaark.com/cdn/shop/files/WhatsApp_Image_2024-09-13_at_6.34.52_PM.jpg?v=1726248687&width=400"
            alt="Woman with basketball"
            className="absolute top-0 left-0 w-48 h-64 object-cover z-40 rounded-lg shadow-lg"
          />

          {/* Middle-right image */}
          <img
            src="https://fuaark.com/cdn/shop/files/WhatsApp_Image_2024-09-13_at_6.34.52_PM.jpg?v=1726248687&width=400"
            alt="Man in black outfit"
            className="absolute top-16 right-0 w-72 h-96 object-cover z-30 rounded-lg shadow-lg"
          />

          {/* Bottom-left image */}
          <img
            src="https://fuaark.com/cdn/shop/files/WhatsApp_Image_2024-09-13_at_6.34.52_PM.jpg?v=1726248687&width=400"
            alt="Woman in workout gear"
            className="absolute bottom-0 left-0 w-56 h-72 object-cover z-40 rounded-lg shadow-lg"
          />

          {/* Bottom-right image */}
          <img
            src="https://fuaark.com/cdn/shop/files/WhatsApp_Image_2024-09-13_at_6.34.52_PM.jpg?v=1726248687&width=400"
            alt="Man working out"
            className="absolute bottom-5 right-5 w-40 h-48 object-cover z-40 rounded-lg shadow-lg"
          />
        </div>
        {/* Text Section */}
        <div className="md:w-1/2 mb-8 md:mb-0 ">
          <h2 className="text-sm font-bold mb-4 uppercase tracking-wider">
            JOIN THE FUAARK COMMUNITY
          </h2>
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Fuaark's gym wear exceeds all expectations, combining unparalleled
            quality
          </h1>
          <button className="bg-blue-800 text-white px-6 py-3 rounded-md flex items-center hover:bg-blue-700 transition duration-300">
            <FaDumbbell className="mr-2" />
            Join the Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
