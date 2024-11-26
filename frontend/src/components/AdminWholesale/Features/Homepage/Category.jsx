// components/Categories.jsx
import React from "react";
import url from "../../../../assets/url";
import ThinkingCard from "../Common/ThinkingCard";

const Categories = ({ categories }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <ThinkingCard key={index} product={category} index={index} />
      ))}
    </div>
  );
};

export default Categories;
