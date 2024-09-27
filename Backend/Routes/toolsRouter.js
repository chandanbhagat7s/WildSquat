


const express = require('express');
const { getNevigationListItems, getTools, getToolById } = require('../Controllers/toolControllers');
const cacheMiddleware = require('../Redis/cacheMiddleware');
const toolRouter = express.Router()


toolRouter.get("/getToolById/:toolId", getToolById)
toolRouter.get("/getTool/:tool", cacheMiddleware, getTools)
toolRouter.get("/getNavigationData/:gender", getNevigationListItems)



module.exports = toolRouter;






















