import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { error } from "../../../redux/slices/errorSlice";
import LoadingSpinner from "../../common/Spinner";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import ThinkingCard from "../Common/Cards/ThinkingCard";

const BulkListLayoutCard = ({ tool }) => {
  const dispatch = useDispatch();
  const { gender } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `/api/v1/tools/getTool/${params.tool}?gender=${gender}&page=${page}&limit=8&fields=name,label,coverImage,_id`
      );

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
      dispatch(error({ message: "Failed to load products" }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [gender]);

  return (
    <motion.div
      className="py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-8">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-gray-500 mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Our{" "}
          <span className="block md:inline-block bg-black text-white p-1 md:p-2 animate-pulse">
            Premium Collection
          </span>
        </motion.h2>

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
                  onClick={() => navigate("/categoryLists/POSETER")}
                >
                  Explore more...
                  <FaArrowTrendUp className="ml-3 animate-ping" size={24} />
                </motion.button>
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {products.length > 0 &&
              products.map((card) => (
                <ThinkingCard key={card._id} product={card} />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </motion.div>
  );
};

export default BulkListLayoutCard;
