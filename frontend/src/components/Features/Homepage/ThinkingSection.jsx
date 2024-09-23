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

        console.log(res.data);
        if (res.data.products == 0) {
          setPage(1);
          return;
        }
        setProduct([...res?.data?.products]);
      } catch (e) {
        console.log(e);

        return e.response;
      }
    }
    getData();
  }, [gender, page]);

  return (
    <motion.section
      className=" bg-white  py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-gray-500 mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Thinking Will Be
          <span className="block md:inline-block bg-black text-white p-1 md:p-2">
            Present Hear
          </span>
        </motion.h2>

        <div className="relative">
          <button
            onClick={() => {
              page >= 2 && setPage(page - 1);
            }}
            className="absolute left-0 top-[50%] -translate-y-1/2 z-10 h-[10%] md:h-[30%] bg-gray-500 text-white 
           hover:bg-gray-100 hover:text-black  hover:border hover:border-black px-2 rounded shadow-lg font-extrabold text-3xl"
          >
            <IoIosArrowBack />
          </button>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
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
                />
              ))}
          </motion.div>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            className="absolute right-0 top-[50%] -translate-y-1/2 z-10 h-[10%] md:h-[30%] bg-gray-500 text-white 
           hover:bg-gray-100 hover:text-black  hover:border hover:border-black px-2 rounded shadow-lg font-extrabold text-3xl"
          >
            <GrFormNext />
          </button>
        </div>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-3 bg-gray-600 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-gray-700 transition-colors duration-300 mt-10"
            onClick={() => nevigate(`/categoryLists/POSTER`)}
          >
            Explore more...
            <FaArrowTrendUp className="ml-3 animate-ping" size={24} />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default ThinkingSection;
