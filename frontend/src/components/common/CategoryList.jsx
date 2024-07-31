import React, { useEffect, useRef, useState } from "react";
import { FaTag, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import url from "../../assets/url";

const Card = ({ id, image, title, total }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex-shrink-0 w-[300px] h-[300px] relative overflow-hidden rounded-full shadow-2xl cursor-pointer group"
      onClick={() =>
        navigate(`/toolsDetails/${id}`, { state: { tool: "CATEGORY" } })
      }
      whileHover={{ scale: 1.05, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
    >
      <motion.img
        src={`${url}Tools/${image}`}
        className="w-full h-full object-contain"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end items-center p-6 text-white z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h5
          className="text-2xl font-bold mb-2 flex items-center"
          whileHover={{ scale: 1.1 }}
        >
          <FaStar className="text-yellow-400 mr-2" />
          {title}
        </motion.h5>
        <motion.p
          className="text-lg flex items-center"
          whileHover={{ scale: 1.1 }}
        >
          <FaTag className="mr-2" />
          <span className="font-bold">{total}</span> items
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const CategoryList = () => {
  const { category } = useSelector((state) => state.product);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setCurrentIndex((prevIndex) => {
        const newIndex =
          direction === "left"
            ? Math.max(0, prevIndex - 1)
            : Math.min(category.length - 1, prevIndex + 1);
        return newIndex;
      });
    }
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      handleScroll("right");
    }, 5000);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <motion.div
      className="py-20 lg:py-24 px-6 bg-gradient-to-br from-gray-100 to-indigo-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-5xl font-extrabold tracking-tight sm:text-6xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Discover Our Variations
          </span>
        </motion.h2>
        <motion.p
          className="mt-4 text-xl text-gray-700 font-medium max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Elevate your performance with our premium sports gear
        </motion.p>
      </motion.div>

      <div className="relative flex justify-around items-center mt-20">
        <motion.button
          className="bg-white p-4 rounded-full shadow-lg hover:bg-indigo-100 transition-colors"
          onClick={() => handleScroll("left")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft className="text-indigo-600 text-xl" />
        </motion.button>
        <motion.div
          ref={containerRef}
          className="flex overflow-x-hidden space-x-8 py-20 px-4 w-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence initial={false}>
            {category.map((card, index) => (
              <motion.div
                key={card._id}
                className="snap-start"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  id={card._id}
                  image={card.coverImage}
                  title={card.label}
                  total={card.products.length}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <motion.button
          className="bg-white p-4 rounded-full shadow-lg hover:bg-indigo-100 transition-colors"
          onClick={() => handleScroll("right")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowRight className="text-indigo-600 text-xl" />
        </motion.button>
      </div>

      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {category.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CategoryList;
