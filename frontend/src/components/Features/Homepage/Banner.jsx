import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import url from "../../../assets/url";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Banner = ({ order = 0 }) => {
  const { gender } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({});
  const nevigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/SERIES?gender=${gender}&page=1&limit=2`
        );

        setProduct({ ...res?.data?.products[order] });
      } catch (e) {
        return e.response;
      }
    }
    getData();
  }, [gender]);
  function Placeholder() {
    return <div className="bg-gray-200 w-full h-full animate-pulse"></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {product?.label && (
        <div className="flex flex-col  md:flex-row items-center  md:justify-around space-y-10 ">
          {/* Image Section */}
          <div className="md:w-1/3 relative h-[600px] w-full">
            {/* Top-left image */}
            <Suspense fallback={<Placeholder />}>
              <LazyLoadImage
                loading="lazy"
                threshold={300}
                duration={500}
                effect="blur"
                placeholder={<Placeholder />}
                src={`${url}Tools/${product?.images[0]}`}
                alt="Woman with basketball"
                className="absolute top-0 left-0 w-48 h-64 object-cover z-40 rounded-lg shadow-lg"
              />
            </Suspense>

            {/* Middle-right image */}
            <img
              src={`${url}Tools/${product?.images[1]}`}
              alt="Man in black outfit"
              className="absolute top-16 right-0 w-72 h-96 object-cover z-30 rounded-lg shadow-lg"
            />

            {/* Bottom-left image */}
            <img
              src={`${url}Tools/${product?.images[2]}`}
              alt="Woman in workout gear"
              className="absolute bottom-0 left-0 w-56 h-72 object-cover z-40 rounded-lg shadow-lg"
            />

            {/* Bottom-right image */}
            <img
              src={`${url}Tools/${product?.images[3]}`}
              alt="Man working out"
              className="absolute bottom-5 right-5 w-40 h-48 object-cover z-40 rounded-lg shadow-lg"
            />
          </div>
          {/* Text Section */}
          <div className="md:w-1/2 mb-8 md:mb-0 px-4 md:px-0 text-center">
            <h2 className="text-sm font-semibold mb-4 uppercase tracking-widest text-gray-600">
              {product?.label}
            </h2>
            <h1 className="text-xl md:text-2xl font-bold mb-6 leading-snug tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
              {product?.shortDescription?.split("$").map((el) => {
                return <li>{el}</li>;
              })}
            </h1>

            {/* View All Button */}
            <motion.div
              className="flex justify-center md:justify-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              {/* <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#333333",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full font-bold text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-gray-800 hover:to-gray-600"
                onClick={() => nevigate(`/productList/${product._id}`)}
              >
                View All
                <FiArrowRight className="ml-4" size={26} />
              </motion.button> */}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
