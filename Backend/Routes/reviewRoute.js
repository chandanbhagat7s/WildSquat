const express = require('express');
const reviewRouter = express.Router()
const { createReview, getAllReview } = require('../Controllers/reviewController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const giveAccess = require('../Middleware/giveAccessTo');



reviewRouter.get("/getAllReview/:reviewId", getAllReview)
reviewRouter.use(isLoggedIn, giveAccess("user"))
reviewRouter.post("/", createReview)



module.exports = reviewRouter











