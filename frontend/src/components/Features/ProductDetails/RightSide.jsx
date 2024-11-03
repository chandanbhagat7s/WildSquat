import React, { useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import url from "../../../assets/url";
import { FaCreditCard } from "react-icons/fa";
import {
  FaBoxOpen,
  FaChevronDown,
  FaExchangeAlt,
  FaShippingFast,
} from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";
import BuyNowPopup from "../../Payments/paymentDialog";
import OrderProcessingPage from "../../Instruction/OrderProcessing";
import { useDispatch, useSelector } from "react-redux";
import { error, info, message } from "../../../redux/slices/errorSlice";
import { addToCart } from "../../../redux/slices/productSlice";
export default function RightSide({ product }) {
  const dispatch = useDispatch();
  const { msg } = useSelector((state) => state.product);
  const nevigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  let [orderProcessing, setOrderProcessing] = useState(false);
  const [openSection, setOpenSection] = useState("features");
  const [showPopup, setShowPopup] = useState(false);
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  async function ATC() {
    if (!isLoggedIn) {
      dispatch(info({ message: "Please Login first" }));
      nevigate("/login");
      return;
    }
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

  return (
    <>
      {orderProcessing && <OrderProcessingPage />}
      {showPopup && (
        <BuyNowPopup
          products={[product]}
          onClose={() => setShowPopup(false)}
          setOrderProcessing={setOrderProcessing}
        />
      )}

      <div className="lg:w-1/3 px-2 lg:pl-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-700 capitalize text-center">
          {product.name}
        </h1>
        <p className="text-xl font-semibold mb-4 text-gray-500 text-center">
          Rs <span className="text-2xl font-bold"> {product.price}</span>
        </p>
        <p className="mb-4 text-gray-400">
          {product.shortDescription.replaceAll("$", "\n")}
        </p>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Size</h2>
          <div className="flex space-x-2">
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

        <div className="flex flex-col space-y-2 mb-4">
          <button
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            onClick={ATC}
          >
            <FiShoppingCart className="inline-block mr-2" />
            Add to Cart
          </button>
          <button
            className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
            onClick={() => {
              if (!isLoggedIn) {
                dispatch(info({ message: "Please Login first" }));
                nevigate("/login");
                return;
              }
              setShowPopup(true);
            }}
          >
            <FaCreditCard className="inline-block mr-2" />
            Buy Now
          </button>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Color</h2>
          <div className="grid grid-cols-4 gap-1">
            {product?.colors?.simillarProducts?.length > 0 &&
              product?.colors?.simillarProducts.map((img, index) => (
                <img
                  key={index}
                  src={`${url}img/${img.coverImage}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                    product._id == img._id ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => {
                    nevigate(`/productDetails/${img._id}`);
                  }}
                />
              ))}
          </div>
        </div>
        <div className=" mt-4 space-y-2">
          <div className="flex flex-col  mt-10 px-1">
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
              <p className="text-gray-700">
                {product.shippingDetails.replaceAll("$", "\n")}
              </p>
            </AccordionItem>

            <AccordionItem
              title="Returns"
              icon={<FaExchangeAlt className="text-2xl" />}
              isOpen={openSection === "returns"}
              toggle={() => toggleSection("returns")}
            >
              <p className="text-gray-700">
                {product.returnDetails.replaceAll("$", "\n")}
              </p>
            </AccordionItem>

            <AccordionItem
              title="Care Instructions"
              icon={<MdLocalLaundryService className="text-2xl" />}
              isOpen={openSection === "care"}
              toggle={() => toggleSection("care")}
            >
              <p className="text-gray-700">
                {product.careInstructions.replaceAll("$", "\n")}
              </p>
            </AccordionItem>

            <AccordionItem
              title="Description"
              icon={<FaBoxOpen className="text-2xl" />}
              isOpen={openSection === "description"}
              toggle={() => toggleSection("description")}
            >
              <p className="text-gray-700">
                {product.longDescription.replaceAll("$", "\n")}
              </p>
            </AccordionItem>
          </div>
        </div>
      </div>
    </>
  );
}
