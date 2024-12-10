import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { error } from "../../../../redux/slices/errorSlice";
import LoadingSpinner from "../../../common/Spinner";
import ProductCard from "./ProductCard";
import FullScreenDialog from "./FullScreenDialog";
import Product from "../Products/ProductDetails";

const BulkListLayoutProduct = ({ toolName }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const location = useLocation();
  let state = location?.state?.reset || false;
  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = (productId) => {
    setId(productId);
    setIsDialogOpen(true);
  };
  const fetchProducts = async () => {
    try {
      let res;
      if (toolName) {
        res = await axios.get(
          `/api/v1/wholesale/tool/?name=${toolName}&populate=products&populateField=name,price,_id,images,sizeOption&populateLimit=8&populatPage=${page}`
        );
      } else {
        res = await axios.get(
          `/api/v1/wholesale/tool?_id=${params.id}&populate=products&populateField=name,price,_id,discount,images,sizeOption&populateLimit=8&populatPage=${page}`
        );
      }

      const newProducts = res?.data?.data[0]?.products;
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
    fetchProducts();
  }, []);

  return (
    <motion.div
      className="mt-16 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-1 sm:px-1 lg:px-8">
        {!toolName ? (
          <>
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 tracking-tight mb-4 py-2 animate-fadeIn">
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
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols2 lg:grid-cols-3 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                openDialog={openDialog}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      {isDialogOpen && (
        <FullScreenDialog isOpen={isDialogOpen} onClose={closeDialog}>
          <Product productId={id} />
        </FullScreenDialog>
      )}{" "}
    </motion.div>
  );
};

export default BulkListLayoutProduct;
