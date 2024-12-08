import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { FaBoxOpen, FaChevronDown } from "react-icons/fa";

import { MdLocalLaundryService } from "react-icons/md";
import url from "../../../../assets/url";
export default function RightSide({ product }) {
  const [openSection, setOpenSection] = useState("features");
  const [showPopup, setShowPopup] = useState(false);
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const handleOrderClick = () => {
    // Construct the WhatsApp message
    // const message = `Hello, I want to purchase:\n\n*${product.name}*\n*Price:* ${product.price}\n*URL:* ${url}wholesale/productDetails/${product._id}\n\nThank you!`;
    const message = `Hello, I want to purchase:\n\n*${product.name}*\n*Price:* ${product.price}\n*URL:* http://localhost:5173/wholesale/productDetails/${product._id}\n\nThank you!`;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
      navigator.userAgent
    );

    console.log("ist it mobile", isMobile, navigator.userAgent);

    // Encode the message and construct the WhatsApp URL
    if (isMobile) {
      const encodedMessage = encodeURIComponent(message);

      const whatsappLink = `https://wa.me/${8686416102}?text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");
    } else {
      const whatsappUrl = `https://web.whatsapp.com/send?phone=${encodeURIComponent(
        8686416102
      )}&text=${encodeURIComponent(message)}&app_absent=0`;

      // Open the URL in a new tab
      window.open(whatsappUrl, "_blank");
    }
  };

  const AccordionItem = ({ title, icon, children, isOpen, toggle }) => (
    <div className="mb-4 rounded-lg   overflow-hidden transition-all duration-300 ease-in-out ">
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
      {/* {orderProcessing && <OrderProcessingPage />} */}
      {/* {showPopup && (
        // <BuyNowPopup
        //   products={[product]}
        //   onClose={() => setShowPopup(false)}
        //   setOrderProcessing={setOrderProcessing}
        // />
      )} */}

      <div className="lg:w-1/3 px-2 lg:pl-8 bg-gray-50 pt-10 ">
        <h1 className="text-3xl font-bold mb-4 text-gray-600 capitalize text-center">
          {product.name}
        </h1>
        <p className="text-xl font-semibold mb-4 text-gray-500 text-center">
          Rs <span className="text-2xl font-bold"> {product.price}</span>
        </p>
        <p className="mb-4 text-gray-500">
          {product.shortDescription.split("$").map((el) => {
            return <li>{el}</li>;
          })}
        </p>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Size and Ratio </h2>
          <div className="flex space-x-2">
            {product.sizes.map((size) => (
              <button
                key={size.size}
                className="px-4 py-2 border border-black rounded-md hover:border-indigo-800 transition duration-300"
              >
                <span className="text-md font-semibold text-indigo-800">
                  <span className="text-lg mr-1">{size.size}:</span>
                  <span className="text-black font-bold"> {size.price}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2 mb-4">
          <button
            className="flex-1 bg-green-600  py-3 px-4 rounded-lg text-white hover:bg-green-700 animate-bounce"
            onClick={handleOrderClick}
          >
            <FaWhatsapp className="inline-block mr-2" />
            Order on Whatsapp
          </button>
        </div>
        <div>
          <p>MOQ (Minimmum Order Quantity)</p>
          <p className="mb-4 text-gray-500">{product?.moq}</p>
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
              title="Care Instructions"
              icon={<MdLocalLaundryService className="text-2xl" />}
              isOpen={openSection === "care"}
              toggle={() => toggleSection("care")}
            >
              <p className="text-gray-700">
                {product.careInstructions.split("$").map((el) => {
                  return <li>{el}</li>;
                })}
              </p>
            </AccordionItem>

            <AccordionItem
              title="Description"
              icon={<FaBoxOpen className="text-2xl" />}
              isOpen={openSection === "description"}
              toggle={() => toggleSection("description")}
            >
              <p className="text-gray-700">
                {product.longDescription.split("$").map((el) => {
                  return <li>{el}</li>;
                })}
              </p>
            </AccordionItem>
          </div>
        </div>
      </div>
    </>
  );
}
