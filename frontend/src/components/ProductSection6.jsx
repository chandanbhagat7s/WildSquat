import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaStar, FaExpand } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Elegant Leather Watch",
    description:
      "Timeless design meets modern functionality in this premium leather watch.",
    price: 199.99,
    rating: 4.8,
    reviews: 256,
    image: "https://via.placeholder.com/400x500?text=Watch",
    category: "Accessories",
  },
  {
    id: 2,
    name: "Designer Sunglasses",
    description:
      "Protect your eyes in style with these trendy designer sunglasses.",
    price: 149.99,
    rating: 4.6,
    reviews: 189,
    image: "https://via.placeholder.com/400x300?text=Sunglasses",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Premium Denim Jacket",
    description: "A versatile denim jacket that complements any casual outfit.",
    price: 89.99,
    rating: 4.7,
    reviews: 210,
    image: "https://via.placeholder.com/400x600?text=Jacket",
    category: "Clothing",
  },
  {
    id: 4,
    name: "Leather Handbag",
    description: "Elevate your style with this luxurious leather handbag.",
    price: 249.99,
    rating: 4.9,
    reviews: 178,
    image: "https://via.placeholder.com/400x400?text=Handbag",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Smart Fitness Tracker",
    description:
      "Track your health and fitness goals with this advanced smart device.",
    price: 129.99,
    rating: 4.5,
    reviews: 302,
    image: "https://via.placeholder.com/400x300?text=Fitness+Tracker",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    description:
      "Experience crystal-clear sound with these comfortable wireless earbuds.",
    price: 159.99,
    rating: 4.7,
    reviews: 245,
    image: "https://via.placeholder.com/400x500?text=Earbuds",
    category: "Electronics",
  },
];

const ProductSection6 = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Our Collection
        </h2>

        <div className="flex justify-center mb-8 space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <button className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors duration-300 mr-4">
            <FaExpand />
          </button>
          <button className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors duration-300">
            <FaHeart />
          </button>
        </div>
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm">
            ({product.reviews} reviews)
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center">
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSection6;
