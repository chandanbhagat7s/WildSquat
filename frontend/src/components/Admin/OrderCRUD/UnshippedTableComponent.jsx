import React, { useEffect, useState } from "react";
import FullScreenDialog from "../../common/FullScreenDialog";
import axios from "axios";
import CourierDetails from "./CourierDetails";

const UnshippedTableComponent = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({
    order: "",
    system_order_id: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "/api/v1/orders/getOrderDetails?phase[lt]=3&populate=byuser&cancledShipment=false"
        );
        setOrders(res.data.orders);
      } catch (err) {}
    };
    fetchOrders();
  }, []);

  const closeDialog = () => {
    setDialogOpen(false);
    // setShipmentData(null); // Reset shipment data when closing
  };

  function openDialog(obj) {
    setSelectedOrder(obj);
    setDialogOpen(true);
  }
  async function handleShip(courierId) {
    try {
      const res = await axios.post("/api/v1/orders/shipProductByAdmin", {
        orderId: selectedOrder.order,
        courierId: courierId,
      });

      // setOrders(res.data.orders);
    } catch (err) {}
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
                        <li>{product.selectedSize || "M"}</li>
                        {/* <li>{product.selectedSize}</li> */}
                        <li>{product.weight}</li>
                      </div>
                    ))}
                  </ul>
                </td>

                {/* User Details */}
                <td className="py-3 px-6">
                  <p>Name: {order.byuser.name}</p>
                  <p>Pincode: {order.byuser.pinCode}</p>
                </td>

                {/* Action Button */}
                <td className="py-3 px-6">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() =>
                      openDialog({
                        order: order._id,
                        system_order_id: order.system_order_id,
                      })
                    }
                  >
                    Ship
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {orders.length == 0 && (
        <div className="p-2 bg-gray-200">No orders failed shipping</div>
      )}

      {/* Full-Screen Dialog */}
      {isDialogOpen && (
        <FullScreenDialog isOpen={isDialogOpen} onClose={closeDialog}>
          <CourierDetails
            shipmentData={selectedOrder}
            handleShip={handleShip}
          />
        </FullScreenDialog>
      )}
    </div>
  );
};

export default UnshippedTableComponent;
