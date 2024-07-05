import React from "react";
import { FaSearch, FaUser, FaShoppingCart, FaStar } from "react-icons/fa";
import ProductSection from "./Products";
import ProductSection2 from "./ProductSection2";
import ProductSection3 from "./ProductSection3";
import ProductSection4 from "./ProductSection4";
import ProductSection5 from "./ProductSection5";
import ProductSection6 from "./ProductSection6";
import ProductList from "./ProductSection8";
import ProductListing3 from "./ProductSection9";
import ProductOverview from "./ProductOverwiew";
import ProductOverview2 from "./ProductOverviw2";
import ProductDetails from "./ProductOverview";

const products1 = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 19.99,
    image:
      "https://blackberrys.com/cdn/shop/files/formal-shirt-in-black-dawn-blackberrys-clothing-1.jpg?v=1685950192",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 49.99,
    image:
      "https://blackberrys.com/cdn/shop/files/formal-shirt-in-black-dawn-blackberrys-clothing-1.jpg?v=1685950192",
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 99.99,
    image:
      "https://blackberrys.com/cdn/shop/files/formal-shirt-in-black-dawn-blackberrys-clothing-1.jpg?v=1685950192",
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 39.99,
    image:
      "https://blackberrys.com/cdn/shop/files/formal-shirt-in-black-dawn-blackberrys-clothing-1.jpg?v=1685950192",
  },
];

const products2 = [
  {
    id: 5,
    name: "Sneakers",
    price: 79.99,
    image:
      "https://blackberrys.com/cdn/shop/files/formal-shirt-in-black-dawn-blackberrys-clothing-1.jpg?v=1685950192",
  },
  {
    id: 6,
    name: "Wool Sweater",
    price: 59.99,
    image:
      "https://blackberrys.com/cdn/shop/files/formal-shirt-in-black-dawn-blackberrys-clothing-1.jpg?v=1685950192",
  },
  {
    id: 7,
    name: "Formal Shirt",
    price: 44.99,
    image:
      "https://blackberrys.com/cdn/shop/files/formal-shirt-in-black-dawn-blackberrys-clothing-1.jpg?v=1685950192",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center flex-col lg:flex-row py-4">
            <div className="flex items-center">
              <img
                src="https://wildsquat.com/wp-content/uploads/2023/05/wildsquat-png-pixel.png"
                alt="Logo"
                className="h-10 w-10 mr-2"
              />
              <span className="font-semibold text-lg">WildSquat</span>
            </div>
            <div className="flex items-center">
              <div className="relative mr-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <FaUser className="text-gray-600 text-xl mr-4 cursor-pointer" />
              <FaShoppingCart className="text-gray-600 text-xl cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto mt-8 px-4">
        <ProductSection />
      </main>
      <main className="max-w-6xl mx-auto mt-8 px-4">
        <ProductSection2 />
      </main>
      <main className="max-w-6xl mx-auto mt-8 px-4">
        <ProductSection3 />
      </main>
      <main className="max-w-6xl mx-auto mt-8 px-4">
        <ProductSection4 />
      </main>
      <main className="max-w-6xl mx-auto mt-8 px-4">
        <ProductSection5 />
      </main>
      <main className="max-w-6xl mx-auto mt-8 px-4">
        <ProductSection6 />
      </main>
      <main className="max-w-6xl mx-auto mt-8 px-4">
        {/* <ProductList /> */}
        <ProductListing3 />
      </main>
      <main className="max-w-6xl mx-auto mt-8 px-4">
        {/* <ProductList /> */}
        <ProductOverview />
      </main>
      <main className="max-w-6xl mx-auto mt-8 px-4">
        {/* <ProductList /> */}
        <ProductOverview2 />
      </main>
      <main className="max-w-6xl mx-auto mt-8 px-4">
        {/* <ProductList /> */}
        <ProductDetails />
      </main>
    </div>
  );
};

export default HomePage;
