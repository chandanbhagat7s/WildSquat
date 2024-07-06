import React, { useState } from "react";
import ProductActions from "./ProductsCRUD";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      content:
        "Welcome to your admin dashboard. Here you can see an overview of your site's performance.",
    },
    {
      id: "users",
      label: "Users",
      content: "Manage your users, their roles, and permissions here.",
    },
    {
      id: "products",
      label: "Products",
      content: "Add, edit, or remove products from your inventory.",
    },
    {
      id: "orders",
      label: "Orders",
      content: "View and manage customer orders here.",
    },
    {
      id: "analytics",
      label: "Analytics",
      content:
        "View detailed analytics and statistics about your site's performance.",
    },
    {
      id: "settings",
      label: "Settings",
      content: "Adjust your site settings and configurations.",
    },
    {
      id: "reports",
      label: "Reports",
      content: "Generate and view various reports about your site's activity.",
    },
    {
      id: "help",
      label: "Help",
      content: "Find answers to common questions and get support here.",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

        <div className="mb-4 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px" role="tablist">
            {tabs.map((tab) => (
              <li key={tab.id} className="mr-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`p-4 rounded-lg bg-white ${
                activeTab === tab.id ? "" : "hidden"
              }`}
              role="tabpanel"
              aria-labelledby={`${tab.id}-tab`}
            >
             
            </div>
          ))} */}

          {activeTab == "products" && <ProductActions />}
          {/* <ProductActions/> */}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
