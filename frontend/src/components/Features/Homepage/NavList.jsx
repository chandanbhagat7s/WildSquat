import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiBox } from "react-icons/fi";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import url from "../../../assets/url";

const PremiumNavbar = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="relative bg-white border-b border-gray-200 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-between py-2">
          {categories.map((category, i) => (
            <div
              key={i}
              onClick={() =>
                navigate(`/productList/${category._id}`, {
                  state: { reset: true },
                })
              }
            >
              <NavItem
                category={category}
                isActive={activeCategory === i}
                setActive={() => setActiveCategory(i)}
                clearActive={() => setActiveCategory(null)}
              />
            </div>
          ))}
        </ul>
      </nav>
      <AnimatePresence>
        {activeCategory !== null && (
          <DropdownMenu
            category={categories[activeCategory]}
            onClose={() => setActiveCategory(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem = ({ category, isActive, setActive, clearActive }) => {
  const Icon = FiBox;

  return (
    <li
      className="group relative"
      onMouseEnter={setActive}
      //   onMouseLeave={clearActive}
    >
      <button
        className={`flex items-center space-x-2 py-2 px-4 text-gray-800 hover:text-black rounded-md transition-all duration-300 ${
          isActive ? "bg-gray-100" : ""
        }`}
      >
        <Icon
          className={`w-5 h-5 ${
            isActive ? "text-blue-500" : "text-gray-500"
          } group-hover:text-blue-500 transition-colors duration-300`}
        />
        <span className="font-medium">{category.label}</span>
        {category.products && (
          <FaChevronDown
            className={`w-4 h-4 ${
              isActive ? "text-blue-500 rotate-180" : "text-gray-400"
            } group-hover:text-blue-500 transition-all duration-300`}
          />
        )}
      </button>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </li>
  );
};

const DropdownMenu = ({ category, onClose }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute left-0 w-full bg-white shadow-xl border-t border-gray-200 z-50"
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {category.label}
        </h2>
        <div className="grid grid-cols-4 gap-8">
          {category.products?.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => navigate(`/productDetails/${product._id}`)}
              className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              <img
                src={`${url}img/${product.coverImage}`}
                alt={product.name}
                className="h-16 w-16 object-cover rounded-md shadow-md"
              />
              <div className="flex-grow">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {product.shortDescription || "Premium product"}
                </p>
              </div>
              <FaChevronRight className="text-gray-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumNavbar;
