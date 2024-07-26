const express = require('express');
const { createProduct, uploadImages, resizeImage, editProduct, hideProduct, getAllOrdersForShipment, confirmShipemntForOrder, resizeToolImage, createCategory, updateCategory, updateSlider, getAllMyTools, getToolById, actionOnTool, deletTool, addOtherSimillarColorProduct } = require('../Controllers/adminController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const giveAccess = require('../Middleware/giveAccessTo');
const adminRouter = express.Router()

// adminRouter.use(isLoggedIn, giveAccess("ADMIN"))
adminRouter.post("/create", uploadImages, resizeImage, createProduct)
adminRouter.patch("/edit/:productId", editProduct)
adminRouter.get("/hide/:productId", hideProduct)
// add colors simillar product to product

adminRouter.patch("/addColors", addOtherSimillarColorProduct)


adminRouter.get("/getAllOrdersForShipment", getAllOrdersForShipment)
adminRouter.get("/confirmShipment/:productId", confirmShipemntForOrder)

// add and remove of pproduct from the category
adminRouter.patch("/actionOnTool", actionOnTool)
adminRouter.delete("/actionOnTool/:toolId", deletTool)



// for frontend 
adminRouter.post("/createCategory", uploadImages, resizeToolImage, createCategory)
adminRouter.get("/getAllMyTools", getAllMyTools)
adminRouter.get("/getToolById/:toolId", getToolById)




module.exports = adminRouter;




