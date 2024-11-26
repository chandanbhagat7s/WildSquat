import axios from "axios";
import { useState } from "react";
import { FiUpload, FiType, FiAlignLeft, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { error, success } from "../../../../redux/slices/errorSlice";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [images, setImages] = useState([]);

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages([...newImages]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();

      fd.append("name", selectedValue);
      fd.append("label", label);
      fd.append("shortDescription", shortDescription);

      images.map((el) => {
        fd.append("images", el);
      });
      await axios.post("/api/v1/wholesale/tool/", fd);

      dispatch(success({ message: "Category created " }));
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
    <div className="max-w-2xl mx-auto mt-10 p-10 bg-white rounded-2xl shadow-2xl">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-900">Create Tools </h2>
        <p className="text-sm text-gray-500">Create category, add slider</p>
      </div>

      <div className="space-y-8">
        {/* Choose a category */}
        <div>
          <label
            htmlFor="categories"
            className="block text-lg font-medium text-gray-800"
          >
            Choose Tool
          </label>
          <select
            id="categories"
            value={selectedValue}
            onChange={handleChange}
            className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 rounded-lg"
          >
            <option value="">Select an option</option>
            <option value="SLIDER">SLIDER</option>
            <option value="CATEGORY">CATEGORY</option>
            <option value="Trending">Trending</option>
          </select>
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
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.map((image, index) => (
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

        {/* Label */}
        <div>
          <label
            htmlFor="label"
            className="block text-lg font-medium text-gray-800 mb-2"
          >
            Label / Title
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiType className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="label"
              className="focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-10 py-2 sm:text-base border-gray-300 rounded-lg"
              placeholder="Enter label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="short-description"
            className="block text-lg font-medium text-gray-800 mb-2"
          >
            Short Description
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiAlignLeft className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="short-description"
              rows="4"
              className="focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-10 py-2 sm:text-base border-gray-300 rounded-lg"
              placeholder="Enter short description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-5">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
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
