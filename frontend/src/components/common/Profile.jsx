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

const ProfilePage = ({
  user,
  cartProducts,
  favoriteProducts,
  orderProducts,
  load,
  setLoad,
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const removeFromCart = async (pid) => {
    try {
      const res = await axios.get(`/api/v1/product/removeFromCart/${pid}`);
      if (res.data?.status === "success") {
        setLoad(!load);
        dispatch(info({ message: "Product removed from cart" }));
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg || "Failed to remove product from cart",
        })
      );
    }
  };

  const TabButton = ({ label, icon, isActive, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center px-6 py-3 rounded-full transition duration-300 ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg"
          : "bg-white text-gray-600 hover:bg-gray-100"
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
      className="flex flex-col md:flex-row items-center p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition duration-300"
    >
      <img
        src={`${url}img/${product.name}-cover.jpeg`}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-indigo-600 font-medium">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row  space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            navigate("/productDetails", { state: { id: product._id } })
          }
          className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition duration-150"
        >
          <FaInfoCircle className="inline mr-2" /> More Info
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRemove(product._id)}
          className="px-4 py-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150"
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
      <div className="flex flex-wrap justify-center  space-x-4 my-10">
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
              {cartProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onRemove={removeFromCart}
                  removeLabel="Remove"
                />
              ))}
            </div>
          )}
          {activeTab === "favorites" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Your Favorites
              </h2>
              {favoriteProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onRemove={(id) => console.log("Remove from favorites:", id)}
                  removeLabel="Remove"
                />
              ))}
            </div>
          )}
          {activeTab === "orders" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Your Orders
              </h2>
              {orderProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onRemove={(id) => console.log("Cancel order:", id)}
                  removeLabel="Cancel Order"
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
