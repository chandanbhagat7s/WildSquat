
const express = require('express');
const { getCartHeartOrders, editProfile, changeNumber, verifyOtpChangeNumber, getOrderStatuses } = require('../Controllers/userControllers');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const { addToCart, removeFromCart } = require('../Controllers/productController');
const { ensureShippingAuth } = require('../Controllers/shipController');
const userrouter = express.Router()


// userrouter.get("/homepage/:gender", homepageData)

userrouter.use(isLoggedIn)
userrouter.get("/getCartHeartOrders", getCartHeartOrders);
userrouter.get("/getOrderProducts", ensureShippingAuth, getOrderStatuses);
userrouter.get("/addToCart/:productId", addToCart)

userrouter.get("/removeFromCart/:productId", removeFromCart)
userrouter.patch("/editProfile", editProfile)
userrouter.post("/changeMobileNumber", changeNumber)
userrouter.post("/verifyAndChangeMobile", verifyOtpChangeNumber)



module.exports = userrouter;






















