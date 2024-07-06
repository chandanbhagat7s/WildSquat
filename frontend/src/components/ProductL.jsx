import React from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

const ProductListing = () => {
  const products = [
    {
      id: 1,
      name: "Sport Running Shoes",
      price: 89.99,
      image:
        "https://thefoomer.in/cdn/shop/files/jpeg-optimizer_PATP1125.jpg?v=1705733425",
    },
    {
      id: 2,
      name: "Breathable Sport Tee",
      price: 29.99,
      image:
        "https://thefoomer.in/cdn/shop/files/jpeg-optimizer_PATP1125.jpg?v=1705733425",
    },
    {
      id: 3,
      name: "Compression Leggings",
      price: 49.99,
      image:
        "https://thefoomer.in/cdn/shop/files/jpeg-optimizer_PATP1125.jpg?v=1705733425",
    },
    {
      id: 4,
      name: "Lightweight Jacket",
      price: 69.99,
      image:
        "https://thefoomer.in/cdn/shop/files/jpeg-optimizer_PATP1125.jpg?v=1705733425",
    },
  ];

  return (
    <div className="bg-gray-100 py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center ">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Sports Collection
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Elevate your performance with our premium sports gear
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative shadow-lg rounded-xl p-2"
            >
              <div className="w-full   bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button className="text-gray-400 hover:text-red-500">
                  <FiHeart className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
