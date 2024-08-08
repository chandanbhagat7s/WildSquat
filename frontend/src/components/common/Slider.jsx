import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import url from "../../assets/url";

export function Slider() {
  const { slider } = useSelector((state) => state.product);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {slider?.length > 0 && (
        <div className="relative w-full h-screen md:h-[80vh] overflow-hidden bg-gray-900">
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={`${url}Tools/${slider[currentIndex]?.coverImage}`}
                alt={`Slide ${currentIndex + 1}`}
                className={`w-full h-full object-cover ${
                  isSmallScreen ? "object-contain" : "object-cover"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 p-3 rounded-full hover:bg-white/50 transition-colors z-10"
            onClick={prevSlide}
          >
            <FaArrowLeft className="text-white" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 p-3 rounded-full hover:bg-white/50 transition-colors z-10"
            onClick={nextSlide}
          >
            <FaArrowRight className="text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {slider?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-white scale-125" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Slide Content */}
          <div className="absolute bottom-24 left-8 right-8 text-white z-10 md:left-16 md:right-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {slider[currentIndex]?.label}
            </h2>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              {slider[currentIndex]?.shortDescription}
            </p>
            <button
              onClick={() =>
                navigate(`/toolsDetails/${slider[currentIndex]?._id}`, {
                  state: { tool: "SLIDER" },
                })
              }
              className="bg-white text-black px-8 py-3 rounded-full hover:bg-opacity-80 transition-colors text-lg font-semibold"
            >
              Explore More
            </button>
          </div>
        </div>
      )}
    </>
  );
}
