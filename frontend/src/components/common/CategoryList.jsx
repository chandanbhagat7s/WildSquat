import React, { useEffect, useRef, useState } from "react";
import { FaTag, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import TypeWriter from "../Utils/TypeWriter";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import url from "../../assets/url";

const Card = ({ id, image, title, total }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex-shrink-0 w-[300px] h-[300px] relative overflow-hidden rounded-full shadow-2xl cursor-pointer group"
      onClick={() =>
        navigate(`/toolsDetails/${id}`, { state: { tool: "CATEGORY" } })
      }
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={`${url}Tools/${image}`}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center p-6 text-white z-20">
        <h5 className="text-2xl font-bold mb-2 flex items-center">
          <FaStar className="text-yellow-400 mr-2" />
          {title}
        </h5>
        <p className="text-lg flex items-center">
          <FaTag className="mr-2" />
          <span className="font-bold">{total}</span> items
        </p>
      </div>
    </motion.div>
  );
};

const CategoryList = () => {
  const { category } = useSelector((state) => state.product);
  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      handleScroll("right");
    }, 5000);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="py-20 lg:py-24  px-6 bg-gray-100">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl  ">
          <span className="">
            {" "}
            Discover <span className="text-6xl text-indigo-400">Our </span>{" "}
            <span className="text-4xl text-indigo-700 animate-pulse">
              Variation's{" "}
            </span>{" "}
          </span>
        </h2>
        <p className="mt-4 text-xl text-gray-700 font-medium max-w-2xl mx-auto">
          Elevate your performance with our premium sports gear
        </p>
      </motion.div>

      <div className="relative md:flex  justify-around  items-center  mt-20 ">
        <button
          className="top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-indigo-100 transition-colors "
          onClick={() => {
            handleScroll("left");
          }}
        >
          <FaArrowLeft className="text-indigo-600 text-xl" />
        </button>
        <motion.div
          ref={containerRef}
          className="flex overflow-x-auto space-x-8 py-20 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {category.map((card, index) => (
            <div key={index} className="snap-start">
              <Card
                id={card._id}
                image={card.coverImage}
                title={card.label}
                total={card.products.length}
              />
            </div>
          ))}
        </motion.div>

        <button
          className="top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-indigo-100 transition-colors float-end"
          onClick={() => handleScroll("right")}
        >
          <FaArrowRight className="text-indigo-600 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
