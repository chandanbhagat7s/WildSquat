import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import url from "../../assets/url";

const ProductGrid = ({ products, addToCart }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
    <AnimatePresence>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </AnimatePresence>
  </div>
);

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={`${url}img/${product.coverImage}`}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <button
            onClick={() => navigate(`/productDetails/${product._id}`)}
            className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-sm lg:text-lg text-center font-bold text-gray-800 mb-2">
          {product.name}
        </h3>
        <div className="flex justify-center items-center mb-4">
          Rs.
          <span className="text-2xl font-extrabold text-indigo-600">
            {product.price}
          </span>
          {/* <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-600">
              4.5 (120 reviews)
            </span>
          </div> */}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full   text-indigo-500 py-3 rounded-lg font-semibold hover:bg-indigo-700 hover:text-white transition-colors duration-300 flex items-center justify-center border"
        >
          <FaShoppingCart className="mr-2" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

const FilterSidebar = ({ maxPrice, setMaxPrice, sortBy, setSortBy }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>

    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Sort By</h3>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="priceHighToLow">Price: High to Low</option>
      </select>
    </div>
  </div>
);

const ClickProducts = () => {
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const { toolId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/v1/tools/getToolById/${toolId}`);
        if (res?.data?.status === "success") {
          setProducts(res?.data?.tooldata?.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [toolId]);

  const filteredProducts = products
    .filter((product) => product.price <= maxPrice)
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => (category ? product.category === category : true))
    .sort((a, b) => {
      if (sortBy === "priceLowToHigh") return a.price - b.price;
      if (sortBy === "priceHighToLow") return b.price - a.price;
      return 0; // Default to 'popular'
    });

  const addToCart = (product) => {
    // Implement add to cart functionality
    console.log("Added to cart:", product);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center pt-5 pb-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2
          className="text-5xl font-bold text-gray-800 mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Pick Up{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            What You Love
          </span>{" "}
          <span className="animate-pulse">💖</span>
        </motion.h2>
        <p className="mt-3 text-2xl text-indigo-800 font-semibold">
          Discover performance-enhancing equipment for every athlete
        </p>
      </motion.div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <FilterSidebar
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </aside>
          <main className="md:w-3/4">
            <div className="mb-8 flex items-center"></div>
            <ProductGrid products={filteredProducts} addToCart={addToCart} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ClickProducts;
