import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import url from "../../../assets/url";
import axios from "axios";

export default function Slider() {
  const [slider, setSlider] = useState([]);
  const { gender } = useSelector((state) => state.auth);

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
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/SLIDER?gender=${gender}&page=1&limit=10&fields=name,label,coverImage,_id,shortDescription`
        );

        console.log(res.data);
        if (res.data.products == 0) {
          return;
        }
        setSlider([...res?.data?.products]);
      } catch (e) {
        console.log(e);

        return e.response;
      }
    }
    getData();
  }, [gender]);
  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!slider?.length) return null;

  return (
    <div className="relative w-full h-[80vh] flex overflow-hidden ">
      <motion.div
        key={currentIndex}
        className={`flex flex-col md:flex-row ${
          currentIndex % 2 == 0 ? "md:flex-row-reverse" : ""
        } w-full h-full text-center`}
      >
        {/* Left side - Image */}
        <div className="w-2/2 md:w-2/3 h-full relative">
          <img
            src={`${url}Tools/${slider[currentIndex]?.coverImage}`}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-30" /> */}
        </div>

        {/* Right side - Information */}
        <div className="w-2/2 md:w-1/3 md:h-full  bg-gradient-to-br from-white to-gray-50   flex flex-col justify-center items-center pb-10 pt-4 md:p-8 border-b-2 border-black">
          <h2 className="text-3xl font-bold mb-4 md:bg-black p-1 md:p-2 md:text-white ">
            {slider[currentIndex]?.label}
          </h2>
          <p className="text-lg mb-6  ">
            {slider[currentIndex]?.shortDescription}
          </p>
          <button
            onClick={() =>
              navigate(`/toolsDetails/${slider[currentIndex]?._id}`, {
                state: { tool: "SLIDER" },
              })
            }
            className="bg-black text-white px-6 py-2 shadow-md rounded-full hover:bg-gray-700 hover:scale-110 hover:shadow-lg  transition-colors text-base font-semibold"
          >
            Explore More
          </button>
        </div>
      </motion.div>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-white/50 transition-colors z-10"
        onClick={prevSlide}
      >
        <FaArrowLeft className="text-white text-lg" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-white/50 transition-colors z-10"
        onClick={nextSlide}
      >
        <FaArrowRight className="text-white text-lg" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slider?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
