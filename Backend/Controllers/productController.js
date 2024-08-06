const Product = require("../Models/Product");
const Tool = require("../Models/Tools");
const User = require("../Models/User");
const appError = require("../utils/appError");
const factory = require("../utils/factory");
const catchAsync = require("../utils/catchAsync");
const redisClient = require('../Redis/redisClient');

exports.getAllProduct = catchAsync(async (req, res, next) => {
    const product = await Product.find({

    })



    res.status(200).send({
        status: "success",
        product
    })
})

exports.getAllProductByFilter = factory.getAll(Product)


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


    const product = await Product.findById(productId).populate([{
        path: "colors"
    }])
    redisClient.incr(`product:${productId}:viewCount`, (err, reply) => {
        if (err) {
            console.error('Error incrementing view count:', err);
        }
    });

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


    const product = await Product.findOne({
        name: productName
    })


    res.status(200).send({
        status: "success",
        product: product

    })
})


exports.getAllSimmilarProductOFCategory = catchAsync(async (req, res, next) => {

    const products = await Tool.find({
        name: ""
    })

    res.status(200).send({
        status: "success",

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

    const category = await Tool.find({
        $or: [
            { label: { $regex: search, $options: 'i' } },
            { shortDescription: { $regex: search, $options: 'i' } }
        ]
    })

    res.status(200).send({
        status: "success",
        products,
        category

    })
})


exports.addToCart = catchAsync(async (req, res, next) => {

    console.log(req.user);
    const id = req.params.productId;
    const product = await Product.findById(id)


    if (!product) {
        return next(new appError("Please choose valid product to be added to cart", 400))
    }


    if (req?.user?.cart?.includes(id)) {
        return next(new appError("Product Already added to cart 😊", 400))
    }
    const user = await User.findByIdAndUpdate(req?.user?._id, {
        $push: { cart: product?._id }
    }, {
        new: true
    })
    console.log("up", user);

    if (!user) {
        return next(new appError("Please try again ", 500))
    }

    res.status(200).send({
        status: "success",
        msg: "product added to cart"
    })
})


exports.addToHeart = catchAsync(async (req, res, next) => {

    console.log(req.user);
    const id = req.params.productId;
    const product = await Product.findById(id)


    if (!product) {
        return next(new appError("Please choose valid product to be added to cart", 400))
    }


    if (req?.user?.heart?.includes(id)) {
        return next(new appError("Product Already added to your Heart List 😊", 400))
    }
    const user = await User.findByIdAndUpdate(req?.user?._id, {
        $push: { heart: product?._id }
    }, {
        new: true
    })
    console.log("up", user);

    if (!user) {
        return next(new appError("Please try again ", 500))
    }

    res.status(200).send({
        status: "success",
        msg: "product added to your Heart list"
    })
})

exports.removeFromCart = catchAsync(async (req, res, next) => {

    const id = req.params.productId;
    const product = await Product.findById(id)


    if (!product) {
        return next(new appError("Please choose valid product to be remove from cart", 400))
    }


    if (!req?.user?.cart?.includes(id)) {
        return next(new appError("Product not found in your cart", 400))
    }
    const user = await User.findByIdAndUpdate(req?.user?._id, {
        $pull: { cart: product?._id }
    }, {
        new: true
    })
    console.log("up", user);

    if (!user) {
        return next(new appError("Please try again ", 500))
    }

    res.status(200).send({
        status: "success",
        msg: "product removed from cart"
    })
})



exports.removeFromHeart = catchAsync(async (req, res, next) => {

    const id = req.params.productId;
    const product = await Product.findById(id)


    if (!product) {
        return next(new appError("Please choose valid product to be remove from heart list", 400))
    }


    if (!req?.user?.heart?.includes(id)) {
        return next(new appError("Product already removed form your heart list 😊", 400))
    }
    const user = await User.findByIdAndUpdate(req?.user?._id, {
        $pull: { heart: product?._id }
    }, {
        new: true
    })

    if (!user) {
        return next(new appError("Please try again ", 500))
    }

    res.status(200).send({
        status: "success",
        msg: "product removed from your Heart list"
    })
})


exports.getAllCategory = factory.getAll(Tool)


exports.homepageData = catchAsync(async (req, res, next) => {

    // getting the crawsel
    const allTools = await Tool.find({})

    res.status(200).send({
        status: "success",
        allTools
    })
})

exports.getAlltrendingProducts = catchAsync(async (req, res, next) => {

    // getting the crawsel
    const products = await Tool.find({ name: "Trending" }).select("products _id").populate({
        path: "products",
        select: "name price _id coverImage"
    })

    res.status(200).send({
        status: "success",
        products
    })
})

exports.getAllCardProducts = catchAsync(async (req, res, next) => {

    // getting the crawsel
    const products = await Tool.find({ name: "CARDS" }).select("products _id").populate({
        path: "products",
        select: " "
    })

    res.status(200).send({
        status: "success",
        products: products[0]
    })
})



exports.getAllPosters = catchAsync(async (req, res, next) => {

    // getting the crawsel
    const products = await Tool.find({ name: "POSTER" }).select("products _id").populate({
        path: "products",
        select: "name price _id coverImage"
    })

    res.status(200).send({
        status: "success",
        products
    })
})


exports.homePageClickData = catchAsync(async (req, res, next) => {

    const { products } = req.body;

    const productList = await Product.find({ _id: { $each: products } })
    res.status(200).send({
        status: "success",
        productList
    })
})

















