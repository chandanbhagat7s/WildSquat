


const express = require('express');
const { getToolById } = require('../Controllers/adminController');
const toolRouter = express.Router()


toolRouter.get("/getToolById/:toolId", getToolById)



module.exports = toolRouter;






















