import React, { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaTruck,
  FaExchangeAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { IoMdResize } from "react-icons/io";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const ProductOverview2 = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    name: "Luxe Cashmere Blend Overcoat",
    price: "$499.99",
    description:
      "Indulge in unparalleled luxury with our Cashmere Blend Overcoat. Meticulously crafted from a sumptuous blend of cashmere and virgin wool, this coat offers exceptional warmth without compromising on style. The streamlined silhouette and impeccable tailoring ensure a flattering fit for all body types.",
    rating: 4.8,
    reviews: 256,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Midnight Blue", "Charcoal Grey", "Camel"],
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1575919988859-f727358015b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    ],
    features: [
      "100% cashmere-wool blend",
      "Fully lined with premium silk",
      "Double-breasted front with horn buttons",
      "Two front welt pockets and one interior pocket",
      "Dry clean only",
    ],
  };

  const comments = [
    {
      id: 1,
      author: "Alexandra R.",
      content:
        "This coat exceeds all expectations. The cashmere blend is incredibly soft, and the fit is perfection. It's become my go-to piece for both formal events and casual outings.",
      rating: 5,
      date: "May 15, 2023",
    },
    {
      id: 2,
      author: "Jonathan L.",
      content:
        "An investment piece that's worth every penny. The quality is outstanding, and it's versatile enough to dress up or down. I've received countless compliments.",
      rating: 5,
      date: "April 30, 2023",
    },
    {
      id: 3,
      author: "Sophia M.",
      content:
        "The attention to detail in this coat is remarkable. From the stitching to the buttons, everything speaks of luxury. It's warm without being bulky - perfect for city winters.",
      rating: 4,
      date: "April 22, 2023",
    },
  ];

  const similarProducts = [
    {
      id: 1,
      name: "Merino Wool Sweater",
      price: "$189.99",
      image:
        "https://images.unsplash.com/photo-1618355776464-8666794d3240?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      name: "Italian Leather Gloves",
      price: "$129.99",
      image:
        "https://images.unsplash.com/photo-1609803384069-19f3e4a20c3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 3,
      name: "Cashmere Scarf",
      price: "$149.99",
      image:
        "https://images.unsplash.com/photo-1606755654228-004212ff2df1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
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
                    onClick={() => setCurrentImageIndex(index)}
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

            <div className="w-full aspect-w-1 aspect-h-1 relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2"
                onClick={prevImage}
              >
                <RiArrowLeftSLine className="w-6 h-6 text-gray-800" />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2"
                onClick={nextImage}
              >
                <RiArrowRightSLine className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center justify-between">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">{product.price}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) =>
                  product.rating > index ? (
                    <FaStar
                      key={index}
                      className="text-yellow-400 h-5 w-5 flex-shrink-0"
                    />
                  ) : (
                    <FaRegStar
                      key={index}
                      className="text-yellow-400 h-5 w-5 flex-shrink-0"
                    />
                  )
                )}
                <a
                  href="#reviews"
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

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Features</h3>
              <ul className="mt-2 pl-4 list-disc text-sm text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-600 font-medium">Color</h3>
                <div className="mt-2 flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`relative p-0.5 rounded-full flex items-center justify-center focus:outline-none ${
                        selectedColor === color ? "ring-2 ring-indigo-500" : ""
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span className="sr-only">{color}</span>
                      <span
                        aria-hidden="true"
                        className={`h-8 w-8 border border-black border-opacity-10 rounded-full ${
                          color === "Midnight Blue"
                            ? "bg-blue-900"
                            : color === "Charcoal Grey"
                            ? "bg-gray-700"
                            : "bg-yellow-800"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-600 font-medium">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                  >
                    <IoMdResize className="mr-1" />
                    Size guide
                  </a>
                </div>

                <div className="mt-2 grid grid-cols-5 gap-4">
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

              <div className="mt-8 flex items-center">
                <button
                  type="button"
                  className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaShoppingCart className="mr-2" />
                  Add to cart
                </button>
                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  {isFavorite ? (
                    <FaHeart className="h-6 w-6 flex-shrink-0 text-red-500" />
                  ) : (
                    <FaRegHeart className="h-6 w-6 flex-shrink-0" />
                  )}
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-gray-900">
                Shipping & Returns
              </h3>
              <div className="mt-4 flex space-x-6">
                <div className="flex items-center">
                  <FaTruck className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <p className="ml-2 text-sm text-gray-500">
                    Free shipping on orders over $100
                  </p>
                </div>
                <div className="flex items-center">
                  <FaExchangeAlt className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <p className="ml-2 text-sm text-gray-500">
                    Free 30-day returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16" id="reviews">
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
                  <p className="text-sm text-gray-500">{comment.date}</p>
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, index) =>
                    comment.rating > index ? (
                      <FaStar
                        key={index}
                        className="text-yellow-400 h-5 w-5 flex-shrink-0"
                      />
                    ) : (
                      <FaRegStar
                        key={index}
                        className="text-yellow-400 h-5 w-5 flex-shrink-0"
                      />
                    )
                  )}
                </div>
                <p className="mt-4 text-base text-gray-600">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product details */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Product Details
          </h2>
          <div className="mt-6 border-t border-gray-200 pt-10">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Materials</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  70% Cashmere, 30% Virgin Wool
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Made in</dt>
                <dd className="mt-1 text-sm text-gray-900">Italy</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Care</dt>
                <dd className="mt-1 text-sm text-gray-900">Dry clean only</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Lining</dt>
                <dd className="mt-1 text-sm text-gray-900">100% Silk</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Similar products */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            You May Also Like
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

        {/* Customer reassurance */}
        <div className="mt-16 bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-6">
            Our Promise to You
          </h2>
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
            <div className="flex items-center">
              <FaShieldAlt className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Quality Guarantee
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  We stand behind our products' quality
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaTruck className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Fast Shipping
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Free shipping on orders over $100
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaExchangeAlt className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Easy Returns
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  30-day return policy for all items
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaHeart className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Customer Satisfaction
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  We prioritize your happiness
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview2;
