import { useState } from "react";
import { FaUsers, FaBox, FaTools, FaCogs, FaArrowLeft } from "react-icons/fa";

import logo from "./../../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { GiPrivate } from "react-icons/gi";

const WholesaleAdminLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const nevigate = useNavigate();

  const tabs = [
    { id: "products", label: "Products CRUD", icon: <FaBox /> },
    { id: "stock", label: "Stock Details", icon: <FaUsers /> },
    { id: "tools", label: "Create Tools", icon: <FaTools /> },
    { id: "manage-tools", label: "Manage Tools", icon: <FaCogs /> },
    { id: "hidden-Products", label: "Hidden Products", icon: <GiPrivate /> },
    // { id: "reports", label: "Reports", icon: <FaFileAlt /> },
    // { id: "help", label: "Help", icon: <FaQuestionCircle /> },
  ];

  const renderTabContent = (tab) => {
    switch (tab) {
      case "products":
        // return <ProductActions />;
        nevigate("/adminDash/wholesale/products");
        break;

      case "tools":
        nevigate("/adminDash/wholesale/tools");
        break;
      case "manage-tools":
        nevigate("/adminDash/wholesale/manage-tools");
        break;
      case "stock":
        nevigate("/adminDash/wholesale/stock");
        break;
      case "hidden-Products":
        nevigate("/adminDash/wholesale/hiddenProducts");
        break;
      default:
        return <p className="text-gray-600">Content for {activeTab}</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-gray-700">
      {/* Sidebar */}
      <nav className="bg-white shadow-lg md:w-1/4 lg:w-1/5">
        <div className="md:hidden flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 focus:outline-none"
          >
            {!isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:block p-2 space-y-2 `}
        >
          <div className="mb-10 space-y-2">
            <div className=" my-2 ">
              <img
                src={logo}
                alt="Wild Squat Logo"
                className="scale-125 h-12 mx-auto"
              />
              <div className="text-xl text-center">
                <span className="font-bold ">WILDSQUAT</span> Wholesale
                Management
              </div>
            </div>
            <button
              className="p-2 ring-black ring-1 rounded w-full hover:bg-gray-200"
              onClick={() => nevigate("/adminDash/")}
            >
              <FaArrowLeft className="text-xl inline-block mx-2" />
              Retail Dashboard
            </button>
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center p-3 w-full text-left rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-600"
              }`}
              onClick={() => {
                renderTabContent(tab.id);
                setActiveTab(tab.id);
              }}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-1 bg-white shadow-lg rounded-lg ">
        {children}
      </main>
    </div>
  );
};

export default WholesaleAdminLayout;
