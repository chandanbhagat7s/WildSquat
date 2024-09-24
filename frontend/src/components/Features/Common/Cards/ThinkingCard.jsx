import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import url from "../../../../assets/url";
import { FaShoppingBag } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

const ThinkingCard = ({ product, index }) => {
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
        onClick={() => navigate(`/productList/${product?._id}`)}
      >
        <motion.div
          className="overflow-hidden aspect-w-3 aspect-h-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}Tools/${product?.coverImage}`}
            alt={product?.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:animate-pulse"
          />
        </motion.div>
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
        <h3 className="font-semibold text-gray-800 text-lg">
          {product?.label}
        </h3>
      </div>
    </motion.div>
  );
};

export default ThinkingCard;
