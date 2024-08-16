import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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

  return (
    <>
      {slider?.length > 0 && (
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={`${url}Tools/${slider[currentIndex]?.coverImage}`}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30" />

              <div className="absolute  bottom-5 w-[90vw] left-1/2 -translate-x-1/2  flex flex-col justify-center items-center text-white p-4 text-center">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                  {slider[currentIndex]?.label}
                </h2>
                <p className="text-sm md:text-lg mb-4 max-w-xl">
                  {slider[currentIndex]?.shortDescription}
                </p>
                <button
                  onClick={() =>
                    navigate(`/toolsDetails/${slider[currentIndex]?._id}`, {
                      state: { tool: "SLIDER" },
                    })
                  }
                  className="bg-white text-black px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors text-sm md:text-base font-semibold"
                >
                  Explore More
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/30 p-2 md:p-3 rounded-full hover:bg-white/50 transition-colors z-10"
            onClick={prevSlide}
          >
            <FaArrowLeft className="text-white text-sm md:text-base" />
          </button>
          <button
            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/30 p-2 md:p-3 rounded-full hover:bg-white/50 transition-colors z-10"
            onClick={nextSlide}
          >
            <FaArrowRight className="text-white text-sm md:text-base" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {slider?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-white scale-125" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
