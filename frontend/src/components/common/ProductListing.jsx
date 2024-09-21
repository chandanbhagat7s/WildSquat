import { useEffect, useState } from "react";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { error, info, warning } from "../../redux/slices/errorSlice";
import url from "../../assets/url";
import { FaArrowTrendUp } from "react-icons/fa6";
import { addToCart } from "../../redux/slices/productSlice";

const ProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { msg } = useSelector((state) => state.product);
  const { trending } = useSelector((state) => state.product);
  console.log(trending);

  async function ATC(id) {
    try {
      console.log("called with id", id);

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

  const ProductCard = ({ product }) => (
    <motion.div
      key={product._id}
      className=" bg-gray-100 rounded-3xl shadow-lg  overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          onClick={() => navigate(`/productDetails/${product._id}`)}
          className="w-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}img/${product.coverImage}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
        <div className="absolute bottom-0 right-4 flex space-x-2 ">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white rounded-full shadow-md transition-colors duration-200"
            onClick={() => ATC(product._id)}
          >
            <FiShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className=" font-bold lg:font-semibold  text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-gray-600">₹{product.price}</p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-gray-500 mb-12 text-center "
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Our{" "}
          <span className="block md:inline-block bg-black text-white p-1 md:p-2 animate-pulse">
            Premium Collection
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 ">
          {[...trending[0].products].map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-10 py-3 bg-gray-600 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-gray-700 transition-colors duration-300 animate-bounce"
          onClick={() => navigate("/productList/trending")}
        >
          View All
          <FaArrowTrendUp className="ml-3 animate-ping" size={24} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductListing;
