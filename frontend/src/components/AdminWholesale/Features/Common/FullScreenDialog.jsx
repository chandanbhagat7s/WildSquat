import React from "react";
import { FiX } from "react-icons/fi";

const FullScreenDialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto  flex items-center justify-center backdrop-blur-lg bg-black">
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none"
          >
            <FiX className="h-8 w-8" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto rounded-lg ">{children}</div>
      </div>
    </div>
  );
};

export default FullScreenDialog;
