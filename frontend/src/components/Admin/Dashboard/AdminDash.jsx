import { useState, useEffect } from "react";
import {
  FaChartPie,
  FaUsers,
  FaBox,
  FaClipboardList,
  FaChartLine,
  FaTools,
  FaCogs,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import ProductActions from "./../ProductsCRUD/ProductsCRUD";
import ManageTools from "./../Tools/ManageTools";
import CreateCategory from "./../Tools/CreateCatefory";
import ProductData from "./ProductData";
import Main from "../OrderCRUD/Main";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <FaChartPie /> },
    { id: "users", label: "Users", icon: <FaUsers /> },
    { id: "products", label: "Products", icon: <FaBox /> },
    { id: "orders", label: "Orders", icon: <FaClipboardList /> },
    { id: "analytics", label: "Analytics", icon: <FaChartLine /> },
    { id: "tools", label: "Tools", icon: <FaTools /> },
    { id: "manage-tools", label: "Manage Tools", icon: <FaCogs /> },
    { id: "reports", label: "Reports", icon: <FaFileAlt /> },
    { id: "help", label: "Help", icon: <FaQuestionCircle /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductActions />;
      case "dashboard":
        return <ProductData />;
      case "orders":
        return <Main />;
      case "tools":
        return <CreateCategory />;
      case "manage-tools":
        return <ManageTools />;
      default:
        return <p className="text-gray-600">Content for {activeTab}</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <nav
        className={`bg-white shadow-lg transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 right-0 z-50" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                Admin Panel
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                  } w-full text-left`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-1">
        <div className="bg-white rounded-lg shadow-xl py-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
