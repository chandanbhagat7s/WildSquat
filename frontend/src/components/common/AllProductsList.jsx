import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import url from "../../assets/url";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { error, info } from "../../redux/slices/errorSlice";
import { addToCart } from "../../redux/slices/productSlice";
import LoadingSpinner from "./Spinner";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      key={product._id}
      className=" bg-white rounded-3xl shadow-lg  overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          onClick={() => navigate(`/productDetails/${product._id}`)}
          className="w-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}img/${product.coverImage}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
        <div className="absolute bottom-0 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white rounded-full shadow-md text-indigo-600 hover:bg-indigo-100 transition-colors duration-200"
            onClick={() => ATC(product._id)}
          >
            <FiShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-sm font-bold lg:font-semibold  text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-indigo-600">₹{product.price}</p>
      </div>
    </motion.div>
  );
};

export default function AllProductList() {
  let showOf = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { msg } = useSelector((state) => state.product);

  async function ATC(id) {
    try {
      console.log("called with id", id);

      const res = await dispatch(addToCart(id));
      if (addToCart.fulfilled.match(res)) {
        dispatch(info({ message: "Product added to cart" }));
      } else {
        dispatch(error({ message: msg || "Failed to add" }));
      }
    } catch (e) {
      dispatch(
        error({ message: "Product not added to cart, please try again" })
      );
    }
  }

  async function getAllProductDetails() {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/product/getAllTrendingProducts");
      if (res.data.status === "success") {
        setProducts(res?.data?.products[0].products);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "Something went wrong" }));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProductDetails();
    window.scrollTo(0, 0);
  }, [showOf]);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <motion.div
        className="text-center mb-16"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2
          className="text-5xl  font-extrabold text-gray-800 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Trending Collection
          </span>
        </motion.h2>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   max-w-7xl gap-3 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {products?.length > 0 &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} ATC={ATC} />
            ))}
        </motion.div>
      )}
    </div>
  );
}
