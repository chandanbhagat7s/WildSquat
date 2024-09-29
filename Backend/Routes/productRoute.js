const express = require('express');
const { getAllProduct, getAllProductForMiniCard, getProductById, getSearchedProduct, getProductByName, getAllCategory, getTrending, getAllPosters, getAllCardProducts, getAllProductByFilter } = require('../Controllers/productController');
const cacheMiddleware = require('../Redis/cacheMiddleware');
// const { isLoggedIn } = require('../Middleware/isLoggedIn');
const productRouter = express.Router()

productRouter.get("/searchProduct", getSearchedProduct)
productRouter.get("/getAllProducts", getAllProduct)
productRouter.get("/getAllProductsByFilter", getAllProductByFilter)

productRouter.get("/getAllMiniCardProduct", getAllProductForMiniCard)
productRouter.get("/getProduct/:productId", getProductById)
productRouter.get("/getProductByName/:productName", getProductByName)
productRouter.get("/getAllSimmilarProducts/:productName", getProductByName)





productRouter.get("/getAllCategory", getAllCategory)
productRouter.get("/getAllPosters", getAllPosters)
productRouter.get("/getAllTrendingProducts", getTrending)
productRouter.get("/getAllCardProducts", getAllCardProducts)




module.exports = productRouter;






