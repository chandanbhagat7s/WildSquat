import React from "react";

const CourierDetails = ({ shipmentData }) => {
  if (!shipmentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Shipment Details</h2>
      <ul>
        {shipmentData.map((shipment, idx) => (
          <li key={idx}>
            Courier ID: {shipment.courireid}, Name: {shipment.courierName},
            Charges: {shipment.charges}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourierDetails;
