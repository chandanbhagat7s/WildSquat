import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const BookedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `/api/v1/orders/getOrderDetails?cancledShipment=false&populate=byuser&page=${page}&limit=2&populateField=name,pinCode,mobile`
      );

      const newOrders = res.data.orders;

      if (newOrders.length === 0) {
        setHasMore(false);
      } else {
        setOrders((prevOrders) => [...prevOrders, ...newOrders]);
        setPage(page + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <InfiniteScroll
      dataLength={orders.length} // This is important to avoid bugs
      next={fetchOrders}
      hasMore={hasMore}
      loader={
        <div className="my-10">
          <h4>Loading...</h4>
        </div>
      }
      endMessage={<p className="text-center">No more orders to show</p>}
    >
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-6 font-semibold text-gray-600">Product</th>
              <th className="py-3 px-6 font-semibold text-gray-600">User</th>
              <th className="py-3 px-6 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {orders?.length > 0 &&
              orders?.map((order) => (
                <tr key={order._id} className="border-t">
                  {/* Product Details */}
                  <td className="py-3 px-6">
                    <ul className="list-disc pl-4">
                      {order.productData.map((product, index) => (
                        <div key={index} className="flex flex-col">
                          <li>{product.name}</li>
                          <li>{product.quantity}</li>
                          <li>{product.selectedSize || "not mentioned"}</li>
                          <li>{product.weight}</li>
                        </div>
                      ))}
                    </ul>
                  </td>

                  {/* User Details */}
                  <td className="py-3 px-6">
                    <p>
                      <span className="font-semibold"> Name:</span>{" "}
                      {order.byuser.name}
                    </p>
                    <p>
                      <span className="font-semibold"> Pincode:</span>{" "}
                      {order.byuser.pinCode}
                    </p>
                    <p>
                      <span className="font-semibold"> Mobile:</span>{" "}
                      {order.byuser.mobile}
                    </p>
                    <p>
                      <span className="font-semibold"> Order Time:</span>{" "}
                      {order.time}
                    </p>
                  </td>
                  <td className="py-3 px-6">{order?.orderStatus}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-2 bg-gray-200">No orders Booked</div>
        )}
      </div>
    </InfiniteScroll>
  );
};

export default BookedOrders;
