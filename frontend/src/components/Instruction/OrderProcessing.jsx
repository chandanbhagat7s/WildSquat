import React from "react";
import { FaSpinner } from "react-icons/fa";

const OrderProcessingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FaSpinner className="text-blue-500 text-6xl mb-4 animate-spin" />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Wait</h1>
      <p className="text-gray-600 mb-2">We are processing your order.</p>
      <p className="text-gray-500 text-sm">This may take a few moments.</p>
    </div>
  );
};

export default OrderProcessingPage;
