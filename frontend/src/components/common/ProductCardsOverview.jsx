import axios from "axios";
import React, { useState, useEffect } from "react";
import url from "../../assets/url";
import { useDispatch, useSelector } from "react-redux";
import { error, info } from "../../redux/slices/errorSlice";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const ProductCardsOverview = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);

  async function getAllProductDetails() {
    try {
      const res = await axios.get("/api/v1/product/getAllCardProducts");
      if (res?.data?.status === "success") {
        setProducts([...res?.data?.products.products]);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "Something went wrong" }));
    }
  }

  useEffect(() => {
    getAllProductDetails();
  }, []);

  return (
    <div className="mt-10 h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {products.length > 0 && (
        <div className="flex flex-col space-y-6">
          <ProductList
            products={products}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <ProductShowcase
            products={products}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      )}
    </div>
  );
};

const ProductShowcase = ({ products, currentIndex, setCurrentIndex }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="h-full relative">
      <AnimatePresence mode="wait">
        {products.length > 0 && (
          <ProductSlide
            key={products[currentIndex]._id}
            product={products[currentIndex]}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductSlide = ({ product }) => {
  const dispatch = useDispatch();
  const neviaget = useNavigate();
  const { msg } = useSelector((state) => state.product);
  async function ATC(id) {
    try {
      const res = await dispatch(addToCart(id));
      console.log(res);
      if (addToCart.fulfilled.match(res)) {
        dispatch(info({ message: "product added to cart" }));
      } else {
        dispatch(error({ message: msg || "failed to add " }));
      }
    } catch (e) {
      dispatch(
        error({
          message: "product not added to cart, please try again",
        })
      );
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex lg:flex-row flex-col absolute inset-0 items-center justify-around p-8 h-fit"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-2/2 lg:w-1/4 text-gray-800"
      >
        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse">
          {product.name}
        </h2>
        <p className="text-2xl font-extrabold mb-2  animate-bounce text-gray-700">
          ₹{product.price}
        </p>
        <p className="mb-4 text-gray-600">{product.shortDescription}</p>
        <ul className="list-none mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              className="mb-2 flex items-center text-gray-700"
            >
              <span className="mr-2 text-indigo-500">◆</span>
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-2/2 lg:w-1/2 flex justify-center items-center"
      >
        <img
          src={`${url}img/${product.coverImage}`}
          alt={product.name}
          className="h-72 object-contain filter drop-shadow-lg"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-2/2 lg:w-1/4 text-gray-800"
      >
        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
          Specifications
        </h3>
        <p className="mb-3">
          <strong className="text-indigo-600">Material:</strong>{" "}
          <span className="text-gray-700">{product.material.join(", ")}</span>
        </p>
        <p className="mb-3">
          <strong className="text-indigo-600">Shipping:</strong>{" "}
          <span className="text-gray-700">{product.shippingDetails}</span>
        </p>
        <p className="mb-3">
          <strong className="text-indigo-600">Returns:</strong>{" "}
          <span className="text-gray-700">{product.returnDetails}</span>
        </p>
        <p>
          <strong className="text-indigo-600">Status:</strong>{" "}
          <span className="text-gray-700">{product.status}</span>
        </p>
        <div className="flex space-x-4 mt-8">
          <button
            className="flex-1   text-indigo-600 shadow-lg  py-3 rounded-md ring-2 ring-indigo-500 ring-inset hover:bg-indigo-700 hover:text-indigo-100 hover:font-bold   hover:scale-105 hover:ring-blue-300"
            onClick={() => ATC(product._id)}
          >
            Add To Cart
          </button>
          <button
            className="flex-1   text-indigo-800 shadow-lg py-3 rounded-md ring-2 ring-indigo-500 ring-inset hover:bg-indigo-700 hover:text-indigo-100 hover:font-bold   hover:scale-105 hover:ring-blue-300"
            onClick={() => neviaget(`/productDetails/${product._id}`)}
          >
            View Details
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProductList = ({ products, currentIndex, setCurrentIndex }) => {
  return (
    <div className="mx-auto p-4 overflow-x-auto">
      <div className="flex space-x-4">
        {console.log(products)}
        {products.map((product, index) => (
          <div
            key={product._id}
            className={`cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? "scale-110 border-2 border-indigo-600"
                : "opacity-70"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={`${url}img/${product.coverImage}`}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCardsOverview;
