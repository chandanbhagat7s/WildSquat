import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchCategoryProduct from "../common/SearchCategoryProduct";
import url from "../../assets/url";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  error,
  message,
  success,
  warning,
} from "../../redux/slices/errorSlice";
import axios from "axios";

const AddSimillar = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispatch = useDispatch();

  const addToSelected = (product) => {
    console.log(
      product,
      selectedProducts.find((el) => el.id == product.id)
    );
    if (selectedProducts.find((el) => el.id == product.id)) {
      dispatch(warning({ message: "Product already added" }));
      return;
    }
    setSelectedProducts([...selectedProducts, product]);
  };

  async function addProductToSimmlar() {
    try {
      const res = await axios.patch("/api/v1/admin/addColors", {
        ids: selectedProducts.map((el) => el?.id),
      });
      console.log(res);
      if (res?.data?.status == "success") {
        dispatch(success({ message: res?.data?.msg }));
      }
    } catch (e) {
      console.log(e);
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  }

  const removeToSelected = (id) => {
    setSelectedProducts([...selectedProducts.filter((el) => el.id != id)]);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="mb-8">
        <SearchCategoryProduct setSelectedProduct={addToSelected} />
      </div>
      <div className="flex justify-center flex-col space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {selectedProducts.length > 0 &&
              selectedProducts?.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative"
                >
                  <img
                    src={`${url}img/${product.cover}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeToSelected(product.id)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        {selectedProducts.length > 0 && (
          <button
            className="px-5   text-indigo-600 shadow-lg  py-3 rounded-md ring-2 ring-indigo-500 ring-inset hover:bg-indigo-700 hover:text-indigo-100 hover:font-bold  hover:ring-blue-300 w-fit self-center"
            onClick={addProductToSimmlar}
          >
            Add {selectedProducts.length} Product to simillar
          </button>
        )}
      </div>
    </div>
  );
};

export default AddSimillar;
