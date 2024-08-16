import React from "react";

const LoadingSpinner = () => {
  return (
    <div className=" min-h-screen flex justify-center items-center flex-col space-y-4">
      <div className="loading-container">
        <div className="spinner"></div>
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCpgTlAyoPE18kvCRoq30TFvY79liTg-vp_A&s"
          }
          alt="Loading"
          className="loading-image "
        />
        <style jsx>{`
          .loading-container {
            position: relative;
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .loading-image {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
          }

          .spinner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 4px solid transparent;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
      <div className="text-gray-800 animate-pulse">
        Please wait while content is loading ...
      </div>
    </div>
  );
};

export default LoadingSpinner;
