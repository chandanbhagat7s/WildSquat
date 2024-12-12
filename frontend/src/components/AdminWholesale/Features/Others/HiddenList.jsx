import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { error, success } from "../../../../redux/slices/errorSlice";
import url from "../../../../assets/url";

export default function HiddenList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `/api/v1/wholesale/product/operation/getAllHiddenProducts`
      );
      let newProducts = res?.data?.data;

      if (newProducts?.length > 0) {
        setProducts(newProducts);
      }
    } catch (e) {
      dispatch(error({ message: "Failed to load products" }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const handleUpdateSize = async (id) => {
    try {
      const res = await axios.patch(
        `/api/v1/wholesale/product/operation/unhideProduct/${id}`
      );
      if (res?.data?.status) {
        dispatch(success({ message: "Removed From hidden product" }));
      }
    } catch (e) {
      dispatch(error({ message: "something went wrong please try again" }));
    }
  };

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="flex items-center gap-4 border p-4 rounded-lg shadow-md"
            >
              <div className="flex-shrink-0">
                <img
                  src={`${url}/wholesale/product/${product.images[0]}`}
                  alt={product.name}
                  className="h-32 w-32 object-cover rounded-md object-top"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-bold mb-2">
                  {" "}
                  {index + 1} . {product.name}
                </h2>
                <span className="text-black">Size Option</span>
                <span className="font-bold text-gray-500">
                  {product.sizeOption ? "Available" : "Not Available"}
                </span>
                <div className="mb-4">
                  <h3 className="font-semibold mb-1">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size.size}
                        className="px-3 py-1 border border-black rounded-md hover:border-indigo-800 transition duration-300"
                      >
                        <span className="text-lg font-semibold text-indigo-800">
                          {size.size} /{" "}
                          <span className="text-sm text-black">
                            {size.price}
                          </span>
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleUpdateSize(product._id)}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600 transition"
                >
                  UnHide
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
