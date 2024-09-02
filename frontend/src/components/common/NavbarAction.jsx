import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FaMale, FaFemale, FaArrowDown, FaGenderless } from "react-icons/fa";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeGender } from "../../redux/slices/authSlice";

const NavbarActions = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { gender } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleGenderSelect = (selectedGender) => {
    console.log("SETTING to", selectedGender);

    dispatch(changeGender({ gender: selectedGender }));
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      {/* Gender Select Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className=" bg-white text-blue-600 flex items-center space-x-2    px-4 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          {gender == "male" ? (
            <FaMale className="h-6 w-6 text-blue-600" />
          ) : (
            <FaFemale className="h-6 w-6 text-pink-600" />
          )}{" "}
          <span>{gender ? gender : "Select Gender"}</span>
          <FaArrowDown />
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 bg-white rounded-md shadow-lg w-full z-10">
            <button
              onClick={() => handleGenderSelect("male")}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-100 w-full text-left"
            >
              <FaMale className="h-6 w-6 text-blue-600" />
              <span>Male</span>
            </button>
            <button
              onClick={() => handleGenderSelect("female")}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-pink-100 w-full text-left"
            >
              <FaFemale className="h-6 w-6 text-pink-600" />
              <span>Female</span>
            </button>
          </div>
        )}
      </div>

      {/* User Profile/Login Button */}
      <button className="hover:text-gray-200">
        {isLoggedIn ? (
          <Link
            to="/profile"
            className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            <FiUser className="h-6 w-6" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-50 flex"
          >
            Login <CiLogin className="text-2xl font-bold " />
          </Link>
        )}
      </button>

      {/* Cart Button */}
      {/* <Link
        to="/cart"
        className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-700"
      >
        <FiShoppingCart className="h-6 w-6" />
        <span>Cart</span>
      </Link> */}
    </div>
  );
};

export default NavbarActions;
