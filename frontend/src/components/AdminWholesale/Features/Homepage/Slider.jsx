// components/Slider.jsx
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import url from "../../../../assets/url";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-72 md:h-64 overflow-hidden bg-gray-200 rounded-lg">
      {images.map((image, index) => (
        <img
          key={index}
          src={`${url}wholesale/tool/${image.images[0]}`}
          alt={`Slide ${index}`}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            index === currentIndex ? "translate-x-0" : "-translate-x-full"
          }`}
        />
      ))}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
      >
        <FaChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
          View More
        </button>
      </div>
    </div>
  );
};

export default Slider;
