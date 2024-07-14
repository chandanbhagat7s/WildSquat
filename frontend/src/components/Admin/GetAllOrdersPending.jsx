import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import url from "../../../public/url";
import axios from "axios";
import { useDispatch } from "react-redux";
import { error } from "../../redux/slices/errorSlice";

export default function GetAllOrdersPending() {
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  async function getData() {
    try {
      const res = await axios.get("/api/v1/admin/getAllOrdersForShipment");
      console.log(res);
      if (res?.data?.status == "success") {
        console.log(res);
        setProduct([...res?.data?.orders]);
      }
    } catch (e) {
      dispatch(error("please try again", 400));
    }
  }
  //
  useEffect(() => {
    getData();
  }, []);

  const ProductCard = ({ product, user }) => (
    <div className="flex justify-center items-center">
      <div className="bg-indigo-100 p-3 rounded-xl ">
        <div className="font-bold my-2">Ordred by</div> <div>{user.name}</div>
        <div className="p-2 rounded">
          <div className="font-bold my-2">To address</div>{" "}
          {`${user.addressLine1},${user.pinCode},${user.state},${user.country}`}
        </div>
      </div>
      <div className="flex flex-col  items-center p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition duration-300">
        <img
          src={`${url}img/${product.name}-cover.jpeg`}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-md mr-4"
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-indigo-600 font-medium">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() =>
              nevigate("/productDetails", { state: { id: product._id } })
            }
            className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition duration-150"
          >
            <FaInfoCircle className="inline mr-2" /> More Info
          </button>
          <button
            // onClick={() => onRemove(product)}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition duration-150"
          >
            <FaTrash className="inline mr-2" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {product.map((el, i) => {
        return <ProductCard key={i} product={el.ofProduct} user={el.byuser} />;
      })}
    </div>
  );
}
