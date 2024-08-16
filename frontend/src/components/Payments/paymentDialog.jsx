import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import url from "../../assets/url";

const BuyNowPopup = ({ quantity, setQuantity, product, onClose, onPay }) => {
  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Confirm Purchase</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4">
          <img
            src={`${url}img/${product.coverImage}`}
            alt={product.name}
            className="mx-auto h-48 object-cover rounded-lg"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 px-2 py-1 rounded-l"
            >
              -
            </button>
            <span className="bg-gray-100 px-4 py-1">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 px-2 py-1 rounded-r"
            >
              +
            </button>
          </div>
          <p className="text-lg font-bold text-gray-800">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => onPay(quantity, totalPrice)}
            className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Pay Now
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPopup;
