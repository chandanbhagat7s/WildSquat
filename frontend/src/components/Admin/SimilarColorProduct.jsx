import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlus } from "react-icons/fa";
import url from "../../assets/url";
import ProductSearch from "./SearchProduct";
import { useDispatch } from "react-redux";
import { warning } from "../../redux/slices/errorSlice";

const SimilarColorProducts = ({ similarProducts, setSimilarProducts }) => {
  const dispatch = useDispatch();
  function setsearchedProductOnClick(id, obj) {
    console.log(obj);
    if ([...similarProducts].find((el) => el.id == id)) {
      console.log("ALERADY ADDED");
      dispatch(
        warning({ message: "product already added into simmilar products" })
      );
      return;
    }

    setSimilarProducts([
      ...similarProducts,
      { _id, name: obj.name, coverImage: obj.coverImage },
    ]);
  }

  function onRemove(id) {
    setSimilarProducts([...[...similarProducts].filter((el) => el._id != id)]);
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Similar Color Products
      </h2>
      <div className="mb-10">
        <ProductSearch setSelectedProduct={setsearchedProductOnClick} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {similarProducts?.length > 0 &&
            similarProducts?.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-2xl">
                  <img
                    src={`${url}img/${product.coverImage}`}
                    alt="Product"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => onRemove(product._id)}
                  >
                    <FaTimes />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 truncate">
                  {product.coverImage}
                </p>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SimilarColorProducts;
