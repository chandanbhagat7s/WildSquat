import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import LoadingSpinner from "../common/Spinner";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const nevigat = useNavigate();
  return (
    <div className="flex  items-center justify-around min-h-screen bg-gray-100 px-3">
      <div>
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => nevigat("/")}
        >
          Go Home
        </button>
      </div>
      <div className="border border-gray-300 h-48 mx-10"></div>
      <LoadingSpinner justLoad={true} />
    </div>
  );
};

export default PageNotFound;
