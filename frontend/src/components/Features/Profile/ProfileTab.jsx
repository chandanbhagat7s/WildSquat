import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { error, success, warning } from "../../../redux/slices/errorSlice";
import axios from "axios";
import {
  FiArrowRight,
  FiFlag,
  FiHome,
  FiLogOut,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";

const ProfileTab = ({ data, setLoad, load }) => {
  console.log("DATA", data, data.name, load);

  const dispatch = useDispatch();
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
  console.log("FD", formData);

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
      return dispatch(warning({ message: "Please Try again to genrate otp" }));
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
            e?.response?.data?.msg || "Please try again , something went wrong",
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
            e?.response?.data?.msg || "Please try again , something went wrong",
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
      console.log("edited", res);

      if (res?.data?.status == "success") {
        dispatch(
          success({ message: res.data.msg || "Profile Updated Successfully" })
        );
        setLoad(true);
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg || "Please try again , something went wrong",
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
    <>
      {load == false && (
        <div className="bg-white rounded-xl shadow-lg p-8 md:w-[80vw] mx-auto">
          <div className="flex flex-col items-center justify-center mb-6 space-y-2">
            <img
              src="https://i1.rgstatic.net/ii/profile.image/1142222359674881-1649338440466_Q512/Ab-Cd-120.jpg"
              //   alt={data.name}
              className="w-32 h-32 rounded-full object-cover mr-8 mb-4 md:mb-0"
            />
            <span className="text-2xl font-bold p-2 capitalize">
              {formData.name}
            </span>
            <span className="text-xl">{formData.email}</span>
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5  placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-gray-200"
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
                className="group relative mx-auto flex justify-center items-center py-2 px-20 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Submit
                <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </div>
          </form>
          <div className="flex flex-col  justify-center items-center my-20">
            <label htmlFor="flex space-x-2 text-lg">
              <span className="font-bold">Mobile</span>{" "}
              <FiPhone className="  font-bold inline-block w-5 h-5 text-gray-400" />
            </label>
            <div className="flex items-center justify-center mt-3  md:space-x-5 lg:flex-row flex-col space-y-2 ">
              <input
                id={"mobile"}
                name={"mobile"}
                type={"text"}
                required
                className="block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
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
          <div className="flex flex-row justify-center md:justify-end">
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
      )}
    </>
  );
};

export default ProfileTab;
