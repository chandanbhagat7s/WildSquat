const express = require('express');
const { ensureShippingAuth, getAllWarehouse, shipProduct, cancleShpementAndRefund, tryExpressBee, checkForExpressBeeMiddlewareAvaibility } = require('../Controllers/shipController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');

const shipRouter = express.Router()

// get all wherehouse
shipRouter.use(ensureShippingAuth)
shipRouter.post("/shipProduct", isLoggedIn, checkForExpressBeeMiddlewareAvaibility, tryExpressBee, shipProduct)
// shipRouter.post("/shipProduct", shipProduct)
shipRouter.get("/getAllWarehouseDetails", getAllWarehouse)
shipRouter.post("/cancleOrderAndRefund", cancleShpementAndRefund)


// Integrating bigShip for shipping





module.exports = shipRouter;
















