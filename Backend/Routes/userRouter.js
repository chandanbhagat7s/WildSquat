
const express = require('express');
const { getCartHeartOrders } = require('../Controllers/userControllers');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const { addToCart, removeFromCart, homepageData, homePageClickData } = require('../Controllers/productController');
const userrouter = express.Router()


// userrouter.get("/homepage/:gender", homepageData)

userrouter.use(isLoggedIn)
userrouter.get("/getCartHeartOrders", getCartHeartOrders);
userrouter.get("/addToCart/:productId", addToCart)

userrouter.get("/removeFromCart/:productId", removeFromCart)


userrouter.get("/homepage/clickData", homePageClickData)


module.exports = userrouter;






















