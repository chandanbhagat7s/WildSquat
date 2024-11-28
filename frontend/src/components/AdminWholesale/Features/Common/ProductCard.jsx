import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import url from "../../../../assets/url";

const ProductCard = ({ product, openDialog }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key={product?._id}
      className=" bg-gray-200 font-semibold  shadow-lg  overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-sm "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => openDialog(product?._id)}
    >
      <div className="relative">
        <motion.div
          className="w-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}wholesale/product/${product?.images[0]}`}
            alt={product?.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse"
          />
        </motion.div>
        {/* <div className="absolute bottom-0 right-4 flex space-x-2 ">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white rounded-full shadow-md transition-colors duration-200"
            
          >
            <FiShoppingCart size={20} />
          </motion.button>
        </div> */}
      </div>
      <div className="p-6 text-center ">
        <h3 className=" font-bold lg:font-semibold  text-gray-600 mb-2">
          {product?.name}
        </h3>
        <p className="text-2xl font-bold text-gray-800 text-center">
          <span className="text-2xl font-bold text-gray-800">
            ₹{product.price}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
