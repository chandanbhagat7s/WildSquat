import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import url from "../../assets/url";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axios from "axios";
import { error } from "../../redux/slices/errorSlice";

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
            src={`${url}img/${product.coverImage}`}
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
        <h3 className="  text-gray-800 mb-2">{product.name}</h3>

        <div className="flex flex-col space-y-1">
          <button className=" flex justify-center hover:scale-105 items-center px-5 py-3  border border-1 border-indigo-200 rounded-lg">
            Add to
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function AllProductList() {
  let showOf = useParams();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  async function getAllProductDetails() {
    try {
      const res = await axios.get("/api/v1/product/getAllTrendingProducts");
      if (res.data.status === "success") {
        console.log(res?.data?.products[0].products);

        setProducts(res?.data?.products[0].products);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "Something went wrong" }));
    }
  }

  useEffect(() => {
    if (showOf.id == "trending") {
      getAllProductDetails();
    } else {
      getAllProductDetails();
    }
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
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {products?.length > 0 &&
          products.map((product, index) => (
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
