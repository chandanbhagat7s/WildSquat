import React, { useEffect, useState } from "react";
import FullScreenDialog from "../../common/FullScreenDialog";
import axios from "axios";
import CourierDetails from "./CourierDetails";

const UnshippedTableComponent = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [shipmentData, setShipmentData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "/api/v1/orders/getOrderDetails?phase[lt]=3&populate=byuser"
        );
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const closeDialog = () => {
    setDialogOpen(false);
    setShipmentData(null); // Reset shipment data when closing
  };

  function openDialog(system_order_id) {
    setSelectedOrder(system_order_id);
    setDialogOpen(true);
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-3 px-6 font-semibold text-gray-600">Product</th>
            <th className="py-3 px-6 font-semibold text-gray-600">User</th>
            <th className="py-3 px-6 font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              {/* Product Details */}
              <td className="py-3 px-6">
                <ul className="list-disc pl-4">
                  {order.productData.map((product, index) => (
                    <div key={index} className="flex flex-col">
                      <li>{product.name}</li>
                      <li>{product.quantity}</li>
                      <li>{product.selectedSize}</li>
                      <li>{product.selectedSize}</li>
                      <li>{product.weight}</li>
                    </div>
                  ))}
                </ul>
              </td>

              {/* User Details */}
              <td className="py-3 px-6">
                <p>Name: {order.byuser.name}</p>
                <p>Pincode: {order.byuser.pincode}</p>
              </td>

              {/* Action Button */}
              <td className="py-3 px-6">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => openDialog(order.system_order_id)}
                >
                  Ship
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Full-Screen Dialog */}
      {isDialogOpen && (
        <FullScreenDialog isOpen={isDialogOpen} onClose={closeDialog}>
          <CourierDetails shipmentData={shipmentData} />
        </FullScreenDialog>
      )}
    </div>
  );
};

export default UnshippedTableComponent;
