const catchAsync = require("../utils/catchAsync");




exports.createProduct = catchAsync(async (req, res, next) => {

    const {
        name,
        description,
        price,
        sizes,
        colors,
        category,
        stock,
        images,
        coverImage,
        brand,
        material,
    } = req.body;


    res.status(200).send({
        status: "success",
        msg: "Product created successfully"
    })
})














