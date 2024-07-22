import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import url from "../../public/url";
import { useNavigate } from "react-router-dom";
import { error, info, warning } from "../redux/slices/errorSlice";
import TypeWriter from "./Utils/TypeWriter";

const ProductListing = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const nevigate = useNavigate();

  async function getAllProductDetails() {
    try {
      const res = await axios.get("/api/v1/product/getAllMiniCardProduct");

      console.log(res);
      if (res?.data?.product?.length > 0) {
        setProduct([...res?.data?.product]);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "something went wrong" }));
    }
  }

  async function addToCart(id) {
    try {
      console.log("CALLED");
      const res = await axios.get(`/api/v1/product/addToCart/${id}`);

      if (res.data?.status == "success") {
        dispatch(info({ message: "product added to cart" }));
      }
    } catch (e) {
      dispatch(
        warning({
          message:
            e?.response?.data?.msg ||
            "product not added to cart, please try again",
        })
      );
    }
  }
  async function addToHeart(id) {
    try {
      console.log("CALLED");
      const res = await axios.get(`/api/v1/product/addToHeart/${id}`);

      if (res.data?.status == "success") {
        dispatch(info({ message: "product added to favorates" }));
      }
    } catch (e) {
      dispatch(
        warning({
          message:
            e?.response?.data?.msg ||
            "product not added to favrotes, please try again",
        })
      );
    }
  }

  useEffect(() => {
    getAllProductDetails();
  }, []);

  return (
    <div className="bg-gray-100 py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <TypeWriter
              content={[
                "Sports Collection : ",
                1000,
                "What You need it's hear 😊   ,",
                1500,
                `   ,`,
              ]}
            />
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Elevate your performance with our premium sports gear
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {product.length > 0 &&
            product.map((p) => (
              <div key={p._id} className="flex flex-col">
                <div
                  key={p._id}
                  className="group relative shadow-lg rounded-xl p-2 cursor-pointer"
                  onClick={() => nevigate(`/productDetails/${p._id}`)}
                >
                  <div className="w-full   bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-75 lg:aspect-none">
                    <img
                      src={`${url}img/${p.coverImage}`}
                      alt={p.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="mt-4 flex flex-col items-center space-y-2">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 font-bold text-lg"
                        />
                        {p.name}
                      </h3>
                    </div>
                    <p className="text-xl font-medium text-gray-900">
                      Rs. {p.price}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                    onClick={() => addToCart(p._id)}
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => addToHeart(p._id)}
                  >
                    <FiHeart className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
