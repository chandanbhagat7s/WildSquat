// components/Slider.jsx
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import url from "../../../../assets/url";
import { useNavigate } from "react-router-dom";

const Slider = ({ images }) => {
  const neviage = useNavigate();
  console.log("images data", images);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full  overflow-hidden bg-gray-200 rounded-lg">
      {images.map((image, index) => (
        <img
          key={index}
          src={`${url}wholesale/tool/${image.images[0]}`}
          alt={`Slide ${index}`}
          className={`w-full h-full object-contain transition-transform duration-500 ${
            index === currentIndex ? "translate-x-0" : "-translate-x-full"
          }`}
        />
      ))}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white scale-110"
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
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-900"
          onClick={() => neviage(`/wholesale/category/${images[0]._id}`)}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default Slider;
