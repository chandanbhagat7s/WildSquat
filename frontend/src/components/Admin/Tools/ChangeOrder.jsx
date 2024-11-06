import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import url from "../../../assets/url";
import { useDispatch } from "react-redux";
import { error, success } from "../../../redux/slices/errorSlice";

const ChangeOrder = ({ docid, onClose }) => {
  const [tool, setTool] = useState(null);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // Fetch tool data using the API endpoint
  useEffect(() => {
    const fetchToolData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/admin/getToolByIdManage/${docid}?fields=name,_id,products,shortDescription&populate=products&populateField=name,price,_id,coverImage&populateLimit=30&page=1`
        );
        console.log(response);

        setTool(response.data.products);
        setProducts(response.data.products.products);
      } catch (error) {
        console.error("Error fetching tool data", error);
      }
    };

    fetchToolData();
  }, [docid]);

  // Handle drag and drop
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);
  };

  // Save the new product order to the backend
  const saveNewOrder = async () => {
    try {
      const newProductOrder = products.map((product) => product._id);
      await axios.post(`/api/v1/tools/reorderToolProducts/${docid}`, {
        newProductOrder,
      });
      //   onClose();
      dispatch(success({ message: "Operation completed !" }));

      //   onClose();
    } catch (e) {
      dispatch(error({ message: "Operation not completed!" }));
    }
  };

  if (!tool) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 py-20 px-2 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Reorder Products for {tool.label}
        </h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="products">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {products.map((product, index) => (
                  <Draggable
                    key={product._id}
                    draggableId={product._id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-2xl transition-shadow duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={`${url}img/${product.coverImage}`}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg object-top"
                          />
                          <div>
                            <h3 className="text-xl font-semibold">
                              {product.name}
                            </h3>
                            <p className="text-gray-600">Rs. {product.price}</p>
                          </div>
                        </div>
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-move"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-500 hover:text-gray-800 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 10h16M4 14h16"
                            />
                          </svg>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className="flex justify-center">
          <button
            className="mt-10 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            onClick={saveNewOrder}
          >
            Save New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeOrder;
