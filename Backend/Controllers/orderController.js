const Booked = require("../Models/BookedProduct");
const Apifeature = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios")
exports.getOrderDetails = catchAsync(async (req, res, next) => {

    // const res = await Booked.find()

    const features = new Apifeature(Booked.find(), req.query).filter().sort().fields().pagination().populate();


    const orders = await features.query;


    res.status(200).send({
        status: "success",
        orders
    })
})
exports.getShipmentDetailsPinToPin = catchAsync(async (req, res, next) => {
    const { systemId } = req.params;

    const token = req.shippingToken;

    let fetchCoriers;
    try {
        fetchCoriers = await axios.get(`https://appapinew.bigship.in/api/OrderShipment/Servicibility/CourierList/6393440/${systemId}`, {
            headers: {

                'Authorization': `Bearer ${token}` // Authorization header with Bearer token
            }
        });
    } catch (e) {
        res.status(400).send({
            status: "fail",
            ship: "something went wrong please try again"
        })

    }

    res.status(200).send({
        status: "success",
        ship: fetchCoriers?.data?.data
    })


})





















