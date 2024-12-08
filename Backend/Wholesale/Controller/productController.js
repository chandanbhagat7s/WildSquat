const sharp = require("sharp");
const appError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const path = require('path');
const fs = require('fs');
const Product = require("./../Model/Product")
const multer = require("multer");
const { getOne, getAll, updateOne } = require("../../utils/factory");
const Tool = require("../Model/Tools");


// now we will decrease the quality and perform many operation 
const multerStorage = multer.memoryStorage();

exports.resizeImage = catchAsync(async (req, res, next) => {
    console.log("riq.file", req.files);

    if (!req.files.images) {
        return next(new appError("please upload a image files", 400))
    }



    // images
    req.body.Images = []
    req.files.images &&
        await Promise.all(req.files.images.map(async (el, i) => {
            const fileName = `${req.body.name}-${Math.random()}-${i}.jpeg`
            await sharp(el.buffer).toFormat('jpeg').toFile(`./Public/wholesale/product/${fileName}`)
            req.body.Images.push(fileName);
        }))


    next()


})





const uploads = multer(
    {
        storage: multerStorage,

    }
)

exports.uploadImages = uploads.fields([
    { name: 'images', maxCount: 10 },
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
        careInstructions,
        moq,
        category
    } = req.body;

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
        careInstructions,
        moq,

    })
    if (!product) {
        return next(new appError("Product not created plese try again", 500))
    }

    let filter = { _id: { $in: JSON.parse(category) } }

    let update = {
        $push: {
            products: product._id
        }
    }

    await Tool.updateMany(filter, update)


    res.status(200).send({
        status: "success",
        msg: "Product created successfully"
    })
})

exports.getProduct = getOne(Product)
exports.getAllProduct = getAll(Product)
exports.updateProduct = updateOne(Product)

exports.getSearchedProduct = catchAsync(async (req, res, next) => {

    const { search } = req.query;
    console.log("req query is", req.query);

    const products = await Product.find({
        name: { $regex: search, $options: 'i' }
    }, "_id name images price")



    res.status(200).send({
        status: "success",
        products,

    })
})

exports.deleteProducts = catchAsync(async (req, res, next) => {

    const { productIds } = req.body;
    if (!Array.isArray(productIds) || productIds.length === 0) {
        return next(new appError("not valid data to perform delete operation", 400))
    }

    const productsToDelete = await Product.find({ _id: { $in: productIds } });
    if (productsToDelete.length === 0) {
        return res.status(404).json({ message: 'No products found to delete.' });
    }



    await Product.deleteMany({ _id: { $in: productIds } });

    productsToDelete.forEach((product) => {
        if (product.images && product.images.length > 0) {
            product.images.forEach((image) => {
                const imagePath = path.join(__dirname, '../../Public/wholesale/product', image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image at ${imagePath}:`, err.message);
                    } else {
                        console.log(`Successfully deleted image at ${imagePath}`);
                    }
                });
            });
        }
    });


    res.status(200).send({
        status: true,
        msg: "products deleted "
    })
})







