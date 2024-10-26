const multer = require("multer");
const fs = require('fs');
const path = require('path');
const Product = require("../Models/Product");
const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");
const appError = require("../utils/appError");
const Booked = require("../Models/BookedProduct");
const Tool = require("../Models/Tools");
const SimilarPrduct = require("../Models/SimilarProduct");
const { saveCountAndClearCache } = require("../Redis/syncViewCounts");



// now we will decrease the quality and perform many operation 
const multerStorage = multer.memoryStorage();





exports.resizeImage = catchAsync(async (req, res, next) => {
    if (!req.files.coverImage || !req.files.images) {
        return next(new appError("please upload a file", 400))
    }


    // cover image
    req.body.coverImage = `${req.body.name}-${Math.random()}-cover.jpeg`
    await sharp(req.files.coverImage[0].buffer).toFormat('jpeg').toFile(`./Public/img/${req.body.coverImage}`)

    // images
    req.body.Images = []
    req.files.images &&
        await Promise.all(req.files.images.map(async (el, i) => {
            const fileName = `${req.body.name}-${Math.random()}-${i}.jpeg`
            await sharp(el.buffer).toFormat('jpeg').toFile(`./Public/img/${fileName}`)
            req.body.Images.push(fileName);
        }))


    next()


})



exports.resizeToolImage = catchAsync(async (req, res, next) => {


    if (!req.files.coverImage && !req.files.images) {
        return next(new appError("please upload a file", 400))
    }

    if (req.files.coverImage) {

        req.body.coverImage = `toolCover-${req.body.label}-${Date.now()}.jpeg`
        await sharp(req.files.coverImage[0].buffer).toFormat('jpeg').toFile(`./Public/Tools/${req.body.coverImage}`)
        next()
        return
    }
    if (req.files.images) {
        req.body.Images = []
        await Promise.all(req.files.images.map(async (el, i) => {
            const fileName = `toolCover${req.body.label}-${Math.random()}-${i}.jpeg`
            await sharp(el.buffer).toFormat('jpeg').toFile(`./Public/Tools/${fileName}`)
            req.body.Images.push(fileName);
        }))
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
    { name: 'images', maxCount: 10 },
    { name: "color", maxCount: 10 }
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
        gender,
        stockPlace,
        weight,
        dimension
    } = req.body;
    let c = JSON.parse(category);
    // adding into the category

    const product = await Product.create({
        name,
        price,
        shortDescription,
        longDescription,
        sizes: JSON.parse(sizes),
        material,
        images: Images,
        coverImage,
        features,
        colors,
        shippingDetails,
        returnDetails,
        category: c,
        colorCategory,
        careInstructions,
        stock,
        brand,
        gender,
        stockPlace,
        weight,
        dimension
    })
    if (!product) {
        return next(new appError("Product not created plese try again", 500))
    }

    let filter = { _id: { $in: c } }

    let update = {
        $push: {
            products: product._id
        }
    }

    const tool = await Tool.updateMany(filter, update)

    await saveCountAndClearCache()

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
        colorUpdate
    } = req.body;
    if (colorUpdate) {

        await SimilarPrduct.findByIdAndUpdate(colors._id, {
            simillarProducts: colors.simillarProducts
        })



    }
    const pro = await Product.findById(id)
    if (!pro) {
        return next(new appError("product not found ", 400))
    }

    // we need to find the category is removed or added 
    let removedtool = []
    let addedTool = []

    category.map((el) => {
        if (!pro.category.includes(el)) {
            addedTool.push(el)
        }
    })

    pro.category.map((el) => {
        if (!category.includes(el)) {
            removedtool.push(el)
        }
    })

    if (addedTool.length > 0) {
        let filter = { _id: { $in: addedTool } }

        let update = {
            $push: {
                products: pro._id
            }
        }

        await Tool.updateMany(filter, update)

    }
    if (removedtool.length > 0) {
        let filter = { _id: { $in: removedtool } }

        let update = {
            $pull: {
                products: pro._id
            }
        }

        await Tool.updateMany(filter, update)
    }





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

    await saveCountAndClearCache()




    res.status(200).send({
        status: "success",
        msg: "product updated successfully"
    })
})

exports.addOtherSimillarColorProduct = catchAsync(async (req, res, next) => {

    const ids = req.body.ids;
    if (ids?.length == 0 || ids?.length < 1) {
        return next(new appError("please select atleast two product"))
    }


    let products = await Product.find({ _id: { $in: ids } }).select("_id coverImage")

    const sp = await SimilarPrduct.create({
        simillarProducts: products
    })

    if (!sp) {
        return next(new appError("Failed to add into simillar product", 500))
    }


    const filter = {
        _id: { $in: ids }
    }
    const update = {
        $set: { colors: sp._id }
    }
    const product = await Product.updateMany(filter, update)


    if (product.matchedCount !== product.matchedCount) {
        await SimilarPrduct.findByIdAndDelete(sp._id)
        return next(new appError("failed to update simillar product or it was already added ", 500))
    }


    res.status(200).send({
        status: "success",
        msg: "Product added to simillar colors product"
    })
})

