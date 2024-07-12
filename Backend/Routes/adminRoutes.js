const express = require('express');
const { createProduct, uploadImages, resizeImage, editProduct, hideProduct, getAllOrdersForShipment, confirmShipemntForOrder } = require('../Controllers/adminController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const giveAccess = require('../Middleware/giveAccessTo');
const adminRouter = express.Router()

// adminRouter.use(isLoggedIn, giveAccess("ADMIN"))
adminRouter.post("/create", uploadImages, resizeImage, createProduct)
adminRouter.patch("/edit/:productId", editProduct)
adminRouter.get("/hide/:productId", hideProduct)

adminRouter.get("/getAllOrdersForShipment", getAllOrdersForShipment)
adminRouter.get("/confirmShipment/:productId", confirmShipemntForOrder)






module.exports = adminRouter;




