import React, { useState } from "react";
import { FaShoppingBag, FaRegHeart, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import url from "../assets/url";

const LuxuryProductShowcase = () => {
  const { posters } = useSelector((state) => state.product);

  return (
    <motion.section
      className="bg-white py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-8">
        <motion.h2
          className="text-7xl font-thin text-center mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-gray-800">Curated Elegance</span>
        </motion.h2>
        <motion.div
          className="w-24 h-1 bg-gold-500 mx-auto mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.p
          className="text-xl text-gray-600 font-light max-w-3xl text-center mb-24 mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Immerse yourself in our meticulously curated collection of exquisite
          pieces, crafted to perfection and designed for the discerning
          connoisseur.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {posters?.length > 0 &&
            posters.map((product, index) => (
              <LuxuryProductCard
                key={product._id}
                product={product}
                index={index}
              />
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const LuxuryProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div
        className="relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/toolsDetails/${product._id}`)}
      >
        <motion.div
          className="aspect-[3/4] overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}Tools/${product.coverImage}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className="bg-white text-gray-900 py-3 px-6 rounded-none text-sm uppercase tracking-wider font-medium hover:bg-gold-500 hover:text-black transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-xl font-light text-gray-800 mb-2">
          {product.label}
        </h3>
        <div className="flex justify-center items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-gold-500 w-4 h-4 mx-0.5" />
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button className="text-gray-600 hover:text-gold-500 transition-colors duration-300">
            <FaShoppingBag className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gold-500 transition-colors duration-300">
            <FaRegHeart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LuxuryProductShowcase;
