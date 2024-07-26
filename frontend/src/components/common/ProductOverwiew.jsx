import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaExchangeAlt,
  FaGlobeAsia,
  FaHeart,
  FaShare,
  FaShippingFast,
  FaTshirt,
} from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { error, info, success } from "../../redux/slices/errorSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdLocalLaundryService } from "react-icons/md";
import ReviewForm from "./CreateReview";
import ReviewComponent from "./ReviewComponent";
import BuyNowPopup from "../Payments/paymentDialog";
import EachReview from "./EachReview";
import url from "../../assets/url";
import LoadingSpinner from "./Spinner";

const ProductOverview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [images, setImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [showPopup, setShowPopup] = useState(false);
  const auth = useSelector((state) => state.auth);

  // const [loading2, setLoading2] = useState(false);

  const handleStatus = async (data) => {
    try {
      const res = await axios.post("/api/v1/payment/verifyPayment", {
        ...data,
        productid: product._id,
        productName: product.name,
      });

      if (res.data?.status == "success") {
        dispatch(success({ message: res.data?.msg }));
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.msg || e.response?.message || "something went wrong",
        })
      );
    }
  };

  const handlePayment = async () => {
    try {
      // Step 1: Create an order on your server
      const orderResponse = await axios.post("/api/v1/payment/createOrder", {
        amount: product.price * 100, // Razorpay expects amount in paise
        name: product.name,
      });
      console.log(orderResponse);

      const options = {
        key: orderResponse.data.key_id, // Replace with your Razorpay Key ID
        amount: product.price,
        currency: "INR",
        name: "WILDSQUAT",
        description: `Payment for ${product.name}`,
        order_id: orderResponse.data.order_id,
        handler: function (response) {
          // Handle successful payment
          console.log("Payment successful:", response);
          handleStatus(response);
          // You should verify the payment signature on your server here
        },
        prefill: {
          name: auth?.data?.name || "name",
          email: auth?.data?.email || "email",
          contact: "7867898787",
        },
        notes: {
          address: auth?.data?.address || "address",
        },
        theme: {
          color: "#9922ee",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.msg || e.response?.message || "Please try again",
        })
      );
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`/api/v1/product/getProduct/${id}`);
      console.log(res);
      if (res?.data?.status == "success") {
        // Assuming we have two placeholder images
        let i = res?.data?.product?.images.map((el) => `${url}img/${el}`);
        setImage([...i]);
        setProduct({ ...res?.data?.product });
        setLoading(false);
      }
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  };

  async function addToCart() {
    try {
      const res = await axios.get(`/api/v1/product/addToCart/${product._id}`);

      if (res.data?.status == "success") {
        dispatch(info({ message: "product added to cart" }));
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            "product not added to cart, please try again",
        })
      );
    }
  }

  async function removeFromCart() {
    try {
      const res = await axios.get(
        `/api/v1/product/removeFromCart/${product._id}`
      );

      if (res.data?.status == "success") {
        dispatch(info({ message: "product removed from cart" }));
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            "product not added to cart, please try again",
        })
      );
    }
  }
  function handleImageHover(e) {
    const container = e.currentTarget;
    const img = container.querySelector(".main-image");
    const enlargedView = container.querySelector(".enlarged-view");

    const containerRect = container.getBoundingClientRect();
    const x = (e.clientX - containerRect.left) / containerRect.width;
    const y = (e.clientY - containerRect.top) / containerRect.height;

    enlargedView.style.backgroundImage = `url(${img.src})`;
    enlargedView.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
  }

  useEffect(() => {
    getData();

    setTimeout(() => {
      const container = document?.querySelector(".image-container");
      if (container) {
        container.addEventListener("mousemove", handleImageHover);
      }

      return () => {
        if (container) {
          container.removeEventListener("mousemove", handleImageHover);
        }
      };
    }, 3000);
  }, [id]);

  return (
    <div className="container mx-auto px-4 pt-5 pb-8 mt-10">
      <div className="flex flex-col md:flex-row -mx-4">
        {loading ? (
          <>
            <div className="min-h-screen flex justify-center items-center">
              <LoadingSpinner
                imageUrl={
                  "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721865600&semt=sph"
                }
              />
            </div>
          </>
        ) : (
          <>
            {showPopup && (
              <BuyNowPopup
                product={product}
                onClose={() => setShowPopup(false)}
                onPay={handlePayment}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            )}
            {/* Left side - Image gallery */}
            <div className="md:w-2/5 px-4">
              <div className="sticky top-0 space-y-2 ">
                <div className="mb-1 flex flex-col relative">
                  <div className="image-container">
                    <img
                      src={images[selectedImage]}
                      alt={`Track Pant - Image ${selectedImage + 1}`}
                      className="h-96 mx-auto rounded-lg main-image"
                    />
                    <div className="enlarged-view"></div>
                  </div>
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                        selectedImage === index
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
                {/* Action Buttons */}
                <div className="flex space-x-4 ">
                  <button
                    className="flex-1   text-indigo-600 shadow-lg  py-3 rounded-md ring-2 ring-indigo-500 ring-inset hover:bg-indigo-700 hover:text-indigo-100 hover:font-bold   hover:scale-105 hover:ring-blue-300"
                    onClick={addToCart}
                  >
                    ADD TO CART
                  </button>
                  <button
                    className="flex-1   text-indigo-800 shadow-lg py-3 rounded-md ring-2 ring-indigo-500 ring-inset hover:bg-indigo-700 hover:text-indigo-100 hover:font-bold   hover:scale-105 hover:ring-blue-300"
                    onClick={() => setShowPopup(true)}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Product information */}
            <div className="md:w-3/5 px-6 mt-8 md:mt-0 max-h-screen overflow-y-scroll">
              <h1 className="text-3xl font-bold mb-3 text-gray-900">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {product.shortDescription}
              </p>
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-indigo-800">
                  ₹{product.price}
                </span>
                <span className="ml-3 text-lg text-green-500">
                  Extra ₹4000 off
                </span>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h2 className="font-semibold mb-3 text-gray-800">Size</h2>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      className="px-4 py-2 border rounded-md hover:border-indigo-500 transition duration-300"
                    >
                      <span className="text-lg font-semibold text-indigo-800">
                        {size.size}
                      </span>
                      <span className="ml-2 text-gray-600">Rs.</span>
                      <span className="text-lg text-indigo-700 font-bold">
                        {size.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h2 className="font-semibold mb-3 text-gray-800">Color</h2>
                <div className="flex space-x-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded-full border-2 hover:border-indigo-500 transition duration-300"
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="font-semibold mb-3 text-gray-800">Features</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Additional Information */}
              <div className="bg-white shadow-md rounded-lg p-8 mt-10">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  Additional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Shipping Details */}
                  <div className="flex items-start">
                    <FaShippingFast className="text-2xl text-indigo-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">
                        Shipping
                      </h3>
                      <p className="text-gray-700">{product.shippingDetails}</p>
                    </div>
                  </div>

                  {/* Return Policy */}
                  <div className="flex items-start">
                    <FaExchangeAlt className="text-2xl text-indigo-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">
                        Returns
                      </h3>
                      <p className="text-gray-700">{product.returnDetails}</p>
                    </div>
                  </div>

                  {/* Made In */}
                  <div className="flex items-start">
                    <FaGlobeAsia className="text-2xl text-indigo-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">
                        Origin
                      </h3>
                      <p className="text-gray-700">Made in {product.madeIn}</p>
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="flex items-start">
                    <FaBoxOpen className="text-2xl text-indigo-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">
                        Availability
                      </h3>
                      <p className="text-gray-700">{product.stock} in stock</p>
                    </div>
                  </div>
                </div>

                {/* Care Instructions */}
                <div className="mt-10">
                  <div className="flex items-center mb-4">
                    <MdLocalLaundryService className="text-2xl text-indigo-600 mr-4" />
                    <h3 className="font-semibold text-lg text-gray-800">
                      Care Instructions
                    </h3>
                  </div>
                  <p className="text-gray-700">{product.careInstructions}</p>
                </div>

                {/* Long Description */}
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Description
                  </h3>
                  <p className="text-lg text-gray-600">
                    {product.longDescription}
                  </p>
                </div>

                {/* Reviews */}
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Reviews for{" "}
                    <span className="text-indigo-700">{product.name}</span>
                  </h3>
                  <ReviewComponent pid={product._id} />
                </div>
              </div>

              <div className="pb-32"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductOverview;
