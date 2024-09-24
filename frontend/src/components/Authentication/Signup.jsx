import { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiMapPin,
  FiHome,
  FiFlag,
  FiArrowRight,
} from "react-icons/fi";

import { SendOtpToUser, signupForm } from "../../redux/slices/authSlice";
import { error, info, success, warning } from "../../redux/slices/errorSlice";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnfpassword: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
    pinCode: "",
    addressLine1: "",
    otpId: 0,
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => field === "")) {
      return dispatch(warning({ message: "Please enter all the details" }));
    }

    if (formData.password !== formData.cnfpassword) {
      return dispatch(
        warning({ message: "Please check password and confirm password" })
      );
    }

    if (formData.mobile.length >= 11) {
      return dispatch(warning({ message: "Enter correct mobile number" }));
    }

    if (formData.pinCode.length < 6 || formData.pinCode.length > 7) {
      return dispatch(warning({ message: "Please enter valid pin code" }));
    }

    if (formData.addressLine1.length < 6) {
      return dispatch(
        warning({ message: "Please describe your address in more details" })
      );
    }
    const statusOtp = await dispatch(
      SendOtpToUser({ number: formData.mobile, email: formData.email })
    );

    if (statusOtp?.payload?.data?.status == "success") {
      setFormData({
        ...formData,
        otpId: statusOtp?.payload?.data?.otpId,
      });
      dispatch(info({ message: "Otp is Sent " }));
    } else {
      dispatch(
        error({
          message: statusOtp?.payload?.data?.msg || "something went wrong",
        })
      );
      return;
    }

    // Simulating OTP sent to user
    setStep(2);
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      dispatch(warning({ message: "Please enter a valid 6-digit OTP" }));

      return;
    }

    const res = await dispatch(
      signupForm({
        ...formData,
        otp: enteredOtp,
      })
    );

    if (res?.payload?.data?.status == "success") {
      dispatch(success({ message: "Account created successfully" }));
      navigate("/");
    } else {
      dispatch(
        error({ message: res?.payload?.data?.msg || "Please enter valid otp " })
      );
    }

    // Here you would typically verify the OTP with your backend
    // For this example, we'll just simulate a successful verification
  };

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
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: <FiLock className="w-5 h-5 text-gray-400" />,
    },
    {
      name: "cnfpassword",
      type: "password",
      placeholder: "Confirm Password",
      icon: <FiLock className="w-5 h-5 text-gray-400" />,
    },
    {
      name: "mobile",
      type: "tel",
      placeholder: "Phone Number",
      icon: <FiPhone className="w-5 h-5 text-gray-400" />,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="px-8 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            {step === 1 ? "Create your account" : "Verify OTP"}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {step === 1
              ? "Join  Wildsquat Trends"
              : "Enter the OTP sent to your email"}
          </p>

          {step === 1 ? (
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
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="group relative mx-auto flex justify-center py-2 px-20 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                  <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center space-x-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              <p className="py-2">
                Waht to change your mobile number{" "}
                <button className="text-black" onClick={() => setStep(1)}>
                  Click hear
                </button>{" "}
              </p>
              <button
                onClick={verifyOtp}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;