const express = require('express');
const { createProduct, uploadImages, resizeImage, editProduct } = require('../Controllers/adminController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const giveAccess = require('../Middleware/giveAccessTo');
const adminRouter = express.Router()

// adminRouter.use(isLoggedIn, giveAccess("ADMIN"))
adminRouter.post("/create", uploadImages, resizeImage, createProduct)
adminRouter.patch("/edit/:productId", editProduct)





module.exports = adminRouter;




