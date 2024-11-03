import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import ThinkingCard from "../Common/Cards/ThinkingCard";

const CategoryList = () => {
  const navigate = useNavigate();
  const { gender } = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/CATEGORY?gender=${gender}&page=${page}&limit=4&fields=name,label,coverImage,_id`
        );

        if (res.data.products === 0) {
          setPage(1);
          return;
        }
        setProduct([...res?.data?.products]);
      } catch (e) {
        return e.response;
      }
    }
    getData();
  }, [gender, page]);

  return (
    <div className="min-h-screen py-12 p-2 lg:px-4 bg-white flex flex-col justify-center items-center space-y-10 lg:space-y-16 pb-20">
      {/* Title Section */}
      <div className="text-center mt-10 mb-5">
        <h2 className="text-4xl font-bold text-gray-800 tracking-wide mb-2">
          Discover Your Style
        </h2>
        <h3 className="text-2xl font-semibold text-gray-600">
          Find What Complements You
        </h3>
        <div className="mt-4">
          <span className="inline-block w-24 h-1 bg-gradient-to-r from-gray-700 to-gray-400 rounded"></span>
        </div>
      </div>

      {/* Category Grid */}
      <div className="relative w-full max-w-screen-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-2">
          {product.length > 0 &&
            product.map((card, i) => <ThinkingCard product={card} key={i} />)}
        </div>
      </div>

      {/* View All Button */}
      <motion.div
        className="flex justify-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      >
        <motion.button
          whileHover={{
            scale: 1.1,
            backgroundColor: "#1a1a1a",
            boxShadow: "0px 0px 15px rgba(0,0,0,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full font-bold text-lg shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out"
          onClick={() => navigate("/categoryLists/CATEGORY")}
        >
          View All Categories
          <FiArrowRight className="ml-3" size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CategoryList;
