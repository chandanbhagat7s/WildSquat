import { useDispatch, useSelector } from "react-redux";
import { defaulta } from "../../redux/slices/errorSlice";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

const Alert = ({ status, message }) => {
  const alertStyles = {
    success: {
      bg: "bg-gradient-to-r from-green-50 to-green-100",
      border: "border-green-400",
      text: "text-green-800",
      icon: <FaCheckCircle className="w-6 h-6 text-green-400" />,
    },
    info: {
      bg: "bg-gradient-to-r from-blue-50 to-blue-100",
      border: "border-blue-400",
      text: "text-blue-800",
      icon: <FaInfoCircle className="w-6 h-6 text-blue-400" />,
    },
    warning: {
      bg: "bg-gradient-to-r from-yellow-50 to-yellow-100",
      border: "border-yellow-400",
      text: "text-yellow-800",
      icon: <FaExclamationTriangle className="w-6 h-6 text-yellow-400" />,
    },
    error: {
      bg: "bg-gradient-to-r from-red-50 to-red-100",
      border: "border-red-400",
      text: "text-red-800",
      icon: <FaTimesCircle className="w-6 h-6 text-red-400" />,
    },
  };

  const { bg, border, text, icon } = alertStyles[status];

  return (
    <div
      className={`w-full max-w-4xl mx-auto my-4 rounded-lg shadow-lg overflow-hidden`}
    >
      <div className={`${bg} ${border} border-l-4 p-4`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-3">
            <p className={`${text} text-sm font-medium capitalize`}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AlertBox = () => {
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch((state) => state.error);

  setTimeout(() => {
    dispatch(defaulta({ message: "" }));
  }, [4000]);

  return (
    <>
      <div className="fixed " style={{ zIndex: 1000000 }}>
        {error.status == "" && <></>}
        {error.status === "success" && (
          <Alert status="success" message={error.message} />
        )}
        {error.status === "info" && (
          <Alert status="info" message={error.message} />
        )}
        {error.status === "warning" && (
          <Alert status="warning" message={error.message} />
        )}
        {error.status === "error" && (
          <Alert status="error" message={error.message} />
        )}
      </div>
    </>
  );
};
