import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { error } from "../../../redux/slices/errorSlice";
import LoadingSpinner from "../../common/Spinner";
import ProductCard from "../Common/Cards/ProductCard";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const BulkListLayoutProduct = ({ toolId }) => {
  const dispatch = useDispatch();
  const { gender } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  const fetchProducts = async () => {
    try {
      let res;
      if (toolId) {
        res = await axios.get(
          `/api/v1/tools/getToolById/${toolId}?populate=products&populateField=name,price,_id,coverImage&populateLimit=8&populatPage=${page}`
        );
      } else {
        res = await axios.get(
          `/api/v1/tools/getToolById/${params.id}?populate=products&populateField=name,price,_id,coverImage&populateLimit=8&populatPage=${page}`
        );
      }

      const newProducts = res?.data?.products;
      if (newProducts?.length === 0) {
        setHasMore(false);
      } else if (newProducts?.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
      if (newProducts?.length < 8) {
        setHasMore(false);
      }
    } catch (e) {
      console.log(e);

      dispatch(error({ message: "Failed to load products" }));
    }
  };

  useEffect(() => {
    console.log("TRIGRED", params.id, page);

    window.scrollTo(0, 0);
    // setPage((page) => page - page);
    // setProducts(() => []);
    console.log("page", page);

    fetchProducts();
  }, [gender, params.id]);

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!toolId ? (
          <>
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 tracking-tight mb-4 animate-fadeIn">
              Explore And get
            </h2>
            <h3 className="text-3xl font-semibold text-gray-700 tracking-wider mb-6">
              Discover Unmatched Elegance
            </h3>
          </>
        ) : (
          <>
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 tracking-tight mb-4 animate-fadeIn">
              Elevate Your Style
            </h2>
            <h3 className="text-3xl font-semibold text-gray-700 tracking-wider mb-6">
              Discover Unmatched Elegance
            </h3>
          </>
        )}

        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
          hasMore={hasMore}
          loader={<LoadingSpinner small={true} />}
          endMessage={
            <div className="text-center text-2xl font-bold mt-20">
              You have seen all products
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-10 py-3 bg-gray-600 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-gray-700 transition-colors duration-300 mt-3"
                  onClick={() => navigate("/categoryLists/CATEGORY")}
                >
                  Explore more...
                  <FaArrowTrendUp className="ml-3 animate-ping" size={24} />
                </motion.button>
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </motion.div>
  );
};

export default BulkListLayoutProduct;
