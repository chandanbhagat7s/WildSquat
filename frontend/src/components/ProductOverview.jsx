import React, { useState } from "react";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiStar,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { RiLeafLine, RiRecycleLine } from "react-icons/ri";

const ProductDetails = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const product = {
    name: "Luxe Comfort Ergonomic Office Chair",
    price: 599.99,
    rating: 4.8,
    reviews: 256,
    description:
      "Experience unparalleled comfort and support with our Luxe Comfort Ergonomic Office Chair. Designed for long hours of work, this premium chair features adjustable lumbar support, breathable mesh back, and plush memory foam seat.",
    features: [
      "Fully adjustable armrests, seat height, and tilt",
      "360-degree swivel base with smooth-rolling casters",
      "Weight capacity: 300 lbs",
      "Environmental certifications: GREENGUARD Gold, BIFMA Level 3",
    ],
    colors: ["Onyx Black", "Pearl White", "Sapphire Blue"],
    material:
      "High-grade aluminum frame with premium mesh and leather upholstery",
    warranty: "10-year limited warranty",
    shipping: "Free shipping & 30-day returns",
  };

  const similarProducts = [
    {
      id: 1,
      name: "Executive Leather Office Chair",
      price: 699.99,
      rating: 4.6,
    },
    { id: 2, name: "Ergonomic Mesh Task Chair", price: 399.99, rating: 4.5 },
    { id: 3, name: "Luxe Standing Desk Converter", price: 299.99, rating: 4.7 },
  ];

  const comments = [
    {
      id: 1,
      user: "John D.",
      content: "Best chair I've ever owned. Worth every penny!",
      rating: 5,
    },
    {
      id: 2,
      user: "Sarah M.",
      content: "Great lumbar support, but took some time to adjust perfectly.",
      rating: 4,
    },
    {
      id: 3,
      user: "Mike R.",
      content:
        "Excellent build quality. Highly recommended for long work hours.",
      rating: 5,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src="https://example.com/chair-image.jpg"
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-current" : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Colors:</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        backgroundColor: color.toLowerCase().replace(" ", ""),
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="flex items-center mb-6">
                <label htmlFor="quantity" className="mr-4 font-semibold">
                  Quantity:
                </label>
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value)))
                    }
                    className="w-12 text-center border-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex space-x-4 mb-8">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                  <FiShoppingCart className="mr-2" /> Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition duration-300">
                  <FiHeart />
                </button>
                <button className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition duration-300">
                  <FiShare2 />
                </button>
              </div>
              <div className="border-t pt-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <RiLeafLine className="mr-2" /> Eco-friendly materials
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RiRecycleLine className="mr-2" /> 100% recyclable packaging
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <button
                className="flex items-center justify-between w-full text-left text-xl font-semibold mb-2"
                onClick={() => toggleSection("features")}
              >
                Product Features
                {expandedSection === "features" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>
              {expandedSection === "features" && (
                <ul className="list-disc pl-6 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-8">
              <button
                className="flex items-center justify-between w-full text-left text-xl font-semibold mb-2"
                onClick={() => toggleSection("specifications")}
              >
                Specifications
                {expandedSection === "specifications" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>
              {expandedSection === "specifications" && (
                <div className="text-gray-600">
                  <p>
                    <strong>Material:</strong> {product.material}
                  </p>
                  <p>
                    <strong>Warranty:</strong> {product.warranty}
                  </p>
                  <p>
                    <strong>Shipping:</strong> {product.shipping}
                  </p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              {comments.map((comment) => (
                <div key={comment.id} className="mb-4 pb-4 border-b">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">{comment.user}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < comment.rating ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow p-4"
                  >
                    <img
                      src={`https://example.com/product-${product.id}.jpg`}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
