const express = require('express');
const { uploadImages, resizeImage, createTool } = require('../Controller/toolController');
const { isLoggedIn } = require('../../Middleware/isLoggedIn');
const giveAccess = require('../../Middleware/giveAccessTo');
const Router = express.Router()


Router.use(isLoggedIn, giveAccess("ADMIN"))


Router.route("/").post(uploadImages, resizeImage, createTool)

module.exports = Router;



