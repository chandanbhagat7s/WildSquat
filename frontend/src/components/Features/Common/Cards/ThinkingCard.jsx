import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import url from "../../../../assets/url";
import { FaShoppingBag, FaRegHeart, FaChevronRight } from "react-icons/fa";

const ThinkingCard = ({ product, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={() => navigate(`/productList/${product?._id}`)}
    >
      <div className="relative h-72 lg:h-96 w-full">
        <img
          src={`${url}Tools/${product?.coverImage}`}
          alt={product?.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black bg-opacity-25 hover:bg-opacity-15 text-white hover:font-extrabold " />
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center lg:text-2xl text-xl">
          <h3 className="  font-bold uppercase text-white ">
            {" "}
            {product?.label}
          </h3>
          <motion.div
            className="text-white "
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronRight className="text-xl" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThinkingCard;
