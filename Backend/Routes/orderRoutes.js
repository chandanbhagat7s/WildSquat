
const express = require('express');
const { getOrderDetails, getShipmentDetailsPinToPin } = require('../Controllers/orderController');
const { ensureShippingAuth, shipProductByAdmin } = require('../Controllers/shipController');
const orderRoutes = express.Router()

orderRoutes.get("/getOrderDetails", getOrderDetails);
orderRoutes.get("/getShipmentDetailsPintoPin/:systemId", ensureShippingAuth, getShipmentDetailsPinToPin);
orderRoutes.post("/shipProductByAdmin", ensureShippingAuth, shipProductByAdmin);

// orderRoutes.get("/getAllReturnedOrders")
// orderRoutes.get("/shipUnshippedOrder")
// orderRoutes.get("/AllBookedOrders")
// orderRoutes.get("/AllCancledOrders")




module.exports = orderRoutes;


































