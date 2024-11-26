const express = require('express');
const { uploadImages, resizeImage, createProduct, getSearchedProduct, getProduct } = require('../Controller/productController');
const { isLoggedIn } = require('../../Middleware/isLoggedIn');
const giveAccess = require('../../Middleware/giveAccessTo');
const Router = express.Router()



Router.use(isLoggedIn, giveAccess("ADMIN"))

Router.route("/").post(uploadImages, resizeImage, createProduct)
Router.route("/:id").get(getProduct)

Router.get("/search/searchProduct", getSearchedProduct)


module.exports = Router;



