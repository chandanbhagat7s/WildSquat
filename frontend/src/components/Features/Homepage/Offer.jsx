import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import url from "../../../assets/url";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Offer = ({ order = 0 }) => {
  const { gender } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/OFFER?gender=${gender}&page=1&limit=2`
        );
        setProduct({ ...res?.data?.products[order] });
      } catch (e) {
        return e.response;
      }
    }
    getData();
  }, [gender]);

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="container mx-auto px-1 lg:px-4 py-16 relative bg-white">
      {product?.label && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center md:justify-between space-y-12 md:space-y-0 relative"
        >
          {/* Sale Tag */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
            className="absolute top-6 left-6 z-10"
          >
            <span className="bg-red-600 text-white font-bold text-sm py-2 px-4 rounded-full shadow-lg">
              EXCLUSIVE OFFER
            </span>
          </motion.div>

          {/* Grid Layout Section */}
          <div className="md:w-1/2 grid grid-cols-2 gap-1 lg:gap-3">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                variants={imageVariants}
                whileHover="hover"
                className="relative overflow-hidden rounded-lg shadow-2xl"
              >
                <img
                  src={`${url}Tools/${product?.images[index]}`}
                  alt={`Product ${index + 1}`}
                  className="object-cover w-full h-80 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          {/* Text and Button Section */}
          <div className="md:w-1/2 text-center md:text-left md:pl-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base font-bold mb-3 uppercase tracking-widest text-gray-800"
            >
              {product?.label.replaceAll("$", "\n")}
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-4xl font-bold mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-gray-500"
            >
              {product?.shortDescription.replaceAll("$", "\n")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-600 mb-8 text-lg"
            >
              Discover our exclusive collection of premium products. Limited
              time offer - act now!
            </motion.p>

            {/* View All Button */}
            <motion.div
              className="flex justify-center md:justify-start"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-bold text-lg shadow-xl transition-all duration-300 ease-in-out"
                onClick={() => navigate(`/productList/${product._id}`)}
              >
                Explore Collection
                <FiArrowRight className="ml-4" size={24} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Offer;
