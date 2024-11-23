import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBuyNLarge, FaRegCreditCard, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../redux/slices/productSlice";
import { error, info } from "../../../redux/slices/errorSlice";
import url from "../../../assets/url";
import { BiCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import OrderProcessingPage from "../../Instruction/OrderProcessing";
import BuyNowPopup from "../../Payments/paymentDialog";
import axios from "axios";
const ProductCard = ({ product, onMoreInfo, onRemove, removeLabel }) => {
  const nevigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-row  items-center justify-center p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition duration-300 space-y-2 cursor-pointer "
    >
      <img
        src={`${url}img/${product.coverImage}`}
        alt={product.name}
        className="w-24 h-full object-cover rounded-md mr-4"
      />
      <div className="space-y-2">
        <div className="flex-grow text-center space-y-2">
          <h3 className="  font-bold text-gray-800 ">{product.name}</h3>
          <p className="text-gray-600 font-medium text-xl">
            Rs. {product.price}
          </p>
        </div>
        <div className="flex flex-col md:flex-row">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRemove(product._id)}
            className="px-4 py-2   text-red-600 rounded-full hover:bg-red-200 transition duration-150"
          >
            <FaTrash className="inline mr-2" /> {removeLabel}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2   text-gray-600 rounded-full hover:bg-gray-200 transition duration-150 mx-auto"
            onClick={() => nevigate(`/productDetails/${product._id}`)}
          >
            <FaRegEye className="inline mr-2" /> View
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function UserCart({ userData = {} }) {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({ ...userData });
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  let [orderProcessing, setOrderProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { msg } = useSelector((state) => state.product);
  async function RTC(id) {
    try {
      const res = await dispatch(removeFromCart(id));
      if (removeFromCart?.fulfilled?.match(res)) {
        setLoad(true);
        dispatch(info({ message: "Product removed to cart" }));
      } else {
        dispatch(error({ message: msg || "Failed to add" }));
      }
    } catch (e) {
      dispatch(
        error({ message: "Product not added to cart, please try again" })
      );
    }
  }

  async function getData() {
    try {
      const res = await axios.get("/api/v1/user/getCartHeartOrders");

      let temp = res.data;
      if (res?.data?.status == "success") {
        setData({
          ...temp.product,
        });
        setLoad(false);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "something went wrong" }));
    }
  }
  useEffect(() => {
    // !product.name && getData();
    (load == true || !userData.name) && getData();
  }, [load]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
      {orderProcessing && <OrderProcessingPage />}
      {showPopup && (
        <BuyNowPopup
          products={data?.cart}
          onClose={() => setShowPopup(false)}
          setOrderProcessing={setOrderProcessing}
        />
      )}
      {data?.cart?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {data?.cart?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onRemove={RTC}
                removeLabel="Remove"
                onMoreInfo={() => nevigate(`/productDetails/${product._id}`)}
              />
            ))}
          </div>
          <div className="flex flex-row justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition duration-300 w-[50vw] lg:w-[20vw] shadow-sm hover:shadow-lg"
              onClick={() => setShowPopup(true)}
            >
              <FaRegCreditCard className="inline mr-2" />
              Place Orders
            </motion.button>
          </div>
        </>
      ) : (
        <p className="py-2 text-xl animate-pulse font-semibold col-span-4 flex ">
          No Product Found ,
          <span className="text-gray-600 font-bold">
            {" "}
            Add Product To Your Cart
          </span>{" "}
          <BiCart className="text-3xl mx-2 animate-bounce" />
        </p>
      )}
    </div>
  );
}
