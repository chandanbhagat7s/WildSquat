import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import url from "../../assets/url";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import CategorySelector from "./PresentSub";
import { useSelector } from "react-redux";
import { GrFormNext } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      key={product._id}
      className=" bg-gray-100 rounded-3xl shadow-lg  overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          onClick={() => navigate(`/productDetails/${product._id}`)}
          className="w-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}img/${product.coverImage}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
        <div className="absolute bottom-0 right-4 flex space-x-2 ">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white rounded-full shadow-md transition-colors duration-200"
            onClick={() => ATC(product._id)}
          >
            <FiShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className=" font-bold lg:font-semibold  text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-gray-600">₹{product.price}</p>
      </div>
    </motion.div>
  );
};

const PresentSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [category, setCateogy] = useState([]);
  const { gender } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const fetchList = async () => {
    try {
      const resoponce = await axios.get(
        `/api/v1/tools/getTool/CATEGORY?gender=${gender}&limit=8&fields=label,_id`
      );
      let data = resoponce.data;
      setCateogy([...data.products]);
      setSelectedCategory(data.products[0]._id);
      fetchProducts(data.products[0]._id);
    } catch (e) {}
  };

  const fetchProducts = async (categoryId) => {
    try {
      const response = await axios.get(
        `/api/v1/tools/getToolById/${categoryId}?populate=products&populateField=name,price,_id,coverImage&populateLimit=6&populatPage=${page}`
      );
      console.log(response.data);

      const data = response.data;
      if (response.data.products == 0) {
        setPage(1);
        return;
      }

      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setPage(1);
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  useEffect(() => {
    fetchList();
  }, []);
  useEffect(() => {
    selectedCategory && fetchProducts(selectedCategory);
  }, [page]);

  return (
    <div className="flex justify-center items-center flex-col my-20">
      <motion.h2
        className="text-4xl lg:text-5xl font-bold text-gray-500 mb-12 text-center "
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        View Our{" "}
        <span className="block md:inline-block bg-black text-white p-1 md:p-2 animate-pulse ">
          Premium Varity
        </span>
      </motion.h2>
      <div className="hidden lg:block">
        <div className="categories flex space-x-4 mb-8 overflow-x-scroll w-[100vw] lg:justify-center py-5">
          {category.length > 0 &&
            category.map((c) => (
              <button
                key={c._id}
                className={` flex  items-center space-x-2 px-4 py-2 rounded ${
                  c._id === selectedCategory
                    ? "bg-black text-white md:scale-125 font-bold shadow-lg md:skew-y-6"
                    : "bg-gray-200"
                }`}
                onClick={() => handleCategoryClick(c._id)}
              >
                <span>{c.label}</span>
              </button>
            ))}
        </div>
      </div>
      <CategorySelector
        categories={category}
        selectedCategory={selectedCategory}
        category={category}
        handleCategoryClick={handleCategoryClick}
      />
      <div className="relative">
        <button
          onClick={() => {
            page >= 2 && setPage(page - 1);
          }}
          disabled={page == 1}
          className="absolute left-0 top-[50%] -translate-y-1/2 z-10 h-[10%] md:h-[30%] bg-gray-500 text-white 
           hover:bg-gray-100 hover:text-black  hover:border hover:border-black px-2 rounded shadow-lg font-extrabold text-3xl"
        >
          <IoIosArrowBack />
        </button>
        <div className="products grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {products.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          className="absolute right-0 top-[50%] -translate-y-1/2 z-10 h-[10%] md:h-[30%] bg-gray-500 text-white 
           hover:bg-gray-100 hover:text-black  hover:border hover:border-black px-2 rounded shadow-lg font-extrabold text-3xl"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default PresentSection;
