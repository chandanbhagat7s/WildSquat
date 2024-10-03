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
          `/api/v1/tools/getTool/CATEGORY?gender=${gender}&page=${page}&limit=8&fields=name,label,coverImage,_id`
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
    <div className="min-h-screen py-12 px-8 bg-gradient-to-r bg-gray-100 flex flex-col justify-center items-center space-y-10 lg:space-y-16 pb-20">
      {/* Title Section */}
      <motion.h2
        className="text-4xl lg:text-5xl font-semibold text-gray-700 mb-12 text-center leading-snug"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Explore Our{" "}
        <span className="block font-bold md:inline-block bg-black text-white px-3 py-2 rounded-md">
          Premium Categories
        </span>
      </motion.h2>

      {/* Category Grid */}
      <div className="relative w-full max-w-screen-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {product.length > 0 &&
            product.map((card, i) => <ThinkingCard product={card} key={i} />)}
        </div>
      </div>

      {/* View All Button */}
      <motion.div
        className=""
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-12 py-4 bg-gray-900 text-white rounded-full font-bold text-lg shadow-lg hover:bg-gray-700 transition-colors duration-300"
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
