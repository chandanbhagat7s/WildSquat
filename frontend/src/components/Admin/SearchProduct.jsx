import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

import { FaSearch, FaSpinner } from "react-icons/fa";

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
    <>
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-300 ease-in-out"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center text-blue-500">
            <FaSpinner className="animate-spin mr-2" />
            <span>Searching...</span>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product, i) => (
                <li
                  key={i}
                  className="py-4 px-2 transition duration-150 ease-in-out cursor-pointer hover:bg-gray-400 rounded-lg text-center hover:text-white hover:font-bold"
                  onClick={() =>
                    setSelectedProduct(product._id, {
                      name: product?.name,
                      coverImage: product.coverImage,
                    })
                  }
                >
                  {product.name}
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
    </>
  );
};

export default ProductSearch;
