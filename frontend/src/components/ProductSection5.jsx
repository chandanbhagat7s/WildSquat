import React, { useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Luxury Leather Handbag",
    description:
      "Elevate your style with our premium leather handbag. Crafted with the finest materials, this bag combines elegance with functionality.",
    price: 299.99,
    rating: 4.8,
    reviews: 256,
    colors: ["#8B4513", "#000000", "#A52A2A"],
    images: [
      "https://static.cilory.com/480395-thickbox_default/octane-blue-full-sleeves-t-shirt-by-nologo.jpg",
      "https://m.media-amazon.com/images/I/71QOhw6WJxL._AC_UY1100_.jpg",
      "https://static.cilory.com/480395-thickbox_default/octane-blue-full-sleeves-t-shirt-by-nologo.jpg",
    ],
  },
  {
    id: 2,
    name: "Classic Chronograph Watch",
    description:
      "Timeless elegance meets modern precision in our classic chronograph watch. Perfect for both formal occasions and everyday wear.",
    price: 199.99,
    rating: 4.9,
    reviews: 189,
    colors: ["#C0C0C0", "#FFD700", "#000000"],
    images: [
      "https://via.placeholder.com/500x600?text=Watch+1",
      "https://via.placeholder.com/500x600?text=Watch+2",
      "https://via.placeholder.com/500x600?text=Watch+3",
    ],
  },
  // Add more products as needed
];

const ProductSection5 = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Featured Products
        </h2>
        <div className="space-y-24">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, reverse }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 items-center`}
    >
      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-3xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex items-center space-x-2">
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
          <span className="text-gray-600 text-sm">
            ({product.reviews} reviews)
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <div
                key={color}
                className="w-6 h-6 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
          <button className="bg-gray-200 text-gray-800 p-3 rounded-full hover:bg-gray-300 transition-colors duration-300">
            <FaHeart />
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 relative">
        <img
          src={product.images[currentImage]}
          alt={product.name}
          className="w-full h-[600px] object-cover rounded-lg shadow-lg"
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 text-gray-800 hover:bg-opacity-75 transition-all duration-300"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 text-gray-800 hover:bg-opacity-75 transition-all duration-300"
        >
          <FaChevronRight />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {product.images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImage ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection5;
