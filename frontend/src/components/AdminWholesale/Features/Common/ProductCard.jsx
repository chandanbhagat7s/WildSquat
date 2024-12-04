import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import url from "../../../../assets/url";

const ProductCard = ({ product, openDialog }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key={product?._id}
      className="bg-gray-200 font-semibold shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-sm flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Images Section */}
      <div className="grid grid-cols-2 gap-1 p-2">
        {product?.images.slice(0, 4).map((image, index) => (
          <img
            key={index}
            src={`${url}wholesale/product/${image}`}
            alt={`Product Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-md"
          />
        ))}
      </div>

      {/* Product Details Section */}
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="font-bold lg:font-semibold text-gray-600 mb-2">
          {product?.name}
        </h3>
        <p className="text-2xl font-bold text-gray-800 mb-4">
          ₹{product.price}
        </p>
        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-auto">
          {/* View More Button */}
          <button
            onClick={() => openDialog(product?._id)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            View More
          </button>

          {/* Buy on WhatsApp Button */}
          <a
            href={`https://wa.me/<YOUR_PHONE_NUMBER>?text=Hi,%20I%20am%20interested%20in%20${product?.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Buy on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
