import React, { useState, useRef, useEffect } from "react";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";

const CategorySelector = ({
  categories,
  category,
  selectedCategory,
  handleCategoryClick,
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, []);

  return (
    <div className="lg:hidden  relative w-full mb-8">
      <div className="flex items-center">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <FaLeftLong className="w-6 h-6" />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex items-center space-x-4 overflow-x-auto scrollbar-hide py-5 px-4 md:px-0 md:justify-center"
          onScroll={checkScrollPosition}
        >
          {categories.map((c) => (
            <button
              key={c._id}
              className={`flex items-center space-x-2 px-2 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                c._id === selectedCategory
                  ? "bg-black text-white font-bold shadow-lg scale-110 "
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => handleCategoryClick(c._id)}
            >
              <span className="text-sm md:text-base">{c.label}</span>
            </button>
          ))}
        </div>
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <FaRightLong className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
