import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import url from "../../../../assets/url";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/slices/productSlice";
import { error, info, warning } from "../../../../redux/slices/errorSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { msg } = useSelector((state) => state.product);

  const { isLoggedIn } = useSelector((state) => state.auth);
  async function ATC(id) {
    if (!isLoggedIn) {
      dispatch(info({ message: "Please Login first" }));
      navigate("/login");
      return;
    }
    try {
      const res = await dispatch(addToCart(id));
      if (addToCart.fulfilled.match(res)) {
        dispatch(info({ message: "Product added to cart" }));
      } else {
        dispatch(warning({ message: msg || "Failed to add" }));
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            "Product not added to cart, please try again",
        })
      );
    }
  }

  return (
    <motion.div
      key={product?._id}
      className="bg-gray-200 font-semibold shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate(`/productDetails/${product?._id}`)}
    >
      <div className="relative">
        <motion.div
          className="w-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          {/* Image Container with Aspect Ratio */}
          <div className="relative w-full h-0 pb-[100%]">
            {" "}
            {/* 1:1 aspect ratio */}
            <img
              loading="lazy"
              src={`${url}img/${product?.coverImage}`}
              alt={product?.name}
              className="absolute top-0 left-0 w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
        <div className="absolute bottom-0 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3  bg-white text-black rounded-full shadow-md transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering parent onClick
              ATC(product?._id);
            }}
          >
            <FiShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
      <div className="py-2 px-1 text-center backdrop-blur-lg">
        <h3 className=" text-gray-900 mb-2">{product?.name}</h3>
        <p className="text-2xl font-bold text-gray-800 text-center">
          {product?.discount > 0 ? (
            <div className="flex items-center justify-center text-center space-x-2">
              {/* Original Price with Strikethrough */}
              <span className="text-sm text-gray-500 line-through">
                ₹{product.price}
              </span>
              {/* Discounted Price */}
              <span className="text-2xl text-center font-bold text-black">
                ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            // Regular Price
            <span className="text-2xl font-bold text-gray-800">
              ₹{product.price}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
