import axios from "axios";
import React, { useEffect, useState } from "react";

const CourierDetails = ({ shipmentData, handleShip }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!shipmentData) {
          return;
        }
        const res = await axios.get(
          `/api/v1/orders/getShipmentDetailsPintoPin/${shipmentData.system_order_id}`
        );
        setShips(res.data.ship);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [shipmentData]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Shipment Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">
                Courier ID
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Charges</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {ships.length > 0 &&
              ships.map((shipment, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-4 border-b">{shipment.courierId}</td>
                  <td className="py-2 px-4 border-b">{shipment.courierName}</td>
                  <td className="py-2 px-4 border-b">
                    {shipment.courierCharge}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleShip(shipment.courierId)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded shadow-md transition duration-300"
                    >
                      Ship
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourierDetails;
