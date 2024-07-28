import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import url from "../assets/url";
import { useNavigate } from "react-router-dom";
import { error, info, warning } from "../redux/slices/errorSlice";
import TypeWriter from "./Utils/TypeWriter";

const ProductListing = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  async function getAllProductDetails() {
    try {
      const res = await axios.get("/api/v1/product/getAllTrendingProducts");
      if (res.data.status === "success") {
        setProducts([
          ...res?.data?.products[0].products,
          ...res?.data?.products[0].products,
        ]);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "Something went wrong" }));
    }
  }

  async function addToCart(id) {
    try {
      const res = await axios.get(`/api/v1/product/addToCart/${id}`);
      if (res.data?.status === "success") {
        dispatch(info({ message: "Product added to cart" }));
      }
    } catch (e) {
      dispatch(
        warning({
          message:
            e?.response?.data?.msg ||
            "Product not added to cart, please try again",
        })
      );
    }
  }

  async function addToHeart(id) {
    try {
      const res = await axios.get(`/api/v1/product/addToHeart/${id}`);
      if (res.data?.status === "success") {
        dispatch(info({ message: "Product added to favorites" }));
      }
    } catch (e) {
      dispatch(
        warning({
          message:
            e?.response?.data?.msg ||
            "Product not added to favorites, please try again",
        })
      );
    }
  }

  useEffect(() => {
    getAllProductDetails();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [products]);

  const getPosition = (index) => {
    const diff = index - activeIndex;
    if (diff < 0) return `translateX(${diff * 120 - 60}%) scale(0.8)`;
    if (diff > 0) return `translateX(${diff * 120 + 60}%) scale(0.8)`;
    return "translateX(0) scale(1)";
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <TypeWriter
              content={[
                "Sports Collection : ",
                1000,
                "What You need is here 😊",
                1500,
                "",
              ]}
            />
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Elevate your performance with our premium sports gear
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel">
            {products.map((p, index) => (
              <div
                key={p._id}
                className={`carousel-item ${
                  index === activeIndex ? "active" : ""
                }`}
                style={{
                  transform: getPosition(index),
                }}
                onClick={() => navigate(`/productDetails/${p._id}`)}
              >
                <div className="w-full cursor-pointer">
                  <img
                    src={`${url}img/${p.coverImage}`}
                    alt={p.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="mt-4 flex flex-col items-center space-y-2">
                  <h3 className="text-sm text-gray-700 font-bold">{p.name}</h3>
                  <p className="text-xl font-medium text-gray-900">
                    Rs. {p.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Explore More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
