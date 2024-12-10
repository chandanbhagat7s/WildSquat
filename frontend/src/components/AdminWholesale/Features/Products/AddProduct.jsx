import { useEffect, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { error, success } from "../../../../redux/slices/errorSlice";
import DataTable from "./DataTable";
import ProductSearch from "../Common/SearchProduct";

const CreateProductForm = () => {
  const dispatch = useDispatch();

  let [category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    shortDescription: "",
    longDescription: "",
    sizes: [],
    material: "",
    images: [],
    features: ["", "", "", "", ""],

    category: [],
    colors: 0,
    careInstructions: "",
    moq: 0,
  });

  const sizeOptions = [
    { size: "XS", price: 0 },
    { size: "S", price: 0 },
    { size: "M", price: 0 },
    { size: "L", price: 0 },
    { size: "XL", price: 0 },
    { size: "XXL", price: 0 },
    { size: "3XL", price: 0 },
    { size: "4XL", price: 0 },
    { size: "5XL", price: 0 },
  ];

  function handleClickSelectedProduct(id) {
    bringProductInfo(id);
  }

  async function bringProductInfo(id) {
    try {
      if (id) {
        const res = await axios.get(`/api/v1/wholesale/product/${id}`);

        const p = res?.data?.data;
        setProduct({
          name: p.name,
          price: 0,
          shortDescription: p.shortDescription,
          longDescription: p.longDescription,
          sizes: [],
          material: p.material,
          images: [],
          coverImage: null,
          features: p.features,
          category: [],
          colors: 0,
          careInstructions: p.careInstructions,
          moq: 0,
        });
      }
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChanges = (item) => {
    let category = product.category.includes(item)
      ? product.category.filter((el) => el != item)
      : [...product.category, item];
    setProduct({ ...product, category: category });
  };
  const handleSizeChange = (size, price = 0) => {
    if (!price) {
      const newSizes = product.sizes.find((item) => item.size === size.size)
        ? product.sizes.filter((item) => item.size !== size.size)
        : [...product.sizes, size];
      setProduct({ ...product, sizes: newSizes });
    } else {
      const newproduct = product.sizes.map((el) => {
        if (el.size == size.size) {
          el.price = price;
        }
        return el;
      });

      setProduct({ ...product, sizes: newproduct });
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    setProduct({ ...product, features: newFeatures });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: [...product.images, ...files] });
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({ ...product, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      if (product?.name?.length < 5) {
        dispatch(
          error({ message: "Product name must be at least of 5 character" })
        );
        return;
      }

      for (const key in product) {
        if (key == "images") {
          product.images.map((el) => {
            fd.append("images", el);
          });
        } else if (key == "features") {
          product.features.map((el) => {
            fd.append("features", el);
          });
        } else if (key == "sizes") {
          fd.append("sizes", JSON.stringify(product.sizes));
        } else if (key == "category") {
          fd.append("category", JSON.stringify(product.category));
        } else {
          fd.append(`${key}`, product[key]);
        }
      }

      const res = await axios.post("/api/v1/wholesale/product", fd);

      if (res.data.status == "success") {
        dispatch(success({ message: "product added successfully" }));
      } else {
        dispatch(error({ message: "something went wrong please try again" }));
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            e?.response?.data?.message ||
            "something went wrong please try again",
        })
      );
    }
  };

  async function getAllTools(params) {
    try {
      const res = await axios.get(
        "/api/v1/wholesale/tool?fields=_id,label,name"
      );

      setCategory([...res?.data.data]);
    } catch (e) {}
  }
  useEffect(() => {
    getAllTools();
  }, []);

  return (
    <>
      <div className=" min-h-screen py-12 px-1 sm:px-1 lg:px-2 ">
        {/* Product Search Section */}
        <div className="mb-2">
          <div className="mx-auto text-center mt-10 font-semibold text-xl">
            Search And Use Information
          </div>
          <ProductSearch setSelectedProduct={handleClickSelectedProduct} />
        </div>

        <form onSubmit={handleSubmit} className="py-8 p-1 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 gap-1 lg:gap-6 sm:grid-cols-2">
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Track pant"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder=" Comfortable, stylish, and perfect for any workout or casual day out."
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Elevate your athleisure wardrobe with our Classic Black Track Pants. Designed for both comfort and style, these pants are crafted from a soft, breathable fabric that moves with you. The elastic waistband ensures a secure fit,"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sizes and Ratio
            </label>
            <div className="mt-2 space-y-2 md:grid md:grid-cols-2">
              {sizeOptions.map((size) => (
                <div key={size.size} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={product?.sizes.find(
                      (item) => item.size === size.size
                    )}
                    onChange={() => handleSizeChange(size)}
                    className="form-checkbox h-5 w-5 text-gray-600"
                  />
                  <span className="text-gray-700">{size.size}</span>

                  {product.sizes.find((item) => item.size == size.size) && (
                    <input
                      type="number"
                      placeholder={`Ratio of :  ${size.size}`}
                      className="mt-1 block w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                      onChange={(e) => handleSizeChange(size, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              MOQ
            </label>
            <input
              type="text"
              id="material"
              name="moq"
              value={product.moq}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Polyester,Nylon,Fleece etc"
            />
          </div>
          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <input
              type="text"
              id="material"
              name="colors"
              value={product.colors}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Polyester,Nylon,Fleece etc"
            />
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Polyester,Nylon,Fleece etc"
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
                    className="relative cursor-pointer bg-white rounded-md font-medium text-gray-600 hover:text-gray-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500"
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
              Features
            </label>
            {product.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            ))}
          </div>

          <div className="my-5">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
              placeholder="Pant , Track pant , jeans .. etc"
            >
              Add Into Category
            </label>
            <DataTable data={category} additon={handleCategoryChanges} />
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Create Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProductForm;
