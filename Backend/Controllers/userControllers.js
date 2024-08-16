const User = require("../Models/User");
const catchAsync = require("../utils/catchAsync");

exports.getCartHeartOrders = catchAsync(async (req, res, next) => {

    const product = await User.findById(req.user._id).populate({
        path: 'cart heart Ordred',
        select: "name price coverImage",

    })
    console.log("product is ", product);



    res.status(200).send({
        status: "success",
        product
    })












})


















