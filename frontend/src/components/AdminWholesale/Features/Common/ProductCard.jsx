import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import url from "../../../../assets/url";
import { FaEye, FaWhatsapp } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Suspense } from "react";

function Placeholder() {
  return <div className="bg-gray-400 w-full h-full animate-pulse"></div>;
}

const ProductCard = ({ product, openDialog }) => {
  const navigate = useNavigate();
  const handleOrderClick = (product) => {
    // Construct the WhatsApp message
    // const message = `Hello, I want to purchase:\n\n*${product.name}*\n*Price:* ${product.price}\n*URL:* ${url}wholesale/productDetails/${product._id}\n\nThank you!`;
    const message = `Hello, I want to purchase:\n\n*${product.name}*\n*Price:* ${product.price}\n*URL:* ${url}wholesale/productDetails/${product._id}\n\nThank you!`;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
      navigator.userAgent
    );

    console.log("ist it mobile", isMobile, navigator.userAgent);

    // Encode the message and construct the WhatsApp URL
    if (isMobile) {
      const encodedMessage = encodeURIComponent(message);

      const whatsappLink = `https://wa.me/${8686416102}?text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");
    } else {
      const whatsappUrl = `https://web.whatsapp.com/send?phone=${encodeURIComponent(
        8686416102
      )}&text=${encodeURIComponent(message)}&app_absent=0`;

      // Open the URL in a new tab
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <motion.div
      key={product?._id}
      className=" font-semibold shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col rounded-lg "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute text-sm p-2  text-black bg-green-300 z-10 rounded">
        <span className="animate-pulse">
          {" "}
          {product?.sizeOption && "Buy With Optional Size"}
        </span>
      </div>
      {/* Product Images Section */}
      <div className="grid grid-cols-2 gap-1 p-2">
        {product?.images?.slice(0, 4).map((image, index) => (
          <Suspense fallback={<Placeholder />} key={index}>
            <LazyLoadImage
              src={`${url}wholesale/product/${image}`}
              alt={`Product Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-md object-top"
              loading="lazy"
              threshold={300}
              duration={500}
              effect="blur"
              placeholder={<Placeholder />}
            />
          </Suspense>
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
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
          >
            <FaEye className="inline-block mr-2" /> View More
          </button>

          {/* Buy on WhatsApp Button */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className=" bg-green-600  py-3 px-4 rounded-lg text-white hover:bg-green-700 flex-1"
            onClick={() => handleOrderClick(product)}
          >
            <FaWhatsapp className="inline-block mr-2" />
            Buy on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
