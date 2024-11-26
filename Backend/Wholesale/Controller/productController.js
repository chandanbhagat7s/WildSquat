const sharp = require("sharp");
const appError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const Product = require("./../Model/Product")
const Tool = require("./../Model/Tools");
const multer = require("multer");
const { getOne } = require("../../utils/factory");


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
    })
    if (!product) {
        return next(new appError("Product not created plese try again", 500))
    }

    // let filter = { _id: { $in: c } }

    // let update = {
    //     $push: {
    //         products: product._id
    //     }
    // }

    // const tool = await Tool.updateMany(filter, update)


    res.status(200).send({
        status: "success",
        msg: "Product created successfully"
    })
})

exports.getProduct = getOne(Product)



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









