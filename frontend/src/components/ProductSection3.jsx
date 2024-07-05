import React from "react";
import { FaShoppingCart, FaHeart, FaSearch, FaStar } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Premium Leather Jacket",
    price: 299.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.8,
    reviews: 253,
  },
  {
    id: 2,
    name: "Elegant Evening Gown",
    price: 199.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.9,
    reviews: 187,
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: 149.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.7,
    reviews: 142,
  },
  {
    id: 4,
    name: "Classic Wristwatch",
    price: 249.99,
    image: "https://via.placeholder.com/300x400",
    rating: 4.6,
    reviews: 198,
  },
];

const ProductSection3 = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Featured Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-white text-xl font-bold mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
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
          <span className="text-white text-sm">
            ({product.reviews} reviews)
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-white text-2xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <div className="space-x-2">
            <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
              <FaHeart />
            </button>
            <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
              <FaSearch />
            </button>
          </div>
        </div>
        <button className="w-full bg-white text-gray-900 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductSection3;
