import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategorySelector from "./PresentSub";
import { useSelector } from "react-redux";
import { GrFormNext } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import ProductCard from "../Common/Cards/ProductCard";
import { FiArrowRight } from "react-icons/fi";

const PresentSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const { gender } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/CATEGORY?gender=${gender}&limit=8&fields=label,_id`
        );

        const data = res.data;
        setCategory([...data.products]);
        setSelectedCategory(data.products[0]?._id);
        fetchProducts(data.products[0]?._id);
      } catch (e) {}
    }
    fetchCategories();
  }, [gender]);

  const fetchProducts = async (categoryId) => {
    try {
      const response = await axios.get(
        `/api/v1/tools/getToolById/${categoryId}?populate=products&populateField=name,price,_id,coverImage&populateLimit=4&populatPage=${page}`
      );
      if (response.data.products.length === 0) {
        setPage(1);
      }
      setProducts(response.data.products);
    } catch (error) {}
  };

  const handleCategoryClick = (categoryId) => {
    setPage(1);
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  useEffect(() => {
    // fetchProducts(category);
    // fetchProducts(selectedCategory);
  }, [page]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center py-10 px-2 bg-white">
      {/* Section Title */}

      <div className="text-center mt-12 mb-8 px-4 md:px-0 space-y-2">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 tracking-tight mb-4 animate-fadeIn">
          Explore Bracket
        </h2>
        <h3 className="text-3xl font-semibold text-gray-700 tracking-wider ">
          Find the Perfect Match for Every Style
        </h3>

        <div className="mt-6">
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="inline-block w-0 h-1 bg-gradient-to-r from-gray-800 to-gray-400 rounded-full"
          ></motion.span>
        </div>
      </div>

      <CategorySelector
        categories={category}
        selectedCategory={selectedCategory}
        category={category}
        handleCategoryClick={handleCategoryClick}
      />

      {/* Category Selector */}
      <div className=" justify-center space-x-1 mb-10 overflow-x-auto md:justify-start hidden lg:flex">
        {category.map((cat) => (
          <motion.button
            key={cat._id}
            className={`px-4 py-2 rounded-md border ${
              cat._id === selectedCategory
                ? "bg-black text-white "
                : "bg-gray-200 text-gray-800"
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleCategoryClick(cat._id)}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="relative w-full">
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          className="absolute left-0 top-[50%] -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400"
          disabled={page == 1}
        >
          <IoIosArrowBack className="text-2xl" />
        </button>

        <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          className="absolute right-0 top-[50%] -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400"
        >
          <GrFormNext className="text-2xl" />
        </button>
      </div>

      <motion.div
        className="flex justify-center md:justify-center mt-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      >
        <motion.button
          whileHover={{
            scale: 1.1,
            backgroundColor: "#333333",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full font-bold text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-gray-800 hover:to-gray-600"
          onClick={() => navigate(`/productList/${selectedCategory}`)}
        >
          See All
          <FiArrowRight className="ml-4" size={26} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PresentSection;
