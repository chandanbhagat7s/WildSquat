import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import url from "../../../assets/url";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { error } from "../../../redux/slices/errorSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onMoreInfo, onRemove, removeLabel }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-row  items-center justify-center p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition duration-300 space-y-2"
  >
    <img
      src={`${url}img/${product.coverImage}`}
      alt={product.name}
      className="w-24 h-full object-cover rounded-md mr-4"
    />
    <div className="space-y-2">
      <div className="flex-grow text-center space-y-2">
        <h3 className="  font-bold text-gray-800 ">{product.name}</h3>
        <p className="text-gray-600 font-medium text-xl">Rs. {product.price}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        // onClick={() => onRemove(product._id)}
        className="px-4 py-2   text-red-600 rounded-full hover:bg-red-200 transition duration-150"
      >
        <FaTrash className="inline mr-2" /> {removeLabel}
      </motion.button>
    </div>
  </motion.div>
);

export default function ProductOrdredList({}) {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  async function getData() {
    try {
      const res = await axios.get("/api/v1/user/getOrderProducts");
      console.log("data of profile", res.data);

      let temp = res.data;
      if (res?.data?.status == "success") {
        setOrders({
          ...temp.orders,
        });
        // setLoad(false);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "something went wrong" }));
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {orders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {orders?.map((product) => (
            <ProductCard
              key={product._id}
              product={product?.productData}
              removeLabel="Remove"
              //   onMoreInfo={() => nevigate(`/productDetails/${product._id}`)}
            />
          ))}
        </div>
      )}
    </>
  );
}
