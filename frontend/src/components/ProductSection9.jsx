// src/ProductListing3.js
import React from "react";

const products = [
  {
    id: 1,
    name: "Premium T-Shirt",
    description: "High-quality cotton t-shirt.",
    price: 25.0,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Designer Jacket",
    description: "Stylish and comfortable jacket.",
    price: 150.0,
    image: "https://via.placeholder.com/300",
  },
  // Add more products as needed
];

function ProductListing3() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <>
              <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-500">
                      ${product.price}
                    </span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 left-0 bg-yellow-400 text-white text-xs font-bold uppercase py-1 px-3 rounded-br-lg">
                  New
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListing3;
