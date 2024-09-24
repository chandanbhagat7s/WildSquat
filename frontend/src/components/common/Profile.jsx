import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHome,
  FiFlag,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaUser,
  FaShoppingCart,
  FaBox,
  FaTrash,
  FaExchangeAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { error, info, success } from "../../redux/slices/errorSlice";
import url from "../../assets/url";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, warning } from "framer-motion";
import { removeFromCart } from "../../redux/slices/productSlice";
import { BiCart } from "react-icons/bi";
import { RiOrderPlayFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

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
          ? "bg-gray-600 text-white shadow-lg"
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
          <h3 className="  font-bold text-gray-800 ">{product.name}</h3>
          <p className="text-gray-600 font-medium text-xl">
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

  const ProfileSection = () => {
    const [formData, setFormData] = useState({
      name: data.name || "",
      email: data.email || "",
      mobile: data.mobile || "",
      country: data.country || "",
      state: data.state || "",
      district: data.district || "",
      pinCode: data.pinCode || 0,
      addressLine1: data.addressLine1 || "",
    });
    const [otpBox, setOtpBox] = useState({
      otpId: "",
      otp: "",
      showBox: false,
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    async function verifyAndChangeNumber() {
      if (otpBox.otp.length < 6) {
        return dispatch(warning({ message: "Please enter valid otp" }));
      }
      if (!otpBox.otpId) {
        setOtpBox({ ...otpBox, showBox: false });
        return dispatch(
          warning({ message: "Please Try again to genrate otp" })
        );
      }
      try {
        const res = await axios.post(
          "/api/v1/user/verifyAndChangeMobile",
          {
            number: formData.mobile,
            otp: otpBox.otp,
            otpId: otpBox.otpId,
          },
          {
            withCredentials: true,
          }
        );
        if (res?.data?.status == "success") {
          dispatch(success({ message: res.data.msg }));
          setOtpBox({
            otpId: "",
            otp: "",
            showBox: false,
          });
        }
      } catch (e) {
        dispatch(
          error({
            message:
              e?.response?.data?.msg ||
              "Please try again , something went wrong",
          })
        );
      }
    }

    async function changeMobileNumber() {
      if (data.mobile == formData.mobile) {
        return dispatch(warning({ message: "Please Change number first" }));
      }
      try {
        const res = await axios.post(
          "/api/v1/user/changeMobileNumber",
          {
            number: formData.mobile,
          },
          {
            withCredentials: true,
          }
        );
        if (res?.data?.status == "success") {
          setOtpBox({ ...otpBox, otpId: res.data.otpId, showBox: true });

          dispatch(success({ message: res.data.msg }));
        }
      } catch (e) {
        dispatch(
          error({
            message:
              e?.response?.data?.msg ||
              "Please try again , something went wrong",
          })
        );
      }
    }

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const res = await axios.patch(
          "/api/v1/user/editProfile",

          formData,

          {
            withCredentials: true,
          }
        );
        if (res?.data?.status == "success") {
          dispatch(
            success({ message: res.data.msg || "Profile Updated Successfully" })
          );
        }
      } catch (e) {
        dispatch(
          error({
            message:
              e?.response?.data?.msg ||
              "Please try again , something went wrong",
          })
        );
      }
    }

    const inputFields = [
      {
        name: "name",
        type: "text",
        placeholder: "Full Name",
        icon: <FiUser className="w-5 h-5 text-gray-400" />,
      },
      {
        name: "email",
        type: "email",
        placeholder: "Email address",
        icon: <FiMail className="w-5 h-5 text-gray-400" />,
      },

      {
        name: "country",
        type: "text",
        placeholder: "Country",
        icon: <FiFlag className="w-5 h-5 text-gray-400" />,
      },
      {
        name: "state",
        type: "text",
        placeholder: "State",
        icon: <FiMapPin className="w-5 h-5 text-gray-400" />,
      },
      {
        name: "district",
        type: "text",
        placeholder: "District",
        icon: <FiMapPin className="w-5 h-5 text-gray-400" />,
      },
      {
        name: "pinCode",
        type: "text",
        placeholder: "PIN Code",
        icon: <FiMapPin className="w-5 h-5 text-gray-400" />,
      },
      {
        name: "addressLine1",
        type: "text",
        placeholder: "Address Line 1",
        icon: <FiHome className="w-5 h-5 text-gray-400" />,
      },
    ];
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <img
            src="https://i1.rgstatic.net/ii/profile.image/1142222359674881-1649338440466_Q512/Ab-Cd-120.jpg"
            alt={data.name}
            className="w-32 h-32 rounded-full object-cover mr-8 mb-4 md:mb-0"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field) => (
              <div key={field.name} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="group relative mx-auto flex justify-center py-2 px-20 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Submit
              <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </button>
          </div>
        </form>
        <div className="flex flex-col space-y-2 justify-center items-center my-20">
          <label htmlFor="flex space-x-2 text-lg">
            <span className="font-bold">Mobile</span>{" "}
            <FiPhone className="  font-bold inline-block w-5 h-5 text-gray-400" />
          </label>
          <div className="flex items-center justify-center space-y-3 md:space-x-5 lg:flex-row flex-col ">
            <input
              id={"mobile"}
              name={"mobile"}
              type={"text"}
              required
              className="block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder={"mobile"}
              value={formData["mobile"]}
              onChange={handleChange}
            />
            {otpBox.showBox && (
              <>
                <input
                  type={"number"}
                  required
                  className="block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder={"OTP"}
                  onChange={(e) => {
                    setOtpBox({ ...otpBox, otp: e.target.value * 1 });
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className=" px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 w-[50vw] lg:w-[20vw] shadow-sm hover:shadow-lg disabled:bg-gray-400"
                  disabled={data.mobile == formData.mobile}
                  onClick={verifyAndChangeNumber}
                >
                  <FaExchangeAlt className="inline mr-2" />
                  Verify and Change
                </motion.button>
              </>
            )}
            {!otpBox.showBox && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 w-[50vw] lg:w-[20vw] shadow-sm hover:shadow-lg disabled:bg-gray-400"
                disabled={data.mobile == formData.mobile}
                onClick={changeMobileNumber}
              >
                <FaExchangeAlt className="inline mr-2" />
                Change
              </motion.button>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 w-[50vw] lg:w-[20vw] shadow-sm hover:shadow-lg"
          >
            <FiLogOut className="inline mr-2" />
            Logout
          </motion.button>
        </div>
      </div>
    );
  };

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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
                    <span className="text-gray-600 font-bold">
                      {" "}
                      Add Product To Your Cart
                    </span>{" "}
                    <BiCart className="text-3xl mx-2 animate-bounce" />
                  </p>
                )}
              </div>
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
                  <span className="text-gray-600 font-bold">
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
