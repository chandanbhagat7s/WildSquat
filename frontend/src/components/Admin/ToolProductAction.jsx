import axios from "axios";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import url from "../../../public/url";

const ToolProductAction = ({ docid }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);

  async function getDataOfTool() {
    try {
      const res = await axios.get(`/api/v1/admin/getToolById/${docid}`);
      console.log(res.data.tooldata);
      setSelectedItem({ ...res.data.tooldata });
    } catch (e) {}
  }
  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const selectAllProducts = () => {
    setSelectedProducts(selectedItem.products.map((product) => product._id));
  };

  const deselectAllProducts = () => {
    setSelectedProducts([]);
  };

  const removeSelectedProducts = () => {
    // Implement the logic to remove selected products
    console.log("Removing products:", selectedProducts);
    // After removing, you might want to update the selectedItem state in the parent component
    // and clear the selections
    setSelectedProducts([]);
  };

  useEffect(() => {
    getDataOfTool();
  }, []);

  return (
    <>
      {selectedItem?.name && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
          <p className="text-gray-600 mb-6">{selectedItem.shortDescription}</p>

          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Products</h3>
            <div>
              <button
                onClick={selectAllProducts}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={deselectAllProducts}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition-colors"
              >
                Deselect All
              </button>
              <button
                onClick={removeSelectedProducts}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                disabled={selectedProducts.length === 0}
              >
                Remove Selected
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Select</th>
                  <th className="py-2 px-4 border-b text-left">Sr. No.</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Image</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedItem.products.map((product, index) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => toggleProductSelection(product._id)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={`${url}/img/${product.coverImage}`}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedProducts.length > 0 && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={removeSelectedProducts}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 transition-colors"
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
