import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupForm } from "../redux/slices/authSlice";
import { error, success, warning } from "../redux/slices/errorSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiMapPin,
  FiHome,
  FiFlag,
} from "react-icons/fi";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    cnfpassword: "",
    email: "",
    mobile: "",
    state: "",
    country: "",
    district: "",
    pinCode: "",
    addressLine1: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    if (formData.mobile.length > 11) {
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

    const res = await dispatch(signupForm(formData));

    if (res?.payload?.data?.status === "success") {
      dispatch(success({ message: "Account created successfully" }));
      navigate("/");
    } else {
      dispatch(error({ message: res?.payload?.data?.msg }));
    }
  };

  const inputFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Full Name",
      icon: <FiUser className="text-gray-400" />,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email address",
      icon: <FiMail className="text-gray-400" />,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: <FiLock className="text-gray-400" />,
    },
    {
      name: "cnfpassword",
      type: "cnfpassword",
      placeholder: "Confirm Password",
      icon: <FiLock className="text-gray-400" />,
    },
    {
      name: "mobile",
      type: "tel",
      placeholder: "Phone Number",
      icon: <FiPhone className="text-gray-400" />,
    },
    {
      name: "country",
      type: "text",
      placeholder: "Country",
      icon: <FiFlag className="text-gray-400" />,
    },
    {
      name: "state",
      type: "text",
      placeholder: "State",
      icon: <FiMapPin className="text-gray-400" />,
    },
    {
      name: "district",
      type: "text",
      placeholder: "District",
      icon: <FiMapPin className="text-gray-400" />,
    },
    {
      name: "pinCode",
      type: "text",
      placeholder: "PIN Code",
      icon: <FiMapPin className="text-gray-400" />,
    },
    {
      name: "addressLine1",
      type: "text",
      placeholder: "Address Line 1",
      icon: <FiHome className="text-gray-400" />,
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      id="signup"
    >
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field) => (
              <div key={field.name} className="relative">
                <label htmlFor={field.name} className="sr-only">
                  {field.placeholder}
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-500 rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
