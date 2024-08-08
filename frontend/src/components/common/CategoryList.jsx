import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTag, FaStar } from "react-icons/fa";
import url from "../../assets/url";
import { FiArrowRight } from "react-icons/fi";

const Card = ({ id, image, title, total }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-72 h-96 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer flex-shrink-0 mx-4"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      onClick={() =>
        navigate(`/toolsDetails/${id}`, { state: { tool: "CATEGORY" } })
      }
    >
      <motion.div className="h-2/3 overflow-hidden">
        <motion.img
          src={`${url}Tools/${image}`}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        />
      </motion.div>
      <motion.div className="h-1/3 p-6 bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
          <FaStar className="text-yellow-500 mr-2" />
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
  const { category } = useSelector((state) => state.product);

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-100 to-white flex flex-col justify-center items-center overflow-hidden">
      <motion.h2
        className="text-5xl font-bold text-gray-800 mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Premium Variety
        </span>
      </motion.h2>

      <div className="w-full overflow-hidden">
        <div className="flex animate-scroll">
          {category?.length > 0 &&
            [...category, ...category].map((card, index) => (
              <Card
                key={`${card._id}-${index}`}
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
          className="inline-flex items-center px-10 py-3 bg-indigo-600 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-indigo-700 transition-colors duration-300"
          // onClick={() => navigate("/products")}
        >
          View All variety <FiArrowRight className="ml-3" size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CategoryList;
