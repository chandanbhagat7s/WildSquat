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

function returnIcon(name) {
  let obj = {
    Category: <FiBox />,
    Multiple: <FiTag />,
    Trending: <FiTrendingUp />,
    "Top Products": <MdOutlineWorkspacePremium />,
    Thinking: <FaThinkPeaks />,
  };
  return obj[name];
}

// NavItem Component
const NavItem = ({ category, move }) => {
  return (
    <div className="relative group px-3 py-2 hover:bg-blue-50 cursor-pointer ">
      <span className="flex items-center space-x-2 font-medium text-gray-700 group-hover:text-blue-600 ">
        <div>{returnIcon(category.name) || "a"} </div>
        <div>{category.name}</div>
        <div>
          {" "}
          <IoIosArrowDown className="text-black font-extrabold" />
        </div>
      </span>

      {/* Dropdown menu */}
      {category.subItems && (
        <div className="absolute left-0 top-full   hidden group-hover:block w-[30vw] ">
          <ul
            className={`py-2 grid grid-cols-2 bg-white shadow-lg rounded-md z-10 gap-1 ${
              move && "last:-translate-x-[17vw]"
            }`}
          >
            {category.subItems.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-gray-700 flex  items-center space-x-2 text-center "
              >
                {category.name == "Trending" ||
                category.name == "Top Products" ? (
                  <>
                    <img
                      src={`${url}img/${item.img}`}
                      className="h-16"
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={`${url}Tools/${item.img}`}
                      className="h-16"
                      alt=""
                    />
                  </>
                )}
                <p className="text-sm font-semibold">{item.name}</p>
              </li>
            ))}
          </ul>
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
        <div className="lg:hidden bg-white shadow-lg max-h-[50vh] overflow-y-scroll">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="md:hidden mb-4">
              <SearchCategoryProductAndItem
                setSelectedProduct={setSelectedProduct}
              />
            </div>

            {categories.map((category) => (
              <Disclosure key={category.name}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      <span className="flex items-center justify-between space-x-2 font-medium text-gray-700 group-hover:text-blue-600">
                        <div className="flex space-x-2 items-center">
                          <div>{returnIcon(category.name) || "a"} </div>
                          <div>{category.name}</div>
                        </div>
                        <div>
                          {" "}
                          {!open ? (
                            <IoIosArrowDown className="text-black font-extrabold " />
                          ) : (
                            <FaChevronUp />
                          )}
                        </div>
                      </span>
                    </Disclosure.Button>
                    {open && category.subItems && (
                      <div className=" space-y-1 grid grid-cols-3">
                        {category.subItems.map((subItem, index) => (
                          <Link
                            key={index}
                            to={`/${subItem.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="block px-1 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <div className="flex flex-col justify-center items-center space-y-2">
                              {category.name == "Trending" ||
                              category.name == "Top Products" ? (
                                <>
                                  <img
                                    src={`${url}img/${subItem.img}`}
                                    className="h-16"
                                    alt=""
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    src={`${url}Tools/${subItem.img}`}
                                    className="h-16"
                                    alt=""
                                  />
                                </>
                              )}
                              <p className="font-semibold">{subItem.name}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
