import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiShoppingCart, FiHeart, FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { error, info, warning } from "../redux/slices/errorSlice";
import url from "../assets/url";
import TypeWriter from "./Utils/TypeWriter";

const ProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const controls = useAnimation();

  async function getAllProductDetails() {
    try {
      const res = await axios.get("/api/v1/product/getAllTrendingProducts");
      if (res.data.status === "success") {
        setProducts(res?.data?.products[0].products);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "Something went wrong" }));
    }
  }

  async function addToCart(id, e) {
    e.stopPropagation();
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

  async function addToHeart(id, e) {
    e.stopPropagation();
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
    if (products.length > 0) {
      controls.start({
        x: [-100 * products.length, 0],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      });
    }
  }, [products, controls]);

  const ProductCard = ({ product, index }) => (
    <motion.div
      key={product._id}
      className="flex-shrink-0 w-72 mx-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={() => navigate(`/productDetails/${product._id}`)}
      >
        <div className="relative">
          <img
            src={`${url}img/${product.coverImage}`}
            alt={product.name}
            className="w-full h-80 object-contain"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white rounded-full shadow-md text-indigo-600 hover:bg-indigo-100 transition-colors duration-200"
              onClick={(e) => addToCart(product._id, e)}
            >
              <FiShoppingCart size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white rounded-full shadow-md text-red-500 hover:bg-red-100 transition-colors duration-200"
              onClick={(e) => addToHeart(product._id, e)}
            >
              <FiHeart size={20} />
            </motion.button>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-indigo-600">₹{product.price}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className=" py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center py-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-6xl font-extrabold tracking-tight text-indigo-900 mb-6">
            <motion.h2
              className="text-5xl font-bold text-gray-800 mb-12"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Trending Collections
              </span>
            </motion.h2>
          </h2>
          <p className="mt-3 text-2xl text-indigo-800 font-semibold">
            Discover performance-enhancing equipment for every athlete
          </p>
        </motion.div>

        <div className="relative h-[480px] overflow-hidden rounded-3xl  ">
          <motion.div
            className="flex absolute top-0 left-0 h-full"
            animate={controls}
          >
            {products.length > 0 &&
              [...products, ...products].map((product, index) => (
                <ProductCard
                  key={`${product._id}-${index}`}
                  product={product}
                  index={index}
                />
              ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-5 bg-indigo-600 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-indigo-700 transition-colors duration-300"
            onClick={() => navigate("/products")}
          >
            Explore More Products <FiArrowRight className="ml-3" size={24} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductListing;
