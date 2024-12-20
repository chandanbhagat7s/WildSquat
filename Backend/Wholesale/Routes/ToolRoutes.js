const express = require('express');
const { uploadImages, resizeImage, createTool, getAllTool, deleteTool, addProductToTool, addProductToToolMiddleware, updateTool, removeProductFromToolMiddleware, removeProductFromTool } = require('../Controller/toolController');
const { isLoggedIn } = require('../../Middleware/isLoggedIn');
const giveAccess = require('../../Middleware/giveAccessTo');
const { getOne } = require('../../utils/factory');
const Router = express.Router()




Router.route("/").get(getAllTool).post(isLoggedIn, giveAccess("ADMIN"), uploadImages, resizeImage, createTool)

Router.route("/:id").get(getOne).delete(isLoggedIn, giveAccess("ADMIN"), deleteTool).patch(isLoggedIn, giveAccess("ADMIN"), updateTool)

Router.route("/operation/:id").patch(isLoggedIn, giveAccess("ADMIN"), addProductToToolMiddleware, addProductToTool)
Router.route("/removeFromTool/:id").patch(isLoggedIn, giveAccess("ADMIN"), removeProductFromToolMiddleware, removeProductFromTool)


module.exports = Router;



