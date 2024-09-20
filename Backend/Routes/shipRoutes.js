const express = require('express');
const { ensureShippingAuth, getAllWarehouse, shipProduct } = require('../Controllers/shipController');

const shipRouter = express.Router()

// get all wherehouse
shipRouter.use(ensureShippingAuth)
shipRouter.post("/shipProduct", shipProduct)
shipRouter.get("/getAllWarehouseDetails", getAllWarehouse)


// Integrating bigShip for shipping





module.exports = shipRouter;
















