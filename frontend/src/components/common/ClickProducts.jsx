import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaStar,
  FaShoppingCart,
  FaFilter,
  FaSort,
  FaHeart,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import url from "../../assets/url";
import TypeWriter from "../Utils/TypeWriter";

const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => (
  <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-6">
    <div className="flex justify-between items-center mb-4">
      <span className="text-xl font-semibold text-gray-800">Price Range</span>
      <span className="text-lg font-bold text-indigo-600">
        ${minPrice} - ${maxPrice}
      </span>
    </div>
    <input
      type="range"
      min="100"
      max="5000"
      value={maxPrice}
      onChange={(e) => onPriceChange(Number(e.target.value))}
      className="w-full h-3 bg-indigo-200 rounded-full appearance-none cursor-pointer"
    />
    <div className="flex justify-between mt-2 text-sm text-gray-600">
      <span>$100</span>
      <span>$5000</span>
    </div>
  </div>
);

const ProductCard = ({ _id, name, price, image }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer group"
      onClick={() => navigate(`/productDetails/${_id}`)}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover transition duration-300 group-hover:opacity-90"
        />
        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md transition duration-300 transform hover:scale-110">
          <FaHeart className="text-2xl text-gray-400 group-hover:text-red-500" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h3 className="text-2xl font-bold text-white mb-2 truncate">
            {name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-extrabold text-white">${price}</span>
            <div className="flex items-center bg-yellow-400 px-3 py-1 rounded-full">
              <FaStar className="text-white mr-1" />
              <span className="text-sm font-semibold text-white">
                4.5 (120)
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Premium Collection</span>
          <div className="flex space-x-2">
            {["S", "M", "L", "XL"].map((size) => (
              <span
                key={size}
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition duration-300 group-hover:bg-indigo-500 font-semibold text-sm">
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
          <button className="flex-1 bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center hover:bg-gray-700 transition duration-300 group-hover:bg-gray-600 font-semibold text-sm">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

const ClickProducts = () => {
  const [maxPrice, setMaxPrice] = useState(0);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState({
    image: "",
    title: "",
    description: "",
  });
  const [sortBy, setSortBy] = useState("popular");

  const { toolId } = useParams();

  async function getData() {
    try {
      const res = await axios.get(`/api/v1/tools/getToolById/${toolId}`);
      if (res?.data?.status == "success") {
        setProduct([...res?.data?.tooldata?.products]);
        const maxPricedProduct = Math.max(
          ...res?.data?.tooldata?.products.map((p) => p.price)
        );
        setData({
          image: res?.data?.tooldata?.coverImage,
          title: res?.data?.tooldata?.label,
          description: res?.data?.tooldata?.shortDescription,
        });
        setMaxPrice(maxPricedProduct);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const sortedProducts = product
    .filter((product) => product.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "priceLowToHigh") return a.price - b.price;
      if (sortBy === "priceHighToLow") return b.price - a.price;
      return 0; // Default to no sorting
    });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="lg:w-1/4 bg-white p-6 lg:fixed lg:h-screen lg:overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          <TypeWriter
            content={[
              "Discover Luxury: ",
              1000,
              `${data.title}`,
              1500,
              "Elevate Your Style",
            ]}
          />
        </h1>
        <PriceFilter
          minPrice={0}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
        />
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <FaSort className="text-indigo-600 mr-2" />
            <span className="text-lg font-semibold text-gray-700">Sort By</span>
          </div>
          <select
            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="popular">Most Popular</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="lg:w-3/4 lg:ml-[25%] p-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard
              _id={product._id}
              key={product._id}
              name={product.name}
              price={product.price}
              image={`${url}img/${product.coverImage}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClickProducts;
