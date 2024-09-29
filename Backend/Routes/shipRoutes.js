const express = require('express');
const { ensureShippingAuth, getAllWarehouse, shipProduct, cancleShpementAndRefund } = require('../Controllers/shipController');

const shipRouter = express.Router()

// get all wherehouse
shipRouter.use(ensureShippingAuth)
shipRouter.post("/shipProduct", shipProduct)
shipRouter.get("/getAllWarehouseDetails", getAllWarehouse)
shipRouter.post("/cancleOrderAndRefund", cancleShpementAndRefund)


// Integrating bigShip for shipping





module.exports = shipRouter;
















