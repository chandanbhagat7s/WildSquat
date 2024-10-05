import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { GrFormNext } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import ThinkingCard from "../Common/Cards/ThinkingCard";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ThinkingSection = () => {
  const { gender } = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const nevigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/POSTER?gender=${gender}&page=${page}&limit=10&fields=name,label,coverImage,_id`
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
    <motion.section
      className="bg-gray-100 py-16 px-1 lg:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto">
        {/* Title Section */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mb-12 text-center leading-snug"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Exceptional Quality, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-600 to-black px-6 py-3 font-bold animate-pulse">
            Tailored for You
          </span>
        </motion.h2>

        {/* Products Section */}
        <div className="relative">
          <button
            onClick={() => {
              page > 1 && setPage(page - 1);
            }}
            className="absolute left-0 top-[50%] -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400"
            disabled={page === 1}
          >
            <IoIosArrowBack className="text-2xl" />
          </button>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {product?.length > 0 &&
              product.map((product, index) => (
                <ThinkingCard
                  key={product._id}
                  product={product}
                  index={index}
                  className="hover:scale-105 transform transition duration-300"
                />
              ))}
          </motion.div>

          <button
            onClick={() => setPage(page + 1)}
            className="absolute right-0 top-[50%] -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400"
          >
            <GrFormNext className="text-2xl" />
          </button>
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-10">
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "linear-gradient(90deg, #4f46e5, #6b21a8)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-gray-600 to-black text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            onClick={() => nevigate(`/categoryLists/POSTER`)}
          >
            Explore More
            <FaArrowTrendUp className="ml-3 text-2xl animate-bounce-slow" />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default ThinkingSection;
