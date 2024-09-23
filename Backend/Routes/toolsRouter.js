


const express = require('express');
const { getNevigationListItems, getTools, getToolById } = require('../Controllers/toolControllers');
const toolRouter = express.Router()


toolRouter.get("/getToolById/:toolId", getToolById)
toolRouter.get("/getTool/:tool", getTools)
toolRouter.get("/getNavigationData/:gender", getNevigationListItems)



module.exports = toolRouter;






















