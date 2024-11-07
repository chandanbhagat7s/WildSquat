import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaInfoCircle,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import url from "../../../assets/url";
import axios from "axios";

const Slider = () => {
  const [slider, setSlider] = useState([]);
  const { gender } = useSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/SLIDER?gender=${gender}&page=1&limit=10&fields=name,label,coverImage,_id,shortDescription`
        );
        if (res.data.products.length > 0) {
          setSlider([...res.data.products]);
        }
      } catch (e) {}
    }
    getData();
  }, [gender]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  if (!slider?.length) return null;

  return (
    <div className="relative w-full h-[35vh] md:h-[70vh] lg:h-[80vh] bg-gray-900 text-white overflow-hidden mt-2 md:mt-5">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center "
        >
          <img
            src={`${url}Tools/${slider[currentIndex]?.coverImage}`}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r md:from-black via-transparent md:to-black opacity-5" />

          <div className="absolute inset-0 flex flex-col justify-end md:justify-end items-center md:p-24 space-y-6">
            {/* <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-6xl font-bold tracking-tight"
            >
              {slider[currentIndex]?.label}
            </motion.h2> */}
            {/* <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl max-w-2xl"
            >
              {slider[currentIndex]?.shortDescription}
            </motion.p> */}
            {/* <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-4 md:flex-row flex-col md:space-x-2 space-y-2 "
            >
              <button
                onClick={() =>
                  navigate(`/productList/${slider[currentIndex]?._id}`)
                }
                className="bg-white text-black px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition-colors duration-300"
              >
                <FaInfoCircle />
                <span>Explore It</span>
              </button>
            </motion.div> */}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 sm:text-sm text-xl">
        <button
          onClick={prevSlide}
          className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors duration-300"
        >
          <FaChevronLeft className="text-sm md:text-xl lg:text-2xl" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors duration-300"
        >
          {isPlaying ? (
            <FaPause className="text-sm md:text-xl lg:text-2xl" />
          ) : (
            <FaPlay className="text-sm md:text-xl lg:text-2xl" />
          )}
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors duration-300"
        >
          <FaChevronRight className="text-sm md:text-xl lg:text-2xl" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute md:bottom-8 left-[50%] -translate-x-[50%]  bottom-5 md:left-20 flex space-x-2">
        {slider.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
