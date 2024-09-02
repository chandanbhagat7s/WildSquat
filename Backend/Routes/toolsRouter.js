


const express = require('express');
const { getToolById } = require('../Controllers/adminController');
const { getNevigationListItems } = require('../Controllers/toolControllers');
const toolRouter = express.Router()


toolRouter.get("/getToolById/:toolId", getToolById)
toolRouter.get("/getNavigationData/:gender", getNevigationListItems)



module.exports = toolRouter;






















