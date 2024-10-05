import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import url from "../../assets/url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { error, success } from "../../redux/slices/errorSlice";
import { FiMinus, FiPlus } from "react-icons/fi";

const BuyNowPopup = ({ products, onClose, setOrderProcessing }) => {
  const [productData, setProductData] = useState(
    products?.map((el) => {
      let obj = {
        _id: el._id,
        quantity: 1,
        name: el.name,
        price: el.price,
        coverImage: el.coverImage,
        dimension: el.dimension,
        sizes: el.sizes,
        selectedSize: "",
        stockPlace: el.stockPlace,
        weight: el.weight,
      };

      return obj;
    })
  );

  useEffect(() => {}, [productData]);
  function handleSizeClick(id, size) {
    const newData = productData.map((el) => {
      if (el._id == id) {
        el.selectedSize = size;
      }
      return el;
    });
    setProductData([...newData]);
  }

  function updateProductCartData(id, to) {
    const newData = productData.map((el) => {
      if (el._id == id) {
        if (to == "ADD") {
          el.quantity = el.quantity + 1;
        } else {
          el.quantity = el.quantity - 1;
        }
      }
      return el;
    });
    setProductData([...newData]);
  }
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleStatus = async (data) => {
    try {
      const res = await axios.post("/api/v1/payment/verifyPayment", {
        ...data,
        productData: productData,
      });

      if (res.data?.status == "success") {
        setOrderProcessing((state) => !state);
        dispatch(success({ message: res.data?.msg }));
        onClose();

        const respoship = await axios.post("/api/v1/ship/shipProduct", {
          orderId: res.data.orderId,
        });

        if (respoship.data.status == "success") {
          dispatch(
            success({ message: "Product Payment and shipping is done" })
          );
          setOrderProcessing(false);
        }
      }
    } catch (e) {
      setOrderProcessing(false);
      dispatch(
        error({
          message:
            e?.response?.msg || e.response?.message || "something went wrong",
        })
      );
    }
  };

  const handlePayment = async (amount) => {
    try {
      // Step 1: Create an order on your server

      const orderResponse = await axios.post("/api/v1/payment/createOrder", {
        amount: 1, // Razorpay expects amount in paise
        name: products?.map((el) => el.name).join(" "),
      });

      const options = {
        key: orderResponse.data.key_id, // Replace with your Razorpay Key ID
        amount: 1,
        currency: "INR",
        name: "WILDSQUAT",
        description: `Payment for ${products?.map((el) => el.name).join(" ")}`,
        order_id: orderResponse.data.order_id,
        handler: function (response) {
          // Handle successful payment

          handleStatus(response);
          // You should verify the payment signature on your server here
        },
        prefill: {
          name: auth?.data?.name || "name",
          email: auth?.data?.email || "email",
          contact: auth?.data?.mobile || "9234567890",
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
      console.log(e);

      dispatch(
        error({
          message:
            e?.response?.msg || e.response?.message || "Please try again ",
        })
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 ">
      <div className="bg-gray-100 rounded-lg p-6 w-full  max-w-4xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Confirm Purchase</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300"
          >
            <IoMdClose className="h-8 w-8" />
          </button>
        </div>

        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {productData.map((product, index) => (
            <div
              key={product._id}
              className="flex items-center bg-white p-4 rounded-lg shadow"
            >
              <img
                src={`${url}img/${product.coverImage}`}
                alt={product.name}
                className="h-24 w-24 object-contain rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-2">Rs. {product.price}</p>
                <div className="flex items-center">
                  <button
                    // onClick={() => updateQuantity(index, -1)}
                    onClick={() => updateProductCartData(product._id, "SUB")}
                    className="bg-gray-200 text-gray-800 p-2 rounded-l hover:bg-gray-300 transition duration-300"
                  >
                    <FiMinus />
                  </button>
                  <span className="bg-gray-100 px-4 py-2 font-semibold">
                    {product.quantity}
                  </span>
                  <button
                    // onClick={() => updateQuantity(index, 1)}
                    onClick={() => updateProductCartData(product._id, "ADD")}
                    className="bg-gray-200 text-gray-800 p-2 rounded-r hover:bg-gray-300 transition duration-300"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="flex space-x-2">
                  {product?.sizes?.map((size) => (
                    <button
                      key={size.size}
                      className={`px-4 py-2 border border-gray-200 rounded-md hover:border-gray-800 transition duration-300 ${
                        product.selectedSize == size.size &&
                        "border-gray-500 bg-white border-2 scale-110"
                      } `}
                      disabled={size.price * 1 == 0}
                      onClick={() => handleSizeClick(product._id, size.size)}
                    >
                      <span className="text-lg font-semibold text-indigo-800">
                        {size.price * 1 != 0 && size.size}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xl font-bold text-gray-800 ml-4">
                Rs. {product.price * product.quantity}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-2xl font-bold text-gray-800">
            Total: {products?.length} Items
          </p>
          <p className="text-2xl font-bold text-gray-800">
            Rs.
            {productData.reduce(
              (sum, product) => sum + product.price * product.quantity,
              0
            )}
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() =>
              handlePayment(
                productData.reduce(
                  (sum, product) => sum + product.price * product.quantity,
                  0
                )
              )
            }
            className="flex-1 bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Pay Now
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPopup;
