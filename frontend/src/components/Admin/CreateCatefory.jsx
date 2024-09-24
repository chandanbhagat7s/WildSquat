import axios from "axios";
import React, { useState } from "react";
import { FiUpload, FiType, FiAlignLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { error, success } from "../../redux/slices/errorSlice";

const CreateCategory = () => {
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const [label, setLabel] = useState("");
  const [custom, setCustom] = useState("");
  const [image, setImage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [gender, setGender] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("coverImage", image);
      fd.append("name", custom ? custom : selectedValue);
      fd.append("label", label);
      fd.append("shortDescription", shortDescription);
      fd.append("gender", gender);
      const data = await axios.post("/api/v1/admin/createCategory", fd);

      dispatch(success({ message: data.data.msg || "something went wrong" }));
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            e?.response?.data?.message ||
            "something went wrong",
        })
      );
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Category Form </h2>
        <span className="text-sm text-gray-400">
          Create category , add slider , cards , posters
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-700"
          >
            Choose a category
          </label>
          <select
            id="categories"
            value={selectedValue}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select an option</option>
            <option value="SLIDER">SLIDER</option>
            <option value="CATEGORY">CATEGORY</option>
            <option value="CARDS">CARDS</option>
            <option value="POSTER">POSTER</option>
            <option value="X-MULTIPLE">X-MULTIPLE</option>
            <option value="custom">Custom </option>
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Selected: {selectedValue}
          </p>
        </div>

        {selectedValue == "custom" && (
          <div>
            <label
              htmlFor="custom"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Custom Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiType className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="custom"
                id="custom"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Some name"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image (1N)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition duration-150">
            <div className="space-y-1 text-center my-4">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="Cover"
                  className="mx-auto h-32 w-32 object-cover rounded-md"
                />
              ) : (
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="flex text-sm text-gray-600 mt-2">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="label"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Label
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiType className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="label"
              id="label"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter label (by what name you want to identify it)"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Gender
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiType className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="gender"
              id="gender"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="male or female"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="short-description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Short Description
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiAlignLeft className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="short-description"
              name="short-description"
              rows="3"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter short description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="pt-5">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
