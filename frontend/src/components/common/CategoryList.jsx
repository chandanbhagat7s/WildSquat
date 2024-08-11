import React, { useState, useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTag, FaStar } from "react-icons/fa";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import url from "../../assets/url";

const Card = ({ id, image, title, total }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      onClick={() =>
        navigate(`/toolsDetails/${id}`, { state: { tool: "CATEGORY" } })
      }
    >
      <motion.div className="h-64 overflow-hidden">
        <motion.img
          src={`${url}Tools/${image}`}
          className="w-full h-full object-cover "
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        />
      </motion.div>

      <motion.div className="p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.h3 className=" font-semibold text-gray-800 mb-2 flex items-center">
          <BiCategory className="text-indigo-800 mr-2 " />
          {title}
        </motion.h3>
        <motion.p className="text-sm text-gray-600 flex items-center">
          <FaTag className="mr-2" />
          {total} items
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const CategoryList = () => {
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.product);
  const [displayedCards, setDisplayedCards] = useState([]);

  useEffect(() => {
    if (category?.length > 0) {
      const updateDisplayedCards = () => {
        const shuffled = [...category].slice(0, 6);
        setDisplayedCards(shuffled.slice(0, 6));
      };

      updateDisplayedCards();
      const interval = setInterval(updateDisplayedCards, 6000); // Change cards every 5 seconds

      return () => clearInterval(interval);
    }
  }, [category]);

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-50 to-white flex flex-col justify-center items-center">
      <motion.h2
        className="text-5xl font-bold text-gray-800 mb-12 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Premium Variety
        </span>
      </motion.h2>

      <div className="w-full max-w-7xl overflow-x-auto pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {displayedCards.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              image={card.coverImage}
              title={card.label}
              total={card.products.length}
            />
          ))}
        </div>
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
          className="inline-flex items-center px-10 py-3 bg-indigo-600 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-indigo-700 transition-colors duration-300 animate-bounce"
          onClick={() => navigate("/categoryLists")}
        >
          View All variety{" "}
          <FiArrowRight className="ml-3 animate-ping" size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CategoryList;
