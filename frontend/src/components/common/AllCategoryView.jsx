import { useEffect, useState } from "react";
import { BsCollection } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import url from "../../assets/url";
import { useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";
import LoadingSpinner from "./Spinner";
import { BiCategory } from "react-icons/bi";
import { FaTag } from "react-icons/fa";

const Card = ({ id, image, title, total }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      onClick={() =>
        navigate(`/toolsDetails/${id}`, { state: { tool: "CATEGORY" } })
      }
    >
      <motion.div className="h-64 overflow-hidden">
        <motion.img
          src={`${url}Tools/${image}`}
          className="w-full h-full object-cover "
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        />
      </motion.div>

      <motion.div className="p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.h3 className=" font-semibold text-gray-800 mb-2 flex items-center">
          <BiCategory className="text-indigo-800 mr-2 " />
          {title}
        </motion.h3>
        <motion.p className="text-sm text-gray-600 flex items-center">
          <FaTag className="mr-2" />
          {total} items
        </motion.p>
      </motion.div>
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
        className="text-center pt-7"
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
      </motion.div>
      {display ? (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3  "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {display?.length > 0 &&
            display.map((product, index) => (
              <Card
                key={product._id}
                id={product._id}
                image={product.coverImage}
                title={product.label}
                total={product.products.length}
              />
            ))}
        </motion.div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
