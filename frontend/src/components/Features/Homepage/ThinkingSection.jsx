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
      className="bg-gray-100 py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto">
        {/* Title Section */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 mb-10 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Thoughtful Products, <br />
          <span className="text-black px-4 py-2 inline-block mt-2 font-bold">
            Delivered to You
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
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 px-4"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gray-700 text-white rounded-full font-bold text-lg shadow-lg hover:bg-black transition-all duration-300"
            onClick={() => nevigate(`/categoryLists/POSTER`)}
          >
            Explore More
            <FaArrowTrendUp className="ml-3 text-2xl animate-bounce" />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default ThinkingSection;