exports.removeThisProductFromSimillarColor = catchAsync(async (req, res, next) => {

    let { productId } = req.params;
    if (!productId) {
        return next(new appError("please pass the product id", 400))
    }

    const product = await Product.findById(productId)
    if (!product) {
        return next(new appError("Product not found please try again", 400))
    }

    if (!product?.colors) {

        return next(new appError("Product not have simillar colors collection", 400))
    }



    const removed = await SimilarPrduct.findByIdAndUpdate(product?.colors, {
        // TODO:
    }, {
        new: true
    })

    if (!product) {
        return next(new appError("Operation not performed please try again", 500))
    }



    res.status(200).send({
        status: "success",
        msg: "Product added to simillar colors product"
    })
})



exports.deleteProduct = catchAsync(async (req, res, next) => {
    const { productIds } = req.body;
    await saveCountAndClearCache()


    if (!productIds || productIds.length === 0) {
        return next(new appError("Please provide products to delete", 400));
    }

    // Find all the products by the provided IDs
    const allProducts = await Product.find({ _id: { $in: productIds } });

    // If products are found, delete images from public directory
    if (allProducts.length > 0) {
        allProducts.forEach(product => {
            if (product.coverImage) {
                const coverImagePath = path.join(__dirname, '../Public/img', product.coverImage);
                if (fs.existsSync(coverImagePath)) {
                    fs.unlinkSync(coverImagePath);  // Delete cover image
                }
            }

            if (product.images && product.images.length > 0) {
                product.images.forEach(image => {
                    const imagePath = path.join(__dirname, '../Public/img', image);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);  // Delete each associated image
                    }
                });
            }
        });
    }

    await Tool.updateMany({
        _id: { $in: productIds }
    }, { $pull: { product: { $in: productIds } } })

    // Delete products from database
    await Product.deleteMany({ _id: { $in: productIds } });


    res.status(200).send({
        status: "success",
        msg: "Products deleted successfully"
    });
});


exports.getAllOrdersForShipment = catchAsync(async (req, res, next) => {

    const orders = await Booked.find({
        ordredPlaced: false
    }).populate("ofProduct byuser")





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
    const { label, shortDescription, name, gender } = req.body;

    const category = await Tool.create({
        name,
        label,
        coverImage: req.body?.coverImage || "",
        shortDescription,
        gender,
        images: req.body?.Images || []
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

    const { ids, tag, id } = req.body;

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
    const { gender } = req.params;
    const allToolsdata = await Tool.find({ name: { $ne: "HOTPRODUCTS" }, gender: gender }, "-products -__v")

    res.status(200).send({
        status: "success",
        allToolsdata
    })
})




exports.actionOnTool = catchAsync(async (req, res, next) => {

    let { action, ids, toolId } = req.body;
    if (!action || ids?.length == 0 || !toolId) {
        return next(new appError("please provide all the fields too perform an action ", 400))

    }
    if (action !== "ADD" && action !== "REMOVE" && action !== "ADDANDUPDATE" && action !== "REMOVEANDUPDATE") {
        return next(new appError("please perform valid action on product ", 400))

    }

    let updatedTool;
    const existingTool = await Tool.findById(toolId);
    if (action == "ADD") {

        ids = ids.map((el) => {
            if (existingTool.products.includes(el)) {
                //
            } else {
                return el
            }
        })

        if (ids.length == 0) {
            return next(new appError("selected product was already added ", 400))
        }

        updatedTool = await Tool.findByIdAndUpdate(toolId, {
            $push: { products: { $each: ids } }
        }, {
            new: true
        })
    } else if (action == "ADDANDUPDATE") {
        const { discountProduct } = req.body;



        for (const productId in discountProduct) {
            if (discountProduct.hasOwnProperty(productId)) {
                const { discount } = discountProduct[productId];
                await Product.findByIdAndUpdate(
                    productId,
                    { discount }, // Only updating the discount field
                    { new: true } // Option to return the updated document
                );

            }
        }





        ids = ids.map((el) => {
            if (existingTool.products.includes(el)) {
                //
            } else {
                return el
            }
        })

        if (ids.length == 0) {
            return next(new appError("selected product was already added ", 400))
        }

        updatedTool = await Tool.findByIdAndUpdate(toolId, {
            $push: { products: { $each: ids } }
        }, {
            new: true
        })
    } else if ("REMOVEANDUPDATE") {


        if (existingTool?.products?.length == 0) {
            return next(new appError("nothing found in list", 400))

        }
        for (let index = 0; index < ids.length; index++) {
            const element = ids[index];
            await Product.findByIdAndUpdate(element, {
                $set: { discount: 0 }
            })

        }



        updatedTool = await Tool.findByIdAndUpdate(toolId, {
            $pull: { products: { $in: ids } }
        }, {
            new: true
        })
    } else {

        if (existingTool?.products?.length == 0) {
            return next(new appError("nothing found in list", 400))

        }


        updatedTool = await Tool.findByIdAndUpdate(toolId, {
            $pull: { products: { $in: ids } }
        }, {
            new: true
        })
    }

    if (!updatedTool) {
        return next("operation not performed , Please try again", 500)
    }


    res.status(200).send({
        status: "success",
        msg: "operation performed successfully"
    })
})

exports.deletTool = catchAsync(async (req, res, next) => {

    const toolId = req.params?.toolId;
    if (!toolId) {
        return next(new appError("please pass an id to perform action", 400))
    }

    await Tool.findByIdAndDelete(toolId)


    res.status(204).send({
        status: "success",
        msg: "operation performed successfully, delete tool "
    })
})

