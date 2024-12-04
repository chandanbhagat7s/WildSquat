const express = require('express');
const { uploadImages, resizeImage, createProduct, getSearchedProduct, getProduct, getAllProduct } = require('../Controller/productController');
const { isLoggedIn } = require('../../Middleware/isLoggedIn');
const giveAccess = require('../../Middleware/giveAccessTo');
const Router = express.Router()



Router.route("/:id").get(getProduct)
Router.use(isLoggedIn, giveAccess("ADMIN"))

Router.route("/").get(getAllProduct).post(uploadImages, resizeImage, createProduct)

Router.get("/search/searchProduct", getSearchedProduct)


module.exports = Router;



