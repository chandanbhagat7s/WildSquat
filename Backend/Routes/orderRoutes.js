
const express = require('express');
const { getOrderDetails } = require('../Controllers/orderController');
const orderRoutes = express.Router()

orderRoutes.get("/getOrderDetails", getOrderDetails)
// orderRoutes.get("/getAllReturnedOrders")
// orderRoutes.get("/shipUnshippedOrder")
// orderRoutes.get("/AllBookedOrders")
// orderRoutes.get("/AllCancledOrders")




module.exports = orderRoutes;


































