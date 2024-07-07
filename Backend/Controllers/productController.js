const Product = require("../Models/Product");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.getAllProduct = catchAsync(async (req, res, next) => {
    const product = await Product.find({})



    res.status(200).send({
        status: "success",
        product
    })
})

exports.getAllProductForMiniCard = catchAsync(async (req, res, next) => {
    const product = await Product.find({}).select("_id name price coverImage")

    res.status(200).send({
        status: "success",
        product
    })
})


exports.getProductById = catchAsync(async (req, res, next) => {

    const { productId } = req.params;
    if (!productId) {
        return next(new appError("please pass id ", 400)
        )
    }


    const product = await Product.findById(productId)
    res.status(200).send({
        status: "success",
        product

    })
})
exports.getProductByName = catchAsync(async (req, res, next) => {

    const { productName } = req.params;
    if (!productName) {
        return next(new appError("please pass id ", 400)
        )
    }


    const product = await Product.find({
        name: productName
    })
    res.status(200).send({
        status: "success",
        product: product[0]

    })
})







exports.getSearchedProduct = catchAsync(async (req, res, next) => {

    const { search } = req.query;
    const products = await Product.find({
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ]
    })

    res.status(200).send({
        status: "success",
        products

    })
})
















