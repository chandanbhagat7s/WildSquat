import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import url from "../../assets/url";

const ProductGrid = ({ products, addToCart }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
    <AnimatePresence>
      {products.map((product) => (
        <LuxuryProductCard
          key={product._id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </AnimatePresence>
  </div>
);

const LuxuryProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="relative overflow-hidden cursor-pointer shadow-lg rounded-lg"
        onClick={() => navigate(`/productDetails/${product._id}`)}
      >
        <motion.div
          className="aspect-[3/4] overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}img/${product.coverImage}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <h3 className=" text-gray-800 mb-2 font-bold">{product.name}</h3>
        <p className="text-gray-600 mb-4">Rs.{product.price}</p>

        <div className="flex justify-center space-x-4">
          <motion.button
            className="flex items-center px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 w-2/3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to
            <FaShoppingCart className="ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

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
        <motion.p
          className="text-xl text-gray-600 max-w-3xl mx-auto"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Elevate your performance with our curated selection of premium
          athletic equipment.
        </motion.p>
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
