import React from "react";
import { FaShoppingCart, FaHeart, FaSearch, FaStar } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Premium Leather Jacket",
    price: 299.99,
    image: "https://via.placeholder.com/400x300",
    rating: 4.8,
    reviews: 253,
    description:
      "Luxurious leather jacket with a modern cut and premium finishes. Perfect for any casual or semi-formal occasion.",
  },
  {
    id: 2,
    name: "Elegant Evening Gown",
    price: 199.99,
    image: "https://via.placeholder.com/400x300",
    rating: 4.9,
    reviews: 187,
    description:
      "Stunning floor-length gown with intricate beadwork and a flowing silhouette. Ideal for formal events and galas.",
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: 149.99,
    image: "https://via.placeholder.com/400x300",
    rating: 4.7,
    reviews: 142,
    description:
      "Stylish sunglasses with UV protection and polarized lenses. Combines fashion with functionality.",
  },
];

const ProductSection2 = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Featured Collection
        </h2>
        <div className="space-y-12">
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            New
          </div>
        </div>
        <div className="md:w-3/5 p-6 flex flex-col space-y-2 justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h3>
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
            <p className="text-gray-600 mb-4">{product.description}</p>
          </div>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <div className="space-x-2 flex ">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center ">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button className="bg-red-600 text-white text-center p-3 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center  ">
                <FaHeart />
              </button>
              <button className="bg-green-600 text-white text-center p-3 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center 2">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection2;
