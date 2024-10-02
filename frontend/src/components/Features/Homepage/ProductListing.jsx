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
          `/api/v1/product/getAllTrendingProducts?gender=${gender}&populate=products&populateField=name,price,_id,coverImage&populateLimit=6&populatPage=${page}`
        );

        if (res.data.products == 0) {
          setPage(1);
          return;
        }
        setProducts(res?.data?.products);
        setId(res?.data?.id);
      } catch (e) {
        console.error("Error fetching products:", e);
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
      className="py-24 bg-gradient-to-b bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl lg:text-6xl font-bold text-gray-800 mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Our{" "}
          <span className="block md:inline-block bg-black text-white px-3 py-2 rounded-md">
            Premium Collection
          </span>
        </motion.h2>

        <div className="relative mt-16">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-96"
              >
                <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            ) : (
              <motion.div
                key="products"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              >
                {products.map((product) => (
                  <motion.div key={product._id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
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
        className="mt-24 text-center"
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
