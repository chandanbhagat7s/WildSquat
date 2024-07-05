const express = require('express');
const { createProduct } = require('../Controllers/adminController');
const adminRouter = express.Router()


adminRouter.post("/create", createProduct)





module.exports = adminRouter;




