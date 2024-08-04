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
import { motion } from "framer-motion";
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
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/productDetails/${_id}`)}
    >
      <div className="relative ">
        <img src={image} alt={name} className="w-full h-64  object-contain" />
        <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm">
          <FaHeart className="text-sm text-gray-400 group-hover:text-red-500" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate">
          {name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">${price}</span>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1 text-xs" />
            <span className="text-xs text-gray-600">4.5</span>
          </div>
        </div>
        <button className="mt-3 w-full bg-indigo-600 text-white text-sm py-2 rounded-md hover:bg-indigo-700 transition duration-300">
          Add to Bag
        </button>
      </div>
    </motion.div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
