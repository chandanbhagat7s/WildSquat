const Product = require("../Models/Product");
const Review = require("../Models/Review")
const appError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const factory = require("./../utils/factory")


exports.createReview = catchAsync(async (req, res, next) => {
    const { review, rating } = req.body;
    if (!review || !rating) {
        return next(new appError("please provide all the fields to post an review", 400))
    }
    if (rating > 5 || rating < 1) {

        return next(new appError("rating to be in range 1 to 5", 400))
    }


    const user = await Review.findOne({ byUser: req.user._id, ofProduct: req.body.ofProduct })

    const product = await Product.findById(req.body.ofProduct)

    if (!product) {
        return next("product not found", 400)
    }

    if (user) {
        return next(new appError('you have posted an review once for this product !!', 404))
    }

    const doc = await Review.create({
        byUser: req.user._id,
        rating,
        review,
        ofProduct: product._id

    })
    if (!doc) {
        return next(new appError('failed to create doc please try again to create !!', 404))
    }


    res.status(201).json({
        status: 'success',
        msg: "Review posted"
    })
})






exports.getAllReview = (req, res) => {
    const ofProduct = req.params;
    factory.getAllByFilterOut(Review, { ofProduct })
}




















