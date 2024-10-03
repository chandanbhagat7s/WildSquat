import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiCategory } from "react-icons/bi";
import url from "../../../../assets/url";

const CategoryCard = ({ id, image, title, total }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center ">
      <motion.div
        className="w-full  rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        onClick={() => navigate(`/productList/${id}`)}
      >
        <img
          src={`${url}Tools/${image}`}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        />
      </motion.div>
      <motion.div className="px-3 py-2 bg-gray-100 text-black rounded-lg shadow-xl border border-gray-200 w-[100%]">
        <motion.h3 className="text-lg font-semibold   flex items-center">
          <BiCategory className="text-gray-600 mr-2" />
          {title}
        </motion.h3>
      </motion.div>
    </div>
  );
};

export default CategoryCard;
