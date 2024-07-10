import React, { useEffect, useState } from "react";
import EachReview from "./EachReview";
import axios from "axios";

export default function ReviewComponent({ pid }) {
  const [reviewData, setReviewData] = useState([]);
  async function getData() {
    try {
      console.log(pid);
      const res = await axios.get(
        `/api/v1/review/getAllReview/${pid}?fields=review,rating,createdAt`
      );
      if (res?.data?.status == "success") {
        setReviewData([...res.data.data]);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {reviewData.length > 0 &&
        reviewData.map((el, i) => {
          return <EachReview key={i} r={el} />;
        })}
    </div>
  );
}
