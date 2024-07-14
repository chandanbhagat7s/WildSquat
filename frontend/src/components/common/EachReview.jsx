import React from "react";
// import { StarIcon, UserCircleIcon } from "@heroicons/react/solid";

import { CiStar, CiUser } from "react-icons/ci";
import { format } from "date-fns";

export default function EachReview({ r }) {
  const { review, byUser, rating, createdAt } = r;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transition duration-300 ease-in-out hover:shadow-xl">
      <div className="flex items-center justify-between flex-col lg:flex-row mb-4">
        <div className="flex items-center space-x-3">
          <CiUser className="h-10 w-10 text-gray-400" />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {byUser.name}
            </h3>
            <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <CiStar
              key={index}
              className={`h-5 w-5 ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 mb-4">{review}</p>
    </div>
  );
}
