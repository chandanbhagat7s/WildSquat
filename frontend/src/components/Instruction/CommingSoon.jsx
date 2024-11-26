import React from "react";
import { FaHourglassHalf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FaHourglassHalf className="text-blue-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Coming Soon</h1>
      <p className="text-gray-600 mb-8">
        This page is under construction and will be available soon.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
};

export default ComingSoonPage;
