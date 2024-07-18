const multer = require("multer");
const Product = require("../Models/Product");
const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");
const appError = require("../utils/appError");
const Booked = require("../Models/BookedProduct");
const Tool = require("../Models/Tools");



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



exports.resizeToolImage = catchAsync(async (req, res, next) => {

    if (!req.files.coverImage) {
        return next(new appError("please upload a file", 400))
    }

    const label = req.body.label;
    if (req.files.coverImage) {

        req.body.coverImage = `${req.body.name}-${label}-cover-${Math.random(100)}.jpeg`
        await sharp(req.files.coverImage[0].buffer).toFormat('jpeg').toFile(`public/Tools/${req.body.coverImage}`)
        next()
        return
    }






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
        ordredPlaced: false
    }).populate("ofProduct byuser")
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


exports.createCategory = catchAsync(async (req, res, next) => {
    const { label, shortDescription, name } = req.body;

    const category = await Tool.create({
        name,
        label,
        coverImage: req.body.coverImage,
        shortDescription
    })


    if (!category) {
        return next(new appError("Try again , category not created", 400))
    }

    res.status(200).send({
        status: "success",
        msg: "category created succesfully"
    })







})


exports.updateTools = catchAsync(async (req, res, next) => {

    const { ids, tag, name, id } = req.body;

    if (tag !== "ADD" && tag !== "REMOVE") {
        return next(new appError("please mention weather you want to add or remove products", 400))
    }



    let updatedCategory;
    if (tag == "ADD") {
        updatedCategory = await Tool.findByIdAndUpdate(id, {
            $push: { products: { $each: ids } }
        })



    } else {
        updatedCategory = await Tool.findByIdAndUpdate(id, {
            $pull: { products: { $each: ids } }
        })


    }


    if (!updatedCategory) {
        return next(new appError("please try again to add /remove the product into category", 400))
    }

    res.status(200).send({
        status: "success",
        msg: "category updated "
    })
})


exports.updateSlider = catchAsync(async (req, res, next) => {


    const { name, tag } = req.body;


    if (tag !== "ADD" && tag !== "REMOVE") {
        return next(new appError("please pass valid tag either to add or remove", 400))
    }


    let sliderUpdate;
    if (tag == "ADD") {
        sliderUpdate = await Tool.findOneAndUpdate({
            name
        }, {
            $push: { images: { $each: req.body.images } }
        })


    } else {
        sliderUpdate = await Tool.findOneAndUpdate({
            name
        }, {
            $pull: { images: { $each: req.body.images } }
        })
    }
    if (!sliderUpdate) {
        return next(new appError("please try again to add the product into category", 400))
    }

    res.status(200).send({
        status: "success",
        msg: "slider updated "
    })

})


exports.getAllMyTools = catchAsync(async (req, res, next) => {
    const allToolsdata = await Tool.find({ name: { $ne: "HOTPRODUCTS" } })

    res.status(200).send({
        status: "success",
        allToolsdata
    })
})
exports.getToolById = catchAsync(async (req, res, next) => {
    const { toolId } = req.params;
    const tooldata = await Tool.findById(toolId)

    res.status(200).send({
        status: "success",
        tooldata
    })
})







