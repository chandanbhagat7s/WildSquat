
const express = require('express');
const { getCartHeartOrders } = require('../Controllers/userControllers');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const { addToCart, addToHeart, removeFromCart, removeFromHeart } = require('../Controllers/productController');
const userrouter = express.Router()

userrouter.use(isLoggedIn)
userrouter.get("/getCartHeartOrders", getCartHeartOrders);
userrouter.get("/addToCart/:productId", addToCart)
userrouter.get("/addToHeart/:productId", addToHeart)
userrouter.get("/removeFromCart/:productId", removeFromCart)
userrouter.get("/removeFromHeart/:productId", removeFromHeart)


module.exports = userrouter;






















