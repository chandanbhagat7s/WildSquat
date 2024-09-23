import { useState, useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";

import url from "../../../assets/url";
import { GrFormNext } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";

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
      </motion.div>
    </motion.div>
  );
};

const CategoryList = () => {
  const navigate = useNavigate();
  const { gender } = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/CATEGORY?gender=${gender}&page=${page}&limit=6&fields=name,label,coverImage,_id`
        );

        console.log(res.data);
        if (res.data.products == 0) {
          setPage(1);
          return;
        }
        setProduct([...res?.data?.products]);
      } catch (e) {
        console.log(e);

        return e.response;
      }
    }
    getData();
  }, [gender, page]);

  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-gray-50 to-white flex flex-col justify-center items-center">
      <motion.h2
        className="text-4xl lg:text-5xl font-bold text-gray-500 mb-12 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Discover Our{" "}
        <span className="block md:inline-block bg-black text-white p-1 md:p-2 animate-pulse">
          Premium Category
        </span>
      </motion.h2>

      <div className="relative">
        <button
          onClick={() => {
            page >= 2 && setPage(page - 1);
          }}
          disabled={page == 1}
          className="absolute left-0 top-[50%] -translate-y-1/2 z-10 h-[10%] md:h-[30%] bg-gray-500 text-white 
           hover:bg-gray-100 hover:text-black  hover:border hover:border-black px-2 rounded shadow-lg font-extrabold text-3xl"
        >
          <IoIosArrowBack />
        </button>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {product.length > 0 &&
            product.map((card) => (
              <Card
                key={card._id}
                id={card._id}
                image={card.coverImage}
                title={card.label}
              />
            ))}
        </div>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          className="absolute right-0 top-[50%] -translate-y-1/2 z-10 h-[10%] md:h-[30%] bg-gray-500 text-white 
           hover:bg-gray-100 hover:text-black  hover:border hover:border-black px-2 rounded shadow-lg font-extrabold text-3xl"
        >
          <GrFormNext />
        </button>
      </div>

      <motion.div
        className="mt-20 text-center "
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-10 py-3 bg-gray-600 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-gray-700 transition-colors duration-300  animate-pulse"
          onClick={() => navigate("/categoryLists")}
        >
          View All Category{" "}
          <FiArrowRight className="ml-3 animate-ping" size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CategoryList;
