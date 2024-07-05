import React, { useState } from "react";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Vintage Denim Collection",
    likes: 1234,
    comments: 56,
    images: [
      "https://via.placeholder.com/400x400?text=Denim+1",
      "https://via.placeholder.com/400x400?text=Denim+2",
      "https://via.placeholder.com/400x400?text=Denim+3",
    ],
  },
  {
    id: 2,
    name: "Summer Dress Line",
    likes: 2345,
    comments: 78,
    images: [
      "https://via.placeholder.com/400x400?text=Dress+1",
      "https://via.placeholder.com/400x400?text=Dress+2",
      "https://via.placeholder.com/400x400?text=Dress+3",
    ],
  },
  {
    id: 3,
    name: "Leather Accessories",
    likes: 3456,
    comments: 90,
    images: [
      "https://via.placeholder.com/400x400?text=Leather+1",
      "https://via.placeholder.com/400x400?text=Leather+2",
      "https://via.placeholder.com/400x400?text=Leather+3",
    ],
  },
  {
    id: 4,
    name: "Sneaker Showcase",
    likes: 4567,
    comments: 123,
    images: [
      "https://via.placeholder.com/400x400?text=Sneaker+1",
      "https://via.placeholder.com/400x400?text=Sneaker+2",
      "https://via.placeholder.com/400x400?text=Sneaker+3",
    ],
  },
  {
    id: 5,
    name: "Elegant Watches",
    likes: 5678,
    comments: 145,
    images: [
      "https://via.placeholder.com/400x400?text=Watch+1",
      "https://via.placeholder.com/400x400?text=Watch+2",
      "https://via.placeholder.com/400x400?text=Watch+3",
    ],
  },
  {
    id: 6,
    name: "Sunglasses Collection",
    likes: 6789,
    comments: 167,
    images: [
      "https://via.placeholder.com/400x400?text=Sunglasses+1",
      "https://via.placeholder.com/400x400?text=Sunglasses+2",
      "https://via.placeholder.com/400x400?text=Sunglasses+3",
    ],
  },
];

const ProductSection4 = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Our Instagram Feed
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={product.images[currentImage]}
          alt={product.name}
          className="w-full h-96 object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 text-gray-800 hover:bg-opacity-75 transition-all duration-300"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 text-gray-800 hover:bg-opacity-75 transition-all duration-300"
        >
          <FaChevronRight />
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          {product.images.map((_, index) => (
            <span
              key={index}
              className={`inline-block w-2 h-2 rounded-full mx-1 ${
                index === currentImage ? "bg-white" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-700 hover:text-red-500 transition-colors duration-300">
              <FaHeart className="mr-1" />
              <span>{product.likes}</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-300">
              <FaComment className="mr-1" />
              <span>{product.comments}</span>
            </button>
          </div>
          <button className="text-gray-700 hover:text-gray-900 transition-colors duration-300">
            <FaShare />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSection4;
