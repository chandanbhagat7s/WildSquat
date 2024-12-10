import { useState } from "react";
import {
  FaChartPie,
  FaUsers,
  FaBox,
  FaClipboardList,
  FaChartLine,
  FaTools,
  FaCogs,
  FaArrowRight,
} from "react-icons/fa";

import logo from "./../../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const nevigate = useNavigate();

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <FaChartPie /> },
    { id: "stock", label: "Stock Details", icon: <FaUsers /> },
    { id: "products", label: "Products", icon: <FaBox /> },
    { id: "orders", label: "Orders", icon: <FaClipboardList /> },
    { id: "analytics", label: "Analytics", icon: <FaChartLine /> },
    { id: "tools", label: "Create Tools", icon: <FaTools /> },
    { id: "manage-tools", label: "Manage Tools", icon: <FaCogs /> },
    // { id: "reports", label: "Reports", icon: <FaFileAlt /> },
    // { id: "help", label: "Help", icon: <FaQuestionCircle /> },
  ];

  const renderTabContent = (tab) => {
    switch (tab) {
      case "products":
        // return <ProductActions />;
        nevigate("/adminDash/products");
        break;
      case "dashboard":
        nevigate("/adminDash");
        break;
      case "orders":
        nevigate("/adminDash/ordersdashboard");
        break;
      case "tools":
        nevigate("/adminDash/tools");
        break;
      case "manage-tools":
        nevigate("/adminDash/manage-tools");
        break;
      case "stock":
        nevigate("/adminDash/stock");
        break;
      default:
        return <p className="text-gray-600">Content for {activeTab}</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <nav className="bg-white shadow-lg md:w-1/4 lg:w-1/5">
        <div className="md:hidden flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
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
                <span className="font-bold ">WILDSQUAT</span> Retail Management
              </div>
            </div>
            <button
              className="p-2 ring-black ring-1 rounded w-full hover:bg-gray-200"
              onClick={() => nevigate("/adminDash/wholesale/")}
            >
              Wholesale Dashboard{" "}
              <FaArrowRight className="text-xl inline-block mx-2" />
            </button>
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center p-3 w-full text-left rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
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
      <main className="flex-1 p-4 md:p-6 bg-white shadow-lg rounded-lg ">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
