import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
// import { StarIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { error, success } from "../../redux/slices/errorSlice";

const ReviewForm = ({ ofProduct }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/review/", {
        review: message,
        rating,
        ofProduct,
      });

      if (res?.data?.status == "success") {
        setMessage("");
        setRating(0);
        dispatch(success({ message: res?.data?.msg || "Review Posted" }));
      }

      console.log(res);
    } catch (e) {
      setMessage("");
      setRating(0);
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Write a Review
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Share your thoughts about the product..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <CiStar
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
