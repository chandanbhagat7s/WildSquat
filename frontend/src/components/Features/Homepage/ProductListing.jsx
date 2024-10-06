import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowTrendUp } from "react-icons/fa6";
import ProductCard from "../Common/Cards/ProductCard";

const ProductListing = () => {
  const navigate = useNavigate();
  const { gender } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `/api/v1/product/getAllTrendingProducts?gender=${gender}&populate=products&populateField=gender,name,price,_id,coverImage&populateLimit=4&populatPage=${page}`
        );

        if (res.data.products == 0) {
          setPage(1);
          return;
        }
        setProducts(res?.data?.products);
        setId(res?.data?.id);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [gender, page]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="py-16  bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-2 lg:px-6">
        <div className="text-center mt-12 mb-8 px-4 md:px-0">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 tracking-tight mb-4 animate-fadeIn">
            Elevate Your Style
          </h2>
          <h3 className="text-3xl font-semibold text-gray-700 tracking-wider mb-6">
            Discover Unmatched Elegance
          </h3>

          <div className="mt-6">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="inline-block w-0 h-1 bg-gradient-to-r from-gray-800 to-gray-400 rounded-full"
            ></motion.span>
          </div>
        </div>

        <div className="relative mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              // key={products}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            >
              {products.length > 0 &&
                products.map((product) => (
                  <motion.div key={product._id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center"
          >
            <IoIosArrowBack size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage(page + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center"
          >
            <GrFormNext size={24} />
          </motion.button>
        </div>
      </div>

      <motion.div
        className="mt-10 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-12 py-4 bg-black text-white rounded-full font-bold text-xl shadow-xl hover:bg-gray-900 transition-all duration-300"
          onClick={() => navigate(`/productList/${id}`)}
        >
          Explore All
          <FaArrowTrendUp className="ml-3" size={24} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductListing;
