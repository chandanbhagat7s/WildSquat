import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import url from "../assets/url";

const ProductSection3 = () => {
  const { posters } = useSelector((state) => state.product);

  return (
    <motion.section
      className="bg-gradient-to-br from-gray-100 to-indigo-50 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-5"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-800 animate-pulse">
            Featured{" "}
            <span className="text-6xl  font-extrabold ">Collection</span>
          </span>
        </motion.h2>
        <motion.p
          className="mt-4 text-xl text-gray-600 font-medium max-w-3xl text-center mb-20 mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Discover our Featured Collection: a curated selection of trendy,
          high-quality apparel designed to elevate your style.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {posters.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-2xl cursor-pointer bg-white"
      onClick={() => navigate(`/toolsDetails/${product._id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="h-64 overflow-hidden">
        <motion.img
          src={`${url}Tools/${product.coverImage}`}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="py-2">
        <h3 className="text-xl text-center  font-bold text-gray-800 mb-2">
          {product.label}
        </h3>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold mb-2">{product.label}</h3>
              <div className="flex justify-center items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mr-1" />
                ))}
                <span className="text-sm ml-2">
                  ({product?.reviews || 10} reviews)
                </span>
              </div>
              <p className="mb-4">{product.shortDescription}</p>
              <motion.button
                className="bg-white text-gray-900 py-2 px-4 rounded-full text-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingCart className="mr-2" />
                Explore More
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaHeart className="text-red-500 text-xl" />
      </motion.div>
    </motion.div>
  );
};

export default ProductSection3;
