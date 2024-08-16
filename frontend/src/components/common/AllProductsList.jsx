import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import url from "../../assets/url";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { error, info } from "../../redux/slices/errorSlice";
import { addToCart } from "../../redux/slices/productSlice";
import LoadingSpinner from "./Spinner";

const LuxuryProductCard = ({ product, ATC }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="relative overflow-hidden cursor-pointer shadow-lg rounded-lg"
        onClick={() => navigate(`/productDetails/${product._id}`)}
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
      </div>

      <div className="mt-6 text-center">
        <h3 className=" text-gray-800 mb-2 font-bold">{product.name}</h3>
        <p className="text-gray-600 mb-4">Rs.{product.price}</p>

        <div className="flex justify-center space-x-4">
          <motion.button
            className="flex items-center px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => ATC(product._id)}
          >
            Add to
            <FaShoppingCart className="ml-2" />
          </motion.button>
        </div>
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
          className="text-6xl font-extrabold text-gray-800 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Premium Collection
          </span>
        </motion.h2>
        <p className="mt-3 text-2xl text-indigo-800 font-semibold max-w-2xl mx-auto">
          Elevate your performance with our curated selection of high-end
          athletic equipment
        </p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16 px-10 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {products?.length > 0 &&
            products.map((product) => (
              <LuxuryProductCard
                key={product._id}
                product={product}
                ATC={ATC}
              />
            ))}
        </motion.div>
      )}
    </div>
  );
}
