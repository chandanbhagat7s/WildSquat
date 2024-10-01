import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { FaSearch, FaSpinner, FaTimes, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import url from "../../assets/url";
import { useNavigate } from "react-router-dom";

const SearchCategoryProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchProducts = async () => {
      if (debouncedSearchTerm) {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/v1/product/searchProduct?search=${debouncedSearchTerm}`
          );
          if (response.data?.status === "success") {
            setProducts(response?.data?.products);
          }
        } catch (e) {
          console.error("Error fetching products:", e);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleProductSelect = (productId) => {
    navigate(`/productDetails/${productId}`);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search for premium products..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-12 py-3 text-lg text-gray-800 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition duration-300 ease-in-out"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <FaTimes className="text-xl" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-white rounded-lg shadow-2xl overflow-hidden z-50"
          >
            {loading ? (
              <div className="flex items-center justify-center p-6 text-blue-500">
                <FaSpinner className="animate-spin mr-3 text-2xl" />
                <span className="text-lg font-semibold">Searching...</span>
              </div>
            ) : (
              <div className="max-h-96 overflow-auto">
                {products.length > 0 && (
                  <div className="p-4 bg-gray-100 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-500">
                      {products.length} item{products.length !== 1 && "s"} found
                    </span>
                  </div>
                )}
                {products.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 shadow-lg shadow-black">
                    {products.map((product, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        onClick={() => handleProductSelect(product._id)}
                        className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out"
                      >
                        <img
                          src={`${url}img/${product.coverImage}`}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded-md shadow-md"
                        />
                        <div className="flex-grow">
                          <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {product.shortDescription || "Premium product"}
                          </p>
                        </div>
                        <FaChevronRight className="text-gray-400" />
                      </motion.li>
                    ))}
                  </ul>
                ) : searchTerm ? (
                  <div className="p-6 text-center">
                    <p className="text-lg text-gray-500 italic">
                      No products found
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchCategoryProduct;
