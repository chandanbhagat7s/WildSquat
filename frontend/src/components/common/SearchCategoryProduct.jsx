import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { FaSearch, FaSpinner } from "react-icons/fa";

const SearchCategoryProduct = ({ setSelectedProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

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
        } catch (error) {
          console.error("Error fetching products:", error);
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
    setIsOpen(true);
  };

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-300 ease-in-out"
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center p-4 text-blue-500">
              <FaSpinner className="animate-spin mr-2" />
              <span>Searching...</span>
            </div>
          ) : (
            <ul className="py-1">
              {products.length > 0 ? (
                products.map((product, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() =>
                      handleProductSelect({
                        id: product._id,
                        name: product.name,
                        cover: product.coverImage,
                      })
                    }
                  >
                    {product.name}
                  </li>
                ))
              ) : searchTerm ? (
                <li className="px-4 py-2 text-sm text-gray-500 italic">
                  No products found
                </li>
              ) : (
                ""
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchCategoryProduct;
