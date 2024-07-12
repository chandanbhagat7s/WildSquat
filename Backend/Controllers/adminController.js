const multer = require("multer");
const Product = require("../Models/Product");
const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");
const appError = require("../utils/appError");
const Booked = require("../Models/BookedProduct");



// now we will decrease the quality and perform many operation 
const multerStorage = multer.memoryStorage();





exports.resizeImage = catchAsync(async (req, res, next) => {
    console.log(req.body);
    console.log("file is ", req.files);
    if (!req.files.coverImage || !req.files.images) {
        return next(new appError("please upload a file", 400))
    }


    // cover image
    req.body.coverImage = `${req.body.name}-cover.jpeg`
    await sharp(req.files.coverImage[0].buffer).toFormat('jpeg').toFile(`public/img/${req.body.coverImage}`)

    // images
    req.body.Images = []
    req.files.images &&
        console.log(req.files, req.file);
    await Promise.all(req.files.images.map(async (el, i) => {
        const fileName = `${req.body.name}-${i}.jpeg`
        await sharp(el.buffer).toFormat('jpeg').toFile(`./public/img/${fileName}`)
        req.body.Images.push(fileName);
    }))
    console.log("exit");

    next()


})


const uploads = multer(
    {
        storage: multerStorage,

    }
)

exports.uploadImages = uploads.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 10 }
])
exports.createProduct = catchAsync(async (req, res, next) => {

    const {
        name,
        price,
        shortDescription,
        longDescription,
        sizes,
        material,
        Images,
        coverImage,
        features,
        colors,
        shippingDetails,
        returnDetails,
        category,
        colorCategory,
        careInstructions,
        stock,
        brand,
        madeIn,
    } = req.body;

    const product = await Product.create({
        name,
        price,
        shortDescription,
        longDescription,
        sizes,
        material,
        images: Images,
        coverImage,
        features,
        colors,
        shippingDetails,
        returnDetails,
        category,
        colorCategory,
        careInstructions,
        stock,
        brand,
        madeIn,
    })
    if (!product) {
        return next(new appError("Product not created plese try again", 500))
    }
    res.status(200).send({
        status: "success",
        msg: "Product created successfully"
    })
})


exports.editProduct = catchAsync(async (req, res, next) => {
    const id = req.params?.productId;

    const {
        name,
        price,
        shortDescription,
        longDescription,
        sizes,
        material,
        features,
        colors,
        shippingDetails,
        returnDetails,
        category,
        colorCategory,
        careInstructions,
        stock,
        brand,
        madeIn,
    } = req.body;
    console.log(req.body, id);
    const product = await Product.findByIdAndUpdate(id, {
        name,
        price,
        shortDescription,
        longDescription,
        sizes,
        material,
        features,
        colors,
        shippingDetails,
        returnDetails,
        category,
        colorCategory,
        careInstructions,
        stock,
        brand,
        madeIn,
    }, {
        runValidators: true,
        new: true
    })

    if (!product) {
        return next(new appError("Please try again ", 500))
    }

    res.status(200).send({
        status: "success",
        msg: "product updated successfully"
    })
})



exports.hideProduct = catchAsync(async (req, res, next) => {


    const { productId } = req.params;
    if (!productId) {
        return next(new appError("please describe the product", 400))
    }

    const product = await Product.findByIdAndUpdate(productId, {
        hidden: true
    }, {
        new: true
    })
    if (!product) {
        return next(new appError("product not updated to hide , please try again ", 400))
    }

    res.status(200).send({
        status: "success",
        msg: "product hidden successfully"
    })
})


exports.getAllOrdersForShipment = catchAsync(async (req, res, next) => {

    const orders = await Booked.find({
        ordredPlaces: false
    }).populate("ofProduct")
    console.log(orders);




    res.status(200).send({
        status: "success",
        orders: orders,
    })
})


exports.confirmShipemntForOrder = catchAsync(async (req, res, next) => {

    const productId = req.params.productId;
    const { message } = req.body;

    if (productId) {
        return next(new appError("Please pass id", 400))
    }
    if (!message) {
        return next(new appError("Please pass message for user regarding shipment", 400))

    }
    const orders = await Booked.findByIdAndUpdate(productId, {
        ordredPlaces: false,
        orderMessage: message
    })



    res.status(200).send({
        status: "success",
        orders
    })
})









