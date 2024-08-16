import React, { useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaBox,
  FaInfoCircle,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { error, info } from "../../redux/slices/errorSlice";
import url from "../../assets/url";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { removeFromCart } from "../../redux/slices/productSlice";
import { BiCart, BiCartAdd, BiCollection } from "react-icons/bi";
import { RiOrderPlayFill } from "react-icons/ri";

const ProfilePage = ({
  cartProducts,
  favoriteProducts,
  orderProducts,

  getData,
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { msg } = useSelector((state) => state.product);
  const nevigate = useNavigate();

  async function RTC(id) {
    try {
      console.log("called with id", id);

      const res = await dispatch(removeFromCart(id));
      if (removeFromCart?.fulfilled?.match(res)) {
        getData();
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

  const TabButton = ({ label, icon, isActive, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex justify-center items-center px-6 py-3 rounded-full transition duration-300 ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg"
          : "bg-white text-gray-600 hover:bg-gray-100 border border-black"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2 font-semibold">{label}</span>
    </motion.button>
  );

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
          <h3 className="  font-bold text-gray-800">{product.name}</h3>
          <p className="text-indigo-600 font-medium text-xl">
            Rs. {product.price}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRemove(product._id)}
          className="px-4 py-2   text-red-600 rounded-full hover:bg-red-200 transition duration-150"
        >
          <FaTrash className="inline mr-2" /> {removeLabel}
        </motion.button>
      </div>
    </motion.div>
  );

  const ProfileSection = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col md:flex-row items-center mb-8">
        <img
          src="https://i1.rgstatic.net/ii/profile.image/1142222359674881-1649338440466_Q512/Ab-Cd-120.jpg"
          alt={data.name}
          className="w-32 h-32 rounded-full object-cover mr-8 mb-4 md:mb-0"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.name}</h1>
          <p className="text-xl text-gray-600 mb-1">{data.email}</p>
          <p className="text-xl text-gray-600">{data.mobile}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
        <div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Address:</span> {data.addressLine1}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Location:</span> {data.state},{" "}
            {data.country}
          </p>
        </div>
        <div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Pin Code:</span> {data.pinCode}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
          >
            <FaEdit className="inline mr-2" /> Edit Profile
          </motion.button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className=" grid grid-cols-2 lg:grid-cols-4 gap-2 my-10">
        <TabButton
          label="Profile"
          icon={<FaUser className="text-xl" />}
          isActive={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <TabButton
          label="Cart"
          icon={<FaShoppingCart className="text-xl" />}
          isActive={activeTab === "cart"}
          onClick={() => setActiveTab("cart")}
        />
        <TabButton
          label="Favorites"
          icon={<FaHeart className="text-xl" />}
          isActive={activeTab === "favorites"}
          onClick={() => setActiveTab("favorites")}
        />
        <TabButton
          label="Orders"
          icon={<FaBox className="text-xl" />}
          isActive={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "profile" && <ProfileSection />}
          {activeTab === "cart" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Your Cart
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {cartProducts?.length > 0 ? (
                  cartProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onRemove={RTC}
                      removeLabel="Remove"
                      onMoreInfo={() =>
                        nevigate(`/productDetails/${product._id}`)
                      }
                    />
                  ))
                ) : (
                  <p className="py-2 text-xl animate-pulse font-semibold col-span-4 flex ">
                    No Product Found ,
                    <span className="text-indigo-600 font-bold">
                      {" "}
                      Add Product To Your Cart
                    </span>{" "}
                    <BiCart className="text-3xl mx-2 animate-bounce" />
                  </p>
                )}
              </div>
            </div>
          )}
          {activeTab === "favorites" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Your Favorites
              </h2>
              {favoriteProducts?.length > 0 ? (
                favoriteProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onRemove={(id) => console.log("Remove from favorites:", id)}
                    removeLabel="Remove"
                  />
                ))
              ) : (
                <p className="py-2 text-xl animate-pulse font-semibold col-span-4 flex ">
                  No Collection Found ,
                  <span className="text-indigo-600 font-bold">
                    {" "}
                    Add Collection
                  </span>{" "}
                  <BiCollection className="text-3xl mx-2 animate-bounce" />
                </p>
              )}
            </div>
          )}
          {activeTab === "orders" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Your Orders
              </h2>
              {orderProducts.length > 0 ? (
                orderProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onRemove={(id) => console.log("Cancel order:", id)}
                    removeLabel="Cancel Order"
                  />
                ))
              ) : (
                <p className="py-2 text-xl animate-pulse font-semibold col-span-4 flex ">
                  No Product Found and No Purchase History ,
                  <span className="text-indigo-600 font-bold">
                    {" "}
                    Order Something
                  </span>{" "}
                  <RiOrderPlayFill className="text-3xl mx-2 animate-bounce" />
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
