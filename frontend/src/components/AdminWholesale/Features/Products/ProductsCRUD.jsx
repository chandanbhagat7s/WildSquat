import React, { useState } from "react";
import { motion } from "framer-motion";
import EditProductForm from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import CreateProductForm from "./AddProduct";
import { FaEdit, FaMinus, FaPlus } from "react-icons/fa";

const ProductActions = () => {
  const [activeComponent, setActiveComponent] = useState("create");

  const buttons = [
    { name: "Create Product", action: "create", icon: <FaPlus /> },
    { name: "Delete", action: "delete", icon: <FaMinus /> },
    // { name: "Hide", action: "hide", icon:  },
    { name: "Edit Product", action: "edit", icon: <FaEdit /> },
  ];

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "create":
        return <CreateProductForm />;
      case "delete":
        return <DeleteProduct />;

      case "hide":
        // return <HideProduct />;
        return <></>;
      case "edit":
        return <EditProductForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 fixed bg-white shadow-lg z-50 w-full py-3 top-0 px-2 ">
        {buttons.map((button) => (
          <motion.button
            key={button.action}
            onClick={() => setActiveComponent(button.action)}
            className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${
              activeComponent === button.action
                ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100 ring-1 ring-black"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{button.icon}</span>
            {button.name}
          </motion.button>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-1 lg:p-4 shadow-md h-[100vh] overflow-scroll"
      >
        {renderActiveComponent()}
      </motion.div>
    </>
  );
};

const HideProduct = () => (
  <div className="text-gray-800">
    <h3 className="text-2xl font-semibold mb-4">Hide Product</h3>
    <p>Would you like to hide or unhide this product?</p>
  </div>
);

export default ProductActions;
