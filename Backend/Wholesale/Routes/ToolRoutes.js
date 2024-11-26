const express = require('express');
const { uploadImages, resizeImage, createTool, getAllTool, deleteTool, addProductToTool, addProductToToolMiddleware } = require('../Controller/toolController');
const { isLoggedIn } = require('../../Middleware/isLoggedIn');
const giveAccess = require('../../Middleware/giveAccessTo');
const { getOne } = require('../../utils/factory');
const Router = express.Router()


Router.use(isLoggedIn, giveAccess("ADMIN"))


Router.route("/").get(getAllTool).post(uploadImages, resizeImage, createTool)

Router.route("/:id").get(getOne).delete(deleteTool)

Router.route("/operation/:id").patch(addProductToToolMiddleware, addProductToTool)


module.exports = Router;



