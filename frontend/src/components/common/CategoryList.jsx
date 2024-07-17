import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Card = ({ imageUrl, title }) => {
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <button className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
          Explore More
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const CategoryList = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1em_Q4Axmw0COspJ02OkY1zam8iijTJ_Mew&s`,
    title: `Card ${i + 1}`,
  }));

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (currentIndex + 1) % cards.length;
        setCurrentIndex(nextIndex);
        scrollRef.current.scrollTo({
          left: nextIndex * 288, // 72px card width + 24px gap (space-x-6)
          behavior: "smooth",
        });
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(scrollInterval);
  }, [currentIndex, cards.length]);

  return (
    <div className="container mx-auto p-8">
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden space-x-6 pb-8 scrollbar-hide"
      >
        {cards.map((card) => (
          <Card key={card.id} imageUrl={card.imageUrl} title={card.title} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
