
const express = require('express');
const { getOrderDetails, getShipmentDetailsPinToPin } = require('../Controllers/orderController');
const orderRoutes = express.Router()

orderRoutes.get("/getOrderDetails", getOrderDetails);
orderRoutes.get("/getShipmentDetailsPintoPin/:systemId", getShipmentDetailsPinToPin);

// orderRoutes.get("/getAllReturnedOrders")
// orderRoutes.get("/shipUnshippedOrder")
// orderRoutes.get("/AllBookedOrders")
// orderRoutes.get("/AllCancledOrders")




module.exports = orderRoutes;


































