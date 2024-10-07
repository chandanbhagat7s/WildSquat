import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

import { FaSearch, FaSpinner } from "react-icons/fa";
import url from "../../../assets/url";

const ProductSearch = ({ setSelectedProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce the search term to avoid making too many API calls
  const [debouncedSearchTerm] = useDebounce(searchTerm, 2000);

  useEffect(() => {
    const fetchProducts = async () => {
      if (debouncedSearchTerm) {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/v1/product/searchProduct?search=${debouncedSearchTerm}`
          );
          if (response.data?.status == "success") {
            setProducts(response?.data?.products);
          }
        } catch (e) {
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-2 lg:p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-2xl">
      <div className="relative mb-6">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for premium products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-12 pr-6 py-3 text-gray-900 bg-gray-200 rounded-full shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center text-blue-600">
          <FaSpinner className="animate-spin mr-2" />
          <span>Searching for products...</span>
        </div>
      ) : (
        <ul className="grid grid-cols-2  lg:grid-cols-3 gap-1 lg:gap-6">
          {products.length > 0 ? (
            products.map((product, i) => (
              <li
                key={i}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer text-center"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedProduct(product._id, {
                    name: product?.name,
                    coverImage: product?.coverImage,
                    price: product?.price,
                    id: product._id,
                  });
                }}
              >
                <img
                  src={`${url}img/${product.coverImage}`}
                  alt={product.name}
                  className="h-24 w-full object-contain mb-2 rounded-lg"
                />
                <h3 className="text-sm font-semibold text-gray-700">
                  {product.name}
                </h3>
              </li>
            ))
          ) : (
            <li className="py-4 text-center text-gray-500 italic">
              No products found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;
