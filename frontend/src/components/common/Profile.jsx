import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaInfoCircle,
  FaTrash,
  FaBox,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { error, info } from "../../redux/slices/errorSlice";
import url from "../../../public/url";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({
  user,
  cartProducts,
  favoriteProducts,
  orderProducts,
  load,
  setLoad,
}) => {
  const [activeTab, setActiveTab] = useState("cart");

  const nevigate = useNavigate();
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  async function removeFromCart(pid) {
    try {
      const res = await axios.get(`/api/v1/product/removeFromCart/${pid}`);
      console.log(res);

      if (res.data?.status == "success") {
        setLoad(!load);
        dispatch(info({ message: "product removed from cart" }));
      }
    } catch (e) {
      console.log(e);
      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            "product not added to cart, please try again",
        })
      );
    }
  }
  const TabButton = ({ label, icon, isActive, onClick }) => (
    <button
      className={`flex items-center px-6 py-3 rounded-t-lg transition duration-300 ${
        isActive
          ? "bg-white text-indigo-600 border-t-2 border-indigo-600"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2 font-semibold">{label}</span>
    </button>
  );

  const ProductCard = ({ product, onMoreInfo, removeLabel }) => (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition duration-300">
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
      <div className="flex space-x-2">
        <button
          onClick={() =>
            nevigate("/productDetails", { state: { id: product._id } })
          }
          className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition duration-150"
        >
          <FaInfoCircle className="inline mr-2" /> More Info
        </button>
        <button
          onClick={() => removeFromCart(product._id)}
          className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition duration-150"
        >
          <FaTrash className="inline mr-2" /> {removeLabel}
        </button>
      </div>
    </div>
  );
  const OrderCard = ({ product, onMoreInfo, onRemove, removeLabel }) => (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition duration-300">
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
      <div className="flex space-x-2">
        <button
          onClick={() =>
            nevigate("/productDetails", { state: { id: product._id } })
          }
          className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition duration-150"
        >
          <FaInfoCircle className="inline mr-2" /> More Info
        </button>
        <button
          onClick={() => onRemove(product)}
          className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition duration-150"
        >
          <FaTrash className="inline mr-2" /> {removeLabel}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <img
            src={
              "https://i1.rgstatic.net/ii/profile.image/1142222359674881-1649338440466_Q512/Ab-Cd-120.jpg"
            }
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {data.name}
            </h1>
            <p className="text-gray-600">{data.email}</p>
            <p className="text-gray-600">{data.mobile}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Address:</span>{" "}
              {data.addressLine1}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Location:</span> {data.state},{" "}
              {data.country}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Pin Code:</span> {data.pinCode}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex space-x-2 border-b border-gray-200">
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

      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === "cart" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
            {cartProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onMoreInfo={(p) => console.log("More info:", p)}
                removeFromCart={() => removeFromCart()}
                removeLabel="Remove from Cart"
              />
            ))}
          </>
        )}
        {activeTab === "favorites" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Favorite Items</h2>
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onMoreInfo={(p) => console.log("More info:", p)}
                onRemove={(p) => console.log("Remove from favorites:", p)}
                removeLabel="Remove from Favorites"
              />
            ))}
          </>
        )}
        {activeTab === "orders" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
            {orderProducts.map((product) => (
              <OrderCard
                key={product._id}
                product={product}
                onMoreInfo={(p) => console.log("More info:", p)}
                onRemove={(p) => console.log("Remove from favorites:", p)}
                removeLabel="Remove from Favorites"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
