import React, { useEffect, useState } from "react";
import ProductSearch from "./SearchProduct";
import axios from "axios";
import { FaMinus, FaPlus } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { error, success } from "../../redux/slices/errorSlice";
const EditProductForm = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState("");

  const [editedProduct, setEditedProduct] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...editedProduct[field]];
    newArray[index] = e.target.value;
    setEditedProduct((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `/api/v1/admin/edit/${editedProduct._id}`,
        editedProduct
      );

      if (res.data?.status == "success") {
        dispatch(success({ message: "product updated successfully" }));
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg || "something went wrong please try again ",
        })
      );
    }
  };

  async function bringProductInfo() {
    try {
      if (selectedProduct) {
        console.log(selectedProduct);
        const res = await axios.get(
          `/api/v1/product/getProduct/${selectedProduct}`
        );
        console.log("res is", res);
        setEditedProduct({
          ...res?.data?.product,
        });
        console.log("product", res?.data?.product);
      }
    } catch (error) {}
  }

  const addArrayItem = (field) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    bringProductInfo();
  }, [selectedProduct]);

  return (
    <>
      <div className="mb-10">
        <ProductSearch setSelectedProduct={setSelectedProduct} />
      </div>
      {editedProduct?.name && (
        <>
          {console.log("product is", editedProduct)}
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto space-y-8   p-8 rounded-2xl shadow-2xl bg-gray-100"
          >
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Edit Product
              </h2>
              <p className="text-xl text-indigo-600 font-semibold">
                {editedProduct.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Name */}
              <div className="col-span-1 md:col-span-2">
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Short Description */}
              <div className="col-span-1 md:col-span-2">
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  value={editedProduct.shortDescription}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>

              {/* Long Description */}
              <div className="col-span-1 md:col-span-2">
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Long Description
                </label>
                <textarea
                  name="longDescription"
                  value={editedProduct.longDescription}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>

              {/* Price */}
              <div>
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleChange}
                    className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={editedProduct.category.join(", ")}
                  onChange={(e) =>
                    setEditedProduct((prev) => ({
                      ...prev,
                      category: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Color Category */}
              <div>
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Color Category
                </label>
                <input
                  type="text"
                  name="colorCategory"
                  value={editedProduct.colorCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Colors */}
              <div className="col-span-1 md:col-span-2">
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Colors
                </label>
                {editedProduct.colors.map((color, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleArrayChange(e, index, "colors")}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("colors", index)}
                      className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("colors")}
                  className="mt-2 flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" /> Add Color
                </button>
              </div>

              {/* Features */}
              <div className="col-span-1 md:col-span-2">
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Features
                </label>
                {editedProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayChange(e, index, "features")}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("features", index)}
                      className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("features")}
                  className="mt-2 flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" /> Add Feature
                </button>
              </div>

              {/* Made In */}
              <div>
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Made In
                </label>
                <input
                  type="text"
                  name="madeIn"
                  value={editedProduct.madeIn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Material */}
              <div>
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={editedProduct.material.join(", ")}
                  onChange={(e) =>
                    setEditedProduct((prev) => ({
                      ...prev,
                      material: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Sizes */}
              <div>
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Sizes
                </label>
                <input
                  type="text"
                  name="sizes"
                  value={editedProduct.sizes.join(", ")}
                  onChange={(e) =>
                    setEditedProduct((prev) => ({
                      ...prev,
                      sizes: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Stock */}
              <div>
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={editedProduct.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Status */}
              <div>
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={editedProduct.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                >
                  <option value="in stock">In Stock</option>
                  <option value="out of stock">Out of Stock</option>
                </select>
              </div>

              {/* Care Instructions */}
              <div className="col-span-1 md:col-span-2">
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Care Instructions
                </label>
                <textarea
                  name="careInstructions"
                  value={editedProduct.careInstructions}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>

              {/* Return Details */}
              <div className="col-span-1 md:col-span-2">
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Return Details
                </label>
                <textarea
                  name="returnDetails"
                  value={editedProduct.returnDetails}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>

              {/* Shipping Details */}
              <div className="col-span-1 md:col-span-2">
                <label className=" block text-xl font-medium text-gray-900 mb-1">
                  Shipping Details
                </label>
                <textarea
                  name="shippingDetails"
                  value={editedProduct.shippingDetails}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditProductForm;
