import React, { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { MdColorLens } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GiClothes, GiRuleBook } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";

const CreateProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    shortDescription: "",
    longDescription: "",
    sizes: [],
    material: "",
    images: [],
    coverImage: null,
    features: ["", "", "", "", ""],
    colors: ["#000000", "#000000", "#000000", "#000000", "#000000"],
    shippingDetails: "",
    returnDetails: "",
    category: "",
    colorCategory: "",
    careInstructions: "",
    madeIn: "",
  });

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  const categoryOptions = ["Sport", "Casual", "Formal", "Outdoor", "Sleepwear"];
  const colorCategoryOptions = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Purple",
    "Orange",
    "Brown",
    "Gray",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSizeChange = (size) => {
    const newSizes = product.sizes.includes(size)
      ? product.sizes.filter((s) => s !== size)
      : [...product.sizes, size];
    setProduct({ ...product, sizes: newSizes });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    setProduct({ ...product, features: newFeatures });
  };

  const handleColorChange = (index, color) => {
    const newColors = [...product.colors];
    newColors[index] = color;
    setProduct({ ...product, colors: newColors });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: [...product.images, ...files] });
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, coverImage: file });
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({ ...product, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product data:", product);
    // Handle form submission here
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-6 px-8">
          <h1 className="text-3xl font-bold text-white">Create New Product</h1>
        </div>
        <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Short Description
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={product.shortDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="longDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Long Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              rows="4"
              value={product.longDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sizes
            </label>
            <div className="mt-2 space-y-2">
              {sizeOptions.map((size) => (
                <label key={size} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={product.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2 text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              Material
            </label>
            <input
              type="text"
              id="material"
              name="material"
              value={product.material}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="images"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload images</span>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="coverImage"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload cover image</span>
                    <input
                      id="coverImage"
                      name="coverImage"
                      type="file"
                      className="sr-only"
                      onChange={handleCoverImageUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {product.coverImage && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(product.coverImage)}
                  alt="Cover"
                  className="h-40 w-full object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            {product.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Colors
            </label>
            <div className="mt-2 grid grid-cols-5 gap-4">
              {product.colors.map((color, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="h-8 w-8 rounded-full overflow-hidden"
                  />
                  <MdColorLens className="ml-2 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="shippingDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Shipping Details
              </label>
              <textarea
                id="shippingDetails"
                name="shippingDetails"
                rows="3"
                value={product.shippingDetails}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="returnDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Return Details
              </label>
              <textarea
                id="returnDetails"
                name="returnDetails"
                rows="3"
                value={product.returnDetails}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="colorCategory"
                className="block text-sm font-medium text-gray-700"
              >
                Color Category
              </label>
              <select
                id="colorCategory"
                name="colorCategory"
                value={product.colorCategory}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a color category</option>
                {colorCategoryOptions.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="careInstructions"
              className="block text-sm font-medium text-gray-700"
            >
              Care Instructions
            </label>
            <textarea
              id="careInstructions"
              name="careInstructions"
              rows="3"
              value={product.careInstructions}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="madeIn"
              className="block text-sm font-medium text-gray-700"
            >
              Made In
            </label>
            <input
              type="text"
              id="madeIn"
              name="madeIn"
              value={product.madeIn}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
