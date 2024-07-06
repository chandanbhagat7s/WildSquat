import React, { useState } from "react";
import { FaHeart, FaShare } from "react-icons/fa";

const ProductOverview = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const product = {
    name: "Track Pant",
    price: "1000",
    shortDescription:
      "Relaxed Fit Track Pants: Enjoy ultimate comfort with a relaxed fit and adjustable waistband. Slim Fit Track Pants: Sporty and trendy, these track pants offer a snug fit for an athletic look.",
    longDescription:
      "Elevate your athleisure wardrobe with our Classic Black Track Pants. Des  mo  workouts, casual outings, or lounging at home, these track pants are a versatile addition to any wardrs",
    sizes: ["XS", "S", "M", "L"],
    material: ["Polyester", "Cotton Blend"],
    features: [
      "Elastic Waistband: Adjustable and comfortable fit",
      "Moisture-Wicking Fabric: Keeps you dry during workouts.",
      "Zippered Pockets: Secure storage for essentials",
      "Tapered Leg Design: Modern and stylish look",
      "Breathable Material: Ensures comfort and ventilation",
    ],
    colors: ["#a53131", "#000000", "#000000", "#000000", "#000000"],
    shippingDetails:
      "Free Shipping: On orders over $50. Standard Shipping: $5.99, delivery in 5-7 business days.",
    returnDetails: "30-Day Return Policy: Hassle-free returns within 30 days.",
    category: "Casual",
    colorCategory: "Green",
    careInstructions: [
      "Machine Washable: Easy to clean in a washing machine.",
      "Cold Water Wash: Use cold water to preserve fabric quality.",
      "Tumble Dry Low: Dry on low heat to prevent shrinking.",
      "Do Not Bleach: Avoid using bleach to maintain color.",
      "Iron Low Heat: Use a low heat setting when ironing.",
    ],
    madeIn: "India",
    stock: "20",
  };

  // Assuming we have two placeholder images
  const images = [
    "http://127.0.0.1:4000/img/Track Pant-1.jpeg",
    "http://127.0.0.1:4000/img/Track Pant-0.jpeg",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row -mx-4">
        {/* Left side - Image gallery */}
        <div className="md:w-2/5 px-4">
          <div className="sticky top-0">
            <div className="mb-4">
              <img
                src={images[selectedImage]}
                alt={`Track Pant - Image ${selectedImage + 1}`}
                className="w-full rounded-lg"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                    selectedImage === index ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Product information */}
        <div className="md:w-3/5 px-4 mt-8 md:mt-0">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {product.shortDescription}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold">₹{product.price}</span>
            <span className="ml-2 text-green-500">Extra ₹4000 off</span>
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Size</h2>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border rounded-md hover:border-blue-500"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Color</h2>
            <div className="flex space-x-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-full border-2 hover:border-blue-500"
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <button className="flex-1 bg-orange-500 text-white py-3 rounded-md">
              ADD TO CART
            </button>
            <button className="flex-1 bg-orange-600 text-white py-3 rounded-md">
              BUY NOW
            </button>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Information */}
          <div className="text-sm text-gray-600">
            <p>Category: {product.category}</p>
            <p>Material: {product.material.join(", ")}</p>
            <p>Made in: {product.madeIn}</p>
            <p>{product.shippingDetails}</p>
            <p>{product.returnDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
