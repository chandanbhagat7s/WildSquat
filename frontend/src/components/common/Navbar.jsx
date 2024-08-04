import React, { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchCategoryProductAndItem from "./SearchCategoryProduct";

const Navbar = () => {
  const nevigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    coverImage: "",
  });
  const { isLoggedIn } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    console.log(selectedProduct);
    selectedProduct?.id && nevigate(`/productDetails/${selectedProduct.id}`);
  }, [selectedProduct]);

  return (
    <nav
      className={`fixed w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-white/90 backdrop-blur-md shadow-lg"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex  justify-between h-16">
          <div className="flex lg:flex-row items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center lg:mr-10">
              <img
                className="h-20 ml-3 w-auto "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCpgTlAyoPE18kvCRoq30TFvY79liTg-vp_A&s"
                alt="Logo"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:space-x-10">
              {["Home", "About"].map((item, i) => (
                <Link
                  key={item}
                  to={i == 1 ? "/about" : "/"}
                  className={`text-gray-800 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 ${
                    item === "Home" ? "border-indigo-500" : "border-transparent"
                  } text-sm uppercase font-bold tracking-wider transition-colors duration-200`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center">
                  <div className="w-64">
                    <SearchCategoryProductAndItem
                      setSelectedProduct={setSelectedProduct}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile and Cart Icons */}
          <div className="flex items-center">
            {/* Search Icon (Mobile) */}
            <button
              className="sm:hidden p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={toggleSearch}
            >
              <span className="sr-only">Search</span>
              <FiSearch className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isLoggedIn ? (
                <Link to={"/profile"}>
                  <span className="sr-only">View profile</span>
                  <FiUser className="h-6 w-6" />
                </Link>
              ) : (
                <button
                  className="bg-gray-200 text-black font-bold p-2 rounded-xl shadow-md hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => nevigate("/login")}
                >
                  Login <FiLogIn className="inline-block" />
                </button>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Men
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Women
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Kids
            </a>
          </div>
        </div>
      )}

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3">
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="flex justify-center">
              <div className="">
                <SearchCategoryProductAndItem
                  setSelectedProduct={setSelectedProduct}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
