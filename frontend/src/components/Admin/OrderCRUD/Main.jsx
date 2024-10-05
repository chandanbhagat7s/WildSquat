import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlinePending } from "react-icons/md";
import UnshippedTableComponent from "./UnshippedTableComponent";
import { IoMdDoneAll } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";

import { GiReturnArrow } from "react-icons/gi";
import BookedOrders from "./BookedOrders";
import CanclledOrders from "./CancelledOrders";
import DeliveredOrders from "./DeliveredOrders";

const Main = () => {
  const [activeComponent, setActiveComponent] = useState("create");

  const buttons = [
    { name: "Un-Shipped", action: "unship", icon: <MdOutlinePending /> },
    { name: "Booked Orders", action: "booked", icon: <CiDeliveryTruck /> },
    { name: "Returned Orders", action: "returned", icon: <GiReturnArrow /> },
    { name: "Delivered", action: "Delivered", icon: <IoMdDoneAll /> },
  ];

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "unship":
        return <UnshippedTableComponent />;
      case "booked":
        return <BookedOrders />;
      case "returned":
        return <CanclledOrders />;
      case "Delivered":
        return <DeliveredOrders />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {buttons.map((button) => (
          <motion.button
            key={button.action}
            onClick={() => setActiveComponent(button.action)}
            className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${
              activeComponent === button.action
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
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
        className="bg-white rounded-xl p-1 lg:p-4 shadow-md"
      >
        {renderActiveComponent()}
      </motion.div>
    </>
  );
};

export default Main;
