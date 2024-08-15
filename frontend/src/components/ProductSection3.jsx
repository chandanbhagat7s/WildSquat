import { useState } from "react";
import { FaShoppingBag, FaRegHeart, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import url from "../assets/url";

const LuxuryProductShowcase = () => {
  const { posters } = useSelector((state) => state.product);

  return (
    <motion.section
      className="bg-white py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-8">
        <motion.h2
          className="text-5xl font-bold text-gray-800 mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          What You
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Think Is Hear
          </span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {posters?.length > 0 &&
            posters.map((product, index) => (
              <LuxuryProductCard
                key={product._id}
                product={product}
                index={index}
              />
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const LuxuryProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div
        className="relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/toolsDetails/${product._id}`)}
      >
        <motion.div
          className="aspect-[3/4] overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}Tools/${product.coverImage}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className="bg-white text-gray-900 py-3 px-6 rounded-none text-sm uppercase tracking-wider font-medium hover:bg-gold-500 hover:text-black transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center">
        <h3 className=" font-bold text-gray-800 mb-2">{product.label}</h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.shortDescription}
        </p>
      </div>
    </motion.div>
  );
};

export default LuxuryProductShowcase;
