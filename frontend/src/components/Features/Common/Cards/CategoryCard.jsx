import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiCategory } from "react-icons/bi";
import url from "../../../../assets/url";

const CategoryCard = ({ id, image, title, total }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <motion.div
        className="w-full bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        onClick={() => navigate(`/productList/${id}`)}
      >
        <img
          src={`${url}Tools/${image}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hover:animate-pulse"
        />
      </motion.div>
      <motion.div className="p-4 bg-gradient-to-b from-gray-50 to-gray-100 z-40">
        <motion.h3 className=" font-semibold text-gray-800 mb-2 flex items-center">
          <BiCategory className="text-indigo-800 mr-2 " />
          {title}
        </motion.h3>
      </motion.div>
    </div>
  );
};

export default CategoryCard;
