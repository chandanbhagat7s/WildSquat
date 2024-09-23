import React from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccessDeniedPage = () => {
  const nevigat = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-8">
        You don't have permission to access this page.
      </p>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => nevigat("/")}
      >
        Go Back
      </button>
    </div>
  );
};

export default AccessDeniedPage;
