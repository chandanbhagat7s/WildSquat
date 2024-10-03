import axios from "axios";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import url from "../../assets/url";
import { useDispatch } from "react-redux";
import { error, success } from "../../redux/slices/errorSlice";
import ProductSearch from "./SearchProduct";

const ToolProductAction = ({ docid }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispatch = useDispatch();
  const [searchedProduct, setsearchedProduct] = useState([]);

  function setsearchedProductOnClick(id, el) {
    if (![...searchedProduct].includes(id)) {
      setsearchedProduct([...searchedProduct, id]);
      setData([...data, el]);
    }
  }

  async function getDataOfTool() {
    try {
      const res = await axios.get(
        `/api/v1/admin/getToolByIdManage/${docid}?fields=name,_id,products,shortDescription&populate=products&populateField=name,price,_id,coverImage`
      );
      setSelectedItem({ ...res.data.products });
    } catch (e) {}
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
      const res = await axios.patch("/api/v1/admin/actionOnTool", {
        action: "ADD",
        toolId: selectedItem._id,
        ids: searchedProduct,
      });

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
