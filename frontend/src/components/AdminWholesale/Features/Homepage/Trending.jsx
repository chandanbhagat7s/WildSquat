// components/TrendingProducts.jsx
import React from "react";

const TrendingProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover mb-2 rounded-md"
          />
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {product.name}
          </p>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
              View More
            </button>
            <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
              Buy on WhatsApp
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingProducts;
