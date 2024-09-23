import { FaShoppingBag, FaRegHeart, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import url from "../../../assets/url";
import { useEffect, useState } from "react";
import axios from "axios";
import { GrFormNext } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";

const ThinkingSection = () => {
  const { gender } = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

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
                <LuxuryProductCard
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
      </div>
    </motion.section>
  );
};

const LuxuryProductCard = ({ product, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="group relative bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/toolsDetails/${product._id}`)}
      >
        <motion.div
          className="overflow-hidden aspect-w-3 aspect-h-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}Tools/${product.coverImage}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>

        {/* Overlay with product details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-lg font-bold">{product.label}</h3>
            <div className="flex items-center mt-2">
              <FaStar className="text-yellow-400 mr-1" />
              <FaStar className="text-yellow-400 mr-1" />
              <FaStar className="text-yellow-400 mr-1" />
              <FaStar className="text-yellow-400 mr-1" />
              <FaStar className="text-gray-400 mr-1" />
              <span className="ml-2">4.0</span>
            </div>
            <p className="mt-2">Starting from ₹{product.price}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <FaShoppingBag className="text-gray-800" />
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <FaRegHeart className="text-red-500" />
        </button>
      </div>

      {/* Product name and price */}
      <div className="py-4 px-6 text-center">
        <h3 className="font-semibold text-gray-800 text-lg">{product.label}</h3>
      </div>
    </motion.div>
  );
};

export default ThinkingSection;
