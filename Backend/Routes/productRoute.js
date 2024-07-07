const express = require('express');
const { getAllProduct, getAllProductForMiniCard, getProductById, getSearchedProduct, getProductByName } = require('../Controllers/productController');
const productRouter = express.Router()

productRouter.get("/searchProduct", getSearchedProduct)
productRouter.get("/getAllProducts", getAllProduct)
productRouter.get("/getAllMiniCardProduct", getAllProductForMiniCard)
productRouter.get("/getProduct/:productId", getProductById)
productRouter.get("/getProductByName/:productName", getProductByName)


module.exports = productRouter;






