const sharp = require("sharp")
const appError = require("../../utils/appError")
const catchAsync = require("../../utils/catchAsync")
const { createOne, getAll, deleteOne, updateOne, updateByQuery } = require("../../utils/factory")
const Tool = require("../Model/Tools")
const multer = require("multer")



// now we will decrease the quality and perform many operation 
const multerStorage = multer.memoryStorage();

exports.resizeImage = catchAsync(async (req, res, next) => {
    if (!req.files.images) {
        return next(new appError("please upload a image files", 400))
    }



    // images
    req.body.images = []
    req.files.images &&
        await Promise.all(req.files.images.map(async (el, i) => {
            const fileName = `${req.body.name}-${Math.random()}-${i}.jpeg`
            await sharp(el.buffer).toFormat('jpeg').toFile(`./Public/wholesale/tool/${fileName}`)
            req.body.images.push(fileName);
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



exports.createTool = createOne(Tool)


exports.getAllTool = getAll(Tool)

exports.deleteTool = deleteOne(Tool)
exports.updateTool = updateOne(Tool)

exports.addProductToToolMiddleware = catchAsync(async (req, res, next) => {

    let obj = req.body.push;
    let query = {
        $push: { products: { $each: obj } }
    }
    req.body = query;
    next()
})
exports.addProductToTool = updateByQuery(Tool)


exports.removeProductFromToolMiddleware = catchAsync(async (req, res, next) => {
    const idsToRemove = req.body.pull; // Array of IDs to remove from the `products` array

    if (!Array.isArray(idsToRemove) || idsToRemove.length === 0) {
        return next(new appError('No valid IDs provided for removal', 400))
    }

    // Construct the query to remove the IDs from the `products` array
    const query = {
        $pull: { products: { $in: idsToRemove } },
    };

    req.body = query; // Update the request body to include the query
    next(); // Pass control to the next middleware or route handler
});


exports.removeProductFromTool = updateByQuery(Tool)


