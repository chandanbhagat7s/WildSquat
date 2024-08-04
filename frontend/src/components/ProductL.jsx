import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiShoppingCart, FiHeart, FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { error, info, warning } from "../redux/slices/errorSlice";
import url from "../assets/url";
import TypeWriter from "./Utils/TypeWriter";

const ProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [products]);

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-50 to-indigo-100 py-20"
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
          <h2 className="text-5xl font-extrabold tracking-tight text-indigo-900 mb-4">
            <TypeWriter
              content={[
                "Sports Collection:",
                1000,
                "Elevate Your Game",
                1500,
                "Premium Gear Awaits",
                1500,
              ]}
            />
          </h2>
          <p className="mt-4 text-xl text-indigo-600">
            Discover performance-enhancing equipment for every athlete
          </p>
        </motion.div>

        <motion.div
          className="relative h-[400px] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div
            className="flex absolute transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * (100 / 3)}%)` }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                className=" flex-shrink-0 px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => navigate(`/productDetails/${product._id}`)}
                >
                  <div className="relative">
                    <img
                      src={`${url}img/${product.coverImage}`}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white rounded-full shadow-md text-indigo-600"
                        onClick={(e) => addToCart(product._id, e)}
                      >
                        <FiShoppingCart size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white rounded-full shadow-md text-red-500"
                        onClick={(e) => addToHeart(product._id, e)}
                      >
                        <FiHeart size={18} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xl font-bold text-indigo-600">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
            onClick={() => navigate("/products")}
          >
            Explore More Products <FiArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductListing;
