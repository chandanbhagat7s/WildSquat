import React, { useState } from "react";

import { CiHeart } from "react-icons/ci";

import { CiStar } from "react-icons/ci";

const ProductOverview = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Premium Wool Overcoat",
    price: "$299.99",
    description:
      "Elevate your winter wardrobe with our luxurious wool overcoat. Crafted from the finest Italian wool, this coat offers both warmth and sophistication. Its timeless design features a classic lapel collar, double-breasted front, and a tailored fit that flatters any silhouette.",
    rating: 4.8,
    reviews: 124,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Camel", "Navy"],
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    ],
  };

  const comments = [
    {
      id: 1,
      author: "Emily S.",
      content:
        "This coat is absolutely stunning! The quality is exceptional, and it keeps me warm even in the harshest winter weather.",
      rating: 5,
    },
    {
      id: 2,
      author: "Michael T.",
      content:
        "I've received so many compliments on this coat. It's versatile and goes well with both casual and formal outfits.",
      rating: 5,
    },
    {
      id: 3,
      author: "Sarah L.",
      content:
        "The fit is perfect, and the wool is so soft. It's definitely worth the investment!",
      rating: 4,
    },
  ];

  const similarProducts = [
    {
      id: 1,
      name: "Cashmere Scarf",
      price: "$89.99",
      image:
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    },
    {
      id: 2,
      name: "Leather Gloves",
      price: "$69.99",
      image:
        "https://images.unsplash.com/photo-1531910805604-3a3da1daf396?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
    },
    {
      id: 3,
      name: "Wool Fedora Hat",
      price: "$79.99",
      image:
        "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div
                className="grid grid-cols-4 gap-6"
                aria-orientation="horizontal"
              >
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    <span className="sr-only">Image {index + 1}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-center object-cover"
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full aspect-w-1 aspect-h-1">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">{product.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <CiStar
                      key={rating}
                      className={`${
                        product.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } h-5 w-5 flex-shrink-0`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <a
                  href="#"
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {product.reviews} reviews
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-600">Color</h3>
                <div className="mt-1 flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="relative p-0.5 rounded-full flex items-center justify-center focus:outline-none ring-gray-400"
                    >
                      <span className="sr-only">{color}</span>
                      <span
                        aria-hidden="true"
                        className={`h-8 w-8 border border-black border-opacity-10 rounded-full ${
                          color === "Charcoal"
                            ? "bg-gray-700"
                            : color === "Camel"
                            ? "bg-yellow-800"
                            : "bg-blue-900"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-600">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <div className="mt-1 grid grid-cols-5 gap-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`${
                        selectedSize === size
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-900 border-gray-200"
                      } border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 focus:outline-none`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <CiHeart
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Similar products */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Similar Products
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {similarProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Comments */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Customer Reviews
          </h2>
          <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-gray-200 pb-10">
            {comments.map((comment) => (
              <div key={comment.id} className="pt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {comment.author}
                  </h3>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <CiStar
                        key={rating}
                        className={`${
                          comment.rating > rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } h-5 w-5 flex-shrink-0`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-base text-gray-600">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
