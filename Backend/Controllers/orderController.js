const Booked = require("../Models/BookedProduct");
const Apifeature = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getOrderDetails = catchAsync(async (req, res, next) => {

    // const res = await Booked.find()

    const features = new Apifeature(Tool.find(), req.query).populate().filter().sort().fields().pagination();


    const orders = await features.query;


    res.status(200).send({
        status: "success",
        orders
    })
})





















