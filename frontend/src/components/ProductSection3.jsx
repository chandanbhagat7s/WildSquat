import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaSearch, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { error } from "../redux/slices/errorSlice";
import { useNavigate } from "react-router-dom";
import url from "../assets/url";

const ProductSection3 = () => {
  const { posters } = useSelector((state) => state.product);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-5 text-indigo-600">
          Featured{" "}
          <span className="text-6xl animate-pulse text-indigo-800">
            {" "}
            Collection
          </span>
        </h2>
        <p className="mt-4 text-xl text-gray-400 font-medium max-w-3xl text-center mb-20  mx-auto">
          Discover our Featured Collection: a curated selection of trendy,
          high-quality apparel designed to elevate your style.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posters.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
      onClick={() =>
        navigate(`/toolsDetails/${product._id}`, { state: { tool: "POSTER" } })
      }
    >
      <img
        src={`${url}Tools/${product.coverImage}`}
        alt={product.name}
        className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-white text-xl font-bold mb-2">{product.label}</h3>
        <div className="flex items-center mb-2">
          <span className="text-white text-sm">
            ({product?.reviews || 10} reviews)
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-white ">${product.shortDescription}</span>
        </div>
        <button className="w-full bg-white text-gray-900 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
          <FaShoppingCart className="mr-2" />
          Explore More
        </button>
      </div>
    </div>
  );
};

export default ProductSection3;
