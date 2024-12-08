import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import axios from "axios";
import { error, success, warning } from "../../../../redux/slices/errorSlice";
import url from "../../../../assets/url";
import ProductSearch from "../Common/SearchProduct";
const DeleteProduct = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const dispatch = useDispatch();

  const addToSelected = (id, product) => {
    console.log(product);

    // if (selectedProducts.find((el) => el.id == product.id)) {
    //   dispatch(warning({ message: "Product already added" }));
    //   return;
    // }
    setSelectedProducts([...selectedProducts, product]);
    setSelectedIds([...selectedIds, id]);
  };

  async function deleteProduct() {
    try {
      const res = await axios.post("/api/v1/wholesale/product/deleteProduct", {
        productIds: selectedProducts.map((el) => el?.id),
      });

      if (res?.data?.status) {
        dispatch(success({ message: res?.data?.msg }));
        setSelectedProducts([]);
        setSelectedIds([]);
      }
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  }

  const removeToSelected = (id) => {
    setSelectedProducts([...selectedProducts.filter((el) => el.id != id)]);
    setSelectedIds([...selectedIds.filter((el) => el != id)]);
  };

  return (
    <div className="container mx-auto p-6 flex flex-col bg-gray-50 rounded-xl shadow-lg">
      <div className="mb-10">
        <ProductSearch setSelectedProduct={addToSelected} />
      </div>

      <div className="flex flex-col space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {selectedProducts.length > 0 &&
              selectedProducts?.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-xl overflow-hidden relative transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative">
                    <img
                      src={`${url}wholesale/product/${product.image}`}
                      alt={product.name}
                      className="w-full h-56 object-contain transition-opacity duration-300 hover:opacity-90"
                    />
                    <button
                      type="button"
                      onClick={() => removeToSelected(product.id)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-indigo-600">
                      {product.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {selectedProducts.length > 0 && (
          <button
            className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md ring-2 ring-indigo-500 ring-inset transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-semibold text-lg self-center"
            onClick={deleteProduct}
          >
            delete selected products
          </button>
        )}
      </div>
    </div>
  );
};

export default DeleteProduct;
