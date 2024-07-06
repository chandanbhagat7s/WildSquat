const Product = require("../Models/Product");
const catchAsync = require("../utils/catchAsync");


exports.getAllProduct = catchAsync(async (req, res, next) => {
    const product = await Product.find({})



    res.status(200).send({
        status: "success",
        product
    })
})

exports.getAllProductForCard = catchAsync(async (req, res, next) => {
    const product = await Product.find({}).select("_id name price")
    res.status(200).send({
        status: "success",
        product
    })
})
























