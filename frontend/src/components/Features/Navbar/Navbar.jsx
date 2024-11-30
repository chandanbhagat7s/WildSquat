import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiBox } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import SearchCategoryProductAndItem from "./../../common/SearchCategoryProduct";
import NavbarActions from "./NavbarAction";
import logo from "./../../../assets/logo.jpeg";
import PremiumNavbar from "../Homepage/NavList";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const { gender } = useSelector((state) => state.auth);

  async function getData() {
    try {
      const res = await axios.get(
        `/api/v1/tools/getTool/CATEGORY?gender=${gender}&limit=6&page=1&fields=label,_id,products&populate=products&populateField=name,_id,price,coverImage&populateLimit=10`
      );

      setCategories([...res?.data?.products]);
    } catch (e) {}
  }

  useEffect(() => {
    getData();
  }, [gender]);

  return (
    <div className="w-full fixed top-0 z-50 bg-white bg-opacity-85 shadow-lg">
      {/* Top Navbar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Wild Squat Logo" className="scale-125 h-12" />
            <span className="font-bold text-lg text-gray-800 font-serif ">
              WILDSQUAT
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex  mx-8">
            <div className="relative w-[40vw] z-50 ">
              <SearchCategoryProductAndItem />
            </div>
          </div>

          {/* Navbar Actions */}
          <div className="hidden lg:flex">
            <NavbarActions />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="h-6 w-6 text-gray-700" />
              ) : (
                <FiMenu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </nav>
      </div>

      <div className="hidden lg:block z-10">
        <PremiumNavbar categories={categories} />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute inset-x-0 top-16 max-h-screen overflow-y-auto z-40 min-h-[50vh]">
          <div className="flex justify-center mt-1">
            {" "}
            <NavbarActions />
          </div>
          <div className="p-4 border-b border-gray-200">
            <SearchCategoryProductAndItem />
          </div>

          <div className="py-4 px-4">
            {categories.map((category) => (
              <MobileNavItem
                key={category._id}
                category={category}
                setIsMenuOpen={setIsMenuOpen}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavItem = ({ category, setIsMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-100 transition-colors duration-200"
      >
        <span className="text-base font-medium text-gray-700">
          {category.label}
        </span>
        <FaChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && category?.products?.length > 0 && (
        <div className="bg-gray-50 px-4 py-2">
          {category.products.map((subItem, index) => (
            <div
              key={index}
              onClick={() => {
                setIsOpen(false);
                setIsMenuOpen((state) => !state);
                navigate(`/productDetails/${subItem._id}`);
              }}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded-md transition-colors duration-200"
            >
              {subItem.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
