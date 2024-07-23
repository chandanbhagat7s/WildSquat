import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaStar,
  FaShoppingCart,
  FaFilter,
  FaSort,
  FaHeart,
} from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import url from "../../../public/url";
import { TypeAnimation } from "react-type-animation";
import TypeWriter from "../Utils/TypeWriter";

const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => (
  <div className="w-full px-6 py-8 bg-white rounded-xl shadow-lg">
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
      className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer group"
      onClick={() => navigate(`/productDetails/${_id}`)}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-contain hover:object-cover"
        />
        <div className="absolute top-0 right-0 m-4">
          <FaHeart className="text-2xl text-white opacity-70 hover:text-red-500 hover:opacity-100 transition duration-300" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-indigo-600">${price}</span>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">4.5 (120)</span>
          </div>
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition duration-300 group-hover:bg-indigo-500">
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
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
  const location = useLocation();
  const state = location.state;

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
    <>
      {data.image && (
        <div className="container mx-auto px-4 mt-10 pb-32">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
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

          {state?.tool == "CATEGORY" ? (
            <div className="flex flex-col my-8 lg:flex-row space-x-6 bg-white rounded-xl shadow-lg ">
              <img
                src={`${url}Tools/${data.image}`}
                alt="Luxury banner"
                className="w-full lg:w-1/3 h-64 object-contain"
              />
              <div className="p-6 flex items-center">
                <p className="text-gray-700 text-sm lg:text-lg leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative mb-16">
              <img
                src={`${url}Tools/${data.image}`}
                alt="Luxury banner"
                className="w-full h-96 object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl">
                <h2 className="text-4xl font-bold text-white text-center px-4 tracking-wide">
                  Discover Our Premium Collection
                </h2>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="lg:w-1/4">
              <PriceFilter
                minPrice={0}
                maxPrice={maxPrice}
                onPriceChange={setMaxPrice}
              />
            </div>
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <FaFilter className="text-indigo-600 mr-2" />
                  <span className="text-lg font-semibold text-gray-700">
                    Filters
                  </span>
                </div>
                <div className="flex items-center">
                  <FaSort className="text-indigo-600 mr-2" />
                  <select
                    className="border-none bg-transparent text-gray-700 font-medium focus:outline-none"
                    onChange={(e) => setSortBy(e.target.value)}
                    value={sortBy}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      )}
    </>
  );
};

export default ClickProducts;
