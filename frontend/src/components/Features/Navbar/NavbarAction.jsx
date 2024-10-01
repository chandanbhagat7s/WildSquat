import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeGender } from "../../../redux/slices/authSlice";

const NavbarActions = ({}) => {
  const { isLoggedIn, gender } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(gender === "female");
  const nevigate = useNavigate();

  const handleGenderToggle = () => {
    const newGender = isToggled ? "male" : "female";
    setIsToggled(!isToggled);
    // setIsMenuOpen(false);
    nevigate("/");
    dispatch(changeGender({ gender: newGender }));
  };

  return (
    <div className="flex items-center space-x-4 text-sm">
      {/* Gender Toggle Switch */}
      <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
        <span className={`text-blue-600 ${!isToggled ? "font-bold" : ""}`}>
          {!isToggled ? "Male" : "M"}
        </span>
        <button
          onClick={handleGenderToggle}
          className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
            isToggled ? "bg-pink-600" : "bg-blue-600"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
              isToggled ? "translate-x-6" : ""
            }`}
          ></div>
        </button>
        <span className={`text-pink-600 ${isToggled ? "font-bold" : ""}`}>
          {isToggled ? "Female" : "F"}
        </span>
      </div>

      {/* User Profile/Login Button */}
      {isLoggedIn ? (
        <Link
          to="/profile"
          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      ) : (
        <Link
          to="/login"
          className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-black text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <span>Login</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default NavbarActions;
