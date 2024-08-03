import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { FaTag, FaStar } from "react-icons/fa";
import url from "../../assets/url";

const Card = ({ id, image, title, total }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-72 h-96 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer mx-4"
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
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        x: [0, -100 * category.length],
        transition: { duration: category.length * 5, ease: "linear" },
      });
      controls.set({ x: 0 });
      animate();
    };
    animate();
  }, [controls, category]);

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-white to-gray-100 flex flex-col justify-center items-center overflow-hidden">
      <motion.h2
        className="text-5xl font-bold text-gray-800 mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Premium Collections
        </span>
      </motion.h2>

      <motion.div className="flex" animate={controls}>
        {[...category, ...category].map((card, index) => (
          <Card
            key={`${card._id}-${index}`}
            id={card._id}
            image={card.coverImage}
            title={card.label}
            total={card.products.length}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryList;
