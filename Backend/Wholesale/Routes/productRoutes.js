const express = require('express');
const { uploadImages, resizeImage, createProduct, getSearchedProduct, getProduct, getAllProduct, deleteProducts, updateProduct } = require('../Controller/productController');
const { isLoggedIn } = require('../../Middleware/isLoggedIn');
const giveAccess = require('../../Middleware/giveAccessTo');
const Router = express.Router()



Router.route("/:id").get(getProduct).patch(isLoggedIn, giveAccess("ADMIN"), updateProduct)
Router.use(isLoggedIn, giveAccess("ADMIN"))

Router.route("/").get(getAllProduct).post(uploadImages, resizeImage, createProduct)

Router.post("/deleteProduct", deleteProducts)

Router.get("/search/searchProduct", getSearchedProduct)


module.exports = Router;



