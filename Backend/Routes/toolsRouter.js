


const express = require('express');
const { getNevigationListItems, getTools, getToolById, rearrangeProducts } = require('../Controllers/toolControllers');
const cacheMiddleware = require('../Redis/cacheMiddleware');
const toolRouter = express.Router()

toolRouter.post("/reorderToolProducts/:docid", rearrangeProducts)
toolRouter.get("/getToolById/:toolId", cacheMiddleware, getToolById)
toolRouter.get("/getTool/:tool", cacheMiddleware, getTools)
toolRouter.get("/getNavigationData/:gender", getNevigationListItems)




module.exports = toolRouter;






















