import React, { useState, useEffect } from "react";

import { FaChevronUp } from "react-icons/fa6";
import { MdOutlineWorkspacePremium } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiBox,
  FiLayers,
  FiTag,
  FiTrendingUp,
} from "react-icons/fi";
import { Disclosure } from "@headlessui/react";
import SearchCategoryProductAndItem from "./SearchCategoryProduct";
import logo from "./../../assets/logo.jpeg";
import NavbarActions from "./NavbarAction";
import { FaThinkPeaks } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../assets/url";
import { IoIosArrowDown } from "react-icons/io";
import { FiAward, FiBookOpen } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// Categories with their respective sub-items
let categories = [
  {
    name: "Category",
    subItems: [],
    icon: <FiBox />,
  },
  {
    name: "Collections",
    subItems: [],
    icon: <FiLayers />,
  },
  {
    name: "Multiple",
    subItems: [],
    icon: <FiTag />,
  },
  {
    name: "Trending",
    subItems: [],
    icon: <FiTrendingUp />,
  },
  {
    name: "Top Products",
    subItems: [],
    icon: <MdOutlineWorkspacePremium />,
  },
  {
    name: "Thinking",
    subItems: [],
    icon: <FaThinkPeaks />,
  },
];

const iconMap = {
  Category: FiBox,
  Multiple: FiTag,
  Trending: FiTrendingUp,
  "Top Products": FiAward,
  Thinking: FiBookOpen,
};

const NavItem = ({ category, move }) => {
  const navigate = useNavigate();
  const Icon = iconMap[category.name] || FiBox;

  return (
    <div className="relative group">
      <div className="px-4 py-3 flex items-center space-x-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg">
        <Icon className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700" />
        <span className="font-medium text-gray-700 group-hover:text-indigo-700">
          {category.name}
        </span>
        <FaChevronDown className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-transform duration-300 ease-in-out group-hover:-rotate-180" />
      </div>

      {category.subItems && (
        <div
          className={`absolute left-0 top-full hidden group-hover:block w-64 mt-1 ${
            move ? "-translate-x-1/2" : ""
          }`}
        >
          <div className="py-2 bg-white shadow-xl rounded-lg overflow-hidden border border-indigo-100">
            <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50">
              <h3 className="text-sm font-semibold text-indigo-700">
                {category.name} Options
              </h3>
            </div>
            <ul className="grid grid-cols-1 gap-1 p-2">
              {category.subItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() =>
                    navigate(`/${item.name.toLowerCase().replace(/\s+/g, "-")}`)
                  }
                  className="px-3 py-2 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 rounded-md transition-all duration-200 ease-in-out"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <span className="text-sm font-medium text-gray-700 hover:text-indigo-700">
                      {item.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    coverImage: "",
  });
  let [categories, setCategories] = useState([]);
  const { gender } = useSelector((state) => state.auth);

  async function getData() {
    try {
      const res = await axios.get(`/api/v1/tools/getNavigationData/${gender}`);
      console.log(res);
      setCategories([...res?.data?.categories]);
    } catch (e) {}
  }
  useEffect(() => {
    getData();
  }, [gender]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (selectedProduct?.id) {
      navigate(`/productDetails/${selectedProduct.id}`);
    }
  }, [selectedProduct, navigate]);

  return (
    <div className="w-[100vw] fixed top-0 z-50">
      <nav className="bg-gradient-to-r from-white to-indigo-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 bg-transparent">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Wild Squat Logo"
                  className="h-12 object-contain"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="basis-2/5  hover:cursor-pointer   mx-4 hidden sm:block ">
              <div className="relative">
                <SearchCategoryProductAndItem
                  setSelectedProduct={setSelectedProduct}
                />
                <button className="absolute right-0 top-0 mt-2 mr-2">
                  <FiSearch className="h-5 w-5 text-blue-500" />
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <NavbarActions />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <NavbarActions />
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Category list for larger screens */}
      <div className="bg-white shadow-lg lg:block hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {categories.map((category, i) => {
              return (
                <div key={category.name} className="">
                  <NavItem
                    category={category}
                    move={categories.length - 1 == i ? true : false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg max-h-[100vh] overflow-y-scroll">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="md:hidden mb-4">
              <SearchCategoryProductAndItem
                setSelectedProduct={setSelectedProduct}
              />
            </div>

            <div className="px-4 py-6 ">
              <div className="space-y-4">
                {categories.map((category) => (
                  <MobileNavItem key={category.name} category={category} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavItem = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left  bg-gray-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
      >
        <span className="text-base font-medium text-gray-800">
          {category.name}
        </span>
        {isOpen ? (
          <FiChevronUp className="w-5 h-5 text-indigo-600" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-indigo-600" />
        )}
      </button>
      {isOpen && category.subItems && (
        <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50">
          {category.subItems.map((subItem, index) => (
            <Link
              key={index}
              to={`/${subItem.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex flex-col items-center justify-center p-3 rounded-md bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50"
            >
              <div className="w-8 h-8 mb-2 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-semibold">
                  {subItem.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                {subItem.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
