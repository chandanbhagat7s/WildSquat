import React from "react";
import { FaShoppingCart, FaHeart, FaSearch, FaStar } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Sleek Leather Jacket",
    price: 199.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Casual Denim Shirt",
    price: 59.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.2,
    reviews: 96,
  },
  {
    id: 3,
    name: "Elegant Evening Dress",
    price: 149.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.8,
    reviews: 215,
  },
  {
    id: 4,
    name: "Comfortable Sneakers",
    price: 89.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.3,
    reviews: 172,
  },
  {
    id: 5,
    name: "Classic Wool Coat",
    price: 229.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.6,
    reviews: 84,
  },
  {
    id: 6,
    name: "Stylish Sunglasses",
    price: 79.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.1,
    reviews: 63,
  },
];

const ProductSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300">
            <FaShoppingCart size={20} />
          </button>
          <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300">
            <FaHeart size={20} />
          </button>
          <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300">
            <FaSearch size={20} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-1">
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
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
