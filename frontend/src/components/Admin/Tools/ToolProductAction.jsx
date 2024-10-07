import axios from "axios";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import ProductSearch from "./../Common/SearchProduct";
import url from "../../../assets/url";
import { error, success } from "../../../redux/slices/errorSlice";

const ToolProductAction = ({ docid }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispatch = useDispatch();
  const [searchedProduct, setsearchedProduct] = useState([]);
  const [discountProduct, setDiscountProduct] = useState({});

  function setsearchedProductOnClick(id, el) {
    if (![...searchedProduct].includes(id)) {
      setsearchedProduct([...searchedProduct, id]);
      setDiscountProduct({
        ...discountProduct,
        [id]: {
          discount: 0,
          newPrice: 0,
        },
      });
      setData([...data, el]);
    }
  }

  async function getDataOfTool() {
    try {
      const res = await axios.get(
        `/api/v1/admin/getToolByIdManage/${docid}?fields=name,_id,products,shortDescription&populate=products&populateField=name,price,_id,coverImage&populateLimit=20&page=1`
      );
      setSelectedItem({ ...res.data.products });
    } catch (e) {
      dispatch(error({ message: "something Went wrong" }));
    }
  }

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  async function addProductsToTool() {
    try {
      let res;
      if (selectedItem.name == "SERIES") {
        res = await axios.patch("/api/v1/admin/actionOnTool", {
          action: "ADDANDUPDATE",
          toolId: selectedItem._id,
          ids: searchedProduct,
          discountProduct,
        });
      } else {
        res = await axios.patch("/api/v1/admin/actionOnTool", {
          action: "ADD",
          toolId: selectedItem._id,
          ids: searchedProduct,
        });
      }

      if (res?.data?.status === "success") {
        dispatch(success({ message: res?.data?.msg || "Products added!" }));
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.msg || "Something went wrong. Please try again.",
        })
      );
    }
  }

  const selectAllProducts = () => {
    setSelectedProducts(selectedItem.products.map((product) => product._id));
  };

  const deselectAllProducts = () => {
    setSelectedProducts([]);
  };

  const removeSelectedProducts = async () => {
    try {
      const res = await axios.patch("/api/v1/admin/actionOnTool", {
        toolId: selectedItem._id,
        ids: selectedProducts,
        action: "REMOVE",
      });
      if (res?.data?.status === "success") {
        dispatch(success({ message: res?.data?.msg }));
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "Something went wrong." }));
    }
    setSelectedProducts([]);
  };

  function handleChangeDiscount(e, id) {
    const { name, value } = e.target;
    console.log("ID is ", id);

    setDiscountProduct({
      ...discountProduct,
      [id]: {
        ...discountProduct[id],
        [name]: value,
      },
    });
  }

  useEffect(() => {
    getDataOfTool();
  }, []);

  return (
    <>
      {selectedItem?.name && (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto my-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {selectedItem.name}
          </h2>
          <p className="text-gray-700 mb-8 text-center">
            {selectedItem.shortDescription}
          </p>

          <div className="mb-10">
            <ProductSearch setSelectedProduct={setsearchedProductOnClick} />
          </div>

          {searchedProduct.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Selected Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((el, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-lg shadow-md text-center"
                  >
                    <img
                      src={`${url}img/${el.coverImage}`}
                      alt={el.name}
                      className="h-28 w-full object-contain mb-2 rounded-lg"
                    />
                    <p className="text-gray-700 font-semibold">{el.name}</p>
                    <p className="text-gray-700 font-semibold">{el.price}</p>
                    {selectedItem?.name == "SERIES" && (
                      <div className="flex flex-col space-y-4">
                        {/* New Price Input */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="newPrice"
                            className="text-sm font-medium text-gray-700 mb-1"
                          >
                            New Price
                          </label>
                          <input
                            type="number"
                            id="newPrice"
                            placeholder="Enter new price"
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            name="newPrice"
                            value={discountProduct[el.id]?.newPrice || 0}
                            onChange={(e) => handleChangeDiscount(e, el.id)}
                          />
                        </div>

                        {/* Discount Input */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="discount"
                            className="text-sm font-medium text-gray-700 mb-1"
                          >
                            Discount (%)
                          </label>
                          <input
                            type="number"
                            id="discount"
                            placeholder="Enter discount percentage"
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            name="discount"
                            value={discountProduct[el.id]?.discount || 0}
                            onChange={(e) => handleChangeDiscount(e, el.id)}
                          />
                        </div>

                        {/* Calculated Price */}
                        <p className="p-3 text-lg font-semibold text-gray-900">
                          Rs.{" "}
                          {discountProduct[el.id]?.newPrice -
                            (discountProduct[el.id]?.newPrice / 100) *
                              discountProduct[el.id]?.discount}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
                  onClick={addProductsToTool}
                >
                  Add Product
                </button>
              </div>
            </div>
          )}

          <div className="mb-6 mt-10 flex justify-between items-center">
            <h3 className="text-xl font-bold">Products in Tool</h3>
            <div className="flex space-x-4">
              <button
                onClick={selectAllProducts}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Select All
              </button>
              <button
                onClick={deselectAllProducts}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-6 text-left">Select</th>
                  <th className="py-3 px-6 text-left">Sr. No.</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Image</th>
                  <th className="py-3 px-6 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedItem.products.map((product, index) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-3 px-6 border-t">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => toggleProductSelection(product._id)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </td>
                    <td className="py-3 px-6 border-t">{index + 1}</td>
                    <td className="py-3 px-6 border-t">{product.name}</td>
                    <td className="py-3 px-6 border-t">
                      <img
                        src={`${url}/img/${product.coverImage}`}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-3 px-6 border-t">${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedProducts.length > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={removeSelectedProducts}
                className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md flex items-center hover:bg-red-600 transition-all"
              >
                <FiTrash2 className="mr-2" />
                Remove Selected ({selectedProducts.length})
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ToolProductAction;
