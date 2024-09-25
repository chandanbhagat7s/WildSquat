import axios from "axios";

import { motion } from "framer-motion";

import { FaShoppingCart, FaCreditCard, FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaExchangeAlt,
  FaGlobeAsia,
  FaShippingFast,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { error, info, success } from "../../redux/slices/errorSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdLocalLaundryService } from "react-icons/md";
import ReviewForm from "./CreateReview";
import ReviewComponent from "./ReviewComponent";
import BuyNowPopup from "../Payments/paymentDialog";
import EachReview from "./EachReview";
import url from "../../assets/url";
import LoadingSpinner from "./Spinner";
import { addToCart } from "../../redux/slices/productSlice";

const ProductOverview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [images, setImage] = useState([]);
  const { msg } = useSelector((state) => state.product);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupOrder, setShowPopupOrder] = useState(false);
  const auth = useSelector((state) => state.auth);
  const nevigate = useNavigate();

  const [openSection, setOpenSection] = useState("features");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // const [loading2, setLoading2] = useState(false);

  const AccordionItem = ({ title, icon, children, isOpen, toggle }) => (
    <div className="mb-4 bg-white rounded-lg   overflow-hidden transition-all duration-300 ease-in-out ">
      <button
        className="w-full flex items-center justify-between py-2 px-3 bg-gradient-to-r   text-black border-b-2 border-gray-300 border-1"
        onClick={toggle}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-3 font-semibold text-lg">{title}</span>
        </div>
        <FaChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-5 bg-white border-b-2 border-gray-700 border-1">
          {children}
        </div>
      )}
    </div>
  );

  const handleStatus = async (data) => {
    try {
      const res = await axios.post("/api/v1/payment/verifyPayment", {
        ...data,
        productids: [product._id],
        productName: product.name,
      });

      if (res.data?.status == "success") {
        dispatch(success({ message: res.data?.msg }));
        const respoship = await axios.post("/api/v1/ship/shipProduct", {
          orderId: res.data.orderId,
        });

        setShowPopup(false);
        // setShowPopupOrder(true);
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
        amount: 1, // Razorpay expects amount in paise
        name: product.name,
      });

      const options = {
        key: orderResponse.data.key_id, // Replace with your Razorpay Key ID
        amount: 1,
        currency: "INR",
        name: "WILDSQUAT",
        description: `Payment for ${product.name}`,
        order_id: orderResponse.data.order_id,
        handler: function (response) {
          // Handle successful payment

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

      if (res?.data?.status == "success") {
        // Assuming we have two placeholder images
        let i = res?.data?.product?.images.map((el) => `${url}img/${el}`);
        setImage([...i]);
        setProduct({ ...res?.data?.product });
        setCategory({ ...res?.data?.category });
        setLoading(false);
      }
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  };

  async function ATC() {
    try {
      const res = await dispatch(addToCart(product._id));

      if (addToCart.fulfilled.match(res)) {
        dispatch(info({ message: "product added to cart" }));
      } else {
        dispatch(error({ message: msg || "failed to add " }));
      }
    } catch (e) {
      dispatch(
        error({
          message: "product not added to cart, please try again",
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-2 mt-10 pb-8 ">
      {loading && <LoadingSpinner />}
      <div className="flex flex-col md:flex-row -mx-4">
        {loading ? (
          <>{/* <LoadingSpinner /> */}</>
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
            {showPopupOrder && <HandleOrderLoadingScreen />}
            {/* Left side - Image gallery */}
            <div className="md:w-2/5 px-4">
              <div className="sticky top-0 flex flex-col space-y-3">
                <div className="flex justify-between md:justify-around lg:justify-around">
                  <div className="flex flex-col space-y-10 h-96 overflow-y-auto">
                    {images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded-md cursor-pointer object-top ${
                          selectedImage === index
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
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
                </div>
                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                  <button
                    className="flex-1 bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-md 
                   border-2 border-indigo-600 transition duration-300 ease-in-out
                   hover:bg-indigo-600 hover:text-white hover:scale-105"
                    onClick={ATC}
                  >
                    <span className="flex items-center justify-center">
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </span>
                  </button>
                  <button
                    className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md 
                   transition duration-300 ease-in-out
                   hover:bg-indigo-700 hover:scale-105"
                    onClick={() => setShowPopup(true)}
                  >
                    <span className="flex items-center justify-center">
                      <FaCreditCard className="mr-2" />
                      Buy Now
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Product information */}
            <div className="md:w-3/5 px-6 mt-8 md:mt-0 max-h-screen overflow-y-scroll text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-black  ">
                {product.name}
              </h1>
              <p className=" text-gray-600 mb-4">{product.shortDescription}</p>
              <div className="flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-black">
                  ₹ {product.price}
                </span>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h2 className="font-bold mb-3 text-gray-800">
                  {" "}
                  Available Size's
                </h2>
                <div className="flex space-x-3 justify-center">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      className="px-4 py-2 border border-black rounded-md hover:border-indigo-800 transition duration-300"
                    >
                      <span className="text-lg font-semibold text-indigo-800">
                        {size.size}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h2 className="font-bold mb-3 text-gray-800">Color</h2>
                <div className="flex space-x-3 justify-center">
                  {/* {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded-full border-2 hover:border-indigo-500 transition duration-300"
                      style={{ backgroundColor: color }}
                    ></button>
                  ))} */}
                  <div className="flex space-x-2 overflow-x-auto">
                    {product?.colors?.simillarProducts?.length > 0 &&
                      product?.colors?.simillarProducts.map((img, index) => (
                        <img
                          key={index}
                          src={`${url}img/${img.coverImage}`}
                          alt={`Thumbnail ${index + 1}`}
                          className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                            product._id == img._id
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                          onClick={() => {
                            window.scrollTo(0, 0);
                            nevigate(`/productDetails/${img._id}`);
                          }}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto mt-10 px-4">
                <AccordionItem
                  title="Features"
                  icon={<FaBoxOpen className="text-2xl" />}
                  isOpen={openSection === "features"}
                  toggle={() => toggleSection("features")}
                >
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className=" ">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </AccordionItem>

                <AccordionItem
                  title="Shipping"
                  icon={<FaShippingFast className="text-2xl" />}
                  isOpen={openSection === "shipping"}
                  toggle={() => toggleSection("shipping")}
                >
                  <p className="text-gray-700">{product.shippingDetails}</p>
                </AccordionItem>

                <AccordionItem
                  title="Returns"
                  icon={<FaExchangeAlt className="text-2xl" />}
                  isOpen={openSection === "returns"}
                  toggle={() => toggleSection("returns")}
                >
                  <p className="text-gray-700">{product.returnDetails}</p>
                </AccordionItem>

                <AccordionItem
                  title="Care Instructions"
                  icon={<MdLocalLaundryService className="text-2xl" />}
                  isOpen={openSection === "care"}
                  toggle={() => toggleSection("care")}
                >
                  <p className="text-gray-700">{product.careInstructions}</p>
                </AccordionItem>

                <AccordionItem
                  title="Description"
                  icon={<FaBoxOpen className="text-2xl" />}
                  isOpen={openSection === "description"}
                  toggle={() => toggleSection("description")}
                >
                  <p className="text-gray-700">{product.longDescription}</p>
                </AccordionItem>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container px-1 my-8">
        {!loading && (
          <>
            <CategoryCard category={category} />
          </>
        )}
      </div>
    </div>
  );
};

const CategoryCard = ({ category }) => {
  const nevigate = useNavigate();
  return (
    <div className="   rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold  mb-4"> Simillar Products </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {category?.products?.map((product) => (
          <div
            key={product._id}
            className="flex-shrink-0  bg-white rounded-lg  overflow-hidden transition-transform duration-300 hover:scale-105 mx-2"
          >
            <div
              className="relative overflow-hidden cursor-pointer shadow-lg rounded-lg"
              onClick={() => {
                window.scrollTo(0, 0);
                nevigate(`/productDetails/${product._id}`);
              }}
            >
              <motion.div
                className="aspect-[3/4] overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={`${url}img/${product.coverImage}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            </div>
            <div className="mt-6 text-center">
              <h3 className=" text-gray-800 mb-2 font-bold">{product.name}</h3>
              <p className="text-gray-600 mb-4">Rs.{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HandleOrderLoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div>Please wait while we are placing order, it may take 30 sec..</div>
    </div>
  );
};

export default ProductOverview;
