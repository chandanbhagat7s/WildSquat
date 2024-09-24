import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import url from "../../assets/url";
import { error, info } from "../../redux/slices/errorSlice";
import { addToCart } from "../../redux/slices/productSlice";
import { FiArrowRight } from "react-icons/fi";

const ProductCardsOverview = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  async function getAllProductDetails() {
    try {
      const res = await axios.get("/api/v1/product/getAllCardProducts");
      if (res?.data?.status === "success") {
        setProducts([...res?.data?.products.products]);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "Something went wrong" }));
    }
  }

  useEffect(() => {
    getAllProductDetails();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-4xl lg:text-5xl font-bold text-gray-800 mb-12 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Top Products
        </span>
      </motion.h2>
      <ProductList
        products={products}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      {products?.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <ProductShowcase
            products={products}
            currentIndex={currentIndex}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
        </div>
      )}
      <motion.div
        className="mt-20 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-10 py-3 bg-indigo-600 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-indigo-700 transition-colors duration-300 animate-bounce"
          // onClick={() => navigate("/products")}
        >
          <FaEye className="mx-2" /> All Top{" "}
          <FiArrowRight className="ml-3" size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
};

const ProductShowcase = ({ products, currentIndex, nextSlide, prevSlide }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-xl bg-white">
      <AnimatePresence mode="wait">
        <ProductSlide
          key={products[currentIndex]._id}
          product={products[currentIndex]}
        />
      </AnimatePresence>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
      >
        <FaChevronLeft className="text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
      >
        <FaChevronRight className="text-gray-800" />
      </button>
    </div>
  );
};

const ProductSlide = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { msg } = useSelector((state) => state.product);

  async function ATC(id) {
    try {
      const res = await dispatch(addToCart(id));
      if (addToCart.fulfilled.match(res)) {
        dispatch(info({ message: "Product added to cart" }));
      } else {
        dispatch(error({ message: msg || "Failed to add" }));
      }
    } catch (e) {
      dispatch(
        error({ message: "Product not added to cart, please try again" })
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12"
    >
      <div className="md:w-1/2 mb-8 md:mb-0">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          src={`${url}img/${product.coverImage}`}
          alt={product.name}
          className="w-full h-64 md:h-96 object-contain rounded-lg "
        />
      </div>
      <div className="md:w-1/2 md:pl-12">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
        >
          {product.name}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl font-semibold mb-4 text-indigo-600"
        >
          ₹{product.price}
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-600 mb-6"
        >
          {product.shortDescription}
        </motion.p>
        <div className="mb-6">
          <h2 className="font-bold mb-3 text-gray-800"> Available Size's</h2>
          <div className="flex space-x-3">
            {product?.sizes?.map((size) => (
              <button
                key={size.size}
                className="px-4 py-2 border border-black rounded-md hover:border-indigo-800 transition duration-300"
              >
                <span className="text-lg font-semibold text-indigo-800">
                  {size.size}
                </span>
              </button>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <button
            onClick={() => ATC(product._id)}
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" /> Add To Cart
          </button>
          <button
            onClick={() => navigate(`/productDetails/${product._id}`)}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <FaInfoCircle className="mr-2" /> View Details
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProductList = ({ products, currentIndex, setCurrentIndex }) => {
  return (
    <div className="mt-8 overflow-x-auto ">
      <div className="flex space-x-4 p-4 justify-center">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            className={`cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? "scale-110 border-2 border-indigo-600"
                : "opacity-70"
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`${url}img/${product.coverImage}`}
              alt={product.name}
              className="w-20 h-20 object-cover object-top rounded-md shadow-md"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCardsOverview;
