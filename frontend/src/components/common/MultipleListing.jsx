import { useState, useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import url from "../../assets/url";
import { FaRightLong } from "react-icons/fa6";

const Card = ({ id, image, title }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full cursor-pointer overflow-hidden hover:scale-105"
      onClick={() => navigate(`/toolsDetails/${id}`)}
    >
      <img
        src={`${url}Tools/${image}`}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white text-2xl font-bold">{title}</h3>
        <p className="flex text-white items-center text-lg">
          Explore <FaRightLong className="mx-2" />
        </p>
      </div>
    </div>
  );
};

const MultipleListing = () => {
  const navigate = useNavigate();
  const { multiple } = useSelector((state) => state.product);
  const [displayedCards, setDisplayedCards] = useState([]);

  useEffect(() => {
    if (multiple?.length > 0) {
      const updateDisplayedCards = () => {
        const shuffled = [...multiple].slice(0, 6);
        setDisplayedCards(shuffled.slice(0, 6));
      };

      updateDisplayedCards();
      const interval = setInterval(updateDisplayedCards, 6000); // Change cards every 5 seconds

      return () => clearInterval(interval);
    }
  }, [multiple]);

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-50 to-white flex flex-col justify-center items-center">
      <motion.h2
        className="text-5xl font-bold text-gray-800 mb-12 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Multiple Variety
        </span>
      </motion.h2>

      <div className="w-full max-w-7xl overflow-x-auto pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {displayedCards.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              image={card.coverImage}
              title={card.label}
              total={card.products.length}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="mt-20 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-10 py-3 bg-indigo-600 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-indigo-700 transition-colors duration-300 animate-bounce"
          onClick={() =>
            navigate("/categoryLists", { state: { displayOther: "MULTIPLE" } })
          }
        >
          View All variety{" "}
          <FiArrowRight className="ml-3 animate-ping" size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MultipleListing;
