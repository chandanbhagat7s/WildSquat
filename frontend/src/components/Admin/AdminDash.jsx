import { useState, useEffect } from "react";
import ProductActions from "./ProductsCRUD";
import GetAllOrdersPending from "./GetAllOrdersPending";
import ManageTools from "./ManageTools";
import CreateCategory from "./CreateCatefory";
import ProductData from "./ProductData";

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
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "products", label: "Products", icon: "🛍️" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "tools", label: "Tools", icon: "🔧" },
    { id: "manage-tools", label: "Manage Tools", icon: "⚙️" },
    { id: "reports", label: "Reports", icon: "📊" },
    { id: "help", label: "Help", icon: "❓" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductActions />;
      case "dashboard":
        return <ProductData />;
      case "orders":
        return <GetAllOrdersPending />;
      case "tools":
        return <CreateCategory />;
      case "manage-tools":
        return <ManageTools />;
      default:
        return <p className="text-gray-600">Content for {activeTab}</p>;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <nav
        className={`bg-white shadow-lg transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 right-0 z-50" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white"
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
                    aria-hidden="true"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-50  rounded-lg">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
