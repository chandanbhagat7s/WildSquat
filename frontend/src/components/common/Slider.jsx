"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import url from "../../assets/url";

export function Slider() {
  const { slider } = useSelector((state) => state.product);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slider.length - 1 ? 0 : prevIndex + 1
    );
  }, [slider.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slider.length - 1 : prevIndex - 1
    );
  }, [slider.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-gray-900">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.img
          key={currentIndex}
          src={`${url}Tools/${slider[currentIndex]?.coverImage}`}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://flowbite.com/docs/images/carousel/carousel-2.svg";
          }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90" />

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        onClick={prevSlide}
      >
        <FaArrowLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
        onClick={nextSlide}
      >
        <FaArrowRight />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slider?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Slide Content */}
      <div className="absolute bottom-16 left-8 text-white">
        <h2 className="text-4xl font-bold mb-2">
          {slider[currentIndex]?.label}
        </h2>
        <p className="text-lg mb-4">{slider[currentIndex]?.shortDescription}</p>
        <button
          onClick={() =>
            navigate(`/toolsDetails/${slider[currentIndex]?._id}`, {
              state: { tool: "SLIDER" },
            })
          }
          className="bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors "
        >
          Explore More
        </button>
      </div>
    </div>
  );
}
