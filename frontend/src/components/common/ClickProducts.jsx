import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import url from "../../assets/url";
import { FiShoppingCart } from "react-icons/fi";

const ProductGrid = ({ products, addToCart }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
    <AnimatePresence>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </AnimatePresence>
  </div>
);

const ProductCard = ({ product }) => (
  <motion.div
    key={product._id}
    className=" bg-white rounded-3xl shadow-lg  overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
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
      <div className="absolute bottom-0 right-4 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-white rounded-full shadow-md text-indigo-600 hover:bg-indigo-100 transition-colors duration-200"
          onClick={() => ATC(product._id)}
        >
          <FiShoppingCart size={20} />
        </motion.button>
      </div>
    </div>
    <div className="p-6 text-center">
      <h3 className="text-sm font-bold lg:font-semibold  text-gray-800 mb-2">
        {product.name}
      </h3>
      <p className="text-2xl font-bold text-indigo-600">₹{product.price}</p>
    </div>
  </motion.div>
);

const FilterSidebar = ({ maxPrice, setMaxPrice, sortBy, setSortBy }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Refine Selection</h2>

    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Sort By</h3>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
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
    .sort((a, b) => {
      if (sortBy === "priceLowToHigh") return a.price - b.price;
      if (sortBy === "priceHighToLow") return b.price - a.price;
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0; // Default to 'popular'
    });

  const addToCart = (product) => {
    // Implement add to cart functionality
    console.log("Added to cart:", product);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-5xl font-extrabold text-gray-900 mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover Your Perfect Gear
        </motion.h1>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
            <FilterSidebar
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </aside>
          <main className="lg:w-3/4">
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-4 pl-12 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <ProductGrid products={filteredProducts} addToCart={addToCart} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ClickProducts;
