const sharp = require("sharp")
const appError = require("../../utils/appError")
const catchAsync = require("../../utils/catchAsync")
const { createOne } = require("../../utils/factory")
const Tool = require("../Model/Tools")
const multer = require("multer")



// now we will decrease the quality and perform many operation 
const multerStorage = multer.memoryStorage();

exports.resizeImage = catchAsync(async (req, res, next) => {
    if (!req.files.images) {
        return next(new appError("please upload a image files", 400))
    }



    // images
    req.body.Images = []
    req.files.images &&
        await Promise.all(req.files.images.map(async (el, i) => {
            const fileName = `${req.body.name}-${Math.random()}-${i}.jpeg`
            await sharp(el.buffer).toFormat('jpeg').toFile(`./Public/wholesale/tool/${fileName}`)
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



exports.createTool = createOne(Tool)




