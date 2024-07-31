const express = require('express');
const { getAllProduct, getAllProductForMiniCard, getProductById, getSearchedProduct, getProductByName, getAllCategory, getAlltrendingProducts, getAllPosters } = require('../Controllers/productController');
// const { isLoggedIn } = require('../Middleware/isLoggedIn');
const productRouter = express.Router()

productRouter.get("/searchProduct", getSearchedProduct)
productRouter.get("/getAllProducts", getAllProduct)

productRouter.get("/getAllMiniCardProduct", getAllProductForMiniCard)
productRouter.get("/getProduct/:productId", getProductById)
productRouter.get("/getProductByName/:productName", getProductByName)
productRouter.get("/getAllSimmilarProducts/:productName", getProductByName)





productRouter.get("/getAllCategory", getAllCategory)
productRouter.get("/getAllPosters", getAllPosters)
productRouter.get("/getAllTrendingProducts", getAlltrendingProducts)




module.exports = productRouter;






