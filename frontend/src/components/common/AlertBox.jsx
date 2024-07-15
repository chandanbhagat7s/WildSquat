import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaulta } from "../../redux/slices/errorSlice";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Alert = ({ status, message }) => {
  const alertStyles = {
    success: {
      bg: "bg-gradient-to-r from-green-500 to-green-600",
      icon: <FaCheckCircle className="w-6 h-6 text-white" />,
    },
    info: {
      bg: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: <FaInfoCircle className="w-6 h-6 text-white" />,
    },
    warning: {
      bg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      icon: <FaExclamationTriangle className="w-6 h-6 text-white" />,
    },
    error: {
      bg: "bg-gradient-to-r from-red-500 to-red-600",
      icon: <FaTimesCircle className="w-6 h-6 text-white" />,
    },
  };

  const { bg, icon } = alertStyles[status];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`w-full max-w-md mx-auto rounded-lg shadow-2xl overflow-hidden ${bg}`}
    >
      <div className="p-4 flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3 flex-1">
          <p className="text-white text-sm font-medium">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const AlertBox = () => {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error.status !== "") {
      const timer = setTimeout(() => {
        dispatch(defaulta({ message: "" }));
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div
      className="fixed inset-0 flex items-start justify-center pointer-events-none my-2"
      style={{ zIndex: 1000000 }}
    >
      <AnimatePresence>
        {error.status !== "" && (
          <Alert
            key={error.status}
            status={error.status}
            message={error.message}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
