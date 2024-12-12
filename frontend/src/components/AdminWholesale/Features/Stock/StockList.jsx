import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { error, success } from "../../../../redux/slices/errorSlice";
import LoadingSpinner from "../../../common/Spinner";
import url from "../../../../assets/url";

export default function StockList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `/api/v1/wholesale/product?fields=images,name,price,sizes,sizeOption&limit=8&page=${page}`
      );
      let newProducts = res?.data?.data;

      if (newProducts?.length === 0) setHasMore(false);
      else if (newProducts?.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      }
      if (newProducts?.length < 8) setHasMore(false);
    } catch (e) {
      dispatch(error({ message: "Failed to load products" }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
    setProducts([]);
    fetchProducts();
  }, []);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleUpdateSize = async (data) => {
    try {
      console.log("submitting data", data);

      const res = await axios.patch(
        `/api/v1/wholesale/product/${selectedProduct._id}`,
        data
      );
      if (res?.data?.status) {
        dispatch(success({ message: "Size updated of product" }));
        handleCloseDialog();
      }
    } catch (e) {
      dispatch(error({ message: "Failed to update size" }));
    }
  };

  const handleHideProduct = async () => {
    try {
      await axios.patch(`/api/v1/wholesale/product/${selectedProduct._id}`, {
        hidden: true,
      });
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p._id !== selectedProduct._id)
      );
      handleCloseDialog();
    } catch (e) {
      dispatch(error({ message: "Failed to hide product" }));
    }
  };

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
          hasMore={hasMore}
          loader={<LoadingSpinner small={true} />}
          endMessage={
            <div className="text-center text-2xl font-bold mt-20">
              You have seen all products
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="flex items-center gap-4 border p-4 rounded-lg shadow-md"
              >
                <div className="flex-shrink-0">
                  <img
                    src={`${url}/wholesale/product/${product.images[0]}`}
                    alt={product.name}
                    className="h-32 w-32 object-cover rounded-md object-top"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <h2 className="text-lg font-bold mb-2">
                    {" "}
                    {index + 1} . {product.name}
                  </h2>
                  <span className="text-black">Size Option</span>
                  <span className="font-bold text-gray-500">
                    {product.sizeOption ? (
                      <span className="text-green-400">Available</span>
                    ) : (
                      "Not Available"
                    )}
                  </span>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size.size}
                          className="px-3 py-1 border border-black rounded-md hover:border-indigo-800 transition duration-300"
                        >
                          <span className="text-lg font-semibold text-indigo-800">
                            {size.size} /{" "}
                            <span className="text-sm text-black">
                              {size.price}
                            </span>
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenDialog(product)}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600 transition"
                  >
                    Refill/Hide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {openDialog && (
        <Dialog
          onUpdateSize={handleUpdateSize}
          onHideProduct={handleHideProduct}
          isOpen={openDialog}
          onClose={setOpenDialog}
          product={selectedProduct}
        ></Dialog>
      )}
    </motion.div>
  );
}

const Dialog = ({ isOpen, onClose, product, onUpdateSize, onHideProduct }) => {
  // Close dialog on pressing the Escape key
  const dispatch = useDispatch();
  const [editedProduct, setEditedProduct] = useState({
    ...product,
  });
  async function featchProduct() {
    try {
      const res = await axios.get(`/api/v1/wholesale/product/${product._id}`);
      setEditedProduct({ ...res?.data?.data });
    } catch (e) {
      dispatch(error({ message: "Something went wrong" }));
      onclose();
    }
  }

  const handleAvabilityChange = () => {
    setEditedProduct({
      ...editedProduct,
      sizeOption: !editedProduct.sizeOption,
    });
  };
  console.log("edited", editedProduct);

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
  const handleSizeChange = (size, price = 0) => {
    if (!price) {
      const newSizes = editedProduct.sizes.find(
        (item) => item.size === size.size
      )
        ? editedProduct.sizes.filter((item) => item.size !== size.size)
        : [...editedProduct.sizes, size];
      setEditedProduct({ ...editedProduct, sizes: newSizes });
    } else {
      const newproduct = editedProduct.sizes.map((el) => {
        if (el.size == size.size) {
          el.price = price;
        }
        return el;
      });

      setEditedProduct({ ...editedProduct, sizes: newproduct });
    }
  };
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  useEffect(() => {
    featchProduct();
  }, []);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Dialog Content */}
      <div className="relative bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-semibold mb-4">{product.name}</h2>

        {/* Product Image */}
        <img
          src={`${url}/wholesale/product/${product.images[0]}`}
          alt="Product"
          className="w-32 h-32 object-contain mx-auto mb-4"
        />
        <p className="py-1 text-sm text-center">Size option</p>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg justify-center">
          <span
            className={`text-blue-600 ${
              editedProduct?.sizeOption ? "font-bold" : ""
            }`}
          >
            {editedProduct?.sizeOption ? "Available" : "A"}
          </span>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
              !editedProduct?.sizeOption ? "bg-pink-600" : "bg-blue-600"
            }`}
            onClick={handleAvabilityChange}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                !editedProduct?.sizeOption ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
          <span
            className={`text-pink-600 ${
              !editedProduct?.sizeOption ? "font-bold" : ""
            }`}
          >
            {!editedProduct?.sizeOption ? "Not Avaiable" : "NA"}
          </span>
        </div>

        {/* Sizes */}
        <div className="pt-3">
          <label className=" block text-sm font-bold text-gray-700">
            Sizes and Prices
          </label>
          <div className="mt-2 space-y-2 md:grid md:grid-cols-2">
            {sizeOptions.map((size, i) => (
              <div key={size.size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editedProduct.sizes.find(
                    (item) => item.size === size.size
                  )}
                  onChange={() => handleSizeChange(size)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="text-gray-700">{size.size}</span>

                {editedProduct.sizes.find((item) => item.size == size.size) && (
                  <input
                    type="number"
                    placeholder={`Piceswe have ${size.size}`}
                    value={(function getPriceBySize(size) {
                      const item = editedProduct.sizes.find(
                        (item) => item.size === size
                      );
                      return item ? item.price : 0;
                    })(size.size)}
                    className="mt-1 block w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => handleSizeChange(size, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="my-10 flex justify-center ">
          <button
            onClick={() => onUpdateSize(editedProduct)}
            className=" px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Product
          </button>
        </div>
        <div className="mt-6 flex justify-between space-x-4">
          <button
            onClick={onHideProduct}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Hide Product
          </button>

          {/* <button
            onClick={() => onClose(!isOpen)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
};
