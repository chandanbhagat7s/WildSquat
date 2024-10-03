const express = require('express');
const { createProduct, uploadImages, resizeImage, editProduct, getAllOrdersForShipment, confirmShipemntForOrder, resizeToolImage, createCategory, updateCategory, updateSlider, getAllMyTools, actionOnTool, deletTool, addOtherSimillarColorProduct, deleteProduct } = require('../Controllers/adminController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const giveAccess = require('../Middleware/giveAccessTo');
const { getToolById, getToolByIdForMange } = require('../Controllers/toolControllers');
const adminRouter = express.Router()





adminRouter.get("/getAllMyTools/:gender", getAllMyTools)
adminRouter.get("/getToolById/:toolId", getToolById)



adminRouter.use(isLoggedIn, giveAccess("ADMIN"))
adminRouter.post("/create", uploadImages, resizeImage, createProduct)
adminRouter.patch("/edit/:productId", editProduct)
adminRouter.post("/delete", deleteProduct)
// add colors simillar product to product

adminRouter.patch("/addColors", addOtherSimillarColorProduct)


adminRouter.get("/getAllOrdersForShipment", getAllOrdersForShipment)
adminRouter.get("/confirmShipment/:productId", confirmShipemntForOrder)

// add and remove of pproduct from the category
adminRouter.patch("/actionOnTool", actionOnTool)
adminRouter.delete("/actionOnTool/:toolId", deletTool)



// for frontend 
adminRouter.post("/createCategory", uploadImages, resizeToolImage, createCategory)
adminRouter.get("/getToolByIdManage/:toolId", getToolByIdForMange)


/*
to be added later
should get list of unordred product / not refunded 
should get list of returned product 
list of denger(to get over) product (with size) with action btn 
list of product 
*/




module.exports = adminRouter;




