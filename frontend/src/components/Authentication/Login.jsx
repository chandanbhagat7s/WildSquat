import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { error, success, warning } from "../../redux/slices/errorSlice";
import { loginForm } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiArrowLeft, FiPhone } from "react-icons/fi";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { msg } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    mobile: "",
    userId: "",
    vpassword: "",
    vpasswordConfirm: "",
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [timer, setTimer] = useState(180);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    let interval;
    if (isForgotPassword && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isForgotPassword, timer]);

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

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(warning({ message: "Please enter all the details" }));
    }
    if (formData.email.includes("@") && formData.email.length < 5) {
      return dispatch(warning({ message: "Please enter valid email address" }));
    }
    if (
      !formData.email.includes("@") &&
      formData.email.length < 10 &&
      formData.mobile.length >= 11
    ) {
      return dispatch(warning({ message: "Please enter valid mobile number" }));
    }
    if (!formData.email.includes("@") && formData.email.length == 10) {
      const mobileNumberRegex = /^[6-9][0-9]{9}$/;

      const isValid = mobileNumberRegex.test(formData.email);
      console.log(isValid, formData.email);

      if (!isValid) {
        return dispatch(
          warning({ message: "Please enter valid mobile number" })
        );
      }
    }
    if (formData.password.length < 5) {
      return dispatch(warning({ message: "Please enter email or password" }));
    }

    try {
      const res = await dispatch(loginForm(formData));
      if (loginForm.fulfilled.match(res)) {
        dispatch(success({ message: "Logged in successfully" }));
        if (res?.payload?.data?.role === "ADMIN") {
          navigate("/adminDash");
        } else {
          navigate("/");
        }
      } else {
        dispatch(
          error({
            message: res?.payload || "Please enter valid email or password",
          })
        );
      }
    } catch (err) {
      console.log(err);

      dispatch(error({ message: "Please Check Your internet connection" }));
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.mobile || formData.mobile.length !== 10) {
      return dispatch(
        warning({ message: "Please enter a valid 10-digit mobile number" })
      );
    }
    try {
      const sendOtp = await axios.post("/api/v1/auth/forgotPassword", {
        mobile: formData.mobile,
      });
      if (sendOtp.data?.status === "success") {
        dispatch(success({ message: "OTP sent successfully" }));
        setTimer(180);
        setStep(2);
        setFormData({
          ...formData,
          userId: sendOtp?.data?.userId,
        });
        setIsResendDisabled(true);
      }
    } catch (e) {
      console.log(e);

      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            "Something went wrong. Please try again later.",
        })
      );
    }
  };

  const verifyOTPOfUser = async () => {
    try {
      if (formData.userId.length === 0) {
        return dispatch(
          error({ message: "Please retry again to generate OTP" })
        );
      }
      const enteredOtp = otp.join("");
      if (enteredOtp.length !== 6) {
        return dispatch(
          warning({ message: "Please enter a valid 6-digit OTP" })
        );
      }

      const verifyOTP = await axios.post("/api/v1/auth/verifyOTP", {
        userId: formData.userId,
        otp: parseInt(enteredOtp, 10),
      });

      if (verifyOTP.data?.status === "success") {
        dispatch(success({ message: "OTP verified successfully" }));
        setStep(3);
      }
    } catch (e) {
      dispatch(error({ message: "Invalid OTP. Please try again." }));
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (formData.vpassword !== formData.vpasswordConfirm) {
      return dispatch(warning({ message: "Passwords do not match" }));
    }
    try {
      const setPassword = await axios.patch("/api/v1/auth/resetPassword", {
        userId: formData.userId,
        password: formData.vpassword,
      });
      if (setPassword.data?.status === "success") {
        dispatch(success({ message: "Password reset successfully" }));
        setIsForgotPassword(false);
        navigate("/");
      }
    } catch (e) {
      dispatch(
        error({ message: "Failed to reset password. Please try again." })
      );
    }
  };

  const renderForgotPasswordStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Send OTP
            </button>
          </form>
        );
      case 2:
        return (
          <form className="space-y-6">
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
              <p className="text-sm text-gray-600">
                OTP sent to {formData.mobile}.{" "}
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-500"
                  onClick={() => setStep(1)}
                >
                  Change number
                </button>
              </p>
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={verifyOTPOfUser}
              >
                Verify OTP
              </button>
              <button
                type="button"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                onClick={handleForgotPassword}
                disabled={isResendDisabled}
              >
                {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </button>
            </div>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="vpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="vpassword"
                  name="vpassword"
                  type="password"
                  required
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.vpassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="vpasswordConfirm"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  id="vpasswordConfirm"
                  name="vpasswordConfirm"
                  type="password"
                  required
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.vpasswordConfirm}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              disabled={formData.vpassword !== formData.vpasswordConfirm}
            >
              Set New Password
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-700">
      <div className="bg-gray-100 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
          {isForgotPassword ? "Forgot Password" : "Welcome Back"}
        </h2>
        {!isForgotPassword ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter your email/mobile number"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="font-medium text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Forgot your password?
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <FiLogIn className="mr-2 h-5 w-5" />
              Sign in
            </button>
          </form>
        ) : (
          <>
            {renderForgotPasswordStep()}
            {step !== 1 && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setStep(1);
                  }}
                  className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  <FiArrowLeft className="mr-2 h-5 w-5" />
                  Back to Login
                </button>
              </div>
            )}
          </>
        )}

        {!isForgotPassword && (
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or Create an Account
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <Link
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
                to="/signup"
              >
                Register
              </Link>
              <Link
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
                to="/"
              >
                Back To Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
