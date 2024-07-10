const express = require('express');
const { getAllProduct, getAllProductForMiniCard, getProductById, getSearchedProduct, getProductByName, addToCart, removeFromCart, addToHeart, removeFromHeart } = require('../Controllers/productController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const productRouter = express.Router()

productRouter.get("/searchProduct", getSearchedProduct)
productRouter.get("/getAllProducts", getAllProduct)
productRouter.get("/getAllMiniCardProduct", getAllProductForMiniCard)
productRouter.get("/getProduct/:productId", getProductById)
productRouter.get("/getProductByName/:productName", getProductByName)

productRouter.use(isLoggedIn)
productRouter.get("/addToCart/:productId", addToCart)
productRouter.get("/addToHeart/:productId", addToHeart)
productRouter.get("/removeFromCart/:productId", removeFromCart)
productRouter.get("/removeFromHeart/:productId", removeFromHeart)


module.exports = productRouter;






