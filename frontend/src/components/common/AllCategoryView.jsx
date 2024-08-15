import { useEffect, useState } from "react";
import { BsCollection } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import url from "../../assets/url";
import { useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";

const LuxuryProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group "
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

      <div className="mt-6 text-center ">
        <h3 className="flex items-center justify-center font-bold text-gray-800 mb-2">
          {product.label}
          <BsCollection className="mx-1" />
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className=" flex justify-center items-center ">
          <button className="text-gray-600 hover:text-gold-500 transition-colors duration-300">
            {/* <FaShoppingBag className="w-5 h-5" /> */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex  items-center space-x-2 p-3 bg-white rounded-full shadow-md text-red-500 hover:bg-red-100 transition-colors duration-200"
              // onClick={(e) => addToHeart(product._id, e)}
            >
              Add to <FiHeart size={20} className="mx-1" />
            </motion.button>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function AllCategoryView() {
  let { category } = useSelector((state) => state.product);
  let { multiple } = useSelector((state) => state.product);
  let locations = useLocation();
  console.log(locations);
  let displayOther = locations?.state?.displayOther == "MULTIPLE";

  console.log("display other", displayOther, multiple);

  let display = displayOther ? multiple : category;
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <>
      <motion.div
        className="text-center py-16"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2
          className="text-5xl font-bold text-gray-800 mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Premium Variety
          </span>
        </motion.h2>
        <p className="mt-3 text-2xl text-indigo-800 font-semibold">
          Discover performance-enhancing equipment for every athlete
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {display?.length > 0 &&
          display.map((product, index) => (
            <LuxuryProductCard
              key={product._id}
              product={product}
              index={index}
            />
          ))}
      </motion.div>
    </>
  );
}
